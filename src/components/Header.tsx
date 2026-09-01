import React from 'react';
import { Volume2, VolumeX, Trophy, HelpCircle, Flame, Home, PlusCircle } from 'lucide-react';
import { GameStage } from '../types';
import { soundEffects } from '../utils/audio';

interface HeaderProps {
  score: number;
  streak: number;
  isMuted: boolean;
  stage?: GameStage;
  onToggleMute: () => void;
  onOpenLeaderboard: () => void;
  onOpenHowToPlay: () => void;
  onOpenCustomSentence: () => void;
  onHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  score,
  streak,
  isMuted,
  stage = 'menu',
  onToggleMute,
  onOpenLeaderboard,
  onOpenHowToPlay,
  onOpenCustomSentence,
  onHome,
}) => {
  return (
    <header className="w-full bg-white border-4 border-black p-3 sm:p-4 mb-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black transition-all">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Logo & Game Title */}
        <button
          id="btn-logo-home"
          onClick={onHome}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-400 border-3 border-black flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
            🐼
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-black">
                Paraphrase Pandemonium!
              </h1>
              <span className="bg-black text-white px-2 py-0.5 font-bold text-[10px] uppercase tracking-wider hidden sm:inline-block">
                LIVE
              </span>
            </div>
            <p className="text-[11px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
              <span>★</span> The Ultimate Rewording Arena
            </p>
          </div>
        </button>

        {/* Center Live Stats Pill (Score & Streak) */}
        <div className="flex items-center gap-4 sm:gap-6 bg-yellow-100 px-4 py-2 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-wider text-gray-600">Score</p>
            <p className="text-xl sm:text-2xl font-black leading-none text-black">
              {score.toLocaleString()}
            </p>
          </div>

          <div className="w-0.5 h-7 bg-black" />

          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-wider text-gray-600">Streak</p>
            <p className="text-xl sm:text-2xl font-black leading-none text-pink-600 flex items-center gap-1">
              <Flame className={`w-5 h-5 ${streak > 0 ? 'fill-pink-500 text-pink-600 animate-bounce' : 'text-gray-400'}`} />
              {streak}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          
          {/* Prominent Back to Main Screen button if in game, or Main Screen button */}
          <button
            id="btn-header-main-screen"
            onClick={onHome}
            title="Go to Main Screen"
            className={`px-3 py-2 border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer ${
              stage !== 'menu'
                ? 'bg-yellow-300 hover:bg-yellow-200 text-black ring-2 ring-black font-black'
                : 'bg-white hover:bg-yellow-200 text-black'
            }`}
          >
            <Home className="w-4 h-4 text-black" />
            <span>Main Screen</span>
          </button>

          {/* Custom Challenge */}
          <button
            id="btn-custom-sentence"
            onClick={onOpenCustomSentence}
            title="Create Custom Challenge"
            className="px-3 py-2 bg-white hover:bg-yellow-200 text-black border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Custom</span>
          </button>

          {/* Leaderboard */}
          <button
            id="btn-leaderboard-open"
            onClick={onOpenLeaderboard}
            title="Session Leaderboard"
            className="px-3 py-2 bg-white hover:bg-pink-200 text-black border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Ranks</span>
          </button>

          {/* How to play */}
          <button
            id="btn-how-to-play"
            onClick={onOpenHowToPlay}
            title="How To Play & Rules"
            className="p-2 bg-white hover:bg-blue-200 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </button>

          {/* Audio toggle */}
          <button
            id="btn-toggle-audio"
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="p-2 bg-white hover:bg-slate-200 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};

