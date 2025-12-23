import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { memories } from '../data/mockData';

const VogueGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-magazine-cream"
    >
      {/* Magazine-style full-bleed cover spread */}
      <div className="relative">
        {/* Cover Image - Full bleed */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-screen w-full"
        >
          <motion.img
            style={{ y: y1 }}
            src={memories[0]?.imageUrl}
            alt={memories[0]?.caption}
            className="h-full w-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-magazine-dark via-magazine-dark/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-magazine-dark/60 to-transparent" />
          
          {/* Magazine masthead overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-16">
            {/* Top section - Magazine title */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex items-start justify-between"
            >
              <div>
                <p className="font-body text-xs uppercase tracking-[0.5em] text-magazine-gold">
                  Vol. I • 2025
                </p>
                <h1 className="mt-2 font-editorial text-6xl font-light text-magazine-cream md:text-8xl lg:text-9xl">
                  OUR
                </h1>
                <h1 className="font-script -mt-4 text-5xl text-magazine-gold md:text-7xl lg:text-8xl">
                  Story
                </h1>
              </div>
              <div className="text-right">
                <p className="font-body text-xs uppercase tracking-widest text-magazine-cream/60">
                  Special Edition
                </p>
                <p className="font-editorial text-2xl italic text-magazine-cream md:text-4xl">
                  2025
                </p>
              </div>
            </motion.div>

            {/* Bottom section - Feature headlines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-2xl"
            >
              <p className="font-body text-xs uppercase tracking-[0.3em] text-magazine-gold">
                Chapter One
              </p>
              <h2 className="mt-2 font-editorial text-4xl font-light text-magazine-cream md:text-6xl">
                Memory Lane
              </h2>
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-magazine-cream/70 md:text-base">
                A curated collection of our most cherished moments — 
                365 days of love, laughter, and adventures that defined our year.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <span className="h-px flex-1 max-w-[100px] bg-magazine-gold/50" />
                <span className="font-handwritten text-xl text-magazine-cream/60">
                  {memories[0]?.caption}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Magazine Interior Spread - Editorial Layout */}
      <div className="bg-magazine-cream px-4 py-24 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Section intro */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24 grid gap-8 lg:grid-cols-2 lg:gap-16"
          >
            <div className="flex flex-col justify-center">
              <span className="font-body text-xs uppercase tracking-[0.3em] text-magazine-mousse">
                The Collection
              </span>
              <h3 className="mt-4 font-editorial text-5xl font-light leading-tight text-magazine-dark md:text-6xl lg:text-7xl">
                Moments
                <br />
                <span className="font-script text-magazine-gold">Worth Keeping</span>
              </h3>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '80px' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-8 h-px bg-magazine-gold"
              />
            </div>
            <div className="flex items-center">
              <p className="font-editorial text-xl font-light italic leading-relaxed text-magazine-dark/70 md:text-2xl">
                "Every photograph tells a story, every moment captured is a piece of our heart 
                preserved forever. This is our visual diary — raw, beautiful, and eternally ours."
              </p>
            </div>
          </motion.div>

          {/* Magazine Grid Layout - Asymmetric */}
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            {/* Large Feature - spans 7 columns */}
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
                  className="h-[120%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-magazine-dark/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="mt-4">
                <p className="font-body text-xs uppercase tracking-widest text-magazine-mousse">
                  {memories[1]?.date}
                </p>
                <p className="mt-2 font-handwritten text-2xl text-magazine-dark">
                  {memories[1]?.caption}
                </p>
              </div>
            </motion.div>

            {/* Stacked column - 5 columns */}
            <div className="flex flex-col gap-6 md:col-span-5 md:gap-8">
              {/* Text block */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-center py-8"
              >
                <span className="font-body text-6xl font-bold text-magazine-gold/20 md:text-8xl">
                  01
                </span>
                <p className="mt-4 font-editorial text-2xl italic leading-relaxed text-magazine-dark md:text-3xl">
                  Every moment with you feels like a page from our favorite story.
                </p>
              </motion.div>

              {/* Smaller image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group relative"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={memories[2]?.imageUrl}
                    alt={memories[2]?.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="mt-3 font-handwritten text-lg text-magazine-dark/70">
                  {memories[2]?.caption}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Full width divider quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="my-24 border-y border-magazine-gold/30 py-16 text-center"
          >
            <p className="mx-auto max-w-3xl font-script text-4xl text-magazine-gold md:text-5xl lg:text-6xl">
              "The best thing to hold onto in life is each other"
            </p>
            <p className="mt-6 font-body text-xs uppercase tracking-widest text-magazine-mousse">
              — Audrey Hepburn
            </p>
          </motion.div>

          {/* Three column grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            {memories.slice(3, 6).map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={memory.imageUrl}
                    alt={memory.caption}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex items-end bg-gradient-to-t from-magazine-dark/90 to-transparent p-6"
                  >
                    <p className="font-handwritten text-xl text-magazine-cream">
                      {memory.caption}
                    </p>
                  </motion.div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-body text-xs uppercase tracking-widest text-magazine-mousse">
                    {memory.date}
                  </p>
                  <span className="font-editorial text-2xl font-light text-magazine-gold/30">
                    0{index + 4}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom horizontal strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 overflow-x-auto"
          >
            <div className="flex gap-4 pb-4">
              {memories.slice(6).map((memory, index) => (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative flex-shrink-0"
                >
                  <div className="relative h-64 w-48 overflow-hidden md:h-80 md:w-64">
                    <img
                      src={memory.imageUrl}
                      alt={memory.caption}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-magazine-dark/0 transition-colors group-hover:bg-magazine-dark/30" />
                  </div>
                  <p className="mt-2 max-w-[200px] font-handwritten text-sm text-magazine-dark/60">
                    {memory.caption}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Page number */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none fixed bottom-24 left-8 font-editorial text-8xl font-bold text-magazine-gold/5 md:text-9xl"
      >
        01
      </motion.div>
    </section>
  );
};

export default VogueGallery;
