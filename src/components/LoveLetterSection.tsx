import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Volume2, VolumeX, Feather } from 'lucide-react';

const LoveLetterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // ========================================
  // 🎵 ADD YOUR MUSIC URL HERE 🎵
  // ========================================
  // This plays subtly in the background
  // Example: "https://example.com/the-night-we-met.mp3"
  // ========================================
  const MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
      audioRef.current.loop = true;
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {});
        audioRef.current.muted = false;
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  // Customizable love letter content
  const letterContent = {
    salutation: "My Dearest Love,",
    paragraphs: [
      "Every moment with you feels like a page from a beautiful story that I never want to end. This year has been nothing short of magical — filled with laughter, adventures, and countless memories that I will treasure forever.",
      "You are my favorite hiiii and my hardest goodbye. In your eyes, I found a home, and in your heart, I found my peace. Thank you for being my partner in everything, for choosing me every single day.",
      "As we step into another year together, I promise to love you more deeply, to hold you closer, and to build a future that's as beautiful as the love we share.",
    ],
    closing: "Forever & Always Yours,",
    signature: "Your Love ♡"
  };

  return (
    <section
      id="music"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-magazine-dark py-32"
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />

      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23C5A059' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [-5, 5, -5],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Heart className="h-8 w-8 text-magazine-gold" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section header */}
        <motion.div
          style={{ opacity }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-magazine-gold/60">
            Chapter Two
          </p>
          <h2 className="font-display text-5xl font-medium text-magazine-cream md:text-6xl lg:text-7xl">
            A Letter For You
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mx-auto mt-8 h-px w-32 origin-center bg-gradient-to-r from-transparent via-magazine-gold to-transparent"
          />
        </motion.div>

        {/* Love Letter */}
        <motion.div
          style={{ y }}
          className="mx-auto max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Paper effect */}
            <div className="absolute -inset-1 rounded-sm bg-gradient-to-br from-magazine-gold/20 to-transparent blur-sm" />
            
            <div 
              className="relative rounded-sm bg-magazine-cream p-8 shadow-2xl md:p-12"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23d4c5b0' fill-opacity='0.3' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
              }}
            >
              {/* Decorative feather */}
              <div className="absolute -right-4 -top-4 rotate-45">
                <Feather className="h-12 w-12 text-magazine-gold/30" />
              </div>

              {/* Letter content */}
              <div className="relative space-y-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="font-handwritten text-2xl text-magazine-dark md:text-3xl"
                >
                  {letterContent.salutation}
                </motion.p>

                {letterContent.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.2 }}
                    className="font-editorial text-base leading-relaxed text-magazine-dark/80 md:text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                  className="pt-4"
                >
                  <p className="font-handwritten text-xl text-magazine-dark">
                    {letterContent.closing}
                  </p>
                  <p className="mt-2 font-handwritten text-3xl text-magazine-gold">
                    {letterContent.signature}
                  </p>
                </motion.div>
              </div>

              {/* Decorative seal */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 100 }}
                className="absolute -bottom-6 -right-6 flex h-16 w-16 items-center justify-center rounded-full bg-magazine-crimson shadow-lg"
              >
                <Heart className="h-8 w-8 text-magazine-cream" fill="currentColor" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Music toggle - subtle placement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="inline-flex items-center gap-3 rounded-full border border-magazine-gold/30 bg-magazine-gold/10 px-6 py-3 font-body text-sm text-magazine-cream/70 backdrop-blur-sm transition-all hover:border-magazine-gold/50 hover:bg-magazine-gold/20"
          >
            {isMuted ? (
              <>
                <VolumeX className="h-4 w-4" />
                <span>Play Background Music</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                <span>Music Playing</span>
              </>
            )}
          </motion.button>
          <p className="mt-3 font-handwritten text-lg text-magazine-cream/40">p

          </p>
        </motion.div>
      </div>

      {/* Decorative page marker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
        className="absolute bottom-8 right-8 font-display text-[12rem] font-bold leading-none text-magazine-gold"
      >
        02
      </motion.div>
    </section>
  );
};

export default LoveLetterSection;