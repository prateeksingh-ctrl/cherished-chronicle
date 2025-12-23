import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const CARDS = [
  { id: 1, label: "Open when you miss me", content: "Remember that I am just a phone call away. Look at the photo from our beach trip." },
  { id: 2, label: "Open when you're sad", content: "You are the strongest person I know. This feeling is temporary, but my love isn't." },
  { id: 3, label: "Open when you're happy", content: "I hope I am there to share it with you. Save this moment." },
  { id: 4, label: "Open when you need a laugh", content: "Remember the time we tried to cook pasta and set off the alarm?" }
];

const OpenWhen = () => {
  return (
    <section className="py-32 px-6 bg-magazine-ink text-magazine-paper">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-7xl mb-4">Open When...</h2>
          <p className="font-sans text-xs tracking-[0.2em] uppercase opacity-60">Break Glass in Case of Emergency</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CARDS.map((card) => (
            <div key={card.id} className="group h-[300px] perspective-1000 cursor-pointer">
              <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">
                
                {/* FRONT (Envelope) */}
                <div className="absolute inset-0 backface-hidden bg-magazine-paper text-magazine-ink flex flex-col items-center justify-center p-8 border border-white/5 shadow-xl">
                  <div className="w-full h-full border border-magazine-ink/10 flex flex-col items-center justify-center p-4">
                    <Mail strokeWidth={1} size={32} className="text-magazine-gold mb-4" />
                    <h3 className="font-serif text-2xl text-center italic leading-tight">{card.label}</h3>
                  </div>
                </div>

                {/* BACK (Message) */}
                <div className="absolute inset-0 backface-hidden bg-magazine-gold text-white rotate-y-180 flex items-center justify-center p-8 text-center shadow-xl">
                  <p className="font-serif text-xl italic leading-relaxed">
                    "{card.content}"
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenWhen;