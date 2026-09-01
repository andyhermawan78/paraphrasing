import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Eye, FastForward, Home } from 'lucide-react';
import { SentenceItem } from '../types';
import { DIFFICULTY_CONFIG } from '../data/sentences';
import { soundEffects } from '../utils/audio';

interface CountdownTimerProps {
  sentence: SentenceItem;
  totalTime: number; // in seconds
  onTimeExpired: () => void;
  onSkipMemory: () => void;
  onReturnToMainScreen?: () => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  sentence,
  totalTime,
  onTimeExpired,
  onSkipMemory,
  onReturnToMainScreen,
}) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const config = DIFFICULTY_CONFIG[sentence.difficulty];

  useEffect(() => {
    setTimeLeft(totalTime);
  }, [totalTime]);

  useEffect(() => {
    if (timeLeft <= 0) {
      soundEffects.playCurtainDrop();
      onTimeExpired();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = Math.max(0, Math.round((prev - 0.1) * 10) / 10);
        
        // Play tick on full second increments
        if (Math.abs(next - Math.floor(next)) < 0.05 && next > 0) {
          soundEffects.playCountdownTick(next / totalTime);
        }

        return next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [timeLeft, totalTime, onTimeExpired]);

  const progressRatio = Math.max(0, Math.min(1, timeLeft / totalTime));
  const isUrgent = timeLeft <= 3.0;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      
      {/* Top Status Bar: Category & Memory Timer */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white px-3 py-1 font-bold text-xs uppercase tracking-wider">
            {config.emoji} {config.name}
          </span>
          <span className="text-xs font-bold text-black bg-white px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
            {sentence.category}
          </span>
        </div>

        {/* Timer Pill */}
        <div className={`flex items-center gap-2 px-3.5 py-1 border-3 border-black font-black text-sm uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
          isUrgent
            ? 'bg-pink-500 text-white animate-pulse'
            : 'bg-white text-black'
        }`}>
          <Clock className={`w-4 h-4 ${isUrgent ? 'text-white' : 'text-black'}`} />
          <span>{timeLeft.toFixed(1)}s LEFT</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-4 bg-white border-3 border-black overflow-hidden mb-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <motion.div
          className={`h-full transition-all ${
            isUrgent ? 'bg-pink-500' : 'bg-black'
          }`}
          style={{ width: `${progressRatio * 100}%` }}
        />
      </div>

      {/* Observation Card */}
      <div className="w-full bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 text-left relative">
        <div className="flex justify-between items-center mb-3">
          <span className="bg-black text-yellow-300 px-3 py-1 font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-yellow-300" />
            MEMORIZE THE ORIGINAL SOURCE TEXT
          </span>
          <span className="text-xs font-black uppercase text-gray-500">
            Observation Phase
          </span>
        </div>

        {/* The Prompt Text */}
        <div className="text-xl sm:text-2xl md:text-3xl font-black italic tracking-tight text-black leading-tight mb-4">
          '{sentence.originalText}'
        </div>

        {/* Context or humorous hint */}
        {sentence.humorousContext && (
          <div className="p-3 bg-yellow-100 border-2 border-black text-xs font-bold text-black flex items-center gap-2">
            <span>💡</span>
            <span>{sentence.humorousContext}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {onReturnToMainScreen && (
          <button
            id="btn-countdown-back-home"
            onClick={() => {
              soundEffects.playWheelClick();
              onReturnToMainScreen();
            }}
            className="px-5 py-3.5 bg-white hover:bg-yellow-200 text-black border-4 border-black font-black uppercase text-sm sm:text-base flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>← MAIN SCREEN</span>
          </button>
        )}

        <button
          id="btn-skip-memory"
          onClick={() => {
            soundEffects.playCurtainDrop();
            onSkipMemory();
          }}
          className="px-6 py-3.5 bg-black text-white hover:bg-white hover:text-black border-4 border-black font-black uppercase text-sm sm:text-base flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <FastForward className="w-4 h-4" />
          <span>I'VE MEMORIZED IT! HIDE TEXT NOW →</span>
        </button>
      </div>

      <p className="text-xs text-black font-bold uppercase mt-3 text-center">
        The text will disappear when the timer reaches 0.0s. Get ready to rewrite!
      </p>

    </div>
  );
};

