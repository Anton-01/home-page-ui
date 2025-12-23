import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://Anton-01.github.io'
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
