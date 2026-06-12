import { describe, it, expect, vi } from "vitest";
import { createLogger, LoggerService } from "@/core/services/LoggerService";

describe("LoggerService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("createLogger", () => {
    it("returns logger with methods", () => {
      const log = createLogger();
      expect(log).toHaveProperty("info");
      expect(log).toHaveProperty("warn");
      expect(log).toHaveProperty("error");
      expect(log).toHaveProperty("response");
      expect(log).toHaveProperty("requestId");
    });

    it("generates a requestId", () => {
      const log = createLogger();
      expect(log.requestId).toBeDefined();
      expect(log.requestId.length).toBeGreaterThanOrEqual(6);
    });

    it("logs info message to console.log", () => {
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      const log = createLogger();
      log.info("test message");
      expect(spy).toHaveBeenCalled();
      const called = spy.mock.calls[0][0] as string;
      expect(called).toContain("[INFO]");
      expect(called).toContain("test message");
      spy.mockRestore();
    });

    it("logs warn message to console.warn", () => {
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const log = createLogger();
      log.warn("warning");
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it("logs error message to console.error", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      const log = createLogger();
      log.error("error", "details");
      expect(spy).toHaveBeenCalled();
      const called = spy.mock.calls[0][0] as string;
      expect(called).toContain("error=details");
      spy.mockRestore();
    });

    it("logs response with duration", () => {
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      const log = createLogger();
      const rid = log.response(200);
      expect(rid).toBe(log.requestId);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it("includes request method and path when provided", () => {
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      const req = { method: "POST", url: "/api/contact" } as Request;
      const log = createLogger(req);
      log.info("hi");
      const called = spy.mock.calls[0][0] as string;
      expect(called).toContain("method=POST");
      expect(called).toContain("path=/api/contact");
      spy.mockRestore();
    });
  });

  describe("LoggerService static", () => {
    it("exposes createLogger", () => {
      expect(LoggerService.createLogger).toBe(createLogger);
    });
  });
});
