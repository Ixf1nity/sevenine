import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://sevenine.in',
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  experimental: {
    viewTransitions: true,
  },
  integrations: [tailwind(), compress(), react()],
});

