import type { APIRoute } from 'astro';
import { createSchema, createYoga } from 'graphql-yoga';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';

// Create GraphQL schema
const schema = createSchema({
  typeDefs,
  resolvers,
});

// Create Yoga instance
const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
});

export const POST: APIRoute = async ({ request }) => {
  return yoga.handleRequest(request, {});
};

export const OPTIONS: APIRoute = async ({ request }) => {
  return yoga.handleRequest(request, {});
};
