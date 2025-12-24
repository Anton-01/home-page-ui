import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://home-page-ui.vercel.app',
  output: 'server',
  adapter: vercel(),
  server: {
    port: 4321,
    host: true
  },
  vite: {
    ssr: {
      noExternal: ['graphql', 'graphql-yoga']
    }
  }
});
