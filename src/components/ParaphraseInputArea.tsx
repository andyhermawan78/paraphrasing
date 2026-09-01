import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Trash2, Home, Lightbulb } from 'lucide-react';
import { SentenceItem, PowerUp } from '../types';
import { soundEffects } from '../utils/audio';

interface ParaphraseInputAreaProps {
  sentence: SentenceItem;
  activePowerUps: PowerUp[];
  onSubmit: (userText: string) => void;
  isEvaluating: boolean;
  onReturnToMainScreen?: () => void;
}

export const ParaphraseInputArea: React.FC<ParaphraseInputAreaProps> = ({
  sentence,
  activePowerUps,
  onSubmit,
  isEvaluating,
  onReturnToMainScreen,
}) => {
  const [inputText, setInputText] = useState('');
  const [showHintModal, setShowHintModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isDoublePoints = activePowerUps.some((p) => p.id === 'double_points' && p.isActive);
  const isSynonymHint = activePowerUps.some((p) => p.id === 'synonym_hint' && p.isActive);
  const isShield = activePowerUps.some((p) => p.id === 'streak_shield' && p.isActive);

  useEffect(() => {
    // Auto-focus the input field
    textareaRef.current?.focus();
  }, []);

  const words = inputText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isEvaluating) return;
    onSubmit(inputText.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      
      {/* Covered Text Mystery Shield */}
      <div className="w-full bg-white border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-300 border-2 border-black flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            🔒
          </div>
          <div className="text-left">
            <div className="text-xs font-black uppercase text-black tracking-wider">
              ORIGINAL PROMPT HIDDEN
            </div>
            <div className="text-xs font-bold text-gray-700">
              Recall the meaning and rewrite it with fresh vocabulary & structure!
            </div>
          </div>
        </div>

        {/* Active Power-up Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {isDoublePoints && (
            <span className="px-2.5 py-1 bg-black text-yellow-300 font-black text-xs uppercase border border-black animate-pulse">
              💎 2X POINTS ACTIVE
            </span>
          )}
          {isShield && (
            <span className="px-2.5 py-1 bg-black text-green-300 font-black text-xs uppercase border border-black">
              🛡️ STREAK SHIELD
            </span>
          )}
          {isSynonymHint && (
            <button
              id="btn-view-synonyms"
              type="button"
              onClick={() => setShowHintModal(!showHintModal)}
              className="px-2.5 py-1 bg-blue-200 hover:bg-blue-300 text-black border-2 border-black font-black text-xs uppercase flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <Lightbulb className="w-3.5 h-3.5 text-black" />
              SYNONYM CLUES
            </button>
          )}
        </div>
      </div>

      {/* Synonym Clues Accordion if power-up was active */}
      <AnimatePresence>
        {(showHintModal || isSynonymHint) && sentence.suggestedSynonyms && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-blue-100 border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left"
          >
            <div className="flex items-center gap-1.5 text-xs font-black text-black uppercase mb-2">
              <Lightbulb className="w-3.5 h-3.5" />
              SYNONYM CHEAT-SHEET CLUES:
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.entries(sentence.suggestedSynonyms || {}).slice(0, 4).map(([word, syns]) => {
                const synList = Array.isArray(syns) ? syns : [];
                return (
                  <span key={word} className="px-2.5 py-1 bg-white border-2 border-black font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <strong className="text-pink-600 font-black">{word}</strong> → {synList.slice(0, 2).join(', ')}
                  </span>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Paraphrase Text Area Container */}
      <form onSubmit={handleSubmit} className="w-full relative">
        <div className="relative bg-white border-4 border-black p-4 sm:p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
          
          <div className="flex justify-between items-center mb-2">
            <span className="bg-black text-white px-2.5 py-0.5 font-black text-[10px] uppercase tracking-wider">
              YOUR PARAPHRASE
            </span>
            <span className="text-xs font-black uppercase text-gray-600">
              Type from memory
            </span>
          </div>

          <textarea
            id="input-paraphrase-textarea"
            ref={textareaRef}
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isEvaluating}
            placeholder="Type your paraphrased version here... (Press Enter to submit)"
            className="w-full bg-yellow-50/70 border-2 border-black p-3 text-black placeholder:text-gray-500 text-base sm:text-lg focus:outline-none focus:bg-white resize-none font-bold leading-relaxed transition-colors"
          />

          {/* Bottom Bar inside Textarea: Stats & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t-2 border-black mt-2">
            <div className="flex items-center gap-3 text-xs font-black uppercase text-gray-700">
              {onReturnToMainScreen && (
                <button
                  id="btn-typing-back-home"
                  type="button"
                  onClick={() => {
                    soundEffects.playWheelClick();
                    onReturnToMainScreen();
                  }}
                  className="px-2.5 py-1.5 bg-yellow-100 hover:bg-yellow-200 border-2 border-black font-black text-xs uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer text-black"
                >
                  <Home className="w-3.5 h-3.5 text-black" />
                  <span>← MAIN SCREEN</span>
                </button>
              )}
              <span>
                {wordCount} {wordCount === 1 ? 'word' : 'words'}
              </span>
              <span>•</span>
              <span>{inputText.length} chars</span>
            </div>

            <div className="flex items-center gap-2">
              {inputText.length > 0 && (
                <button
                  id="btn-clear-text"
                  type="button"
                  onClick={() => setInputText('')}
                  title="Clear text"
                  className="p-2 border-2 border-black bg-white hover:bg-red-200 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <button
                id="btn-submit-paraphrase"
                type="submit"
                disabled={!inputText.trim() || isEvaluating}
                className="px-6 py-3 bg-black text-white hover:bg-white hover:text-black border-3 border-black font-black uppercase text-sm sm:text-base flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>{isEvaluating ? 'JUDGING...' : 'SUBMIT! →'}</span>
              </button>
            </div>
          </div>

        </div>
      </form>

      <div className="mt-3 text-center text-xs font-bold text-black uppercase">
        💡 Tip: Change the word order or use active/passive shifts for higher structure points!
      </div>

    </div>
  );
};

