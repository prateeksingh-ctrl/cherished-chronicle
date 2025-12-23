import { motion } from 'framer-motion';
import Snowfall from 'react-snowfall';
import { ChevronDown, Heart } from 'lucide-react';

interface HeroSectionProps {
  onStartJourney: () => void;
}

const HeroSection = ({ onStartJourney }: HeroSectionProps) => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-crimson-vignette"
    >
      {/* Gold Snowfall */}
      <Snowfall
        color="#e1c44d"
        snowflakeCount={100}
        speed={[0.5, 2]}
        wind={[-0.5, 1]}
        radius={[1, 4]}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute left-10 top-20 h-32 w-32 rounded-full bg-magazine-gold/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-32 right-20 h-48 w-48 rounded-full bg-magazine-gold/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Heart className="mx-auto h-12 w-12 text-magazine-gold animate-pulse-glow" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-editorial text-7xl font-bold italic tracking-tight text-gold-gradient sm:text-8xl md:text-9xl"
        >
          Our 2025
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 font-handwritten text-3xl text-magazine-cream/90 sm:text-4xl"
        >
          A Year of Love & Memories
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 flex items-center justify-center gap-2 text-magazine-gold/70"
        >
          <span className="h-px w-12 bg-magazine-gold/50" />
          <span className="font-body text-sm uppercase tracking-[0.3em]">Recap Magazine</span>
          <span className="h-px w-12 bg-magazine-gold/50" />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          onClick={onStartJourney}
          className="group mt-12 inline-flex items-center gap-3 rounded-full border-2 border-magazine-gold/50 bg-magazine-gold/10 px-8 py-4 font-body text-lg text-magazine-cream backdrop-blur-sm transition-all duration-300 hover:border-magazine-gold hover:bg-magazine-gold/20 hover:shadow-lg hover:shadow-magazine-gold/20"
        >
          <span>Start the Journey</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </motion.button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
