/**
 * Cache Service
 * Provides in-memory caching with TTL support for fast data access
 */

interface CacheItem<T> {
  value: T;
  expiry: number;
}

class CacheService {
  private cache: Map<string, CacheItem<unknown>> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes default

  /**
   * Get an item from cache
   */
  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    // Check if expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value as T;
  }

  /**
   * Set an item in cache with optional TTL
   */
  set<T>(key: string, value: T, ttlMs?: number): void {
    const expiry = Date.now() + (ttlMs || this.defaultTTL);
    this.cache.set(key, { value, expiry });
  }

  /**
   * Delete an item from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get or set - returns cached value or fetches and caches new value
   */
  async getOrSet<T>(
    key: string,
    fetcher: () => T | Promise<T>,
    ttlMs?: number
  ): Promise<T> {
    const cached = this.get<T>(key);

    if (cached !== null) {
      return cached;
    }

    const value = await fetcher();
    this.set(key, value, ttlMs);
    return value;
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Get cache statistics
   */
  stats(): { size: number; keys: string[] } {
    // Clean expired items first
    this.cleanup();
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  /**
   * Remove all expired items
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Export singleton instance
export const cache = new CacheService();

// Cache keys constants
export const CACHE_KEYS = {
  MODULES: 'graphql:modules',
  CONTACTS: 'graphql:contacts',
  EVENTS: 'graphql:events',
  NEWS: 'graphql:news',
  COMPANIES: 'graphql:companies',
  USER_SESSION: (userId: string) => `session:${userId}`,
} as const;

// Cache TTL constants (in milliseconds)
export const CACHE_TTL = {
  SHORT: 1 * 60 * 1000,      // 1 minute
  MEDIUM: 5 * 60 * 1000,     // 5 minutes
  LONG: 30 * 60 * 1000,      // 30 minutes
  SESSION: 60 * 60 * 1000,   // 1 hour
} as const;
