import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// 1. THE EDITORIAL DATA (Replace these with your real photos/stories)
const MEMORIES = [
  {
    id: 1,
    date: "OCT 14, 2024",
    title: "The Coffee Date",
    story: "We sat there for three hours, just talking about everything and nothing. The way the light hit your face made me realize—this is it. This is the moment I want to stay in forever.",
    image: "https://images.unsplash.com/photo-1522778526097-96a2ec60f848?q=80&w=2670&auto=format&fit=crop" // Replace with your URL
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
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-magazine-paper">
      
      {/* STICKY CONTAINER: Locks the view while we scroll sideways */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Title Overlay (Fades out as you scroll) */}
        <div className="absolute top-12 left-12 z-10 hidden md:block">
           <h2 className="font-serif text-xl tracking-widest uppercase">The Collection</h2>
           <p className="font-sans text-[10px] text-magazine-ink/60 mt-1">Issue No. 12 • 2025</p>
        </div>

        {/* HORIZONTAL SCROLL TRACK */}
        <motion.div style={{ x }} className="flex gap-24 px-12 md:px-32">
          
          {/* Intro Card */}
          <div className="relative h-[70vh] w-[90vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center">
             <h3 className="font-serif text-8xl md:text-9xl text-magazine-ink leading-[0.8]">
               MOMENTS <br/> <span className="italic text-magazine-gold">IN TIME</span>
             </h3>
             <div className="mt-8 flex items-center gap-4 text-sm font-sans uppercase tracking-widest opacity-60 animate-pulse">
                Scroll to explore <ChevronRight size={16} />
             </div>
          </div>

          {/* MEMORY CARDS (The "Pages") */}
          {MEMORIES.map((memory) => (
            <div key={memory.id} className="relative h-[70vh] w-[90vw] md:w-[60vw] flex-shrink-0 bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row">
              
              {/* LEFT PAGE: The Photo */}
              <div className="h-1/2 md:h-full md:w-3/5 overflow-hidden">
                <img 
                  src={memory.image} 
                  alt={memory.title} 
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>

              {/* RIGHT PAGE: The Editorial */}
              <div className="h-1/2 md:h-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between bg-[#FDFBF7] border-l border-black/5">
                
                {/* Header */}
                <div className="flex justify-between items-start border-b border-black/10 pb-6">
                   <span className="font-serif text-4xl md:text-5xl">{memory.id.toString().padStart(2, '0')}</span>
                   <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-magazine-gold">{memory.date}</span>
                </div>

                {/* Body */}
                <div className="py-8">
                   <h4 className="font-serif text-3xl mb-6 italic">{memory.title}</h4>
                   <p className="font-sans text-sm md:text-base leading-relaxed text-gray-600">
                     {memory.story}
                   </p>
                </div>

                {/* Footer */}
                <div className="text-right">
                   <span className="font-hand text-2xl text-magazine-ink/40">Sincerely, Us</span>
                </div>

              </div>
            </div>
          ))}

          {/* Outro Card */}
          <div className="relative h-[70vh] w-[90vw] md:w-[40vw] flex-shrink-0 flex items-center justify-center">
             <span className="font-serif text-6xl italic text-magazine-gold/20">Fin.</span>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default VogueGallery;