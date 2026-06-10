import { describe, it, expect, beforeEach, vi } from "vitest";
import { ApiAdapter } from "@/infrastructure/api/ApiAdapter";

describe("ApiAdapter", () => {
  let adapter: ApiAdapter;

  beforeEach(() => {
    adapter = new ApiAdapter("http://localhost:3000/api");
    vi.restoreAllMocks();
  });

  describe("get", () => {
    it("returns data on success", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response(JSON.stringify({ items: [1] }), { status: 200 }),
      );
      const result = await adapter.get<{ items: number[] }>("/test");
      expect(result.success).toBe(true);
      if (result.success) expect(result.value.items).toEqual([1]);
    });

    it("returns error on non-ok response", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response("Not Found", { status: 404, statusText: "Not Found" }),
      );
      const result = await adapter.get("/test");
      expect(result.success).toBe(false);
    });

    it("returns error on network failure", async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network fail"));
      const result = await adapter.get("/test");
      expect(result.success).toBe(false);
    });

    it("appends query params", async () => {
      let calledUrl = "";
      vi.spyOn(globalThis, "fetch").mockImplementation(async (url) => {
        calledUrl = typeof url === "string" ? url : url.toString();
        return new Response("[]", { status: 200 });
      });
      await adapter.get("/search", { q: "hello" });
      expect(calledUrl).toContain("q=hello");
    });
  });

  describe("post", () => {
    it("returns data on success", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response(JSON.stringify({ id: 1 }), { status: 200 }),
      );
      const result = await adapter.post<{ id: number }>("/items", { name: "x" });
      expect(result.success).toBe(true);
      if (result.success) expect(result.value.id).toBe(1);
    });

    it("sends JSON body", async () => {
      let sentBody = "";
      vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, opts) => {
        sentBody = opts?.body as string;
        return new Response("{}", { status: 200 });
      });
      await adapter.post("/items", { name: "test" });
      expect(JSON.parse(sentBody)).toEqual({ name: "test" });
    });

    it("returns error on failure", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response("Error", { status: 500, statusText: "Internal Server Error" }),
      );
      const result = await adapter.post("/items", {});
      expect(result.success).toBe(false);
    });
  });
});
