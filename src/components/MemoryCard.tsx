import { motion } from 'framer-motion';
import type { Memory } from '../data/mockData';

interface MemoryCardProps {
  memory: Memory;
  index: number;
}

const MemoryCard = ({ memory, index }: MemoryCardProps) => {
  const rotationClass = memory.rotation > 0 
    ? `rotate-[${memory.rotation}deg]` 
    : `-rotate-[${Math.abs(memory.rotation)}deg]`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
      className="photo-frame group cursor-pointer"
      style={{ rotate: memory.rotation }}
    >
      <div className="relative overflow-hidden">
        <img
          src={memory.imageUrl}
          alt={memory.caption}
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-end bg-gradient-to-t from-magazine-dark/80 via-transparent to-transparent p-4"
        >
          <p className="font-handwritten text-xl text-magazine-cream">{memory.caption}</p>
        </motion.div>
      </div>

      {/* Caption and date */}
      <div className="mt-3 space-y-1 text-center">
        <p className="font-handwritten text-xl text-magazine-dark">{memory.caption}</p>
        <p className="font-body text-sm text-muted-foreground">{memory.date}</p>
      </div>

      {/* Decorative tape */}
      <div className="absolute -right-2 -top-3 h-8 w-16 rotate-12 bg-magazine-gold/30 shadow-sm" />
    </motion.div>
  );
};

export default MemoryCard;
