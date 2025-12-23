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
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="relative min-h-[200vh] overflow-hidden bg-magazine-cream py-32"
    >
      {/* Vogue-style header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="container mx-auto mb-24 px-4 text-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-magazine-mousse"
        >
          Chapter One
        </motion.p>
        <h2 className="font-editorial text-7xl font-light tracking-tight text-magazine-dark md:text-8xl lg:text-9xl">
          Memory
        </h2>
        <h2 className="font-script -mt-4 text-6xl text-magazine-gold md:text-7xl lg:text-8xl">
          Lane
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '120px' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-8 h-px bg-magazine-gold"
        />
      </motion.div>

      {/* Magazine-style grid layout */}
      <div className="container mx-auto px-4">
        {/* Featured spread - full width */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 overflow-hidden"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {/* Large featured image */}
            <motion.div
              style={{ y: y1 }}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <motion.img
                src={memories[0]?.imageUrl}
                alt={memories[0]?.caption}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-magazine-dark/60 via-transparent to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-8 left-8 right-8"
              >
                <p className="font-script text-4xl text-magazine-cream">
                  {memories[0]?.caption}
                </p>
                <p className="mt-2 font-body text-sm uppercase tracking-widest text-magazine-gold">
                  {memories[0]?.date}
                </p>
              </motion.div>
            </motion.div>

            {/* Text + smaller image */}
            <div className="flex flex-col justify-center space-y-8 py-12">
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-editorial text-4xl font-light italic leading-tight text-magazine-dark md:text-5xl"
              >
                "Every moment with you feels like a page from our favorite story"
              </motion.p>
              
              <motion.div
                style={{ y: y2 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative aspect-video overflow-hidden"
              >
                <motion.img
                  src={memories[1]?.imageUrl}
                  alt={memories[1]?.caption}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1 - tall image */}
          <motion.div
            style={{ y: y3 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[2/3] overflow-hidden"
          >
            <motion.img
              src={memories[2]?.imageUrl}
              alt={memories[2]?.caption}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-magazine-dark/80 to-transparent p-6">
              <p className="font-handwritten text-2xl text-magazine-cream">
                {memories[2]?.caption}
              </p>
            </div>
          </motion.div>

          {/* Column 2 - two stacked */}
          <div className="space-y-8">
            {memories.slice(3, 5).map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-square overflow-hidden"
              >
                <motion.img
                  src={memory.imageUrl}
                  alt={memory.caption}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-end bg-gradient-to-t from-magazine-dark/90 via-magazine-dark/20 to-transparent p-6"
                >
                  <div>
                    <p className="font-handwritten text-xl text-magazine-cream">
                      {memory.caption}
                    </p>
                    <p className="mt-1 font-body text-xs uppercase tracking-widest text-magazine-gold">
                      {memory.date}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Column 3 - quote + image */}
          <div className="flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="py-8"
            >
              <p className="font-body text-xs uppercase tracking-[0.2em] text-magazine-mousse">
                Our Year Together
              </p>
              <p className="mt-4 font-editorial text-3xl font-light italic leading-relaxed text-magazine-dark">
                365 days of love, laughter, and making memories that will last forever.
              </p>
            </motion.div>

            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <motion.img
                src={memories[5]?.imageUrl}
                alt={memories[5]?.caption}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-magazine-cream/90 p-4 backdrop-blur-sm">
                <p className="font-handwritten text-lg text-magazine-dark">
                  {memories[5]?.caption}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom row - horizontal scroll feel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid gap-4 md:grid-cols-4"
        >
          {memories.slice(6).map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={memory.imageUrl}
                alt={memory.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-magazine-dark/0 transition-colors group-hover:bg-magazine-dark/40" />
              <motion.p
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute bottom-4 left-4 right-4 font-handwritten text-lg text-magazine-cream opacity-0 transition-opacity group-hover:opacity-100"
              >
                {memory.caption}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative page number */}
      <motion.div
        style={{ opacity }}
        className="fixed bottom-8 left-8 font-editorial text-9xl font-bold text-magazine-gold/10"
      >
        01
      </motion.div>
    </section>
  );
};

export default VogueGallery;
