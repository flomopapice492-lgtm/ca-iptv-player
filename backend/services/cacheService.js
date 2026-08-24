class CacheService {
  constructor() {
    this.cache = new Map();
    this.ttl = new Map();
  }

  set(key, value, seconds = 3600) {
    this.cache.set(key, value);
    if (seconds > 0) {
      const now = Date.now();
      const expireTime = now + seconds * 1000;
      this.ttl.set(key, expireTime);

      setTimeout(() => {
        this.delete(key);
      }, seconds * 1000);
    }
  }

  get(key) {
    if (!this.cache.has(key)) return null;

    const expireTime = this.ttl.get(key);
    if (expireTime && Date.now() > expireTime) {
      this.delete(key);
      return null;
    }

    return this.cache.get(key);
  }

  delete(key) {
    this.cache.delete(key);
    this.ttl.delete(key);
  }

  clear() {
    this.cache.clear();
    this.ttl.clear();
  }

  size() {
    return this.cache.size;
  }

  keys() {
    return Array.from(this.cache.keys());
  }
}

module.exports = new CacheService();
