import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { DifficultyLevel, SentenceItem } from '../types';

interface CustomSentenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCustomSentence: (item: SentenceItem) => void;
}

export const CustomSentenceModal: React.FC<CustomSentenceModalProps> = ({
  isOpen,
  onClose,
  onCreateCustomSentence,
}) => {
  if (!isOpen) return null;

  const [text, setText] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [category, setCategory] = useState('Custom Challenge');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const words = text.trim().split(/\s+/);
    const keywords = words.filter((w) => w.length > 3).slice(0, 6);

    const customItem: SentenceItem = {
      id: `custom-${Date.now()}`,
      difficulty,
      originalText: text.trim(),
      category: category.trim() || 'Custom Challenge',
      keywords,
      keyIdeas: ['Core meaning of custom text'],
      suggestedSynonyms: {},
      sampleGoodParaphrase: 'Rewritten with active vocabulary and inverted structure.',
      educationalTip: 'Focus on swapping key nouns and restructuring clauses.',
      humorousContext: 'Custom classroom challenge!'
    };

    onCreateCustomSentence(customItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg bg-white border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black max-h-[90vh] flex flex-col relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-300 border-2 border-black flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ✍️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight text-black">
                CREATE CUSTOM PROMPT
              </h2>
              <p className="text-xs font-bold text-gray-600 uppercase">
                Enter your own challenge or trick sentence!
              </p>
            </div>
          </div>

          <button
            id="btn-close-custom-modal"
            onClick={onClose}
            className="p-1.5 border-2 border-black bg-white hover:bg-red-200 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 py-4 space-y-4 text-left">
          
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1">
              Sentence or Short Paragraph:
            </label>
            <textarea
              id="input-custom-text"
              rows={3}
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Photosynthesis converts solar rays into organic chemical bonds within cellular chloroplasts..."
              className="w-full p-3 bg-yellow-50 border-2 border-black text-sm font-bold text-black placeholder:text-gray-500 focus:outline-none focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase text-black mb-1">
                Difficulty Level:
              </label>
              <select
                id="select-custom-diff"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full p-2.5 bg-yellow-50 border-2 border-black text-xs font-bold text-black focus:outline-none focus:bg-white"
              >
                <option value="easy">🟢 Easy (7 seconds)</option>
                <option value="medium">🟡 Medium (10 seconds)</option>
                <option value="hard">🔴 Hard (15 seconds)</option>
                <option value="nightmare">💀 Mega Nightmare (20 seconds)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-black mb-1">
                Topic / Category:
              </label>
              <input
                id="input-custom-category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Science, Literature"
                className="w-full p-2.5 bg-yellow-50 border-2 border-black text-xs font-bold text-black focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <button
            id="btn-submit-custom-sentence"
            type="submit"
            disabled={!text.trim()}
            className="w-full py-3.5 bg-black text-white hover:bg-white hover:text-black border-3 border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 mt-4 cursor-pointer"
          >
            LAUNCH CUSTOM CHALLENGE 🚀
          </button>

        </form>
      </motion.div>
    </div>
  );
};

