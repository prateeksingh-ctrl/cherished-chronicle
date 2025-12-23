import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Lock, ChevronDown } from 'lucide-react';

// Components (We will build these next)
import HeroSection from '../components/HeroSection';
import MagazineDreams from '../components/MagazineDreams'; // Renamed for professional feel
import VogueGallery from '../components/VogueGallery';
import LoveLetterSection from '../components/LoveLetterSection';

// Placeholder for the new "Timeline" section replacing Music
const TimelineSection = () => (
  <div className="h-screen flex items-center justify-center bg-magazine-ink text-magazine-paper">
    <div className="text-center">
      <h2 className="font-serif text-6xl italic">The Timeline</h2>
      <p className="font-sans text-sm tracking-widest uppercase mt-4">Our History in Dates</p>
    </div>
  </div>
);

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef(null);

  // Background Audio Logic
  useEffect(() => {
    if (isUnlocked && audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio requires interaction"));
    }
  }, [isUnlocked]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      {/* 1. Global Texture Overlay */}
      <div className="grain-overlay" />

      {/* 2. Hidden Audio Element (Replace src with your MP3 URL) */}
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" />

      {/* 3. The Unveil "Curtain" (Locked State) */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-50 bg-magazine-ink text-magazine-paper flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
              className="text-center space-y-8"
            >
              <h1 className="font-serif text-5xl md:text-8xl tracking-tight">The Annual</h1>
              <div className="font-sans text-xs tracking-[0.4em] uppercase text-magazine-gold">
                Strictly Confidential
              </div>
              
              {/* Interaction to Unlock */}
              <button 
                onClick={() => setIsUnlocked(true)}
                className="group relative px-8 py-3 overflow-hidden rounded-full border border-magazine-paper/20 hover:border-magazine-gold transition-colors"
              >
                <div className="absolute inset-0 bg-magazine-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 font-sans text-xs uppercase tracking-widest group-hover:text-magazine-ink transition-colors flex items-center gap-2">
                  <Lock size={12} /> Enter the Archives
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. The Content (Visible after unlock) */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            {/* Minimal Audio Controller (Fixed Bottom Right) */}
            <div className="fixed bottom-8 right-8 z-40">
              <button 
                onClick={toggleAudio} 
                className="w-12 h-12 rounded-full bg-magazine-ink/10 backdrop-blur-md border border-magazine-ink/20 flex items-center justify-center hover:bg-magazine-gold hover:text-white transition-all duration-300"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>

            {/* SECTIONS */}
            <HeroSection />
            <VogueGallery />
            <LoveLetterSection />
            <TimelineSection /> {/* Replaces Music */}
            <MagazineDreams />

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;