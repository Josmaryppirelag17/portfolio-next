"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import HeroPlayground from "@/components/organisms/HeroPlayground";
import SectionFallback from "@/components/atoms/SectionFallback";
import { soundEngine } from "@/components/organisms/SoundEngine";
import SiteHeader from "@/components/molecules/SiteHeader";
import SiteFooter from "@/components/molecules/SiteFooter";
import MatrixRainOverlay from "@/components/molecules/MatrixRainOverlay";
import { useLanguage } from "../organisms/LanguageContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useAudio } from "@/hooks/useAudio";
import { useClock } from "@/hooks/useClock";
import { useMatrixEasterEgg } from "@/hooks/useMatrixEasterEgg";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { capturePageView } from "@/utils/analytics";

const AboutSection = lazy(() => import("../organisms/AboutSection"));
const ExperienceTimeline = lazy(() => import("../organisms/ExperienceTimeline"));
const ProjectsShowcase = lazy(() => import("../organisms/ProjectsShowcase"));
const InteractiveSkills = lazy(() => import("../organisms/InteractiveSkills"));
const ContactTerminal = lazy(() => import("../organisms/ContactTerminal"));
const AdminConsole = lazy(() => import("../organisms/AdminConsole"));

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const { language, setLanguage, t } = useLanguage();
  const { isAudioActive, toggleMasterAudio } = useAudio();
  const { timeStr } = useClock();
  const { isMatrixActive, closeMatrixOverlay, handleLogoTap } = useMatrixEasterEgg();
  const mobileMenu = useMobileMenu();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    capturePageView();
  }, [language]);
  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion-override", reducedMotion);
  }, [reducedMotion]);

  const handleNavClick = (anchorId: string) => {
    soundEngine.playClick();
    mobileMenu.closeMobileMenu();
    document.getElementById(anchorId)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    soundEngine.playSuccess();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-brand-bg text-[#DBEAEC] font-sans selection:bg-brand-pink selection:text-white">
      <a
        href="#main-content"
        className="fixed left-0 top-0 z-50 -translate-y-full bg-brand-pink px-4 py-2 text-black font-mono text-xs transition-transform focus:translate-y-0"
      >
        {t("skip_to_content")}
      </a>
      <div className="fixed top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-pink via-brand-cyan to-brand-lime z-50 shadow-[0_2px_10px_rgba(24,190,199,0.3)]" />
      <SiteHeader
        t={t}
        language={language}
        setLanguage={setLanguage}
        isAudioActive={isAudioActive}
        toggleMasterAudio={toggleMasterAudio}
        timeStr={timeStr}
        onLogoTap={handleLogoTap}
        onNavClick={handleNavClick}
        onAdminOpen={() => setIsAdminOpen(true)}
        isMobileMenuOpen={mobileMenu.isMobileMenuOpen}
        isMobileMenuExiting={mobileMenu.isMobileMenuExiting}
        menuRef={mobileMenu.menuRef}
        onMobileToggle={() => mobileMenu.setIsMobileMenuOpen(true)}
        onMobileClose={mobileMenu.closeMobileMenu}
        onDrawerEnd={mobileMenu.handleDrawerAnimationEnd}
      />
      <main
        id="main-content"
        className="relative"
        aria-label={t("main_content_label") || "Main content"}
      >
        <HeroPlayground isAudioActive={isAudioActive} toggleMasterAudio={toggleMasterAudio} />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ExperienceTimeline />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsShowcase />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <InteractiveSkills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactTerminal />
        </Suspense>
      </main>
      <SiteFooter t={t} onScrollToTop={scrollToTop} />
      <Suspense fallback={null}>
        <AdminConsole isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </Suspense>
      {isMatrixActive && <MatrixRainOverlay onClose={closeMatrixOverlay} />}
    </div>
  );
}
