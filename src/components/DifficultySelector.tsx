import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Dices, Clock, Zap, Award, Flame, Brain, BookOpen } from 'lucide-react';
import { DifficultyLevel } from '../types';
import { DIFFICULTY_CONFIG } from '../data/sentences';
import { soundEffects } from '../utils/audio';

interface DifficultySelectorProps {
  selectedDifficulty: DifficultyLevel;
  onSelectDifficulty: (diff: DifficultyLevel) => void;
  onStartGame: (diff: DifficultyLevel) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onSelectDifficulty,
  onStartGame,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinnerAngle, setSpinnerAngle] = useState(0);

  const levels: DifficultyLevel[] = ['easy', 'medium', 'hard', 'nightmare'];

  const handleRandomSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const randomCycles = 5 + Math.floor(Math.random() * 4); // 5 to 8 turns
    const targetIndex = Math.floor(Math.random() * levels.length);
    const chosenDifficulty = levels[targetIndex];

    let currentStep = 0;
    const totalSteps = 20;

    const interval = setInterval(() => {
      currentStep++;
      soundEffects.playWheelClick();
      setSpinnerAngle((prev) => prev + 36);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setSpinnerAngle(randomCycles * 360 + targetIndex * 90);
        onSelectDifficulty(chosenDifficulty);
        setIsSpinning(false);
        soundEffects.playDing(2);
      }
    }, 80);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      
      {/* Intro Banner */}
      <div className="w-full bg-white border-4 border-black p-5 sm:p-7 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center mb-6 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-yellow-300 text-xs font-black uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
          STEP UP TO THE PODIUM & CHOOSE YOUR CHALLENGE!
        </div>
        
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-black mb-2">
          PARAPHRASE PANDEMONIUM! 🐼
        </h1>
        
        <p className="text-gray-800 text-sm sm:text-base max-w-2xl mx-auto font-bold leading-relaxed">
          Memorize the prompt before the timer runs out, then rewrite it in your own words.
          Score points for <span className="bg-yellow-200 px-1.5 border border-black text-black font-black">clever synonyms</span>, <span className="bg-blue-100 px-1.5 border border-black text-black font-black">restructured syntax</span>, and <span className="bg-green-200 px-1.5 border border-black text-black font-black">spot-on meaning</span>!
        </p>
      </div>

      {/* Wheel of Fortune Quick Randomizer */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <motion.button
          id="btn-spin-wheel"
          disabled={isSpinning}
          onClick={handleRandomSpin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3.5 bg-pink-400 hover:bg-pink-300 text-black font-black uppercase text-base sm:text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 border-4 border-black transition-all cursor-pointer disabled:opacity-50 active:translate-x-0.5 active:translate-y-0.5"
        >
          <motion.div
            animate={{ rotate: isSpinning ? 360 * 4 : spinnerAngle }}
            transition={{ duration: isSpinning ? 1.6 : 0.3, ease: 'easeInOut' }}
          >
            <Dices className="w-6 h-6 text-black" />
          </motion.div>
          <span>{isSpinning ? 'SPINNING THE WHEEL...' : 'SPIN WHEEL OF FORTUNE 🎡'}</span>
        </motion.button>
      </div>

      {/* 4 Difficulty Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6">
        {levels.map((level) => {
          const config = DIFFICULTY_CONFIG[level];
          const isSelected = selectedDifficulty === level;

          return (
            <motion.div
              key={level}
              id={`difficulty-card-${level}`}
              onClick={() => {
                soundEffects.playWheelClick();
                onSelectDifficulty(level);
              }}
              whileHover={{ y: -2 }}
              className={`relative cursor-pointer p-4 sm:p-5 border-4 border-black text-left flex flex-col justify-between transition-all ${
                isSelected
                  ? 'bg-yellow-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ring-2 ring-black'
                  : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-50'
              }`}
            >
              {isSelected && (
                <div className="absolute -top-3.5 right-3 px-2 py-0.5 bg-black text-yellow-300 font-black text-[10px] uppercase tracking-wider border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  SELECTED ★
                </div>
              )}

              <div>
                {/* Header emoji and time badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{config.emoji}</span>
                  <span className="flex items-center gap-1 text-[11px] font-black uppercase px-2 py-0.5 bg-black text-white border border-black">
                    <Clock className="w-3 h-3 text-yellow-300" />
                    {config.timeSeconds}s Memory
                  </span>
                </div>

                {/* Level Title */}
                <h3 className="font-black italic uppercase text-lg sm:text-xl text-black mb-1">
                  {config.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-700 font-bold leading-tight mb-4">
                  {config.description}
                </p>
              </div>

              {/* Action Start Button inside card */}
              <button
                id={`btn-start-${level}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onStartGame(level);
                }}
                className={`w-full py-2.5 font-black text-xs uppercase tracking-wider border-2 border-black transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 ${
                  isSelected
                    ? 'bg-black text-white hover:bg-yellow-300 hover:text-black'
                    : 'bg-white hover:bg-black hover:text-white text-black'
                }`}
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                PLAY {level.toUpperCase()}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Main Start Game Action */}
      <div className="flex flex-col items-center gap-2">
        <motion.button
          id="btn-main-start-game"
          onClick={() => onStartGame(selectedDifficulty)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 sm:px-12 py-4 bg-black text-white hover:bg-white hover:text-black border-4 border-black font-black uppercase text-xl sm:text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center gap-3 tracking-tight transition-all"
        >
          <Zap className="w-6 h-6 fill-current text-yellow-300 group-hover:text-black" />
          START ROUND ({DIFFICULTY_CONFIG[selectedDifficulty].name.toUpperCase()}) →
        </motion.button>
        <span className="text-xs text-black font-black uppercase tracking-wider">
          Ready to test your memory & lexical agility?
        </span>
      </div>

    </div>
  );
};
