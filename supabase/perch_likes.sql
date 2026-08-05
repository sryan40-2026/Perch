-- Perch — photo likes
-- ---------------------------------------------------------------------------
-- Run this once in your Supabase project: Dashboard → SQL Editor → New query →
-- paste all of this → Run. It is safe to run more than once.
--
-- How it works: likes are anonymous and best-effort. A "visitor" is a random id
-- the browser keeps in localStorage; it only stops the same browser from liking
-- a photo twice. No accounts, no personal data.
--
-- The table itself is locked down (row-level security on, no direct access).
-- The only way in is the two functions at the bottom, which are the only things
-- the website is allowed to call.
-- ---------------------------------------------------------------------------

create table if not exists public.perch_likes (
  slug        text        not null,
  visitor     text        not null,
  created_at  timestamptz not null default now(),
  primary key (slug, visitor)
);

alter table public.perch_likes enable row level security;
revoke all on public.perch_likes from anon, authenticated;

-- Toggle a like for one photo from one browser. Returns the new state + total.
create or replace function public.perch_toggle_like(p_slug text, p_visitor text)
returns table (liked boolean, count bigint)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slug    text := left(btrim(p_slug), 80);
  v_visitor text := left(btrim(p_visitor), 64);
  v_exists  int;
begin
  if v_slug = '' or v_visitor = '' then
    raise exception 'slug and visitor are required';
  end if;

  select 1 into v_exists
  from public.perch_likes
  where slug = v_slug and visitor = v_visitor;

  if v_exists is null then
    insert into public.perch_likes (slug, visitor)
    values (v_slug, v_visitor)
    on conflict do nothing;
    liked := true;
  else
    delete from public.perch_likes
    where slug = v_slug and visitor = v_visitor;
    liked := false;
  end if;

  select count(*) into count
  from public.perch_likes
  where slug = v_slug;

  return next;
end;
$$;

-- Read like totals for a set of photos in one call.
create or replace function public.perch_like_counts(p_slugs text[])
returns table (slug text, count bigint)
language sql
security definer
set search_path = public
as $$
  select l.slug, count(*)::bigint
  from public.perch_likes l
  where l.slug = any(p_slugs)
  group by l.slug;
$$;

grant execute on function public.perch_toggle_like(text, text)  to anon, authenticated;
grant execute on function public.perch_like_counts(text[])      to anon, authenticated;
