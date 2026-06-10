import { describe, it, expect, beforeEach } from "vitest";
import { StorageAdapter } from "@/infrastructure/storage/StorageAdapter";

function mockStorage(): Storage {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = String(value); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
}

describe("StorageAdapter", () => {
  let adapter: StorageAdapter;

  beforeEach(() => {
    vi.stubGlobal("localStorage", mockStorage());
    vi.stubGlobal("sessionStorage", mockStorage());
    adapter = new StorageAdapter("local");
  });

  it("stores and retrieves a value", () => {
    adapter.set("key1", { a: 1 });
    expect(adapter.get<{ a: number }>("key1")).toEqual({ a: 1 });
  });

  it("returns null for missing key", () => {
    expect(adapter.get("nonexistent")).toBeNull();
  });

  it("removes a key", () => {
    adapter.set("key1", "val");
    adapter.remove("key1");
    expect(adapter.get("key1")).toBeNull();
  });

  it("clears all keys", () => {
    adapter.set("a", 1);
    adapter.set("b", 2);
    adapter.clear();
    expect(adapter.get("a")).toBeNull();
    expect(adapter.get("b")).toBeNull();
  });

  it("returns null on JSON parse failure", () => {
    localStorage.setItem("bad", "{invalid");
    expect(adapter.get("bad")).toBeNull();
  });

  it("handles session storage", () => {
    const sessionAdapter = new StorageAdapter("session");
    sessionAdapter.set("sess", "val");
    expect(sessionAdapter.get<string>("sess")).toBe("val");
  });
});
