import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Camera } from 'lucide-react';
import MemoryCard from './MemoryCard';
import { memories } from '../data/mockData';

const MemoriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="relative min-h-screen bg-paper py-24"
    >
      {/* Section Header */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <Camera className="mx-auto mb-4 h-10 w-10 text-magazine-gold" />
          <h2 className="font-editorial text-5xl font-bold text-magazine-dark md:text-6xl">
            Memory Lane
          </h2>
          <p className="mt-4 font-handwritten text-2xl text-muted-foreground">
            Our favorite moments from this year
          </p>
        </motion.div>

        {/* Timeline Line */}
        <div className="absolute left-1/2 top-48 bottom-24 w-0.5 -translate-x-1/2 bg-muted">
          <motion.div
            className="absolute left-0 top-0 w-full bg-gold-gradient"
            style={{ height: timelineHeight }}
          />
        </div>

        {/* Masonry Grid */}
        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {memories.map((memory, index) => (
            <MemoryCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="pointer-events-none absolute right-10 top-32 font-handwritten text-8xl text-magazine-gold/10"
          style={{ rotate: 15 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ♡
        </motion.div>
      </div>
    </section>
  );
};

export default MemoriesSection;
