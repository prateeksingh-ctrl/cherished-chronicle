import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plane, Heart, PiggyBank, Check, Plus } from 'lucide-react';
import { goals as initialGoals } from '../data/mockData';

const categoryIcons = {
  travel: Plane,
  dates: Heart,
  savings: PiggyBank,
  personal: Target,
};

const categoryColors = {
  travel: 'from-blue-500/20 to-blue-600/20',
  dates: 'from-pink-500/20 to-rose-600/20',
  savings: 'from-green-500/20 to-emerald-600/20',
  personal: 'from-purple-500/20 to-violet-600/20',
};

const GoalsSection = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [newGoal, setNewGoal] = useState('');

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, isCompleted: !goal.isCompleted } : goal
      )
    );
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          title: newGoal,
          isCompleted: false,
          category: 'personal' as const,
        },
      ]);
      setNewGoal('');
    }
  };

  const travelGoals = goals.filter((g) => g.category === 'travel');
  const dateGoals = goals.filter((g) => g.category === 'dates');
  const savingsGoals = goals.filter((g) => g.category === 'savings');

  const completedCount = goals.filter((g) => g.isCompleted).length;
  const progressPercent = Math.round((completedCount / goals.length) * 100);

  return (
    <section
      id="goals"
      className="relative min-h-screen py-24"
      style={{ backgroundColor: 'hsl(22 21% 53% / 0.15)' }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <Target className="mx-auto mb-4 h-10 w-10 text-magazine-gold" />
          <h2 className="font-editorial text-5xl font-bold text-magazine-dark md:text-6xl">
            2026 Dreams
          </h2>
          <p className="mt-4 font-handwritten text-2xl text-muted-foreground">
            What we're planning together
          </p>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-8 max-w-md"
          >
            <div className="flex items-center justify-between font-body text-sm text-muted-foreground">
              <span>{completedCount} completed</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full bg-gold-gradient"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Bento Grid */}
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Travel Bucket List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bento-card row-span-2"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-editorial text-xl font-semibold text-magazine-dark">
                  Travel Bucket List
                </h3>
                <p className="font-handwritten text-muted-foreground">2026 adventures</p>
              </div>
            </div>

            <ul className="space-y-3">
              {travelGoals.map((goal) => (
                <motion.li
                  key={goal.id}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3"
                >
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all ${
                      goal.isCompleted
                        ? 'border-magazine-gold bg-magazine-gold text-magazine-dark'
                        : 'border-muted-foreground/30 hover:border-magazine-gold'
                    }`}
                  >
                    {goal.isCompleted && <Check className="h-4 w-4" />}
                  </button>
                  <span
                    className={`font-body ${
                      goal.isCompleted
                        ? 'text-muted-foreground line-through'
                        : 'text-magazine-dark'
                    }`}
                  >
                    {goal.title}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Date Night Jar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bento-card"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-600/20">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-editorial text-xl font-semibold text-magazine-dark">
                  Date Night Ideas
                </h3>
                <p className="font-handwritten text-muted-foreground">Quality time together</p>
              </div>
            </div>

            <ul className="space-y-3">
              {dateGoals.map((goal) => (
                <motion.li
                  key={goal.id}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3"
                >
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all ${
                      goal.isCompleted
                        ? 'border-magazine-gold bg-magazine-gold text-magazine-dark'
                        : 'border-muted-foreground/30 hover:border-magazine-gold'
                    }`}
                  >
                    {goal.isCompleted && <Check className="h-4 w-4" />}
                  </button>
                  <span
                    className={`font-body ${
                      goal.isCompleted
                        ? 'text-muted-foreground line-through'
                        : 'text-magazine-dark'
                    }`}
                  >
                    {goal.title}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Savings Goal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bento-card"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/20">
                <PiggyBank className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-editorial text-xl font-semibold text-magazine-dark">
                  Savings Goals
                </h3>
                <p className="font-handwritten text-muted-foreground">Building our future</p>
              </div>
            </div>

            <ul className="space-y-3">
              {savingsGoals.map((goal) => (
                <motion.li
                  key={goal.id}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3"
                >
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all ${
                      goal.isCompleted
                        ? 'border-magazine-gold bg-magazine-gold text-magazine-dark'
                        : 'border-muted-foreground/30 hover:border-magazine-gold'
                    }`}
                  >
                    {goal.isCompleted && <Check className="h-4 w-4" />}
                  </button>
                  <span
                    className={`font-body ${
                      goal.isCompleted
                        ? 'text-muted-foreground line-through'
                        : 'text-magazine-dark'
                    }`}
                  >
                    {goal.title}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Add New Goal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bento-card md:col-span-2 lg:col-span-1"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-magazine-gold/20 to-magazine-gold/30">
                <Plus className="h-6 w-6 text-magazine-gold" />
              </div>
              <div>
                <h3 className="font-editorial text-xl font-semibold text-magazine-dark">
                  Add a Dream
                </h3>
                <p className="font-handwritten text-muted-foreground">What else should we do?</p>
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                placeholder="Type a new goal..."
                className="flex-1 rounded-xl border border-border bg-background px-4 py-3 font-body text-sm placeholder:text-muted-foreground focus:border-magazine-gold focus:outline-none focus:ring-2 focus:ring-magazine-gold/20"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addGoal}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-magazine-gold text-magazine-dark shadow-lg shadow-magazine-gold/20 transition-shadow hover:shadow-xl"
              >
                <Plus className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
