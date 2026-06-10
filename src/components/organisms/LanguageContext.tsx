"use client";

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import type { Language } from '@/types';
import { translations as esT, projects as esP, milestones as esM } from '@/i18n/es';
import { translations as enT, projects as enP, milestones as enM } from '@/i18n/en';
import type { LocalizedProject, LocalizedMilestone } from '@/i18n/types';

export type { Language } from '@/types';

function readLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  if (lang === "es" || lang === "en") return lang;
  return localStorage.getItem("lang") as Language | null;
}

function writeLanguage(lang: Language) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url.toString());
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "en" ? "en" : "es";
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  projects: LocalizedProject[];
  experience: LocalizedMilestone[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");
  const announceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = readLanguage();
    if (stored) setLanguageState(stored);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    writeLanguage(lang);
    if (announceRef.current) {
      announceRef.current.textContent = lang === "en" ? "Language changed to English" : "Idioma cambiado a Español";
    }
  };

  useEffect(() => {
    writeLanguage(language);
    document.title = language === "es"
      ? "Josmary Pirela | Desarrolladora Full-Stack Creativa"
      : "Josmary Pirela | Creative Full-Stack Developer";
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    document.documentElement.classList.toggle("reduce-motion", mq.matches);
    const handler = (e: MediaQueryListEvent) => document.documentElement.classList.toggle("reduce-motion", e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [language]);

  const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es");

  const dict = language === "es" ? esT : enT;
  const t = (key: string): string => dict[key] || key;
  const projects = language === "es" ? esP : enP;
  const experience = language === "es" ? esM : enM;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, projects, experience }}>
      <div ref={announceRef} role="status" aria-live="polite" aria-atomic="true" className="sr-only" />
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
