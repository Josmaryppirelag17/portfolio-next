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
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
      },
      include: ["src/**"],
      exclude: [
        "**/migrations/**",
        "**/*.sql",
        "**/node_modules/**",
        "src/workers/**",
        "src/app/opengraph-image.tsx",
        "src/i18n/**",
        "src/types/**",
        "src/lib/analytics.ts",
        "src/components/organisms/HeroPlayground.tsx",
        "src/components/organisms/AdminConsole.tsx",
        "src/components/organisms/ContactTerminal.tsx",
        "src/components/organisms/CyberAvatar.tsx",
        "src/components/organisms/SoundEngine.ts",
        "src/components/molecules/WidgetBiorhythmECG.tsx",
        "src/components/molecules/WidgetMatrixRain.tsx",
        "src/components/molecules/MatrixRainOverlay.tsx",
        "src/hooks/useCanvas.ts",
        "src/hooks/useWorker.ts",
        "src/middleware.ts",
        "src/components/templates/App.tsx",
      ],
      reporter: ["text", "json", "html", "lcov"],
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
