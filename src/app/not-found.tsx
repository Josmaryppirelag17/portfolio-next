import Link from "next/link";

export default function NotFound() {
  return (
    <div role="alert" className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#111232] px-6">
      <span className="font-mono text-6xl text-brand-pink" aria-hidden="true">404</span>
      <h1 className="font-mono text-lg text-brand-pale">PAGE NOT FOUND</h1>
      <p className="max-w-md text-center font-mono text-xs text-brand-pale/40">
        The requested resource does not exist or has been moved.
      </p>
      <Link href="/" aria-label="Volver a la página principal" className="rounded border border-brand-cyan/40 px-4 py-2 font-mono text-xs text-brand-cyan transition-colors hover:border-brand-cyan hover:bg-brand-cyan/10">
        RETURN TO BASE
      </Link>
    </div>
  );
}
