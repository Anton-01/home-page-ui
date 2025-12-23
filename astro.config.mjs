import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://home-page-ui.github.io'
  output: 'server',
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
