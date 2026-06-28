"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Share2, FileText, ExternalLink, MessageSquare, Link } from "lucide-react";
import { soundEngine } from "@/components/organisms/SoundEngine";
import { useLanguage } from "@/components/organisms/LanguageContext";

interface VerticalItem {
  id: string;
  label: string;
  url: string;
  icon: React.ReactNode;
}

interface HorizontalItem {
  id: string;
  labelKey: string;
  url: string;
  icon: React.ReactNode;
  accent: "cyan" | "lime";
  ariaKey: string;
  external: boolean;
}

const VERTICAL_ITEMS: VerticalItem[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/josmary-pirela",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "codepen",
    label: "CodePen",
    url: "https://codepen.io/Josmaryppirelag17",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M12 2L2 7.5v7.5l10 5.5 10-5.5V7.5L12 2zm0 3.3l6.2 3.4-6.2 3.5-6.2-3.5L12 5.3zM4.5 12.2l5.5 3.1v4.1l-5.5-3.1v-4.1zm9.5 3.1l5.5-3.1v4.1l-5.5 3.1v-4.1zm-1 0.1l5.5 3.1-5.5 3.1-5.5-3.1 5.5-3.1z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/Josmaryppirelag17",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "linktree",
    label: "Links",
    url: "https://link.josmarypirela.dev",
    icon: <Link size={14} />,
  },
  {
    id: "contact",
    label: "LinkedIn",
    url: "#contact",
    icon: <MessageSquare size={14} />,
  },
];

const springConfig = { type: "spring" as const, stiffness: 400, damping: 28 };

function itemTransition(index: number) {
  return { ...springConfig, delay: index * 0.04 };
}

export default function FloatingSocialPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();

  const cvUrl = `/api/cv?lang=${language}`;

  const HORIZONTAL_ITEMS: HorizontalItem[] = [
    {
      id: "cv",
      labelKey: "panel_cv",
      url: cvUrl,
      icon: <FileText size={14} />,
      accent: "cyan",
      ariaKey: "panel_cv_aria",
      external: true,
    },
    {
      id: "saber-mas",
      labelKey: "panel_saber_mas",
      url: "/links",
      icon: <ExternalLink size={14} />,
      accent: "lime",
      ariaKey: "panel_saber_mas_aria",
      external: false,
    },
  ];

  const toggle = useCallback(() => {
    soundEngine.playClick();
    setIsOpen((prev) => !prev);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent, url: string) => {
    soundEngine.playClick();
    if (url === "#contact") {
      e.preventDefault();
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  }, []);

  const verticalLabel = (item: VerticalItem) => {
    if (item.id === "contact") return t("panel_contact");
    return item.label;
  };

  return (
    <div className="fixed left-2 sm:left-4 bottom-2 sm:bottom-4 z-50">
      <div className="relative flex items-center">
        {/* Main toggle button */}
        <button
          onClick={toggle}
          aria-label={isOpen ? t("panel_close") : t("panel_open")}
          className="relative z-10 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-brand-bg text-brand-pink hover:bg-brand-pink hover:text-white transition-all duration-300 rounded-xl neo-brutal-border-pink cursor-pointer"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Share2 size={18} className="sm:w-[20px] sm:h-[20px]" />
          </motion.div>
        </button>

        {/* Horizontal items (right of button) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="horizontal-group"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={springConfig}
              className="flex items-center gap-1.5 sm:gap-2 ml-1.5 sm:ml-2"
            >
              {HORIZONTAL_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={itemTransition(i)}
                >
                  <a
                    href={item.url}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={(e) => handleClick(e, item.url)}
                    aria-label={t(item.ariaKey)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-brand-bg/90 backdrop-blur-sm border rounded-lg text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all duration-200 min-h-[36px] sm:min-h-[40px] cursor-pointer hover:scale-105 ${
                      item.accent === "cyan"
                        ? "text-brand-cyan border-brand-cyan/30 hover:border-brand-cyan hover:bg-brand-cyan/10 hover:shadow-[0_0_12px_rgba(24,190,199,0.2)]"
                        : "text-brand-lime border-brand-lime/30 hover:border-brand-lime hover:bg-brand-lime/10 hover:shadow-[0_0_12px_rgba(220,241,11,0.2)]"
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span>{t(item.labelKey)}</span>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vertical items (above button) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="vertical-group"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={springConfig}
              className="absolute bottom-full left-0 mb-2 sm:mb-3 flex flex-col items-stretch gap-1.5 sm:gap-2"
            >
              {VERTICAL_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.9 }}
                  transition={itemTransition(i)}
                >
                  <a
                    href={item.url}
                    target={item.url.startsWith("http") ? "_blank" : undefined}
                    rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={(e) => handleClick(e, item.url)}
                    aria-label={verticalLabel(item)}
                    className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-brand-bg/90 backdrop-blur-sm border border-brand-pale/10 rounded-lg text-brand-pale/80 hover:text-white hover:bg-brand-bg hover:border-brand-pale/30 transition-all duration-200 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider min-w-[110px] sm:min-w-[130px] cursor-pointer hover:scale-105 hover:shadow-[0_0_12px_rgba(219,234,236,0.08)]"
                    onMouseEnter={() => soundEngine.playHover()}
                  >
                    <span className="flex-shrink-0 w-4 flex items-center justify-center text-brand-pale/60">
                      {item.icon}
                    </span>
                    <span>{verticalLabel(item)}</span>
                    {item.url.startsWith("http") && (
                      <ExternalLink size={10} className="ml-auto opacity-40" />
                    )}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
