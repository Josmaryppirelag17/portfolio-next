"use client";

import { ArrowUp } from "lucide-react";

interface SiteFooterProps {
  t: (key: string) => string;
  onScrollToTop: () => void;
}

export default function SiteFooter({ t, onScrollToTop }: SiteFooterProps) {
  return (
    <footer className="bg-[#111232] border-t-4 border-[#111232] py-12 px-6 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-lime via-brand-cyan to-brand-pink" aria-hidden="true" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="w-full border-b border-brand-pale/10 pb-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-[9.5px] tracking-wider text-left">
            <div className="bg-brand-bg/80 p-3.5 rounded border border-brand-pale/10 text-left">
              <span className="text-brand-pink block mb-0.5 uppercase tracking-widest font-extrabold text-[8px]">DEPLOYED_ON:</span>
              <span className="text-[#DBEAEC] font-bold">Vercel & Cloud Run Edge</span>
            </div>
            <div className="bg-brand-bg/80 p-3.5 rounded border border-brand-pale/10 text-left">
              <span className="text-[#18BEC7] block mb-0.5 uppercase tracking-widest font-extrabold text-[8px]">ARCHITECTURE:</span>
              <span className="text-[#DBEAEC] font-bold">Serverless Edge Functions</span>
            </div>
            <div className="bg-brand-bg/80 p-3.5 rounded border border-brand-pale/10 text-left">
              <span className="text-brand-lime block mb-0.5 uppercase tracking-widest font-extrabold text-[8px]">DATABASE:</span>
              <span className="text-[#DBEAEC] font-bold">Neon (PostgreSQL)</span>
            </div>
            <div className="bg-brand-bg/80 p-3.5 rounded border border-brand-lime/20 text-left flex items-center justify-between">
              <div>
                <span className="text-brand-lime block mb-0.5 uppercase tracking-widest font-extrabold text-[8px]">SYS_STATUS:</span>
                <span className="text-brand-lime font-bold">OPERATIONAL</span>
              </div>
              <span className="h-2 w-2 rounded-full bg-brand-lime animate-ping" aria-hidden="true" />
            </div>
          </div>
        </div>
        <nav aria-label="Enlaces profesionales" className="sr-only">
          <a href="https://github.com/josmary">GitHub — Josmary Pirela</a>
        </nav>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3 text-left">
            <div className="font-display text-sm tracking-wider text-brand-pink">JOSMARY.DEV // 2026</div>
            <span className="text-brand-pale/50 font-mono text-xs" aria-hidden="true">|</span>
            <div className="font-mono text-[10px] text-brand-pale/50 uppercase">{t("rebuilt_paracas")}</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="font-mono text-[10px] text-brand-pale/60 flex items-center space-x-1.5 bg-[#090b1c] px-3 py-1.5 rounded border border-brand-pale/10">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" aria-hidden="true" />
              <span>STABILITY: {t("compiler_stable")}</span>
            </div>
            <button
              onClick={onScrollToTop}
              aria-label="Volver al inicio de la página"
              className="p-3 bg-brand-bg text-brand-cyan hover:bg-brand-pink hover:text-white transition-all rounded cursor-pointer neo-brutal-border min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
