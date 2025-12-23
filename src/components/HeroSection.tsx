import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Snowfall from 'react-snowfall';
import { ChevronDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onStartJourney: () => void;
}

const HeroSection = ({ onStartJourney }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-crimson-vignette"
    >
      {/* Gold Snowfall */}
      <Snowfall
        color="#e1c44d"
        snowflakeCount={150}
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

      {/* Animated background orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-magazine-gold/10 blur-3xl"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content with parallax */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="mx-auto h-16 w-16 text-magazine-gold" />
          </motion.div>
        </motion.div>

        {/* Title with staggered reveal */}
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-2 font-body text-sm uppercase tracking-[0.4em] text-magazine-gold/80"
          >
            A Love Story
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 50 }}
            className="font-editorial text-8xl font-light tracking-tight text-magazine-cream sm:text-9xl md:text-[12rem]"
          >
            Our
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.6, type: 'spring', stiffness: 50 }}
            className="font-script -mt-8 text-7xl text-gold-gradient sm:text-8xl md:text-9xl"
          >
            2025
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mx-auto mt-8 flex items-center justify-center gap-4"
        >
          <span className="h-px w-16 bg-magazine-gold/50" />
          <span className="font-body text-xs uppercase tracking-[0.3em] text-magazine-cream/70">
            Recap Magazine
          </span>
          <span className="h-px w-16 bg-magazine-gold/50" />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          onClick={onStartJourney}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group mt-16 inline-flex items-center gap-3 rounded-full border-2 border-magazine-gold/50 bg-magazine-gold/10 px-10 py-5 font-body text-sm uppercase tracking-widest text-magazine-cream backdrop-blur-sm transition-all duration-300 hover:border-magazine-gold hover:bg-magazine-gold/20"
        >
          <span>Begin Our Journey</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Decorative corner elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute left-8 top-8 font-script text-6xl text-magazine-gold/20"
      >
        ❧
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 rotate-180 font-script text-6xl text-magazine-gold/20"
      >
        ❧
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
