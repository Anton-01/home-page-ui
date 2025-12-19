/**
 * GraphQL Client for client-side queries
 * Uses fetch API to communicate with the GraphQL endpoint
 */

const GRAPHQL_URL = '/api/graphql';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  if (!result.data) {
    throw new Error('No data returned from GraphQL');
  }

  return result.data;
}

// Query definitions for client-side use
export const queries = {
  // Get all modules
  GET_MODULES: `
    query GetModules {
      modules {
        id
        label
        type
        url
        target
        modalId
        icon
        highlight
      }
    }
  `,

  // Get all contacts with optional search
  GET_CONTACTS: `
    query GetContacts($search: String) {
      contacts(search: $search) {
        id
        nombre
        departamento
        email
        telefono
        extension
        imagen
        initials
        avatarColor
      }
    }
  `,

  // Get calendar events
  GET_CALENDAR_EVENTS: `
    query GetCalendarEvents {
      calendarEvents {
        day
        title
        content
        time
      }
    }
  `,

  // Get news items
  GET_NEWS: `
    query GetNews {
      newsItems {
        id
        text
      }
    }
  `,

  // Get companies with optional search
  GET_COMPANIES: `
    query GetCompanies($search: String) {
      companies(search: $search) {
        id
        nombre
      }
    }
  `,

  // Get all dashboard data in one query
  GET_DASHBOARD_DATA: `
    query GetDashboardData {
      modules {
        id
        label
        type
        url
        target
        modalId
        icon
        highlight
      }
      contacts {
        id
        nombre
        departamento
        email
        telefono
        extension
        imagen
        initials
        avatarColor
      }
      calendarEvents {
        day
        title
        content
        time
      }
      newsItems {
        id
        text
      }
    }
  `
};

export const mutations = {
  // Login mutation
  LOGIN: `
    mutation Login($email: String!, $password: String!, $companyId: Int) {
      login(email: $email, password: $password, companyId: $companyId) {
        success
        message
        user {
          id
          email
          nombre
          companyId
        }
        token
      }
    }
  `,

  // Logout mutation
  LOGOUT: `
    mutation Logout {
      logout
    }
  `,

  // Request password reset
  REQUEST_PASSWORD_RESET: `
    mutation RequestPasswordReset($email: String!) {
      requestPasswordReset(email: $email)
    }
  `
};
