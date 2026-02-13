/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Public GraphQL endpoint URL for client-side requests (default: /api/graphql) */
  readonly PUBLIC_GRAPHQL_URL: string;
  /** Backend GraphQL URL for server-side proxy (default: https://marks-test.com/graphql) */
  readonly BACKEND_GRAPHQL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
