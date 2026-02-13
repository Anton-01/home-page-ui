import type { APIRoute } from 'astro';

/**
 * GraphQL Proxy Endpoint
 * Forwards all GraphQL requests to the real backend at https://marks-test.com/graphql
 * This avoids CORS issues and allows server-side request handling
 */

const BACKEND_GRAPHQL_URL = import.meta.env.BACKEND_GRAPHQL_URL || 'https://marks-test.com/graphql';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();

    // Forward the request to the real backend
    const response = await fetch(BACKEND_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward authorization header if present
        ...(request.headers.get('Authorization') && {
          'Authorization': request.headers.get('Authorization')!
        }),
        // Forward any custom headers
        ...(request.headers.get('X-Company-ID') && {
          'X-Company-ID': request.headers.get('X-Company-ID')!
        }),
      },
      body,
    });

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Company-ID',
      },
    });
  } catch (error) {
    console.error('GraphQL Proxy Error:', error);
    return new Response(
      JSON.stringify({
        errors: [{ message: 'Error connecting to backend service' }]
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Company-ID',
    },
  });
};
