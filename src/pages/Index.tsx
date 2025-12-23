import { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import GoldCursor from '../components/GoldCursor';
import NavigationDock from '../components/NavigationDock';
import HeroSection from '../components/HeroSection';
import VogueGallery from '../components/VogueGallery';
import LoveLetterSection from '../components/LoveLetterSection';
import DreamsSection from '../components/DreamsSection';
import SantaUnveiling from '../components/SantaUnveiling';
import ScratchCard from '../components/ScratchCard';

const Index = () => {
  const [activeSection, setActiveSection] = useState('cover');
  const [showCursor, setShowCursor] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // Progress bar logic for that "Long Read" feel
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches;
    setShowCursor(hasHover);
  }, []);

  useEffect(() => {
    if (!isUnlocked) return;

    // We renamed IDs to be more "Editorial" (cover, editorial, gallery, etc.)
    const sections = ['cover', 'editorial', 'gallery', 'vision', 'surprise'];
    const observers = sections.map((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
              setActiveSection(sectionId);
            }
          });
        },
        { threshold: [0.2] }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [isUnlocked]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUnlock = () => setIsUnlocked(true);

  return (
    <HelmetProvider>
      <Helmet>
        {/* Stronger Branding Title */}
        <title>THE GILDED YEAR | Vol. 25</title>
        <meta
          name="description"
          content="The Holiday Issue: A curated editorial of our memories, moments, and future."
        />
      </Helmet>

      {/* Global Grain Texture Overlay for "Paper" Feel */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <AnimatePresence>
        {!isUnlocked && <SantaUnveiling onUnlock={handleUnlock} />}
      </AnimatePresence>

      {isUnlocked && (
        <div className="bg-magazine-black min-h-screen text-magazine-paper selection:bg-magazine-gold selection:text-black">
            
          {/* Progress Bar (Reading Indicator) */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-magazine-gold origin-left z-50"
            style={{ scaleX }}
          />

          {showCursor && <GoldCursor />}

          {/* Navigation Dock (Kept, but conceptually it is now the 'Index') */}
          <NavigationDock activeSection={activeSection} onNavigate={scrollToSection} />

          {/* MASTHEAD: The Magazine Header */}
          <header className="fixed top-0 w-full z-40 mix-blend-difference px-6 py-4 flex justify-between items-center pointer-events-none">
            <span className="font-display font-bold text-xl tracking-widest text-white/80">
              GILDED
            </span>
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/60 hidden md:block">
              Dec 2025 • Issue No. 12 • The Holiday Edit
            </span>
          </header>

          <main className="relative flex flex-col items-center w-full">
            
            {/* ARTICLE 1: THE COVER STORY (Hero) */}
            <section id="cover" className="w-full relative">
                <HeroSection onStartJourney={() => scrollToSection('editorial')} />
                {/* Decorative Separator */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-magazine-gold/50 to-transparent my-12" />
            </section>

            {/* ARTICLE 2: LETTER FROM THE EDITOR (Love Letter) */}
            <section id="editorial" className="w-full max-w-4xl px-6 py-24 relative">
                <div className="absolute top-10 left-0 -ml-12 hidden lg:block opacity-20 transform -rotate-90 origin-right">
                    <span className="font-display text-4xl text-magazine-gold">Editorial</span>
                </div>
                <LoveLetterSection />
            </section>

             {/* ARTICLE 3: THE SPREAD (Gallery) */}
             <section id="gallery" className="w-full py-24 bg-magazine-charcoal/30 border-y border-white/5">
                <div className="container mx-auto px-6 mb-12 text-center">
                    <h2 className="font-display text-5xl md:text-7xl mb-4 italic">The Year in Focus</h2>
                    <p className="font-sans text-sm tracking-widest uppercase text-magazine-gold">Moments • Travel • Life</p>
                </div>
                <VogueGallery />
            </section>

            {/* ARTICLE 4: THE VISION (Dreams) */}
            <section id="vision" className="w-full max-w-5xl px-6 py-32">
                <DreamsSection />
            </section>

            {/* ARTICLE 5: THE GIFT (Surprise) */}
            <section id="surprise" className="w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-magazine-gold-gradient/10 py-24">
                <div className="text-center mb-12 z-10">
                    <h3 className="font-editorial text-2xl italic mb-2">The Finale</h3>
                    <div className="w-12 h-0.5 bg-magazine-gold mx-auto"></div>
                </div>
                <ScratchCard />
            </section>

            {/* COLOPHON (Footer) */}
            <footer className="w-full py-12 border-t border-white/10 text-center text-white/40">
                <p className="font-display text-2xl mb-4 text-magazine-gold/60">GILDED</p>
                <p className="font-sans text-xs tracking-widest uppercase">
                    Printed in Digital Ink • © 2025 Our Story
                </p>
            </footer>

          </main>
        </div>
      )}
    </HelmetProvider>
  );
};

export default Index;