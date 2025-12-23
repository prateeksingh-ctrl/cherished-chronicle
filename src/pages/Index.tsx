import { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import GoldCursor from '../components/GoldCursor';
import NavigationDock from '../components/NavigationDock';
import HeroSection from '../components/HeroSection';
import MemoriesSection from '../components/MemoriesSection';
import VinylPlayer from '../components/VinylPlayer';
import GoalsSection from '../components/GoalsSection';
import ScratchCard from '../components/ScratchCard';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Check if device has hover capability (not touch-only)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    setShowCursor(hasHover);

    // Intersection Observer for active section
    const sections = ['hero', 'memories', 'music', 'goals', 'surprise'];
    const observers = sections.map((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setActiveSection(sectionId);
            }
          });
        },
        { threshold: [0.3] }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartJourney = () => {
    scrollToSection('memories');
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Our 2025 - A Year of Love</title>
        <meta
          name="description"
          content="A romantic recap magazine celebrating our year together - memories, music, and dreams for the future."
        />
      </Helmet>

      {/* Gold Cursor Effect (desktop only) */}
      {showCursor && <GoldCursor />}

      {/* Navigation Dock */}
      <NavigationDock activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Content */}
      <main className="relative">
        <HeroSection onStartJourney={handleStartJourney} />
        <MemoriesSection />
        <VinylPlayer />
        <GoalsSection />
        <ScratchCard />
      </main>
    </HelmetProvider>
  );
};

export default Index;
