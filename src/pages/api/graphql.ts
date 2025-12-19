import type { APIRoute } from 'astro';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server once
let serverStarted = false;
async function ensureServerStarted() {
  if (!serverStarted) {
    await server.start();
    serverStarted = true;
  }
}

export const POST: APIRoute = async ({ request }) => {
  await ensureServerStarted();

  try {
    const body = await request.json();

    const response = await server.executeOperation({
      query: body.query,
      variables: body.variables,
    });

    // Handle response based on type
    if (response.body.kind === 'single') {
      return new Response(JSON.stringify(response.body.singleResult), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ errors: [{ message: 'Unexpected response' }] }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('GraphQL Error:', error);
    return new Response(
      JSON.stringify({
        errors: [{ message: error instanceof Error ? error.message : 'Internal server error' }],
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

// Handle OPTIONS for CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
