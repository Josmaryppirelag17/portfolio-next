import { describe, it, expect } from "vitest";
import {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  tooManyRequests,
  methodNotAllowed,
  serverError,
  ok,
  ErrorsService,
} from "@/core/services/ErrorsService";

describe("ErrorsService", () => {
  describe("badRequest", () => {
    it("returns 400 with message", async () => {
      const res = badRequest("Invalid input");
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.success).toBe(false);
      expect(body.error.code).toBe("BAD_REQUEST");
      expect(body.error.message).toBe("Invalid input");
    });

    it("includes details when provided", async () => {
      const res = badRequest("Invalid", { field: "name" });
      const body = await res.json();
      expect(body.error.details).toEqual({ field: "name" });
    });
  });

  describe("unauthorized", () => {
    it("returns 401 with default message", async () => {
      const res = unauthorized();
      expect(res.status).toBe(401);
      const body = await res.json();
      expect(body.error.code).toBe("UNAUTHORIZED");
    });

    it("returns 401 with custom message", async () => {
      const res = unauthorized("Login required");
      const body = await res.json();
      expect(body.error.message).toBe("Login required");
    });
  });

  describe("forbidden", () => {
    it("returns 403", async () => {
      const res = forbidden();
      expect(res.status).toBe(403);
      const body = await res.json();
      expect(body.error.code).toBe("FORBIDDEN");
    });
  });

  describe("notFound", () => {
    it("returns 404", async () => {
      const res = notFound();
      expect(res.status).toBe(404);
      const body = await res.json();
      expect(body.error.code).toBe("NOT_FOUND");
    });
  });

  describe("tooManyRequests", () => {
    it("returns 429 with Retry-After header", async () => {
      const res = tooManyRequests(60);
      expect(res.status).toBe(429);
      expect(res.headers.get("Retry-After")).toBe("60");
      const body = await res.json();
      expect(body.error.code).toBe("RATE_LIMITED");
      expect(body.error.details.retryAfter).toBe(60);
    });
  });

  describe("methodNotAllowed", () => {
    it("returns 405", async () => {
      const res = methodNotAllowed();
      expect(res.status).toBe(405);
      const body = await res.json();
      expect(body.error.code).toBe("METHOD_NOT_ALLOWED");
    });
  });

  describe("serverError", () => {
    it("returns 500 with message", async () => {
      const res = serverError("Oops");
      expect(res.status).toBe(500);
      const body = await res.json();
      expect(body.error.code).toBe("INTERNAL_ERROR");
    });

    it("includes errors array when provided", async () => {
      const res = serverError("Oops", ["err1"]);
      const body = await res.json();
      expect(body.errors).toEqual(["err1"]);
    });
  });

  describe("ok", () => {
    it("returns 200 with data", async () => {
      const res = ok({ id: 1 });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.data).toEqual({ id: 1 });
    });
  });

  describe("ErrorsService static", () => {
    it("exposes all functions statically", () => {
      expect(ErrorsService.badRequest).toBe(badRequest);
      expect(ErrorsService.ok).toBe(ok);
      expect(ErrorsService.serverError).toBe(serverError);
    });
  });
});
