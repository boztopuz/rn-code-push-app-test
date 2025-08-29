/**
 * Simple in-memory cache utility
 */
export class Cache {
  private static instance: Cache;
  private cache: Map<string, { value: any; expiry: number | null }>;

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  /**
   * Set a value in the cache
   * @param key The cache key
   * @param value The value to cache
   * @param ttlMs Time to live in milliseconds (optional)
   */
  set(key: string, value: any, ttlMs?: number): void {
    const expiry = ttlMs ? Date.now() + ttlMs : null;
    this.cache.set(key, { value, expiry });
  }

  /**
   * Get a value from the cache
   * @param key The cache key
   * @returns The cached value or undefined if not found or expired
   */
  get<T>(key: string): T | undefined {
    const item = this.cache.get(key);
    
    // Check if item exists
    if (!item) return undefined;
    
    // Check if item has expired
    if (item.expiry && Date.now() > item.expiry) {
      this.delete(key);
      return undefined;
    }
    
    return item.value as T;
  }

  /**
   * Delete a value from the cache
   * @param key The cache key
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all items from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get all keys in the cache
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Check if a key exists in the cache and is not expired
   * @param key The cache key
   */
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    if (item.expiry && Date.now() > item.expiry) {
      this.delete(key);
      return false;
    }
    return true;
  }
}

export const cacheService = Cache.getInstance();
