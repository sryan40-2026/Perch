// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with your real production URL once Vercel assigns one
  // (or your custom domain). Required for RSS to emit absolute links.
  site: 'https://perch.vercel.app',
  // Courier Prime — an open-source Courier redrawn for screens. Astro
  // downloads and self-hosts it at build time, so there is no runtime
  // request to Google and no font flash.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Courier Prime',
      cssVariable: '--font-courier-prime',
      weights: [400, 700],
      styles: ['normal', 'italic'],
      fallbacks: ['Courier New', 'Courier', 'monospace'],
    },
  ],
  image: {
    // Never crop. Astro's default fit is `cover`, which silently crops.
    // `constrained` + `contain` preserves each photo's own aspect ratio.
    layout: 'constrained',
    objectFit: 'contain',
  },
});
