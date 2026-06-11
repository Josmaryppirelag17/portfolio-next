"use client";

import { useEffect } from "react";
import { Volume2, VolumeX, Shield, Menu, X } from "lucide-react";
import { soundEngine } from "@/components/organisms/SoundEngine";
import { trapTabFocus } from "@utils/focusTrap";
import type { Language } from "@/types";

interface SiteHeaderProps {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
  isAudioActive: boolean;
  toggleMasterAudio: () => void;
  timeStr: string;
  onLogoTap: () => void;
  onNavClick: (anchorId: string) => void;
  onAdminOpen: () => void;
  isMobileMenuOpen: boolean;
  isMobileMenuExiting: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  onMobileToggle: () => void;
  onMobileClose: () => void;
  onDrawerEnd: () => void;
}

export default function SiteHeader({
  t,
  language,
  setLanguage,
  isAudioActive,
  toggleMasterAudio,
  timeStr,
  onLogoTap,
  onNavClick,
  onAdminOpen,
  isMobileMenuOpen,
  isMobileMenuExiting,
  menuRef,
  onMobileToggle,
  onMobileClose,
  onDrawerEnd,
}: SiteHeaderProps) {
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onMobileClose();
        return;
      }
      if (e.key === "Tab") {
        trapTabFocus(e, menuRef);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, onMobileClose, menuRef]);

  return (
    <header className="sticky top-1.5 inset-x-0 z-40 bg-brand-bg/85 backdrop-blur-md border-b border-brand-pale/10 py-2 sm:py-3.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            onLogoTap();
            onNavClick("inicio");
          }}
          className="flex items-center space-x-2 group cursor-pointer border-none bg-transparent text-left no-underline"
          aria-label="Ir al inicio"
        >
          <div
            className="h-8 w-8 sm:h-9 sm:w-9 bg-brand-pink rounded flex items-center justify-center font-display text-sm sm:text-base text-white neon-brutal-border group-hover:bg-brand-cyan transition-colors shrink-0"
            aria-hidden="true"
          >
            JP
          </div>
          <div className="text-left font-mono max-sm:hidden sm:block">
            <span className="block text-[10px] sm:text-xs font-black tracking-widest text-[#DBEAEC] leading-tight">
              JOSMARY // PIRELA
            </span>
            <span className="block text-[7px] sm:text-[8.5px] text-brand-cyan uppercase tracking-wider leading-tight">
              CREATIVE_ARCHITECT
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center space-x-1" aria-label="Navegación principal">
          {[
            { label: t("nav_about"), id: "about" },
            { label: t("nav_journey"), id: "experience" },
            { label: t("nav_exhibitions"), id: "projects" },
            { label: t("nav_skills"), id: "skills" },
            { label: t("nav_transmitter"), id: "contact" },
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavClick(link.id);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="px-3 py-1.5 font-mono text-[11px] tracking-wider text-brand-pale hover:text-brand-lime hover:bg-brand-lime/10 transition-all rounded cursor-pointer border-none bg-transparent no-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-3.5">
          <button
            onClick={() => {
              onAdminOpen();
              soundEngine.playClick();
            }}
            className="px-2.5 py-1.5 font-mono text-[9px] font-bold tracking-widest bg-[#221021] border border-brand-pink/60 text-brand-pink hover:bg-brand-pink hover:text-white transition-all rounded shadow-[0_0_8px_rgba(253,30,177,0.15)] hover:shadow-[0_0_12px_rgba(253,30,177,0.4)] cursor-pointer flex items-center space-x-1"
            aria-label="Abrir consola de administración"
          >
            <Shield size={10} className="animate-pulse" aria-hidden="true" />
            <span>[ RESTRICTED_ACCESS ]</span>
          </button>

          <div
            className="flex bg-[#111232] border border-brand-pale/10 rounded p-1 space-x-0.5"
            role="group"
            aria-label="Selector de idioma"
          >
            <button
              onClick={() => {
                if (language !== "es") {
                  setLanguage("es");
                  soundEngine.playSuccess();
                }
              }}
              aria-label="Español"
              aria-pressed={language === "es"}
              className={`px-2 py-1 font-mono text-[9px] font-black tracking-widest transition-all cursor-pointer rounded ${language === "es" ? "bg-brand-lime text-brand-bg font-extrabold shadow-[0_0_8px_#DCF10B]" : "text-brand-pale hover:text-white"}`}
            >
              ES
            </button>
            <button
              onClick={() => {
                if (language !== "en") {
                  setLanguage("en");
                  soundEngine.playSuccess();
                }
              }}
              aria-label="English"
              aria-pressed={language === "en"}
              className={`px-2 py-1 font-mono text-[9px] font-black tracking-widest transition-all cursor-pointer rounded ${language === "en" ? "bg-brand-pink text-white font-extrabold shadow-[0_0_10px_#FD1EB1]" : "text-brand-pale hover:text-white"}`}
            >
              EN
            </button>
          </div>

          {timeStr && (
            <div className="font-mono text-[10px] text-brand-pale/50 bg-[#111232]/50 px-3 py-1.5 rounded border border-brand-pale/5 flex items-center space-x-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-lime animate-pulse"
                aria-hidden="true"
              />
              <span>
                {t("sys_time")}: <span className="text-[#DBEAEC] font-semibold">{timeStr}</span>
              </span>
            </div>
          )}

          <button
            onClick={toggleMasterAudio}
            aria-label={isAudioActive ? "Desactivar sonido" : "Activar sonido"}
            aria-pressed={isAudioActive}
            className={`p-3 rounded border-2 cursor-pointer transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${isAudioActive ? "bg-brand-pink border-brand-pink text-white shadow-[0_0_10px_#FD1EB1] animate-pulse" : "bg-brand-bg border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10"}`}
          >
            {isAudioActive ? (
              <Volume2 size={15} aria-hidden="true" />
            ) : (
              <VolumeX size={15} aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-1.5 lg:hidden">
          <div
            className="flex bg-[#111232] border border-brand-pale/10 rounded p-0.5"
            role="group"
            aria-label="Selector de idioma"
          >
            <button
              onClick={() => {
                if (language !== "es") {
                  setLanguage("es");
                  soundEngine.playSuccess();
                }
              }}
              aria-label="Español"
              aria-pressed={language === "es"}
              className={`px-1.5 py-0.5 font-mono text-[8px] font-bold transition-all min-w-[44px] min-h-[44px] flex items-center justify-center ${language === "es" ? "bg-brand-lime text-brand-bg rounded-xs" : "text-brand-pale"}`}
            >
              ES
            </button>
            <button
              onClick={() => {
                if (language !== "en") {
                  setLanguage("en");
                  soundEngine.playSuccess();
                }
              }}
              aria-label="English"
              aria-pressed={language === "en"}
              className={`px-1.5 py-0.5 font-mono text-[8px] font-bold transition-all min-w-[44px] min-h-[44px] flex items-center justify-center ${language === "en" ? "bg-brand-pink text-white rounded-xs" : "text-brand-pale"}`}
            >
              EN
            </button>
          </div>

          <button
            onClick={toggleMasterAudio}
            aria-label={isAudioActive ? "Desactivar sonido" : "Activar sonido"}
            aria-pressed={isAudioActive}
            className="p-3 rounded border-2 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {isAudioActive ? (
              <Volume2 size={14} aria-hidden="true" />
            ) : (
              <VolumeX size={14} aria-hidden="true" />
            )}
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              if (isMobileMenuOpen || isMobileMenuExiting) {
                onMobileClose();
              } else {
                onMobileToggle();
              }
            }}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            className="p-3 bg-brand-bg border border-brand-pale/10 rounded text-brand-pale cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {isMobileMenuOpen ? (
              <X size={16} aria-hidden="true" />
            ) : (
              <Menu size={16} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {(isMobileMenuOpen || isMobileMenuExiting) && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
          onAnimationEnd={onDrawerEnd}
          className={`fixed inset-x-0 top-[70px] bg-[#111232] border-b-4 border-brand-pink z-30 p-6 flex flex-col space-y-4 shadow-xl lg:hidden ${isMobileMenuExiting ? "animate-[slide-up_0.2s_ease-out_forwards]" : "animate-[slide-down_0.2s_ease-out]"}`}
        >
          <button
            onClick={() => {
              onMobileClose();
              onAdminOpen();
              soundEngine.playClick();
            }}
            className="w-full text-center py-2.5 bg-[#221021] border border-brand-pink text-brand-pink font-mono text-xs rounded uppercase flex items-center justify-center space-x-2"
            aria-label="Abrir consola de administración"
          >
            <Shield size={13} className="text-brand-pink animate-pulse" aria-hidden="true" />
            <span>[ RESTRICTED_ACCESS ]</span>
          </button>

          {[
            { label: t("nav_about_mobile"), id: "about" },
            { label: t("nav_journey_mobile"), id: "experience" },
            { label: t("nav_exhibitions_mobile"), id: "projects" },
            { label: t("nav_skills_mobile"), id: "skills" },
            { label: t("nav_transmitter_mobile"), id: "contact" },
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavClick(link.id);
              }}
              className="w-full text-left font-mono text-sm py-2.5 border-b border-brand-pale/5 hover:text-brand-lime transition-colors bg-transparent border-none no-underline block text-brand-pale"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2">
            <div className="font-mono text-[10px] text-brand-pale/50 uppercase">
              {t("sys_time")}: {timeStr}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
