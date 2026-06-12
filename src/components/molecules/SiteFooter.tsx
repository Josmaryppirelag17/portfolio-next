"use client";

import { ArrowUp } from "lucide-react";

interface SiteFooterProps {
  t: (key: string) => string;
  onScrollToTop: () => void;
}

export default function SiteFooter({ t, onScrollToTop }: SiteFooterProps) {
  return (
    <footer className="bg-[#111232] border-t-4 border-[#111232] py-12 px-6 relative overflow-hidden">
      <div
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-lime via-brand-cyan to-brand-pink"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="w-full border-b border-brand-pale/10 pb-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-[9.5px] tracking-wider text-left">
            <div className="bg-brand-bg/80 p-3.5 rounded border border-brand-pale/10 text-left">
              <span className="text-brand-pink block mb-0.5 uppercase tracking-widest font-extrabold text-[8px]">
                DEPLOYED_ON:
              </span>
              <span className="text-[#DBEAEC] font-bold">Vercel & Cloud Run Edge</span>
            </div>
            <div className="bg-brand-bg/80 p-3.5 rounded border border-brand-pale/10 text-left">
              <span className="text-[#18BEC7] block mb-0.5 uppercase tracking-widest font-extrabold text-[8px]">
                ARCHITECTURE:
              </span>
              <span className="text-[#DBEAEC] font-bold">Serverless Edge Functions</span>
            </div>
            <div className="bg-brand-bg/80 p-3.5 rounded border border-brand-pale/10 text-left">
              <span className="text-brand-lime block mb-0.5 uppercase tracking-widest font-extrabold text-[8px]">
                DATABASE:
              </span>
              <span className="text-[#DBEAEC] font-bold">Neon (PostgreSQL)</span>
            </div>
            <div className="bg-brand-bg/80 p-3.5 rounded border border-brand-lime/20 text-left flex items-center justify-between">
              <div>
                <span className="text-brand-lime block mb-0.5 uppercase tracking-widest font-extrabold text-[8px]">
                  SYS_STATUS:
                </span>
                <span className="text-brand-lime font-bold">OPERATIONAL</span>
              </div>
              <span
                className="h-2 w-2 rounded-full bg-brand-lime animate-ping"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <nav aria-label="Enlaces profesionales" className="sr-only">
          <a href="https://github.com/josmary">GitHub — Josmary Pirela</a>
        </nav>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3 text-left">
            <div className="font-display text-sm tracking-wider text-brand-pink">
              JOSMARY.DEV // 2026
            </div>
            <span className="text-brand-pale/50 font-mono text-xs" aria-hidden="true">
              |
            </span>
            <div className="font-mono text-[10px] text-brand-pale/50 uppercase">
              {t("rebuilt_paracas")}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="font-mono text-[10px] text-brand-pale/60 flex items-center space-x-1.5 bg-[#090b1c] px-3 py-1.5 rounded border border-brand-pale/10">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse"
                aria-hidden="true"
              />
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
        <div className="mt-6 pt-4 border-t border-brand-pale/10 text-center font-mono text-[9px] text-brand-pale/40 tracking-wider">
          <a href="https://www.josmarypirela.dev/" className="hover:text-brand-cyan transition-colors">Portfolio Josmary Pirela</a>
          {" © 2026 "}
          <a href="https://www.josmarypirela.dev/?lang=es" className="hover:text-brand-cyan transition-colors">Josmary Pirela</a>
          {" — "}
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" className="hover:text-brand-cyan transition-colors" target="_blank" rel="noopener noreferrer">
            CC BY-NC-SA 4.0
          </a>
          <span className="inline-flex items-center ml-1 align-middle gap-0.5" aria-hidden="true">
            <svg viewBox="0 0 32 32" className="w-3 h-3 fill-current"><path d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/><path d="M11.5 14.3c-.4-.3-.8-.5-1.2-.5-.8 0-1.5.7-1.5 1.5 0 .8.7 1.5 1.5 1.5.4 0 .8-.2 1.2-.5l1.4 1.4c-.6.6-1.5 1-2.6 1C8 18.7 6 16.7 6 14s2-4.7 4.3-4.7c1.1 0 2 .4 2.6 1l-1.4 1.4zm9 0c-.4-.3-.8-.5-1.2-.5-.8 0-1.5.7-1.5 1.5 0 .8.7 1.5 1.5 1.5.4 0 .8-.2 1.2-.5l1.4 1.4c-.6.6-1.5 1-2.6 1C17 18.7 15 16.7 15 14s2-4.7 4.3-4.7c1.1 0 2 .4 2.6 1l-1.4 1.4z"/></svg>
            <svg viewBox="0 0 32 32" className="w-3 h-3 fill-current"><path d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/><path d="M12 13v6c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1v-6c0-.6.4-1 1-1h1c.6 0 1 .4 1 1zm6 0v6c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1v-6c0-.6.4-1 1-1h1c.6 0 1 .4 1 1z"/><path d="M22 11.5V12h-2v-1c0-.3-.2-.5-.5-.5h-5c-.3 0-.5.2-.5.5v1h-2v-.5c0-1.4 1.1-2.5 2.5-2.5h5c1.4 0 2.5 1.1 2.5 2.5z"/></svg>
            <svg viewBox="0 0 32 32" className="w-3 h-3 fill-current"><path d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/><path d="M9 14.5C9 12 11 10 13.5 10c1 0 2 .3 2.7 1l-1.4 1.4c-.4-.3-.8-.5-1.3-.5-.8 0-1.5.7-1.5 1.5 0 .8.7 1.5 1.5 1.5.5 0 .9-.2 1.3-.5l1.4 1.4c-.7.7-1.7 1-2.7 1C11 18.7 9 16.7 9 14.5zm9 0c0-2.5 2-4.5 4.5-4.5 1 0 2 .3 2.7 1l-1.4 1.4c-.4-.3-.8-.5-1.3-.5-.8 0-1.5.7-1.5 1.5 0 .8.7 1.5 1.5 1.5.5 0 .9-.2 1.3-.5l1.4 1.4c-.7.7-1.7 1-2.7 1C20 18.7 18 16.7 18 14.5z"/></svg>
          </span>
        </div>
      </div>
    </footer>
  );
}
