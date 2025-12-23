const QnA = ({ q, him, her }: { q: string, him: string, her: string }) => (
  <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-black/10 py-12">
    <div className="md:col-span-4 font-sans text-xs uppercase tracking-widest text-gray-400">
      {q}
    </div>
    <div className="md:col-span-4 font-serif text-xl italic text-magazine-ink">
      "{him}"
      <div className="font-sans text-[10px] not-italic text-magazine-gold mt-2 uppercase">Him</div>
    </div>
    <div className="md:col-span-4 font-serif text-xl italic text-magazine-ink">
      "{her}"
      <div className="font-sans text-[10px] not-italic text-magazine-gold mt-2 uppercase">Her</div>
    </div>
  </div>
);

const MagazineInterview = () => {
  return (
    <section className="py-32 px-6 bg-magazine-paper">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-5xl md:text-7xl text-center mb-24">The Interview</h2>
        
        <QnA 
          q="When did you know?" 
          him="That rainy Tuesday in traffic." 
          her="When you made me coffee without asking." 
        />
        <QnA 
          q="Favorite memory?" 
          him="Getting lost in Tokyo." 
          her="Watching the sunrise on the roof." 
        />
        <QnA 
          q="Describe 2025 in one word?" 
          him="Chaos." 
          her="Magic." 
        />
      </div>
    </section>
  );
};

export default MagazineInterview;