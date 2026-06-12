/** Adaptador de almacenamiento local con interfaz tipada */

export class StorageAdapter {
  private storage: Storage;

  constructor(type: "local" | "session" = "local") {
    this.storage = type === "local" ? localStorage : sessionStorage;
  }

  get<T>(key: string): T | null {
    try {
      const raw = this.storage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full */
    }
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
  clear(): void {
    this.storage.clear();
  }
}

export const storageAdapter = new StorageAdapter();
