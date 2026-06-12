import { describe, it, expect, vi, afterEach } from "vitest";

const sentryInit = vi.fn();

vi.mock("@sentry/nextjs", () => ({
  init: sentryInit,
}));

describe("SentryService", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("initializes Sentry Node.js with DSN", async () => {
    vi.stubEnv("SENTRY_DSN", "https://key@o0.ingest.sentry.io/0");
    await import("@/core/services/SentryService");
    expect(sentryInit).toHaveBeenCalled();
  });
});
