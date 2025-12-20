export const typeDefs = `#graphql
  # ============================================
  # TYPES
  # ============================================

  type Module {
    id: ID!
    label: String!
    type: String!
    url: String
    target: String
    modalId: String
    icon: String!
    highlight: String
  }

  type Contact {
    id: ID!
    nombre: String!
    departamento: String!
    email: String!
    telefono: String!
    extension: String!
    imagen: String
    initials: String!
    avatarColor: String!
  }

  type CalendarEvent {
    day: Int!
    title: String!
    content: String!
    time: String!
  }

  type NewsItem {
    id: ID!
    text: String!
  }

  type Company {
    id: ID!
    nombre: String!
  }

  type User {
    id: ID!
    email: String!
    nombre: String!
    companyId: Int!
  }

  type AuthPayload {
    success: Boolean!
    message: String!
    user: User
    token: String
  }

  type CacheStats {
    size: Int!
    keys: [String!]!
  }

  # ============================================
  # QUERIES
  # ============================================

  type Query {
    # Modules
    modules: [Module!]!
    module(id: ID!): Module

    # Contacts
    contacts(search: String): [Contact!]!
    contact(id: ID!): Contact

    # Calendar Events
    calendarEvents: [CalendarEvent!]!
    eventByDay(day: Int!): CalendarEvent

    # News
    newsItems: [NewsItem!]!

    # Companies
    companies(search: String): [Company!]!
    company(id: ID!): Company

    # Cache Stats (for monitoring)
    cacheStats: CacheStats!
  }

  # ============================================
  # MUTATIONS
  # ============================================

  type Mutation {
    # Authentication
    login(email: String!, password: String!, companyId: Int): AuthPayload!
    logout: Boolean!
    requestPasswordReset(email: String!): Boolean!

    # Cache Management
    clearCache: Boolean!
    refreshCache(key: String!): Boolean!
  }
`;
