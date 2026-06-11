"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  // NOSONAR - Next.js requires "Error" as component name
  return (
    <div
      role="alert"
      className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#111232] px-6"
    >
      <h2 className="font-mono text-lg text-brand-pink">SYSTEM ERROR</h2>
      <p className="max-w-md text-center font-mono text-xs text-brand-pale/60">
        An unexpected error occurred. Please try reloading the page.
      </p>
      <button
        onClick={reset}
        aria-label="Recargar página"
        className="cursor-pointer rounded border border-brand-cyan/40 px-4 py-2 font-mono text-xs text-brand-cyan transition-colors hover:border-brand-cyan hover:bg-brand-cyan/10"
      >
        RELOAD
      </button>
    </div>
  );
}
