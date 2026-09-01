import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Dices, 
  Clock, 
  Trophy, 
  PlusCircle, 
  BookOpen, 
  Sparkles, 
  Flame, 
  Star, 
  Zap, 
  User, 
  Edit3, 
  Check, 
  ArrowRight,
  Shield,
  Lightbulb
} from 'lucide-react';
import { DifficultyLevel, PowerUp } from '../types';
import { DIFFICULTY_CONFIG, SENTENCE_DATABASE } from '../data/sentences';
import { soundEffects } from '../utils/audio';

interface MainScreenProps {
  selectedDifficulty: DifficultyLevel;
  onSelectDifficulty: (diff: DifficultyLevel) => void;
  onStartGame: (diff: DifficultyLevel) => void;
  onOpenCustomSentence: () => void;
  onOpenLeaderboard: () => void;
  onOpenHowToPlay: () => void;
  playerName: string;
  playerAvatar: string;
  onUpdatePlayer: (name: string, avatar: string) => void;
  score: number;
  highestStreak: number;
  totalStarsEarned: number;
  roundsPlayed: number;
  powerUps: PowerUp[];
}

export const MainScreen: React.FC<MainScreenProps> = ({
  selectedDifficulty,
  onSelectDifficulty,
  onStartGame,
  onOpenCustomSentence,
  onOpenLeaderboard,
  onOpenHowToPlay,
  playerName,
  playerAvatar,
  onUpdatePlayer,
  score,
  highestStreak,
  totalStarsEarned,
  roundsPlayed,
  powerUps,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinnerAngle, setSpinnerAngle] = useState(0);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(playerName);
  const [tempAvatar, setTempAvatar] = useState(playerAvatar);

  const levels: DifficultyLevel[] = ['easy', 'medium', 'hard', 'nightmare'];
  const avatarChoices = ['🐼', '🦜', '🧙‍♂️', '👑', '🚀', '🦊', '⚡', '🎩', '🧠', '🐯'];

  const handleRandomSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const randomCycles = 5 + Math.floor(Math.random() * 4);
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

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdatePlayer(tempName.trim(), tempAvatar);
      setIsEditingProfile(false);
    }
  };

  // Sample featured sentence preview
  const featuredSentence = SENTENCE_DATABASE[Math.floor(Math.random() * SENTENCE_DATABASE.length)];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-6">
      
      {/* 1. Main Game Show Stage Hero & Marquee */}
      <div className="w-full bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden">
        
        {/* Top Marquee Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black text-yellow-300 text-xs font-black uppercase tracking-wider mb-4 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
          <span>SEASON 1 • THE LIVE EDUCATIONAL GAME SHOW</span>
          <span className="hidden sm:inline bg-pink-500 text-white px-2 py-0.2 ml-1">ON AIR</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-black mb-3">
          PARAPHRASE PANDEMONIUM! 🐼
        </h1>
        
        <p className="text-black text-sm sm:text-lg max-w-2xl mx-auto font-bold leading-relaxed mb-6">
          Memorize the phrase before the observation timer runs out, then rewrite it in your own words!
          Win stars for <span className="bg-yellow-200 px-1.5 border border-black text-black font-black">clever synonyms</span>, <span className="bg-blue-100 px-1.5 border border-black text-black font-black">restructured syntax</span>, and <span className="bg-green-200 px-1.5 border border-black text-black font-black">accurate meaning</span>!
        </p>

        {/* Primary Call to Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <motion.button
            id="btn-main-start-game"
            onClick={() => onStartGame(selectedDifficulty)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 sm:px-10 py-4 bg-black text-white hover:bg-yellow-300 hover:text-black font-black uppercase text-lg sm:text-xl flex items-center gap-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <Play className="w-6 h-6 fill-current" />
            <span>START GAME NOW! →</span>
          </motion.button>

          <motion.button
            id="btn-main-spin-wheel"
            disabled={isSpinning}
            onClick={handleRandomSpin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-4 bg-pink-400 hover:bg-pink-300 text-black font-black uppercase text-base sm:text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2.5 border-4 border-black transition-all cursor-pointer disabled:opacity-50 active:translate-x-0.5 active:translate-y-0.5"
          >
            <motion.div
              animate={{ rotate: isSpinning ? 360 * 4 : spinnerAngle }}
              transition={{ duration: isSpinning ? 1.6 : 0.3, ease: 'easeInOut' }}
            >
              <Dices className="w-5 h-5 text-black" />
            </motion.div>
            <span>{isSpinning ? 'SPINNING...' : 'RANDOM DIFFICULTY 🎡'}</span>
          </motion.button>
        </div>
      </div>

      {/* 2. Difficulty Level Selector Cards */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-black uppercase text-black">
              SELECT CHALLENGE LEVEL:
            </span>
            <span className="bg-yellow-300 text-black px-2 py-0.5 border border-black font-black text-xs uppercase">
              {selectedDifficulty.toUpperCase()} ACTIVE
            </span>
          </div>
          <span className="text-xs font-bold text-gray-700 hidden sm:inline uppercase">
            Click a card to choose or press Play
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {levels.map((level) => {
            const config = DIFFICULTY_CONFIG[level];
            const isSelected = selectedDifficulty === level;

            return (
              <motion.div
                key={level}
                id={`main-difficulty-card-${level}`}
                onClick={() => {
                  soundEffects.playWheelClick();
                  onSelectDifficulty(level);
                }}
                whileHover={{ y: -2 }}
                className={`relative cursor-pointer p-4 sm:p-5 border-4 border-black text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-yellow-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ring-2 ring-black'
                    : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-50'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-3.5 right-3 px-2 py-0.5 bg-black text-yellow-300 font-black text-[10px] uppercase tracking-wider border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    SELECTED ★
                  </div>
                )}

                <div>
                  {/* Emoji & Time */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{config.emoji}</span>
                    <span className="flex items-center gap-1 text-[11px] font-black uppercase px-2 py-0.5 bg-black text-white border border-black">
                      <Clock className="w-3 h-3 text-yellow-300" />
                      {config.timeSeconds}s
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-black italic uppercase text-lg sm:text-xl text-black mb-1">
                    {config.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-700 font-bold leading-tight mb-4">
                    {config.description}
                  </p>
                </div>

                {/* Card Action Button */}
                <button
                  id={`btn-play-level-${level}`}
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
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isSelected ? `PLAY ${config.name.toUpperCase()}` : 'SELECT & PLAY'}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Quick Action Hub (Custom Challenge, Hall of Fame, Rules) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        
        {/* Custom Challenge Card */}
        <div 
          onClick={onOpenCustomSentence}
          className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] text-left hover:bg-green-50 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 bg-green-300 border-2 border-black flex items-center justify-center text-xl mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ✍️
            </div>
            <h3 className="text-lg font-black italic uppercase text-black mb-1 group-hover:underline">
              Custom Prompt
            </h3>
            <p className="text-xs font-bold text-gray-700 leading-relaxed mb-4">
              Enter your own classroom sentence, complex paragraph, or trick phrase to test.
            </p>
          </div>
          <button 
            id="btn-main-custom-prompt"
            className="w-full py-2 bg-white group-hover:bg-green-300 border-2 border-black text-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>CREATE PROMPT →</span>
          </button>
        </div>

        {/* Hall of Fame Card */}
        <div 
          onClick={onOpenLeaderboard}
          className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] text-left hover:bg-yellow-50 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 bg-yellow-300 border-2 border-black flex items-center justify-center text-xl mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              🏆
            </div>
            <h3 className="text-lg font-black italic uppercase text-black mb-1 group-hover:underline">
              Hall of Fame
            </h3>
            <p className="text-xs font-bold text-gray-700 leading-relaxed mb-4">
              View session high scores, highest hot streaks, and champion titles.
            </p>
          </div>
          <button 
            id="btn-main-leaderboard"
            className="w-full py-2 bg-white group-hover:bg-yellow-300 border-2 border-black text-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>VIEW LEADERBOARD →</span>
          </button>
        </div>

        {/* Rules & Strategy Guide */}
        <div 
          onClick={onOpenHowToPlay}
          className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] text-left hover:bg-blue-50 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 bg-blue-200 border-2 border-black flex items-center justify-center text-xl mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              🎓
            </div>
            <h3 className="text-lg font-black italic uppercase text-black mb-1 group-hover:underline">
              Rules & Strategy
            </h3>
            <p className="text-xs font-bold text-gray-700 leading-relaxed mb-4">
              Master the 3 pillars of paraphrasing: Synonyms, Sentence Structure, and Meaning.
            </p>
          </div>
          <button 
            id="btn-main-rules"
            className="w-full py-2 bg-white group-hover:bg-blue-200 border-2 border-black text-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>HOW TO WIN →</span>
          </button>
        </div>

      </div>

      {/* 4. Contestant Lounge & Power-Up Vault Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        
        {/* Contestant Profile Card */}
        <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase text-black flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-black" />
              CONTESTANT PROFILE
            </span>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="text-[11px] font-black uppercase px-2 py-0.5 bg-yellow-100 hover:bg-yellow-200 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              {isEditingProfile ? 'CANCEL' : 'EDIT'}
            </button>
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="block text-[11px] font-black uppercase text-black mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  maxLength={18}
                  className="w-full p-2 bg-yellow-50 border-2 border-black text-xs font-bold text-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-black mb-1">
                  Choose Avatar:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {avatarChoices.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setTempAvatar(av)}
                      className={`w-8 h-8 border border-black text-base flex items-center justify-center cursor-pointer ${
                        tempAvatar === av ? 'bg-yellow-300 ring-2 ring-black font-bold' : 'bg-white'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-1.5 bg-black text-white hover:bg-yellow-300 hover:text-black border-2 border-black font-black uppercase text-xs cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                SAVE PROFILE
              </button>
            </form>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-pink-100 border-2 border-black flex items-center justify-center text-3xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {playerAvatar}
                </div>
                <div>
                  <div className="text-base font-black uppercase text-black">
                    {playerName}
                  </div>
                  <div className="text-[11px] font-bold text-gray-600 uppercase">
                    Rounds Played: {roundsPlayed}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-yellow-50 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-[10px] font-black uppercase text-gray-600">Points</div>
                  <div className="text-base font-black text-black">{score.toLocaleString()}</div>
                </div>
                <div className="p-2 bg-pink-50 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-[10px] font-black uppercase text-gray-600">Streak</div>
                  <div className="text-base font-black text-pink-600 flex items-center justify-center gap-0.5">
                    <Flame className="w-3.5 h-3.5 fill-pink-500 text-pink-600" />
                    {highestStreak}
                  </div>
                </div>
                <div className="p-2 bg-green-50 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-[10px] font-black uppercase text-gray-600">Stars</div>
                  <div className="text-base font-black text-yellow-600 flex items-center justify-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                    {totalStarsEarned}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Power-Up Vault Summary */}
        <div className="lg:col-span-2 bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase text-black flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-black" />
              POWER-UP INVENTORY
            </span>
            <span className="text-[11px] font-bold text-gray-600 uppercase">
              Earn more on 2+ Star Streaks!
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {powerUps.map((pu) => (
              <div 
                key={pu.id}
                className="p-2.5 bg-yellow-50 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{pu.icon}</span>
                  <span className="px-1.5 py-0.2 bg-black text-yellow-300 font-black text-[10px] uppercase">
                    x{pu.count}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-black truncate">
                    {pu.name}
                  </div>
                  <div className="text-[10px] font-bold text-gray-600 leading-tight">
                    {pu.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
