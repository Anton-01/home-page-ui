import modulesData from '../data/modules.json';
import contactsData from '../data/contacts.json';
import eventsData from '../data/events.json';
import newsData from '../data/news.json';
import companiesData from '../data/companies.json';
import usersData from '../data/users.json';
import { getInitials, getAvatarColor } from '../data/icons';
import { cache, CACHE_KEYS, CACHE_TTL } from '../lib/cache';
import { createSession, type Session } from '../lib/auth';

// Types
interface Module {
  id: string;
  label: string;
  type: string;
  url?: string;
  target?: string;
  modalId?: string;
  icon: string;
  highlight: string | null;
}

interface Contact {
  id: number;
  nombre: string;
  departamento: string;
  email: string;
  telefono: string;
  extension: string;
  imagen: string | null;
}

interface ContactWithAvatar extends Contact {
  initials: string;
  avatarColor: string;
}

interface CalendarEvent {
  day: number;
  title: string;
  content: string;
  time: string;
}

interface NewsItem {
  id: number;
  text: string;
}

interface Company {
  id: number;
  nombre: string;
}

interface User {
  id: number;
  email: string;
  password: string;
  nombre: string;
  companyId: number;
}

// Helper to enrich contacts with avatar data
function enrichContacts(contacts: Contact[]): ContactWithAvatar[] {
  return contacts.map(contact => ({
    ...contact,
    initials: getInitials(contact.nombre),
    avatarColor: getAvatarColor(contact.nombre)
  }));
}

export const resolvers = {
  Query: {
    // Modules
    modules: async (): Promise<Module[]> => {
      return cache.getOrSet(
        CACHE_KEYS.MODULES,
        () => modulesData as Module[],
        CACHE_TTL.LONG
      );
    },

    module: async (_: unknown, { id }: { id: string }): Promise<Module | undefined> => {
      const modules = await cache.getOrSet(
        CACHE_KEYS.MODULES,
        () => modulesData as Module[],
        CACHE_TTL.LONG
      );
      return modules.find(m => m.id === id);
    },

    // Contacts
    contacts: async (_: unknown, { search }: { search?: string }): Promise<ContactWithAvatar[]> => {
      const contacts = await cache.getOrSet(
        CACHE_KEYS.CONTACTS,
        () => enrichContacts(contactsData as Contact[]),
        CACHE_TTL.LONG
      );

      if (!search) return contacts;

      const searchLower = search.toLowerCase();
      return contacts.filter(contact =>
        contact.nombre.toLowerCase().includes(searchLower) ||
        contact.departamento.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.extension.includes(search)
      );
    },

    contact: async (_: unknown, { id }: { id: string }): Promise<ContactWithAvatar | undefined> => {
      const contacts = await cache.getOrSet(
        CACHE_KEYS.CONTACTS,
        () => enrichContacts(contactsData as Contact[]),
        CACHE_TTL.LONG
      );
      return contacts.find(c => c.id === parseInt(id));
    },

    // Calendar Events
    calendarEvents: async (): Promise<CalendarEvent[]> => {
      return cache.getOrSet(
        CACHE_KEYS.EVENTS,
        () => eventsData as CalendarEvent[],
        CACHE_TTL.LONG
      );
    },

    eventByDay: async (_: unknown, { day }: { day: number }): Promise<CalendarEvent | undefined> => {
      const events = await cache.getOrSet(
        CACHE_KEYS.EVENTS,
        () => eventsData as CalendarEvent[],
        CACHE_TTL.LONG
      );
      return events.find(e => e.day === day);
    },

    // News
    newsItems: async (): Promise<NewsItem[]> => {
      return cache.getOrSet(
        CACHE_KEYS.NEWS,
        () => newsData as NewsItem[],
        CACHE_TTL.MEDIUM
      );
    },

    // Companies
    companies: async (_: unknown, { search }: { search?: string }): Promise<Company[]> => {
      const companies = await cache.getOrSet(
        CACHE_KEYS.COMPANIES,
        () => companiesData as Company[],
        CACHE_TTL.LONG
      );

      if (!search) return companies;

      const searchLower = search.toLowerCase();
      return companies.filter(company =>
        company.nombre.toLowerCase().includes(searchLower)
      );
    },

    company: async (_: unknown, { id }: { id: string }): Promise<Company | undefined> => {
      const companies = await cache.getOrSet(
        CACHE_KEYS.COMPANIES,
        () => companiesData as Company[],
        CACHE_TTL.LONG
      );
      return companies.find(c => c.id === parseInt(id));
    },

    // Cache Stats
    cacheStats: () => cache.stats()
  },

  Mutation: {
    // Login
    login: async (
      _: unknown,
      { email, password }: { email: string; password: string; companyId?: number }
    ): Promise<{ success: boolean; message: string; user?: Omit<User, 'password'>; token?: string }> => {
      // Find user
      const user = (usersData as User[]).find(
        u => u.email === email && u.password === password
      );

      if (!user) {
        return {
          success: false,
          message: 'Credenciales incorrectas. Verifica tu correo y contraseña.'
        };
      }

      // Create session
      const session: Session = createSession({
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        companyId: user.companyId
      });

      // Cache the session
      cache.set(CACHE_KEYS.USER_SESSION(user.id.toString()), session, CACHE_TTL.SESSION);

      return {
        success: true,
        message: '¡Bienvenido! Inicio de sesión exitoso.',
        user: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          companyId: user.companyId
        },
        token: session.token
      };
    },

    // Logout
    logout: (): boolean => {
      // In a real app, you would invalidate the session token
      return true;
    },

    // Request Password Reset
    requestPasswordReset: async (_: unknown, { email }: { email: string }): Promise<boolean> => {
      // Check if user exists
      const user = (usersData as User[]).find(u => u.email === email);

      // Always return true for security (don't reveal if email exists)
      // In a real app, this would send an email
      console.log(`Password reset requested for: ${email}, user exists: ${!!user}`);

      return true;
    },

    // Clear Cache
    clearCache: (): boolean => {
      cache.clear();
      return true;
    },

    // Refresh specific cache key
    refreshCache: (_: unknown, { key }: { key: string }): boolean => {
      return cache.delete(key);
    }
  }
};
