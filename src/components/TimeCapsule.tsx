import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Clock } from 'lucide-react';

type Note = {
  id: string;
  date: string;
  content: string;
};

const TimeCapsule = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('magazine-time-capsule');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentNote, setCurrentNote] = useState('');

  useEffect(() => {
    localStorage.setItem('magazine-time-capsule', JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (!currentNote.trim()) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      content: currentNote
    };

    setNotes([newNote, ...notes]);
    setCurrentNote('');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <section className="py-24 px-6 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-magazine-gold/30 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-7xl text-magazine-ink mb-4">The Time Capsule</h2>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-magazine-gold">
            Write to your future selves
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* LEFT: WRITING AREA */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 font-hand text-2xl text-magazine-gold opacity-50 -rotate-12">
              Dear Future Us...
            </div>
            <div className="bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-stone-100 relative group">
              {/* Lined Paper Effect */}
              <div className="absolute inset-8 pointer-events-none" 
                   style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)' }}>
              </div>

              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="What are you feeling right now? What do you hope for next year?"
                className="w-full h-80 bg-transparent relative z-10 font-serif text-xl leading-8 text-magazine-ink focus:outline-none resize-none placeholder:text-gray-300 placeholder:italic"
                style={{ lineHeight: '32px' }}
              />

              <div className="mt-6 flex justify-end">
                <button
                  onClick={saveNote}
                  disabled={!currentNote.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-magazine-ink text-magazine-paper font-sans text-xs uppercase tracking-widest hover:bg-magazine-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Seal Letter</span>
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: THE ARCHIVE */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl italic text-gray-400 mb-8 border-b border-gray-100 pb-4">
              Sealed Memories ({notes.length})
            </h3>

            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide">
              <AnimatePresence>
                {notes.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-sm">
                    <Clock className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                    <p className="font-sans text-xs text-gray-300 uppercase tracking-widest">Archive Empty</p>
                  </div>
                )}

                {notes.map((note) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-6 shadow-sm border border-stone-100 group relative hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-magazine-gold border-b border-magazine-gold/20 pb-1">
                        {note.date}
                      </span>
                      <button 
                        onClick={() => deleteNote(note.id)}
                        className="text-gray-200 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="font-serif text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TimeCapsule;