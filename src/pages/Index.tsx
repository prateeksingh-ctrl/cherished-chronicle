import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Lock } from 'lucide-react';

// --- VISUALS & EFFECTS ---
import MagicalSnow from '../components/MagicalSnow';
import GoldCursor from '../components/GoldCursor';

// --- NEW SECTIONS ---
import HeroSection from '../components/HeroSection';
import VogueGallery from '../components/VogueGallery'; // The NEW Vertical Scroll Gallery
import TextureMoodboard from '../components/TextureMoodboard'; // The Brainstormed Moodboard
import LoveLetter from '../components/LoveLetter'; // The Letter
import OpenWhen from '../components/OpenWhen'; // The Flip Cards
import MagazineDreams from '../components/MagazineDreams';
import MagazineFooter from '../components/MagazineFooter';

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isUnlocked && audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.log("Audio requires interaction", e));
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
    <div className="relative w-full min-h-screen cursor-none bg-magazine-paper text-magazine-ink overflow-x-hidden">
      <Helmet>
        <title>THE ANNUAL | 2025 Edition</title>
        <meta name="theme-color" content="#1a1a1a" />
      </Helmet>

      {/* --- AMBIENCE --- */}
      <div className="grain-overlay" />
      <MagicalSnow />
      <GoldCursor />
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" />

      {/* --- LOCK SCREEN --- */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] bg-magazine-ink text-magazine-paper flex flex-col items-center justify-center"
          >
            <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-[300px] h-[300px] bg-magazine-gold/20 rounded-full blur-[100px]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
              className="text-center space-y-8 z-10 relative"
            >
              <h1 className="font-serif text-6xl md:text-9xl tracking-tight text-white mix-blend-difference">
                The Annual
              </h1>
              <div className="font-sans text-xs tracking-[0.4em] uppercase text-magazine-gold">
                Strictly Confidential • Vol. 2025
              </div>
              <button 
                onClick={() => setIsUnlocked(true)}
                className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/20 hover:border-magazine-gold transition-colors duration-500 mx-auto block mt-12"
              >
                <div className="absolute inset-0 bg-magazine-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 font-sans text-xs uppercase tracking-widest text-white group-hover:text-black transition-colors flex items-center gap-3">
                  <Lock size={14} /> Open The Experience
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-full"
          >
            {/* Audio Toggle */}
            <div className="fixed bottom-8 right-8 z-50">
              <button 
                onClick={toggleAudio} 
                className="w-12 h-12 rounded-full bg-magazine-ink/90 backdrop-blur-md border border-magazine-gold/30 flex items-center justify-center hover:bg-magazine-gold hover:text-white transition-all duration-300 animate-pulse-soft text-magazine-gold shadow-2xl"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>

            {/* 1. Cover */}
            <HeroSection />

            {/* 2. Letter from Editor (Heartfelt) */}
            <LoveLetter />

            {/* 3. The Gallery (Vertical Scroll Fixed) */}
            <VogueGallery />

            {/* 4. The Moodboard (Texture filler) */}
            <TextureMoodboard />

            {/* 5. Open When Cards (Interactive) */}
            <OpenWhen />
            
            {/* 7. Dreams (Checklist) */}
            <MagazineDreams />

            {/* 8. Footer */}
            <MagazineFooter />

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;