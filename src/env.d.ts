/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GRAPHQL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
