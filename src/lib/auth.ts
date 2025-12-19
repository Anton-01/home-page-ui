/**
 * Authentication utilities for session management
 */

export interface User {
  id: number;
  email: string;
  nombre: string;
  companyId: number;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: number;
}

/**
 * Generate a simple session token
 */
export function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

/**
 * Create a session for a user
 */
export function createSession(user: Omit<User, 'password'>): Session {
  const expiresAt = Date.now() + (60 * 60 * 1000); // 1 hour
  return {
    user: {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      companyId: user.companyId
    },
    token: generateToken(),
    expiresAt
  };
}

/**
 * Validate session token from cookie
 */
export function parseSessionCookie(cookie: string | null): Session | null {
  if (!cookie) return null;

  try {
    const sessionData = JSON.parse(decodeURIComponent(cookie));

    // Check if session is expired
    if (sessionData.expiresAt < Date.now()) {
      return null;
    }

    return sessionData as Session;
  } catch {
    return null;
  }
}

/**
 * Create session cookie value
 */
export function createSessionCookie(session: Session): string {
  return encodeURIComponent(JSON.stringify(session));
}

/**
 * Get cookie options for session
 */
export function getSessionCookieOptions(): string {
  return 'Path=/; HttpOnly; SameSite=Lax; Max-Age=3600';
}
