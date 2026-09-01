import React from 'react';
import { motion } from 'motion/react';
import { X, Clock, Star, CheckCircle2, AlertTriangle } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl bg-white border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black max-h-[90vh] flex flex-col relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-300 border-2 border-black flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              🎓
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight text-black">
                HOW TO PLAY & WIN
              </h2>
              <p className="text-xs font-bold text-gray-600 uppercase">
                Master the Art of the Paraphrase
              </p>
            </div>
          </div>

          <button
            id="btn-close-how-to-play"
            onClick={onClose}
            className="p-1.5 border-2 border-black bg-white hover:bg-red-200 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-4 text-left text-xs sm:text-sm">
          
          {/* Step-by-Step Flow */}
          <div className="bg-yellow-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-sm sm:text-base font-black uppercase text-black mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-black" />
              GAME MECHANICS IN 3 EASY STEPS
            </h3>
            
            <div className="space-y-3 font-bold">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 border-2 border-black bg-yellow-300 text-black font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  1
                </div>
                <div>
                  <strong className="text-black font-black uppercase">Observation Phase:</strong> Read and memorize the sentence before the countdown expires (7s to 20s).
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 border-2 border-black bg-yellow-300 text-black font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  2
                </div>
                <div>
                  <strong className="text-black font-black uppercase">The Blindfold Rewrite:</strong> The original text is covered! Type your paraphrased sentence in the box.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 border-2 border-black bg-yellow-300 text-black font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  3
                </div>
                <div>
                  <strong className="text-black font-black uppercase">Instant AI Judging:</strong> Receive your 0-3 Star score with hilarious mascot feedback, synonym metrics, and comparison diff!
                </div>
              </div>
            </div>
          </div>

          {/* The 3 Pillars of Paraphrasing */}
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase text-black mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 stroke-black stroke-2" />
              THE 3 PILLARS OF A 3-STAR SCORE
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="font-black text-black text-xs mb-1 uppercase">
                  1. SYNONYMS 🔄
                </div>
                <p className="text-gray-700 text-xs font-bold leading-relaxed">
                  Replace key verbs and adjectives with accurate alternatives (e.g. <em>exhausted</em> instead of <em>tired</em>).
                </p>
              </div>

              <div className="p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="font-black text-black text-xs mb-1 uppercase">
                  2. STRUCTURE 🏗️
                </div>
                <p className="text-gray-700 text-xs font-bold leading-relaxed">
                  Reorganize clause orders, switch from active to passive voice, or start with prepositional phrases.
                </p>
              </div>

              <div className="p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="font-black text-black text-xs mb-1 uppercase">
                  3. MEANING 🎯
                </div>
                <p className="text-gray-700 text-xs font-bold leading-relaxed">
                  Keep every critical fact and relation true to the original. Don't invent unrelated stories!
                </p>
              </div>
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-green-50 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-1.5 font-black text-emerald-900 text-xs mb-1.5 uppercase">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>CHEF'S KISS EXAMPLE 👨‍🍳💋</span>
              </div>
              <p className="text-gray-700 text-xs italic mb-1 font-bold">
                Original: "The cat sat on the mat."
              </p>
              <p className="text-emerald-900 font-black text-xs">
                Paraphrase: "A small feline relaxed upon the rug."
              </p>
            </div>

            <div className="p-3.5 bg-red-50 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-1.5 font-black text-rose-900 text-xs mb-1.5 uppercase">
                <AlertTriangle className="w-4 h-4 text-black" />
                <span>ROBOT COPYCAT (0 STARS) 🤖</span>
              </div>
              <p className="text-gray-700 text-xs italic mb-1 font-bold">
                Original: "The cat sat on the mat."
              </p>
              <p className="text-rose-900 font-black text-xs">
                Copied: "The cat sat on the mat." (No change!)
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t-2 border-black text-center">
          <button
            id="btn-close-how-to-play-btn"
            onClick={onClose}
            className="w-full py-3 bg-black text-white hover:bg-white hover:text-black border-3 border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            LET'S PLAY & MASTER IT! →
          </button>
        </div>
      </motion.div>
    </div>
  );
};

