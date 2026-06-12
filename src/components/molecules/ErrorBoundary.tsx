"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import * as Sentry from "@sentry/nextjs";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class PortfolioErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    Sentry.captureException(error, {
      contexts: { react: { componentStack: errorInfo.componentStack } },
    });
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onReload={this.handleReload} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error, onReload }: { error: Error | null; onReload: () => void }) {
  return (
    <div
      role="alert"
      className="min-h-screen flex flex-col items-center justify-center gap-4 bg-brand-bg text-brand-pale px-6 font-sans"
    >
      <h2 className="font-display text-lg uppercase text-brand-pink">Oops — algo salio mal</h2>
      <p className="font-mono text-sm text-brand-pale/80 text-center max-w-md">
        Esta seccion encontro un error inesperado. Puedes recargar la pagina para intentarlo de
        nuevo.
      </p>
      {process.env.NODE_ENV === "development" && error && (
        <pre className="font-mono text-[10px] text-brand-cyan/70 max-w-lg overflow-auto p-3 border border-brand-pale/10 rounded">
          {error.message}
        </pre>
      )}
      <button
        type="button"
        onClick={onReload}
        className="font-mono text-xs px-4 py-2 bg-brand-pink text-white rounded border-2 border-[#111232] cursor-pointer hover:bg-brand-cyan transition-colors"
      >
        Recargar la pagina
      </button>
    </div>
  );
}
