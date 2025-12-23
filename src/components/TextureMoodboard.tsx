import { motion } from 'framer-motion';

const TEXTURES = [
  "https://images.unsplash.com/photo-1490750967868-53cbaa379680?w=800&q=80", // Flower
  "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&q=80", // Coffee
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", // Beach
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80", // Rooftop
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", // Portrait
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", // Sky
];

const TextureMoodboard = () => {
  return (
    <section className="py-24 bg-magazine-paper overflow-hidden">
      <div className="flex items-center justify-center mb-12">
        <span className="font-sans text-xs tracking-widest uppercase text-magazine-gold border-b border-magazine-gold pb-1">
          The Aesthetic • 2025
        </span>
      </div>
      
      {/* Masonry-ish Grid */}
      <div className="columns-2 md:columns-3 gap-4 px-4 md:px-12 max-w-7xl mx-auto space-y-4">
        {TEXTURES.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="break-inside-avoid relative group overflow-hidden"
          >
            <img 
              src={src} 
              alt="Mood" 
              className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out" 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TextureMoodboard;