import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      provider: "v8",
      thresholds: {
        statements: 30,
        branches: 28,
        functions: 34,
        lines: 31,
      },
      include: ["src/**"],
      exclude: [
        "**/migrations/**",
        "**/*.sql",
        "**/node_modules/**",
        "src/workers/**",
        "src/app/opengraph-image.tsx",
      ],
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@infrastructure": path.resolve(__dirname, "./src/infrastructure"),
    },
  },
});
