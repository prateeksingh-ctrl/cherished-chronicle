import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, Edit2, X, FolderPlus } from 'lucide-react';

// --- Types ---
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

// --- Default Data (Loads if nothing is saved) ---
const DEFAULT_CATEGORIES: Category[] = [
  { 
    id: '1', 
    title: 'Career & Ambition', 
    items: [
        { id: '101', text: 'Launch the new project', completed: false },
        { id: '102', text: 'Reach 10k monthly readers', completed: true }
    ] 
  },
  { 
    id: '2', 
    title: 'Travel Log', 
    items: [
        { id: '201', text: 'Visit Kyoto in Autumn', completed: false }
    ] 
  },
];

const MagazineDreams = () => {
  // --- State ---
  const [categories, setCategories] = useState<Category[]>(() => {
    // 1. Load from LocalStorage on start
    const saved = localStorage.getItem('magazine-dreams');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || '');
  
  // Input States
  const [newItemText, setNewItemText] = useState('');
  const [newCategoryText, setNewCategoryText] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editCategoryTitle, setEditCategoryTitle] = useState('');

  // 2. Save to LocalStorage whenever categories change
  useEffect(() => {
    localStorage.setItem('magazine-dreams', JSON.stringify(categories));
  }, [categories]);

  // --- Actions: Categories ---

  const addCategory = () => {
    if (!newCategoryText.trim()) return;
    const newId = Date.now().toString();
    const newCategory: Category = {
      id: newId,
      title: newCategoryText,
      items: []
    };
    setCategories([...categories, newCategory]);
    setNewCategoryText('');
    setActiveCategoryId(newId); // Switch to new category
  };

  const deleteCategory = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent clicking the category itself
    const filtered = categories.filter(c => c.id !== id);
    setCategories(filtered);
    // If we deleted the active one, switch to the first available
    if (activeCategoryId === id && filtered.length > 0) {
      setActiveCategoryId(filtered[0].id);
    }
  };

  const startEditingCategory = (e: React.MouseEvent, category: Category) => {
    e.stopPropagation();
    setEditingCategoryId(category.id);
    setEditCategoryTitle(category.title);
  };

  const saveCategoryTitle = () => {
    if (editingCategoryId && editCategoryTitle.trim()) {
      setCategories(prev => prev.map(c => 
        c.id === editingCategoryId ? { ...c, title: editCategoryTitle } : c
      ));
    }
    setEditingCategoryId(null);
  };

  // --- Actions: Items (Dreams) ---

  const addItem = () => {
    if (!newItemText.trim() || !activeCategoryId) return;
    setCategories(prev => prev.map(c => {
      if (c.id === activeCategoryId) {
        return {
          ...c,
          items: [...c.items, { id: Date.now().toString(), text: newItemText, completed: false }]
        };
      }
      return c;
    }));
    setNewItemText('');
  };

  const toggleItem = (itemId: string) => {
    setCategories(prev => prev.map(c => {
      if (c.id === activeCategoryId) {
        return {
          ...c,
          items: c.items.map(item => 
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return c;
    }));
  };

  const deleteItem = (itemId: string) => {
    setCategories(prev => prev.map(c => {
      if (c.id === activeCategoryId) {
        return { ...c, items: c.items.filter(item => item.id !== itemId) };
      }
      return c;
    }));
  };

  const activeCategory = categories.find(c => c.id === activeCategoryId);

  return (
    <section className="min-h-screen py-32 px-6 md:px-24 bg-magazine-paper text-magazine-ink relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-magazine-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="font-serif text-6xl md:text-8xl mb-4 text-magazine-ink">The Vision Board</h2>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-magazine-gold">Design Your Reality</p>
        </div>

        <div className="grid md:grid-cols-12 gap-12 border-t border-black/10 pt-12">
          
          {/* --- LEFT COLUMN: CATEGORY MANAGER --- */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <div>
              <h3 className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-6">Sections</h3>
              
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="relative group">
                    {editingCategoryId === cat.id ? (
                      // Edit Mode Input
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          autoFocus
                          value={editCategoryTitle}
                          onChange={(e) => setEditCategoryTitle(e.target.value)}
                          onBlur={saveCategoryTitle}
                          onKeyDown={(e) => e.key === 'Enter' && saveCategoryTitle()}
                          className="w-full bg-white border border-magazine-gold p-2 font-serif italic text-xl focus:outline-none"
                        />
                        <button onClick={saveCategoryTitle}><Check size={16} className="text-green-600"/></button>
                      </div>
                    ) : (
                      // Normal Display Mode
                      <button
                        onClick={() => setActiveCategoryId(cat.id)}
                        className={`w-full text-left py-3 px-4 transition-all duration-300 flex justify-between items-center rounded-sm ${
                          activeCategoryId === cat.id 
                            ? 'bg-magazine-ink text-white shadow-lg' 
                            : 'hover:bg-gray-100 text-magazine-ink'
                        }`}
                      >
                        <span className="font-serif text-xl italic">{cat.title}</span>
                        
                        {/* Action Buttons (Visible on Hover or Active) */}
                        <div className={`flex gap-2 ${activeCategoryId === cat.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                          <div 
                            role="button"
                            onClick={(e) => startEditingCategory(e, cat)}
                            className="p-1 hover:text-magazine-gold transition-colors"
                          >
                            <Edit2 size={14} />
                          </div>
                          <div 
                            role="button"
                            onClick={(e) => deleteCategory(e, cat.id)}
                            className="p-1 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Section Input */}
            <div className="mt-auto pt-6 border-t border-dashed border-gray-300">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCategoryText}
                  onChange={(e) => setNewCategoryText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                  placeholder="New Section Name..."
                  className="w-full bg-transparent border-b border-gray-300 py-2 font-sans text-sm focus:outline-none focus:border-magazine-gold transition-colors"
                />
                <button 
                  onClick={addCategory}
                  disabled={!newCategoryText.trim()}
                  className="p-2 bg-gray-100 rounded-full hover:bg-magazine-gold hover:text-white transition-all disabled:opacity-50"
                >
                  <FolderPlus size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: DREAMS LIST --- */}
          <div className="md:col-span-8 bg-white min-h-[500px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 relative">
            
            {activeCategory ? (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCategory.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col"
                >
                  {/* Category Title Header */}
                  <div className="flex justify-between items-end mb-12 border-b-2 border-magazine-ink pb-4">
                    <h3 className="font-serif text-4xl md:text-5xl">{activeCategory.title}</h3>
                    <span className="font-sans text-xs text-gray-400 mb-1">
                      {activeCategory.items.filter(i => i.completed).length}/{activeCategory.items.length} Completed
                    </span>
                  </div>

                  {/* Add New Dream Input */}
                  <div className="flex gap-4 mb-10">
                    <input 
                      type="text" 
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addItem()}
                      placeholder={`Add a new goal to ${activeCategory.title}...`}
                      className="flex-1 bg-transparent border-b border-gray-200 py-3 font-serif text-xl italic placeholder:text-gray-300 focus:outline-none focus:border-magazine-gold transition-colors"
                    />
                    <button 
                      onClick={addItem}
                      className="px-6 py-2 bg-magazine-ink text-white font-sans text-xs tracking-widest uppercase hover:bg-magazine-gold transition-colors"
                    >
                      Add Entry
                    </button>
                  </div>

                  {/* Dreams List */}
                  <div className="space-y-3 overflow-y-auto max-h-[400px] pr-4 scrollbar-hide">
                    {activeCategory.items.length === 0 && (
                      <div className="text-center py-20 text-gray-300 font-sans text-sm tracking-widest uppercase">
                        This page is blank. <br/> Write your story.
                      </div>
                    )}
                    
                    {activeCategory.items.map((item) => (
                      <motion.div 
                        layout
                        key={item.id} 
                        className="group flex items-center justify-between p-4 bg-[#FDFBF7] hover:bg-white border border-transparent hover:border-gray-100 transition-all duration-300 shadow-sm"
                      >
                        <div className="flex items-center gap-6 cursor-pointer" onClick={() => toggleItem(item.id)}>
                          <div 
                            className={`w-6 h-6 border flex items-center justify-center transition-all duration-300 ${
                              item.completed ? 'bg-magazine-gold border-magazine-gold' : 'border-gray-300 bg-white'
                            }`}
                          >
                            <Check size={14} className={`text-white transition-opacity ${item.completed ? 'opacity-100' : 'opacity-0'}`} />
                          </div>
                          <span className={`font-serif text-xl transition-all duration-300 ${item.completed ? 'line-through text-gray-300 decoration-magazine-gold/50' : 'text-magazine-ink'}`}>
                            {item.text}
                          </span>
                        </div>
                        
                        <button 
                          onClick={() => deleteItem(item.id)}
                          className="text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-4"
                        >
                          <X size={20} />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-300">
                <FolderPlus size={48} strokeWidth={1} className="mb-4" />
                <p className="font-sans text-sm tracking-widest uppercase">Select or Create a Section</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagazineDreams;