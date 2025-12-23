import { Heart } from 'lucide-react';

const MagazineFooter = () => {
  return (
    <footer className="bg-magazine-ink text-magazine-paper py-24 px-6 border-t border-white/10 relative overflow-hidden">
      
      {/* Big Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.03] font-serif text-[20vw] pointer-events-none select-none">
        FOREVER
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* The End Mark */}
        <div className="w-px h-16 bg-magazine-gold mx-auto mb-12"></div>
        
        <h2 className="font-serif text-6xl md:text-8xl mb-8">Until Next Year</h2>
        
        <p className="font-sans text-sm md:text-base max-w-lg mx-auto leading-relaxed opacity-60 mb-16">
          This edition of our life is closed, but the story continues. 
          Written, edited, and lived by us.
        </p>

        {/* The "Colophon" */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12 text-xs font-sans tracking-[0.2em] uppercase">
          <div>
            <span className="block text-magazine-gold mb-2">Issue</span>
            No. 12 • Dec 2025
          </div>
          <div>
            <span className="block text-magazine-gold mb-2">Printed In</span>
            The Cloud
          </div>
          <div>
            <span className="block text-magazine-gold mb-2">With Love</span>
            <Heart size={12} className="inline-block" />
          </div>
        </div>

        {/* Barcode / Signature */}
        <div className="mt-24 opacity-30 font-serif italic text-2xl">
          Us.
        </div>
      </div>
    </footer>
  );
};

export default MagazineFooter;