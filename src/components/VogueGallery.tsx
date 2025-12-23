import { motion } from 'framer-motion';

const MEMORIES = [
  {
    id: 1,
    date: "OCT 14, 2024",
    title: "The Coffee Date",
    story: "We sat there for three hours, just talking about everything and nothing. The way the light hit your face made me realize—this is it.",
    image: "https://images.unsplash.com/photo-1522778526097-96a2ec60f848?q=80&w=2670&auto=format&fit=crop" 
  },
  {
    id: 2,
    date: "DEC 25, 2024",
    title: "First Christmas",
    story: "The lights were terrible, the tree was crooked, but it was perfect because we did it together. I still have the ornament you broke.",
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 3,
    date: "JAN 01, 2025",
    title: "New Beginnings",
    story: "Watching the fireworks reflect in your eyes, I didn't need to make a resolution. I just knew I wanted another year exactly like this one.",
    image: "https://images.unsplash.com/photo-1516147690740-14e38e6e768e?q=80&w=2670&auto=format&fit=crop"
  }
];

const VogueGallery = () => {
  return (
    <section className="py-24 bg-magazine-paper overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center mb-24">
         <h2 className="font-serif text-6xl md:text-8xl text-magazine-ink">The Edit</h2>
         <p className="font-sans text-xs tracking-[0.3em] uppercase text-magazine-gold mt-4">Curated Moments • 2025</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {MEMORIES.map((memory, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            key={memory.id} 
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
          >
            
            {/* Image Side */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/5] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] group">
                <div className="absolute inset-0 border border-white/20 z-10" />
                <img 
                  src={memory.image} 
                  alt={memory.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 text-center md:text-left p-6">
              <div className="font-sans text-xs text-magazine-gold tracking-widest uppercase mb-4">
                {memory.date} • No. {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="font-serif text-5xl md:text-6xl mb-8 italic leading-tight text-magazine-ink">
                {memory.title}
              </h3>
              <p className="font-sans text-sm md:text-base leading-loose text-gray-600 max-w-md mx-auto md:mx-0">
                {memory.story}
              </p>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VogueGallery;