import { motion } from 'framer-motion';

const MEMORIES = [
  {
    id: 1,
    date: "JAN O1, 2025",
    title: "The BLANKET HOME ",
    story: "We sat there, just talking about everything and nothing. The way the light hit your face made me realize—this is it.",
    image: "https://res.cloudinary.com/duv8bi3tc/image/upload/v1766516730/2625D629-42B8-4BF5-AB86-69723BDF7E06_hjmg85.jpg" 
  },
  {
    id: 2,
    date: "APR 20, 2025",
    title: "ENDLESS TALKS",
    story: "We used to talk for hours and hours and this one's a proof to that .",
    image: "https://res.cloudinary.com/duv8bi3tc/image/upload/v1766516832/70B6F803-4D87-4142-9E19-B22F5B54912F_nbh9kn.png"
  },
  {
    id: 3,
    date: "APR 24, 2025",
    title: "EYES THAT MAKE ME FALL IN LOVE",
    story: "Watching you sleep was the most comforting thing.",
    image: "https://res.cloudinary.com/duv8bi3tc/image/upload/v1766516856/8C3A96E0-C343-4A6C-9179-1B81C84F3B6E_1_201_a_khksn4.jpg"
  } ,
  {
    id: 4,
    date: "MAY 3, 2025",
    title: "OUR 11:11",
    story: "WISHING AT 11:11 AND 1:11 WAS CONSTANT.",
    image: "https://res.cloudinary.com/duv8bi3tc/image/upload/v1766516908/7A69873A-070B-4885-AF58-F3714DCEF644_1_102_o_gzk0mm.jpg"
  },
  {
    id: 5,
    date: "MAY 17, 2025",
    title: "MY HIGHNESS",
    story: "SUNDAR LADKI.",
    image: "https://res.cloudinary.com/duv8bi3tc/image/upload/v1766516974/94C70150-30A2-4335-AA9A-049583ED44FE_1_102_o_elzgkl.jpg"
  },
  {
    id: 6,
    date: "MAY 30, 2025",
    title: "I'LL SLEEP",
    story: "TUM baat kro main so jati hu.",
    image: "https://res.cloudinary.com/duv8bi3tc/image/upload/v1766517316/6025B922-75DB-4E09-9C0A-EFB409406608_1_102_o_o9jqxo.jpg"
  },
  {
    id: 7,
    date: "JULY 25, 2025",
    title: "THE MOST PRETTIEST SMILE ",
    story: "sometimes i feel seeing you smile is the best medicine.",
    image: "https://res.cloudinary.com/duv8bi3tc/image/upload/v1766517316/6025B922-75DB-4E09-9C0A-EFB409406608_1_102_o_o9jqxo.jpg"
  },
  {
    id: 8,
    date: "JULY 26, 2025",
    title: "OUR FIRST MOVIE ",
    story: "GUESS KRO WHICH ONE",
    image: "https://res.cloudinary.com/duv8bi3tc/image/upload/v1766517424/56B0803F-C7C0-4E9C-A6D9-AEEBC71D4288_1_102_o_rcf0j4.jpg"
  },
  {
    id: 9,
    date: "AUGUST 16, 2025",
    title: "FIRST MEET  ",
    story:  "when we first met at c lal after years of wait  ",
    image: "https://res.cloudinary.com/duv8bi3tc/image/upload/v1766517850/PHOTO-2025-12-24-00-53-55_ckwtwg.jpg"
  },
  {
    id: 10,
    date: "AUGUST 17, 2025",
    title: "AGAIN SUNDAR LADKI ",
    story:  "Remember betu this ones from the deer park  ",
    image: "https://res.cloudinary.com/duv8bi3tc/image/upload/v1766517910/A54953AE-1A0D-4AF0-B246-FDECB42F3321_l5jtlr.jpg"
  },
   {
    id: 11,
    date: "AUGUST 24, 2025",
    title: "OUR FIRST DATE ",
    story:  "WE FINALLY MADE IT TO OUR FIRST DATE TOGETHER AT MKT  ",
    image: "https://res.cloudinary.com/duv8bi3tc/image/upload/v1766518058/B9FF0442-EC85-4CD7-AABE-0531411A0DF4_1_102_o_ai4dma.jpg"
  },
  {
    id: 12,
    date: "SEPT 16, 2025",
    title: "MY BABY'S BIRTHDAY ",
    story:  "The most special and most awaited day of this year for me  ",
    image: "https://res.cloudinary.com/duv8bi3tc/image/upload/v1766518528/PHOTO-2025-12-24-01-05-21_geshng.jpg"
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