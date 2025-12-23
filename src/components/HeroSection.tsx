import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Snowfall from 'react-snowfall';
import { ChevronDown, Star } from 'lucide-react';

interface HeroSectionProps {
  onStartJourney: () => void;
}

const HeroSection = ({ onStartJourney }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-crimson-vignette"
    >
      {/* Gold Snowfall */}
      <Snowfall
        color="#d4a853"
        snowflakeCount={120}
        speed={[0.3, 1.5]}
        wind={[-0.3, 0.8]}
        radius={[0.5, 3]}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      {/* Ambient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
              left: `${5 + i * 25}%`,
              top: `${15 + i * 20}%`,
              background: `radial-gradient(circle, hsl(38 52% 55% / ${0.08 - i * 0.015}), transparent 70%)`,
            }}
            animate={{
              x: [0, 20, -20, 0],
              y: [0, -25, 25, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 px-4 text-center"
      >
        {/* Decorative stars */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex items-center justify-center gap-4"
        >
          <Star className="h-4 w-4 text-magazine-gold/60" fill="currentColor" />
          <Star className="h-5 w-5 text-magazine-gold" fill="currentColor" />
          <Star className="h-4 w-4 text-magazine-gold/60" fill="currentColor" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-magazine-gold/70"
        >
          A Love Story
        </motion.p>

        {/* Main title */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-7xl font-medium tracking-tight text-magazine-cream sm:text-8xl md:text-9xl"
          >
            Our
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-shimmer -mt-4 font-display text-6xl font-medium italic sm:text-7xl md:text-8xl"
          >
            2025
          </motion.h1>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto mt-8 flex items-center justify-center gap-4"
        >
          <span className="h-px w-12 bg-magazine-gold/40 md:w-16" />
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-magazine-cream/50">
            Recap Magazine
          </span>
          <span className="h-px w-12 bg-magazine-gold/40 md:w-16" />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          onClick={onStartJourney}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group mt-16 inline-flex items-center gap-3 rounded-full border border-magazine-gold/40 bg-magazine-gold/5 px-8 py-4 font-body text-xs uppercase tracking-[0.15em] text-magazine-cream backdrop-blur-sm transition-all duration-500 hover:border-magazine-gold/70 hover:bg-magazine-gold/15"
        >
          <span>Begin Our Journey</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Corner ornaments */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute left-6 top-6 font-handwritten text-5xl text-magazine-gold/15 md:left-10 md:top-10 md:text-6xl"
      >
        ❧
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-6 right-6 rotate-180 font-handwritten text-5xl text-magazine-gold/15 md:bottom-10 md:right-10 md:text-6xl"
      >
        ❧
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;