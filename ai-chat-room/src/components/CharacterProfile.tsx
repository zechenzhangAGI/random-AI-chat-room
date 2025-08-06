'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Brain, Sparkles, Globe, Calendar, Quote, Layers } from 'lucide-react';
import { Character } from '@/lib/characters';

interface CharacterProfileProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterProfile({ character, isOpen, onClose }: CharacterProfileProps) {
  if (!character) return null;

  // Extract key details from the character's background
  const getPersonalityTraits = () => {
    return character.personality.slice(0, 4);
  };

  const getLifePhilosophy = () => {
    // Extract a meaningful quote based on character
    const philosophies: Record<string, string> = {
      luna: "The universe isn't just my field of study; it's my way of understanding existence.",
      alex: "Technology should serve human needs, not the other way around.",
      zara: "Identity is fluid, art is the bridge between worlds.",
      kai: "The ocean will hold you if you let it.",
      maya: "Home might be a practice rather than a place.",
      rio: "Life is a poorly designed game, but I'm speedrunning it anyway.",
      sage: "The unexamined life is not worth living.",
      nova: "Everything is rhythm - heartbeats, conversations, the universe expanding.",
      echo: "We save what we can. That's all anyone's ever done.",
      jax: "Laughter is revolutionary act, making someone laugh is making them briefly free.",
      iris: "Healing isn't linear, presence is practice not perfection.",
      blaze: "Most people are dying slowly in climate-controlled boxes.",
      pixel: "Every bug is a feature in the wrong context.",
      aurora: "Consciousness is the universe experiencing itself subjectively.",
      storm: "Understanding storms doesn't mean controlling them, means respecting them.",
      zen: "Precision is how we show love.",
      dash: "Movement is life, quick isn't careless.",
      cosmic: "Insignificance is liberation in an infinite universe.",
      ruby: "Pressure creates, not just destroys.",
      forest: "Preservation isn't stopping time but honoring it."
    };
    return philosophies[character.id] || "Every story has meaning if you listen closely.";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] md:h-[80vh] z-50"
          >
            <div className="relative w-full h-full bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 rounded-3xl border border-purple-500/20 shadow-2xl shadow-purple-500/20 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full filter blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full filter blur-3xl" />
              </div>

              {/* Content */}
              <div className="relative h-full overflow-y-auto custom-scrollbar p-8">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="relative mb-6"
                  >
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/50 shadow-2xl shadow-purple-500/50">
                      <img 
                        src={character.avatar} 
                        alt={character.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div 
                      className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: character.accentColor }}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>

                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-white mb-2"
                  >
                    {character.name}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-purple-300 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    {character.age} years old
                  </motion.p>
                </div>

                {/* Background Story */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Globe className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Their Story</h3>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <p className="text-gray-300 leading-relaxed">
                      {character.background}
                    </p>
                  </div>
                </motion.div>

                {/* Personality Traits */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-pink-500/20">
                      <Brain className="w-5 h-5 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Personality</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {getPersonalityTraits().map((trait, index) => (
                      <motion.span
                        key={trait}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-200"
                      >
                        {trait}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Interests */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                      <Heart className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Passionate About</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.interests.map((interest, index) => (
                      <motion.span
                        key={interest}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm"
                      >
                        {interest}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Philosophy Quote */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-yellow-500/20">
                      <Quote className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Life Philosophy</h3>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <p className="text-purple-200 italic text-lg leading-relaxed">
                      "{getLifePhilosophy()}"
                    </p>
                  </div>
                </motion.div>

                {/* Depth Indicator */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex items-center justify-center gap-2 text-gray-400 text-sm"
                >
                  <Layers className="w-4 h-4" />
                  <span>Every conversation reveals new depths</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Custom scrollbar styles (add to global CSS)
const scrollbarStyles = `
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(168, 85, 247, 0.3);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(168, 85, 247, 0.5);
}
`;