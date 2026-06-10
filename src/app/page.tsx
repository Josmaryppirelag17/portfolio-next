"use client";

import { MotionConfig } from "motion/react";
import { LanguageProvider } from "@/context/LanguageContext";
import PortfolioErrorBoundary from "@/components/molecules/ErrorBoundary";
import App from "@/components/templates/App";

export default function HomePage() {
  return (
    <PortfolioErrorBoundary>
      <LanguageProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </LanguageProvider>
    </PortfolioErrorBoundary>
  );
}
