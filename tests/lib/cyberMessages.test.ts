import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  loadCyberMessages, appendCyberMessage, getAdminDisplayMessages,
  clearUserCyberMessages, hasUserCyberMessages,
  CYBER_MESSAGES_KEY,
  DEMO_CYBER_MESSAGES,
} from "@/lib/cyberMessages";

function mockLocalStorage() {
  let store: Record<string, string> = {};
  const storage: Storage = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = String(value); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
  return { storage, store };
}

describe("cyberMessages", () => {
  let ls: Storage;

  beforeEach(() => {
    const mock = mockLocalStorage();
    ls = mock.storage;
    vi.stubGlobal("localStorage", ls);
    vi.stubGlobal("window", {
      dispatchEvent: vi.fn(),
      CustomEvent: vi.fn(),
    });
    vi.restoreAllMocks();
  });

  describe("loadCyberMessages", () => {
    it("returns empty array when no stored data", () => {
      expect(loadCyberMessages()).toEqual([]);
    });

    it("parses stored JSON", () => {
      const msg = { id: "1", name: "Test", email: "t@t.com", message: "Hi", timestamp: "now", secured: true };
      ls.setItem(CYBER_MESSAGES_KEY, JSON.stringify([msg]));
      expect(loadCyberMessages()).toEqual([msg]);
    });

    it("returns empty array on parse error", () => {
      ls.setItem(CYBER_MESSAGES_KEY, "{bad}");
      expect(loadCyberMessages()).toEqual([]);
    });

    it("returns empty array for non-array JSON", () => {
      ls.setItem(CYBER_MESSAGES_KEY, '"string"');
      expect(loadCyberMessages()).toEqual([]);
    });
  });

  describe("appendCyberMessage", () => {
    it("adds a message and dispatches event", () => {
      const dispatch = vi.spyOn(window, "dispatchEvent");
      const result = appendCyberMessage({ name: "A", email: "a@a.com", message: "Hello" });
      expect(result.name).toBe("A");
      expect(result.id).toContain("usr_");
      expect(result.secured).toBe(true);
      expect(dispatch).toHaveBeenCalled();
    });

    it("prepends to existing messages", () => {
      ls.setItem(CYBER_MESSAGES_KEY, JSON.stringify([{ id: "old", name: "O" }]));
      appendCyberMessage({ id: "new", name: "N", email: "n@n.com", message: "M" });
      const all = loadCyberMessages();
      expect(all[0].id).toBe("new");
      expect(all).toHaveLength(2);
    });
  });

  describe("getAdminDisplayMessages", () => {
    it("returns demo messages when no user messages exist", () => {
      const msgs = getAdminDisplayMessages();
      expect(msgs).toEqual(DEMO_CYBER_MESSAGES);
    });

    it("returns user messages when they exist", () => {
      appendCyberMessage({ id: "u1", name: "U", email: "u@u.com", message: "M" });
      const msgs = getAdminDisplayMessages();
      expect(msgs).toHaveLength(1);
      expect(msgs[0].id).toBe("u1");
    });
  });

  describe("clearUserCyberMessages", () => {
    it("removes stored messages and dispatches event", () => {
      ls.setItem(CYBER_MESSAGES_KEY, JSON.stringify([{ id: "1" }]));
      const dispatch = vi.spyOn(window, "dispatchEvent");
      clearUserCyberMessages();
      expect(loadCyberMessages()).toEqual([]);
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("hasUserCyberMessages", () => {
    it("returns false when empty", () => {
      expect(hasUserCyberMessages()).toBe(false);
    });

    it("returns true when messages exist", () => {
      appendCyberMessage({ name: "A", email: "a@a.com", message: "M" });
      expect(hasUserCyberMessages()).toBe(true);
    });
  });
});
