import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Eye, EyeOff, RotateCcw, ArrowRight, Award, Sparkles, BookOpen, Home } from 'lucide-react';
import { EvaluationResult, SentenceItem } from '../types';
import { soundEffects } from '../utils/audio';

interface FeedbackCardProps {
  evaluation: EvaluationResult;
  sentence: SentenceItem;
  userParaphrase: string;
  onNextQuestion: () => void;
  onRetryQuestion: () => void;
  onReturnToMainScreen?: () => void;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  evaluation,
  sentence,
  userParaphrase,
  onNextQuestion,
  onRetryQuestion,
  onReturnToMainScreen,
}) => {
  const [showOriginal, setShowOriginal] = useState(false);

  const getMetricColor = (val: number) => {
    if (val >= 75) return 'text-black bg-green-300 border-2 border-black font-black';
    if (val >= 50) return 'text-black bg-yellow-300 border-2 border-black font-black';
    return 'text-black bg-red-300 border-2 border-black font-black';
  };

  const getMetricBarColor = (val: number) => {
    if (val >= 75) return 'bg-emerald-400';
    if (val >= 50) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      
      {/* Top Banner with Star Rating */}
      <div className="w-full bg-white border-4 border-black p-5 sm:p-7 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 text-center relative">
        
        {/* Stars */}
        <div className="flex items-center justify-center gap-3 mb-3">
          {[...Array(3)].map((_, i) => {
            const isEarned = i < evaluation.totalStars;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.12 * i, type: 'spring', stiffness: 220 }}
              >
                <Star
                  className={`w-12 h-12 sm:w-16 sm:h-16 stroke-[2.5] stroke-black ${
                    isEarned
                      ? 'text-yellow-400 fill-yellow-400 animate-bounce'
                      : 'text-gray-300 fill-gray-200'
                  }`}
                  style={{ animationDuration: `${1.2 + i * 0.2}s` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Score Title & Points */}
        <motion.h2
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-4xl font-black italic uppercase tracking-tighter text-black mb-2"
        >
          {evaluation.titleFeedback}
        </motion.h2>

        {/* Points awarded banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-300 border-2 border-black text-black font-black uppercase text-sm sm:text-base mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Award className="w-4 h-4 text-black" />
          +{evaluation.awardedPoints} POINTS AWARDED!
          {evaluation.bonusPoints > 0 && (
            <span className="text-xs text-black font-black bg-pink-300 px-2 py-0.5 border border-black ml-1">
              💎 2X BONUS
            </span>
          )}
        </div>

        {/* Mascot Humorous Feedback Bubble */}
        <div className="bg-pink-100 border-3 border-black p-4 max-w-xl mx-auto mb-6 flex items-center gap-3 text-left shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-3xl sm:text-4xl select-none flex-shrink-0">
            {evaluation.mascotEmoji}
          </span>
          <div className="text-sm sm:text-base text-black font-bold leading-snug">
            "{evaluation.humorousMessage}"
          </div>
        </div>

        {/* 3 Core Feedback Metric Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          
          {/* 1. Synonym Score */}
          <div className="bg-white border-3 border-black p-3.5 text-left shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-black uppercase tracking-wider">
                🔄 Synonym
              </span>
              <span className={`text-xs px-2 py-0.5 ${getMetricColor(evaluation.synonymScore)}`}>
                {evaluation.synonymScore}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 border-2 border-black overflow-hidden mb-2">
              <div
                className={`h-full transition-all duration-1000 ${getMetricBarColor(evaluation.synonymScore)}`}
                style={{ width: `${evaluation.synonymScore}%` }}
              />
            </div>
            <p className="text-[11px] font-bold text-gray-700 leading-tight">
              {evaluation.breakdown.wordsChangedPercentage}% of content words replaced.
            </p>
          </div>

          {/* 2. Structure Score */}
          <div className="bg-white border-3 border-black p-3.5 text-left shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-black uppercase tracking-wider">
                🏗️ Structure
              </span>
              <span className={`text-xs px-2 py-0.5 ${getMetricColor(evaluation.structureScore)}`}>
                {evaluation.structureScore}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 border-2 border-black overflow-hidden mb-2">
              <div
                className={`h-full transition-all duration-1000 ${getMetricBarColor(evaluation.structureScore)}`}
                style={{ width: `${evaluation.structureScore}%` }}
              />
            </div>
            <p className="text-[11px] font-bold text-gray-700 leading-tight">
              {evaluation.breakdown.structureAnalysis}
            </p>
          </div>

          {/* 3. Meaning Score */}
          <div className="bg-white border-3 border-black p-3.5 text-left shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-black uppercase tracking-wider">
                🎯 Meaning
              </span>
              <span className={`text-xs px-2 py-0.5 ${getMetricColor(evaluation.meaningScore)}`}>
                {evaluation.meaningScore}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 border-2 border-black overflow-hidden mb-2">
              <div
                className={`h-full transition-all duration-1000 ${getMetricBarColor(evaluation.meaningScore)}`}
                style={{ width: `${evaluation.meaningScore}%` }}
              />
            </div>
            <p className="text-[11px] font-bold text-gray-700 leading-tight">
              {evaluation.breakdown.meaningNotes}
            </p>
          </div>

        </div>

        {/* User Paraphrase Box */}
        <div className="bg-yellow-50 border-3 border-black p-4 text-left mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-[10px] font-black text-gray-600 uppercase tracking-wider mb-1">
            YOUR SUBMISSION:
          </div>
          <div className="text-sm sm:text-base text-black font-bold">
            "{userParaphrase}"
          </div>
        </div>

        {/* Reveal Original vs Paraphrase Comparison Toggle */}
        <div className="flex flex-col items-center gap-3">
          <button
            id="btn-reveal-original"
            onClick={() => {
              soundEffects.playWheelClick();
              setShowOriginal(!showOriginal);
            }}
            className="px-5 py-2.5 bg-white hover:bg-yellow-200 text-black border-2 border-black text-xs sm:text-sm font-black uppercase flex items-center gap-2 cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
          >
            {showOriginal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showOriginal ? 'HIDE ORIGINAL COMPARISON' : 'REVEAL ORIGINAL TO COMPARE'}</span>
          </button>
        </div>

        {/* Side-by-side comparison drawer */}
        <AnimatePresence>
          {showOriginal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 text-left border-t-2 border-black pt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                
                {/* Original Prompt */}
                <div className="bg-red-50 border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-xs font-black text-black uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <span>📜 Original Text</span>
                  </div>
                  <p className="text-xs sm:text-sm text-black font-bold leading-relaxed">
                    {sentence.originalText}
                  </p>
                </div>

                {/* Model Ideal Paraphrase */}
                <div className="bg-green-50 border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-xs font-black text-black uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>Sample 3-Star Paraphrase</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-900 font-bold leading-relaxed">
                    "{sentence.sampleGoodParaphrase}"
                  </p>
                </div>

              </div>

              {/* Educational Coach Tip */}
              <div className="bg-yellow-100 border-2 border-black p-3.5 flex items-start gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <BookOpen className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                <div className="text-xs text-black leading-relaxed font-bold">
                  <strong className="text-black font-black uppercase">Coach Tip: </strong>
                  {sentence.educationalTip}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Action Footer: Next Question / Retry / Main Screen */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {onReturnToMainScreen && (
          <button
            id="btn-feedback-back-home"
            onClick={() => {
              soundEffects.playWheelClick();
              onReturnToMainScreen();
            }}
            className="px-5 py-3.5 bg-yellow-300 hover:bg-yellow-200 text-black font-black uppercase text-sm flex items-center gap-2 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>MAIN SCREEN</span>
          </button>
        )}

        <button
          id="btn-retry-question"
          onClick={onRetryQuestion}
          className="px-5 py-3.5 bg-white hover:bg-yellow-100 text-black font-black uppercase text-sm flex items-center gap-2 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>TRY SAME DIFFICULTY</span>
        </button>

        <motion.button
          id="btn-next-question"
          onClick={onNextQuestion}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3.5 bg-black text-white hover:bg-white hover:text-black font-black uppercase text-base sm:text-lg flex items-center gap-2.5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-4 border-black transition-all cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <span>NEXT QUESTION</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

    </div>
  );
};

