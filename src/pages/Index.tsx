import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Lock } from 'lucide-react';

// Components
import HeroSection from '../components/HeroSection';
import MagazineDreams from '../components/MagazineDreams';
import VogueGallery from '../components/VogueGallery';
import LoveLetterSection from '../components/LoveLetterSection';

// NEW IMPORTS
import MagicalSnow from '../components/MagicalSnow';
import GoldCursor from '../components/GoldCursor';

const TimelineSection = () => (
  <div className="h-screen flex items-center justify-center bg-magazine-ink text-magazine-paper relative overflow-hidden">
    {/* Dynamic Background Element */}
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-magazine-gold via-transparent to-transparent animate-pulse" />
    <div className="text-center z-10">
      <h2 className="font-serif text-6xl italic animate-float">The Timeline</h2>
      <p className="font-sans text-sm tracking-widest uppercase mt-4 text-magazine-gold">Our History in Dates</p>
    </div>
  </div>
);

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Background Audio Logic
  useEffect(() => {
    if (isUnlocked && audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
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
    <div className="relative w-full min-h-screen cursor-none"> 
      {/* cursor-none hides default mouse so GoldCursor shows up */}

      {/* 1. DYNAMIC LAYERS */}
      <div className="grain-overlay" /> {/* Texture */}
      <MagicalSnow /> {/* The Christmas Atmosphere */}
      <GoldCursor /> {/* The Interactive Magic */}

      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" />

      {/* 2. LOCKED CURTAIN */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-50 bg-magazine-ink text-magazine-paper flex flex-col items-center justify-center"
          >
             {/* Breathing Glow Effect behind text */}
            <motion.div 
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-[300px] h-[300px] bg-magazine-gold/20 rounded-full blur-[100px]"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
              className="text-center space-y-8 z-10"
            >
              <h1 className="font-serif text-5xl md:text-8xl tracking-tight">The Annual</h1>
              <div className="font-sans text-xs tracking-[0.4em] uppercase text-magazine-gold">
                Strictly Confidential
              </div>
              
              <button 
                onClick={() => setIsUnlocked(true)}
                className="interactive group relative px-8 py-3 overflow-hidden rounded-full border border-magazine-paper/20 hover:border-magazine-gold transition-colors"
              >
                <div className="absolute inset-0 bg-magazine-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 font-sans text-xs uppercase tracking-widest group-hover:text-magazine-ink transition-colors flex items-center gap-2">
                  <Lock size={12} /> Unlock Experience
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN CONTENT */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            {/* Audio Toggle */}
            <div className="fixed bottom-8 right-8 z-40">
              <button 
                onClick={toggleAudio} 
                className="interactive w-12 h-12 rounded-full bg-magazine-ink/10 backdrop-blur-md border border-magazine-ink/20 flex items-center justify-center hover:bg-magazine-gold hover:text-white transition-all duration-300 animate-pulse-soft"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>

            <HeroSection />
            <VogueGallery />
            <LoveLetterSection />
            <TimelineSection />
            <MagazineDreams />

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;