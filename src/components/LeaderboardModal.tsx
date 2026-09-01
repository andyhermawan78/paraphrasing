import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Trophy, Star, Flame } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: LeaderboardEntry[];
  currentScore: number;
  currentStreak: number;
  playerName: string;
  playerAvatar: string;
  onUpdatePlayer: (name: string, avatar: string) => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  entries,
  currentScore,
  currentStreak,
  playerName,
  playerAvatar,
  onUpdatePlayer,
}) => {
  if (!isOpen) return null;

  const [nameInput, setNameInput] = useState(playerName);
  const [avatarInput, setAvatarInput] = useState(playerAvatar);
  const [isEditing, setIsEditing] = useState(false);

  const avatars = ['🐼', '🦜', '🧙‍♂️', '👑', '🚀', '🦊', '⚡', '🎩'];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdatePlayer(nameInput.trim(), avatarInput);
      setIsEditing(false);
    }
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
              🏆
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight text-black">
                HALL OF FAME
              </h2>
              <p className="text-xs font-bold text-gray-600 uppercase">
                Session High Scores & Champions
              </p>
            </div>
          </div>

          <button
            id="btn-close-leaderboard"
            onClick={onClose}
            className="p-1.5 border-2 border-black bg-white hover:bg-red-200 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Player Card */}
        <div className="my-3 p-3.5 bg-yellow-100 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {playerAvatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm sm:text-base text-black uppercase">
                  {playerName}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 bg-black text-white font-black uppercase">
                  YOU
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                <span>Score: <strong className="text-black font-black">{currentScore}</strong></span>
                <span>•</span>
                <span>Streak: <strong className="text-pink-600 font-black">{currentStreak}🔥</strong></span>
              </div>
            </div>
          </div>

          <button
            id="btn-edit-profile"
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-black uppercase px-3 py-1.5 bg-white hover:bg-yellow-200 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
        </div>

        {/* Profile Edit Drawer */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mb-3 p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <label className="block text-xs font-black uppercase text-black mb-1">
              Contestant Name:
            </label>
            <div className="flex gap-2 mb-3">
              <input
                id="input-player-name"
                type="text"
                maxLength={18}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-yellow-50 border-2 border-black text-sm font-bold text-black focus:outline-none focus:bg-white"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-black text-white hover:bg-yellow-300 hover:text-black border-2 border-black text-xs font-black uppercase cursor-pointer"
              >
                Save
              </button>
            </div>

            <label className="block text-xs font-black uppercase text-black mb-1.5">
              Choose Avatar:
            </label>
            <div className="flex gap-2 flex-wrap">
              {avatars.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setAvatarInput(av)}
                  className={`w-9 h-9 border-2 border-black text-lg flex items-center justify-center transition-all cursor-pointer ${
                    avatarInput === av
                      ? 'bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white hover:bg-slate-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </form>
        )}

        {/* Entries List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-60">
          {entries.length === 0 ? (
            <div className="text-center py-8 text-gray-500 font-bold text-sm">
              No scores recorded yet! Complete your first challenge to enter the Hall of Fame.
            </div>
          ) : (
            entries.map((entry, index) => {
              const isTop3 = index < 3;
              const medals = ['🥇', '🥈', '🥉'];

              return (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-2.5 border-2 border-black transition-all ${
                    isTop3
                      ? 'bg-yellow-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 text-center font-black text-sm text-black">
                      {isTop3 ? medals[index] : `#${index + 1}`}
                    </div>
                    <div className="w-8 h-8 bg-white border border-black flex items-center justify-center text-lg">
                      {entry.avatar}
                    </div>
                    <div>
                      <div className="font-black text-xs sm:text-sm text-black uppercase">
                        {entry.playerName}
                      </div>
                      <div className="text-[10px] text-gray-600 font-bold flex items-center gap-1.5">
                        <span className="text-pink-600 font-black">{entry.titleBadge}</span>
                        <span>•</span>
                        <span>{entry.difficulty.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-black text-sm text-black">
                      {entry.score.toLocaleString()} <span className="text-[10px] text-gray-600">PTS</span>
                    </div>
                    <div className="text-[10px] text-gray-600 font-bold flex items-center justify-end gap-1">
                      <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                      <span>{entry.starsTotal}★</span>
                      <span>•</span>
                      <Flame className="w-2.5 h-2.5 text-pink-600" />
                      <span>{entry.highestStreak}🔥</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t-2 border-black text-center">
          <button
            id="btn-leaderboard-play-now"
            onClick={onClose}
            className="w-full py-3 bg-black text-white hover:bg-white hover:text-black border-3 border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            LET'S PLAY & CLIMB THE RANKS! →
          </button>
        </div>
      </motion.div>
    </div>
  );
};

