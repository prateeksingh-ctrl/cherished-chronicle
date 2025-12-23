import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const SEASONS = [
  { id: 'winter', name: 'Winter', color: '#E8EFF5', textColor: '#1A1A1A', text: "Where it all began. The cold nights and warm coffee.", img: "https://images.unsplash.com/photo-1483304528321-0674f0040030?w=800&auto=format&fit=crop" },
  { id: 'spring', name: 'Spring', color: '#F7F3E8', textColor: '#2D3A3A', text: "New growth. Our first trip together.", img: "https://images.unsplash.com/photo-1490750967868-53cbaa379680?w=800&auto=format&fit=crop" },
  { id: 'summer', name: 'Summer', color: '#FFF8F0', textColor: '#C6A87C', text: "Golden hours and long drives.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop" },
  { id: 'autumn', name: 'Autumn', color: '#F5EBE0', textColor: '#8B4513', text: "Falling leaves and falling deeper.", img: "https://images.unsplash.com/photo-1509043759401-136742328bb3?w=800&auto=format&fit=crop" }
];

const SeasonSection = ({ season }: { season: typeof SEASONS[0] }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sticky Title (Left) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 flex items-center justify-center p-12 transition-colors duration-500" style={{ backgroundColor: season.color }}>
        <div className="text-center">
          <h2 className="font-serif text-6xl md:text-8xl mb-4" style={{ color: season.textColor }}>{season.name}</h2>
          <p className="font-sans text-xs tracking-[0.2em] uppercase opacity-60">2025</p>
        </div>
      </div>

      {/* Scrolling Content (Right) */}
      <div className="w-full md:w-1/2 min-h-screen bg-white p-12 md:p-24 flex items-center">
        <div>
           <div className="aspect-[4/5] overflow-hidden mb-8 shadow-2xl">
              <motion.img 
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src={season.img} 
                className="w-full h-full object-cover" 
              />
           </div>
           <p className="font-serif text-2xl md:text-3xl italic leading-relaxed text-magazine-ink">
             "{season.text}"
           </p>
        </div>
      </div>
    </div>
  );
};

const SeasonsTimeline = () => {
  return (
    <section className="relative">
      {SEASONS.map((season) => (
        <SeasonSection key={season.id} season={season} />
      ))}
    </section>
  );
};

export default SeasonsTimeline;