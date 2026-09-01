import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface MascotHostProps {
  mood?: 'idle' | 'countdown' | 'cheering' | 'robot' | 'thinking' | 'grandma' | 'nightmare' | 'chef';
  customQuote?: string;
  className?: string;
}

export const MascotHost: React.FC<MascotHostProps> = ({
  mood = 'idle',
  customQuote,
  className = '',
}) => {
  const [clickCount, setClickCount] = useState(0);

  const getMascotDetails = () => {
    switch (mood) {
      case 'countdown':
        return {
          avatar: '👀',
          name: 'Pandy the Timer',
          defaultQuote: 'Tick tock! Lock that sentence into your memory banks!',
          badge: 'TIMING YOU!',
          badgeColor: 'bg-black text-yellow-300',
        };
      case 'cheering':
      case 'chef':
        return {
          avatar: '🐼✨',
          name: 'Pandy the Chef',
          defaultQuote: "Mwah! That paraphrase was seasoned to absolute perfection!",
          badge: "CHEF'S KISS",
          badgeColor: 'bg-black text-green-400',
        };
      case 'robot':
        return {
          avatar: '🤖',
          name: 'Robo-Pandy',
          defaultQuote: 'BEEP BOOP! Copy-paste detected! Swap some synonyms, human!',
          badge: 'ROBOT ALERT',
          badgeColor: 'bg-black text-red-400',
        };
      case 'grandma':
        return {
          avatar: '👵🐼',
          name: 'Grandma Pandy',
          defaultQuote: "Back in my day, we flipped clauses upside down before breakfast!",
          badge: 'GRANDMA WISDOM',
          badgeColor: 'bg-black text-purple-300',
        };
      case 'nightmare':
        return {
          avatar: '💀🐼',
          name: 'Professor Pandy PhD',
          defaultQuote: 'Behold the ontological grandeur of multi-syllabic academic jargon!',
          badge: 'MEGA NIGHTMARE',
          badgeColor: 'bg-black text-white',
        };
      case 'thinking':
        return {
          avatar: '🤔',
          name: 'Judge Pandy',
          defaultQuote: 'Analyzing your synonym swaps and grammatical architecture...',
          badge: 'EVALUATING',
          badgeColor: 'bg-black text-blue-300',
        };
      case 'idle':
      default:
        return {
          avatar: '🐼',
          name: 'Pandy the Paraphraser',
          defaultQuote: 'Welcome contestant! Memorize the prompt, swap words, and shuffle the structure!',
          badge: 'GAME SHOW HOST',
          badgeColor: 'bg-black text-yellow-300',
        };
    }
  };

  const details = getMascotDetails();
  const quote = customQuote || details.defaultQuote;

  const handleMascotPoke = () => {
    soundEffects.playWheelClick();
    setClickCount((prev) => prev + 1);
  };

  return (
    <div className={`bg-pink-400 border-4 border-black p-4 sm:p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black relative flex items-center gap-4 ${className}`}>
      
      {/* Mascot Avatar Button */}
      <motion.button
        id="mascot-avatar-btn"
        onClick={handleMascotPoke}
        whileHover={{ scale: 1.1, rotate: [0, -6, 6, 0] }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-white border-3 border-black flex items-center justify-center text-3xl sm:text-4xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer select-none relative flex-shrink-0"
        title="Poke Pandy!"
      >
        <span>{details.avatar}</span>
        {clickCount > 3 && (
          <span className="absolute -top-2 -right-2 bg-yellow-300 border-2 border-black text-[9px] font-black px-1.5 py-0.2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            +{clickCount}
          </span>
        )}
      </motion.button>

      {/* Speech Bubble / Quip */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="font-black text-xs sm:text-sm uppercase tracking-wide text-black">
            {details.name}
          </span>
          <span className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${details.badgeColor}`}>
            {details.badge}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={quote}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.15 }}
            className="text-sm sm:text-base font-bold leading-snug text-black"
          >
            "{quote}"
          </motion.div>
        </AnimatePresence>

        <p className="text-[9px] mt-1.5 font-black uppercase text-black/70 tracking-wider">
          - Pandy the Paraphraser
        </p>
      </div>
    </div>
  );
};

