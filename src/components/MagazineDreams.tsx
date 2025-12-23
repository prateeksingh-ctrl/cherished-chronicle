import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, ChevronDown } from 'lucide-react';

type DreamItem = {
  id: string;
  text: string;
  completed: boolean;
};

type Category = {
  id: string;
  title: string;
  items: DreamItem[];
};

const MagazineDreams = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', title: 'Travel & Adventure', items: [] },
    { id: '2', title: 'Building Our Home', items: [] },
    { id: '3', title: 'Milestones', items: [] },
  ]);
  
  const [activeCategory, setActiveCategory] = useState<string | null>('1');
  const [newItemText, setNewItemText] = useState('');

  const handleAddItem = (categoryId: string) => {
    if (!newItemText.trim()) return;
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: [...cat.items, { id: Math.random().toString(), text: newItemText, completed: false }]
        };
      }
      return cat;
    }));
    setNewItemText('');
  };

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: cat.items.map(item => 
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return cat;
    }));
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, items: cat.items.filter(item => item.id !== itemId) };
      }
      return cat;
    }));
  };

  return (
    <section className="min-h-screen py-32 px-6 bg-magazine-paper border-t border-magazine-ink/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-serif text-5xl md:text-7xl text-magazine-ink mb-4">Our Vision</h2>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-magazine-gold">Manifesting 2025</p>
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          {/* Sidebar Categories */}
          <div className="md:col-span-4 space-y-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left py-4 border-b transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? 'border-magazine-ink text-magazine-ink pl-4' 
                    : 'border-gray-200 text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="font-serif text-2xl italic">{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Active List Area */}
          <div className="md:col-span-8 bg-white p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-sm">
            <AnimatePresence mode="wait">
              {categories.map((cat) => (
                activeCategory === cat.id && (
                  <motion.div 
                    key={cat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex gap-4 mb-8">
                      <input 
                        type="text" 
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        placeholder="Add a new dream..."
                        className="flex-1 bg-transparent border-b border-gray-200 py-2 font-sans text-sm focus:outline-none focus:border-magazine-gold transition-colors"
                      />
                      <button 
                        onClick={() => handleAddItem(cat.id)}
                        className="p-2 bg-magazine-ink text-white rounded-full hover:bg-magazine-gold transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {cat.items.length === 0 && (
                        <div className="text-center py-10 text-gray-300 font-sans text-sm uppercase tracking-widest">
                          The canvas is empty
                        </div>
                      )}
                      
                      {cat.items.map((item) => (
                        <div key={item.id} className="group flex items-center justify-between p-4 hover:bg-magazine-paper transition-colors rounded-sm">
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => toggleItem(cat.id, item.id)}
                              className={`w-5 h-5 border rounded-full flex items-center justify-center transition-all ${
                                item.completed ? 'bg-magazine-gold border-magazine-gold' : 'border-gray-300'
                              }`}
                            >
                              {item.completed && <Check size={12} className="text-white" />}
                            </button>
                            <span className={`font-serif text-lg ${item.completed ? 'line-through text-gray-300' : 'text-magazine-ink'}`}>
                              {item.text}
                            </span>
                          </div>
                          
                          <button 
                            onClick={() => deleteItem(cat.id, item.id)}
                            className="opacity-0 group-hover:opacity-100 text-red-300 hover:text-red-500 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagazineDreams;