import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { memories } from '../data/mockData';

const VogueGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="relative overflow-hidden bg-magazine-cream"
    >
      {/* Magazine Cover - Full Bleed Hero */}
      <div className="relative h-screen w-full">
        <motion.div
          style={{ scale }}
          className="absolute inset-0"
        >
          <img
            src={memories[0]?.imageUrl}
            alt={memories[0]?.caption}
            className="h-full w-full object-cover"
          />
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-magazine-dark via-magazine-dark/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-magazine-dark/50 to-transparent" />
        </motion.div>

        {/* Magazine masthead */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 lg:p-16">
          {/* Top - Masthead */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-start justify-between"
          >
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.5em] text-magazine-gold md:text-xs">
                Volume I • 2025 Edition
              </p>
              <h1 className="mt-3 font-display text-5xl font-medium tracking-tight text-magazine-cream md:text-7xl lg:text-8xl">
                OUR
              </h1>
              <p className="font-handwritten -mt-2 text-4xl text-magazine-gold md:text-5xl lg:text-6xl">
                Story
              </p>
            </div>
            <div className="text-right">
              <p className="font-body text-[10px] uppercase tracking-widest text-magazine-cream/50 md:text-xs">
                Special
              </p>
              <p className="font-display text-3xl font-medium italic text-magazine-cream md:text-4xl">
                2025
              </p>
            </div>
          </motion.div>

          {/* Bottom - Feature headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-xl"
          >
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-magazine-gold md:text-xs">
              Chapter One
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium text-magazine-cream md:text-5xl lg:text-6xl">
              Memory Lane
            </h2>
            <p className="mt-4 max-w-md font-editorial text-sm leading-relaxed text-magazine-cream/60 md:text-base">
              A curated collection of our most cherished moments — 
              365 days of love, laughter, and adventures.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-6 h-px w-24 origin-left bg-magazine-gold/50"
            />
          </motion.div>
        </div>
      </div>

      {/* Editorial Interior Spread */}
      <div className="bg-magazine-cream px-4 py-24 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Section intro - Magazine style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24 grid gap-8 lg:grid-cols-2 lg:gap-16"
          >
            <div>
              <span className="font-body text-[10px] uppercase tracking-[0.4em] text-magazine-mousse">
                The Collection
              </span>
              <h3 className="mt-4 font-display text-4xl font-medium leading-tight text-magazine-dark md:text-5xl lg:text-6xl">
                Moments
                <br />
                <span className="font-handwritten text-magazine-gold">Worth Keeping</span>
              </h3>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mt-8 h-px w-20 origin-left bg-magazine-gold"
              />
            </div>
            <div className="flex items-end">
              <p className="font-editorial text-lg italic leading-relaxed text-magazine-dark/60 md:text-xl">
                "Every photograph tells a story, every moment captured is a piece of our heart 
                preserved forever. This is our visual diary — raw, beautiful, and eternally ours."
              </p>
            </div>
          </motion.div>

          {/* Magazine Grid - Asymmetric Editorial */}
          <div className="grid gap-4 md:grid-cols-12 md:gap-6">
            {/* Large Feature - 7 columns */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative md:col-span-7"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <motion.img
                  style={{ y: y2 }}
                  src={memories[1]?.imageUrl}
                  alt={memories[1]?.caption}
                  className="h-[120%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-magazine-dark/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Hover caption */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 p-6"
                >
                  <p className="font-handwritten text-2xl text-magazine-cream">
                    {memories[1]?.caption}
                  </p>
                </motion.div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-body text-[10px] uppercase tracking-widest text-magazine-mousse">
                  {memories[1]?.date}
                </p>
                <span className="font-display text-3xl font-light text-magazine-gold/20">01</span>
              </div>
            </motion.div>

            {/* Stacked column - 5 columns */}
            <div className="flex flex-col gap-4 md:col-span-5 md:gap-6">
              {/* Pull quote */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative py-6 md:py-10"
              >
                <span className="font-display text-6xl font-bold text-magazine-gold/10 md:text-8xl">
                  "
                </span>
                <p className="mt-2 font-editorial text-xl italic leading-relaxed text-magazine-dark md:text-2xl">
                  Every moment with you feels like a page from our favorite story.
                </p>
              </motion.div>

              {/* Smaller image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group relative flex-1"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={memories[2]?.imageUrl}
                    alt={memories[2]?.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 font-handwritten text-lg text-magazine-dark/60">
                  {memories[2]?.caption}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Elegant divider quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="my-24 border-y border-magazine-gold/20 py-12 text-center md:py-16"
          >
            <p className="mx-auto max-w-2xl font-handwritten text-3xl text-magazine-gold md:text-4xl lg:text-5xl">
              "The best thing to hold onto in life is each other"
            </p>
            <p className="mt-4 font-body text-[10px] uppercase tracking-[0.3em] text-magazine-mousse">
              — Audrey Hepburn
            </p>
          </motion.div>

          {/* Three column grid */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {memories.slice(3, 6).map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={memory.imageUrl}
                    alt={memory.caption}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-magazine-dark/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-6">
                    <p className="font-handwritten text-lg text-magazine-cream md:text-xl">
                      {memory.caption}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-body text-[10px] uppercase tracking-widest text-magazine-mousse">
                    {memory.date}
                  </p>
                  <span className="font-display text-2xl font-light text-magazine-gold/15">
                    0{index + 3}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Horizontal scroll strip */}
          {memories.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-24 overflow-x-auto scrollbar-hide"
            >
              <div className="flex gap-4 pb-4">
                {memories.slice(6).map((memory, index) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ y: -8 }}
                    className="group relative flex-shrink-0"
                  >
                    <div className="relative h-56 w-40 overflow-hidden md:h-72 md:w-52">
                      <img
                        src={memory.imageUrl}
                        alt={memory.caption}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-magazine-dark/0 transition-colors group-hover:bg-magazine-dark/20" />
                    </div>
                    <p className="mt-2 max-w-[160px] font-handwritten text-sm text-magazine-dark/50 md:max-w-[200px]">
                      {memory.caption}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Page number watermark */}
      <motion.div
        style={{ y: y1 }}
        className="pointer-events-none fixed bottom-20 left-6 font-display text-[10rem] font-bold leading-none text-magazine-gold/[0.02] md:text-[15rem]"
      >
        01
      </motion.div>
    </section>
  );
};

export default VogueGallery;