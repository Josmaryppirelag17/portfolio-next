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

  it("initializes Sentry with DSN when set", async () => {
    vi.stubEnv("SENTRY_DSN", "https://key@o0.ingest.sentry.io/0");
    await import("@/core/services/SentryService");
    expect(sentryInit).toHaveBeenCalled();
  });

  it("does not initialize Sentry when DSN is not set", async () => {
    vi.stubEnv("SENTRY_DSN", "");
    sentryInit.mockClear();
    await import("@/core/services/SentryService");
    expect(sentryInit).not.toHaveBeenCalled();
  });
});
