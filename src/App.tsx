/**
 * Paraphrase Pandemonium - The Game-Show Paraphrase Challenge
 * @license Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, RotateCcw, Zap, Flame, Award, HelpCircle } from 'lucide-react';

import { DifficultyLevel, SentenceItem, EvaluationResult, PowerUp, LeaderboardEntry, GameStage } from './types';
import { SENTENCE_DATABASE, DIFFICULTY_CONFIG } from './data/sentences';
import { soundEffects } from './utils/audio';
import { evaluateParaphrase } from './utils/nlpEvaluator';
import { fireConfetti } from './utils/confetti';

import { Header } from './components/Header';
import { MascotHost } from './components/MascotHost';
import { MainScreen } from './components/MainScreen';
import { CountdownTimer } from './components/CountdownTimer';
import { ParaphraseInputArea } from './components/ParaphraseInputArea';
import { FeedbackCard } from './components/FeedbackCard';
import { PowerUpPanel } from './components/PowerUpPanel';
import { LeaderboardModal } from './components/LeaderboardModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { CustomSentenceModal } from './components/CustomSentenceModal';

const INITIAL_POWER_UPS: PowerUp[] = [
  { id: 'double_points', name: '2X Points', icon: '💎', description: 'Doubles all points earned this round', count: 2, isActive: false },
  { id: 'extra_time', name: '+5s Memory', icon: '⏱️', description: 'Adds 5 extra seconds to observation timer', count: 2, isActive: false },
  { id: 'synonym_hint', name: 'Synonym Clue', icon: '💡', description: 'Reveals 3 synonym suggestions while typing', count: 2, isActive: false },
  { id: 'streak_shield', name: 'Streak Shield', icon: '🛡️', description: 'Protects streak from resetting on low scores', count: 1, isActive: false },
];

export default function App() {
  // Game State
  const [stage, setStage] = useState<GameStage>('menu');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('easy');
  const [currentSentence, setCurrentSentence] = useState<SentenceItem>(SENTENCE_DATABASE[0]);
  const [userParaphrase, setUserParaphrase] = useState('');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Scores and Session Progress
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [totalStarsEarned, setTotalStarsEarned] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  // Player Info
  const [playerName, setPlayerName] = useState('Word Wizard');
  const [playerAvatar, setPlayerAvatar] = useState('🦜');

  // Power-ups
  const [powerUps, setPowerUps] = useState<PowerUp[]>(INITIAL_POWER_UPS);

  // Sound Mute
  const [isMuted, setIsMuted] = useState(false);

  // Modals
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isCustomSentenceOpen, setIsCustomSentenceOpen] = useState(false);

  // Leaderboard Entries
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('paraphrase_leaderboard');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return [
      { id: '1', playerName: 'Lexical Legend', avatar: '🧙‍♂️', score: 1450, starsTotal: 12, highestStreak: 5, difficulty: 'nightmare', roundsPlayed: 6, date: 'Today', titleBadge: 'Grandmaster' },
      { id: '2', playerName: 'Synonym Sleuth', avatar: '🦊', score: 980, starsTotal: 9, highestStreak: 4, difficulty: 'hard', roundsPlayed: 4, date: 'Today', titleBadge: 'Alchemist' },
      { id: '3', playerName: 'Captain Clause', avatar: '🚀', score: 620, starsTotal: 6, highestStreak: 2, difficulty: 'medium', roundsPlayed: 3, date: 'Today', titleBadge: 'Wordsmith' },
    ];
  });

  // Keep track of used sentence IDs to avoid immediate repeats
  const [seenSentenceIds, setSeenSentenceIds] = useState<string[]>([]);

  // Init audio mute state
  useEffect(() => {
    setIsMuted(soundEffects.getMuted());
  }, []);

  // Save leaderboard to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('paraphrase_leaderboard', JSON.stringify(leaderboard));
    }
  }, [leaderboard]);

  const handleToggleMute = () => {
    const nextMute = soundEffects.toggleMute();
    setIsMuted(nextMute);
  };

  // Helper to pick next sentence
  const pickNextSentence = useCallback((difficulty: DifficultyLevel) => {
    const pool = SENTENCE_DATABASE.filter((s) => s.difficulty === difficulty);
    const available = pool.filter((s) => !seenSentenceIds.includes(s.id));
    const finalPool = available.length > 0 ? available : pool; // Reset if all seen

    const randomIndex = Math.floor(Math.random() * finalPool.length);
    const chosen = finalPool[randomIndex];

    setSeenSentenceIds((prev) => [...prev.slice(-15), chosen.id]);
    return chosen;
  }, [seenSentenceIds]);

  // Start a new game round
  const handleStartGame = (diff: DifficultyLevel) => {
    soundEffects.playPowerUp();
    setSelectedDifficulty(diff);
    const nextSentence = pickNextSentence(diff);
    setCurrentSentence(nextSentence);
    setUserParaphrase('');
    setEvaluation(null);
    setStage('countdown');
  };

  // Power-up activator
  const handleUsePowerUp = (id: PowerUp['id']) => {
    setPowerUps((prev) =>
      prev.map((pu) => {
        if (pu.id === id && pu.count > 0 && !pu.isActive) {
          return { ...pu, count: pu.count - 1, isActive: true };
        }
        return pu;
      })
    );
  };

  // When observation timer expires or user skips
  const handleTimeExpired = () => {
    setStage('typing');
  };

  // Submit and evaluate paraphrase
  const handleSubmitParaphrase = (text: string) => {
    setIsEvaluating(true);
    setUserParaphrase(text);

    const isDoublePoints = powerUps.some((p) => p.id === 'double_points' && p.isActive);
    const isStreakShield = powerUps.some((p) => p.id === 'streak_shield' && p.isActive);

    // Simulate snappy game show suspense calculation
    setTimeout(() => {
      const result = evaluateParaphrase(text, currentSentence, isDoublePoints);
      setEvaluation(result);
      setIsEvaluating(false);
      setStage('feedback');

      // Update scores
      setScore((prev) => prev + result.awardedPoints);
      setTotalStarsEarned((prev) => prev + result.totalStars);
      setRoundsPlayed((prev) => prev + 1);

      // Streaks
      if (result.totalStars >= 2) {
        setStreak((prev) => {
          const nextStreak = prev + 1;
          setHighestStreak((h) => Math.max(h, nextStreak));
          return nextStreak;
        });

        // Chance to earn a random power-up on good streaks!
        if (Math.random() > 0.45) {
          const randomPUs: PowerUp['id'][] = ['double_points', 'extra_time', 'synonym_hint', 'streak_shield'];
          const rewardedPU = randomPUs[Math.floor(Math.random() * randomPUs.length)];
          setPowerUps((prev) =>
            prev.map((p) => (p.id === rewardedPU ? { ...p, count: p.count + 1 } : p))
          );
        }
      } else {
        if (!isStreakShield) {
          setStreak(0);
        }
      }

      // Reset active power-ups
      setPowerUps((prev) => prev.map((p) => ({ ...p, isActive: false })));

      // Sounds & Confetti
      if (result.totalStars === 3) {
        soundEffects.playDing(3);
        soundEffects.playVictoryFanfare();
        fireConfetti();
      } else if (result.totalStars >= 1) {
        soundEffects.playDing(result.totalStars);
      } else {
        soundEffects.playBuzzer();
      }

      // Update leaderboard record
      updateLeaderboard(result.awardedPoints, result.totalStars);
    }, 600);
  };

  const updateLeaderboard = (pts: number, stars: number) => {
    setLeaderboard((prev) => {
      const newScore = score + pts;
      const existing = prev.find((e) => e.playerName === playerName);

      let badge = 'Contestant';
      if (newScore > 1200) badge = 'Grandmaster';
      else if (newScore > 700) badge = 'Alchemist';
      else if (newScore > 300) badge = 'Wordsmith';

      let updated: LeaderboardEntry[];
      if (existing) {
        updated = prev.map((e) =>
          e.playerName === playerName
            ? {
                ...e,
                score: Math.max(e.score, newScore),
                starsTotal: e.starsTotal + stars,
                highestStreak: Math.max(e.highestStreak, streak + (stars >= 2 ? 1 : 0)),
                roundsPlayed: e.roundsPlayed + 1,
                titleBadge: badge,
              }
            : e
        );
      } else {
        const newEntry: LeaderboardEntry = {
          id: `entry-${Date.now()}`,
          playerName,
          avatar: playerAvatar,
          score: newScore,
          starsTotal: stars,
          highestStreak: stars >= 2 ? 1 : 0,
          difficulty: selectedDifficulty,
          roundsPlayed: 1,
          date: 'Just now',
          titleBadge: badge,
        };
        updated = [newEntry, ...prev];
      }

      return updated.sort((a, b) => b.score - a.score).slice(0, 15);
    });
  };

  // Launch Custom Sentence Challenge
  const handleLaunchCustomSentence = (customItem: SentenceItem) => {
    setSelectedDifficulty(customItem.difficulty);
    setCurrentSentence(customItem);
    setUserParaphrase('');
    setEvaluation(null);
    soundEffects.playPowerUp();
    setStage('countdown');
  };

  // Next Question
  const handleNextQuestion = () => {
    handleStartGame(selectedDifficulty);
  };

  // Retry same question or difficulty
  const handleRetryQuestion = () => {
    handleStartGame(selectedDifficulty);
  };

  // Return to Menu
  const handleReturnHome = () => {
    soundEffects.playWheelClick();
    setStage('menu');
  };

  // Compute observation time (base + active power-ups)
  const isExtraTimeActive = powerUps.some((p) => p.id === 'extra_time' && p.isActive);
  const totalObservationTime = DIFFICULTY_CONFIG[selectedDifficulty].timeSeconds + (isExtraTimeActive ? 5 : 0);

  // Mascot dynamic reaction mood
  const getMascotMood = () => {
    if (stage === 'countdown') return 'countdown';
    if (stage === 'typing') return 'thinking';
    if (stage === 'feedback' && evaluation) {
      if (evaluation.mascotReaction === 'robot') return 'robot';
      if (evaluation.mascotReaction === 'grandma') return 'grandma';
      if (evaluation.mascotReaction === 'nightmare_slayer') return 'nightmare';
      if (evaluation.totalStars === 3) return 'chef';
      if (evaluation.totalStars >= 2) return 'cheering';
      return 'thinking';
    }
    return 'idle';
  };

  return (
    <div className="min-h-screen bg-[#FFD700] text-black flex flex-col justify-between selection:bg-black selection:text-[#FFD700] font-sans">
      
      {/* Top Game-Show Header */}
      <Header
        score={score}
        streak={streak}
        isMuted={isMuted}
        stage={stage}
        onToggleMute={handleToggleMute}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
        onOpenCustomSentence={() => setIsCustomSentenceOpen(true)}
        onHome={handleReturnHome}
      />

      {/* Main Game Stage Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center justify-center">
        
        {/* Persistent Mascot Banter Bar */}
        <div className="w-full max-w-3xl mb-6">
          <MascotHost
            mood={getMascotMood()}
            customQuote={stage === 'feedback' && evaluation ? evaluation.humorousMessage : undefined}
          />
        </div>

        {/* Dynamic Stages with Motion transitions */}
        <AnimatePresence mode="wait">
          
          {/* STAGE 1: Main Screen & Studio Hub */}
          {stage === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              <MainScreen
                selectedDifficulty={selectedDifficulty}
                onSelectDifficulty={setSelectedDifficulty}
                onStartGame={handleStartGame}
                onOpenCustomSentence={() => setIsCustomSentenceOpen(true)}
                onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
                onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
                playerName={playerName}
                playerAvatar={playerAvatar}
                onUpdatePlayer={(name, av) => {
                  setPlayerName(name);
                  setPlayerAvatar(av);
                }}
                score={score}
                highestStreak={highestStreak}
                totalStarsEarned={totalStarsEarned}
                roundsPlayed={roundsPlayed}
                powerUps={powerUps}
              />
            </motion.div>
          )}

          {/* STAGE 2: Countdown Observation Stage */}
          {stage === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              <PowerUpPanel
                powerUps={powerUps}
                onUsePowerUp={handleUsePowerUp}
              />

              <CountdownTimer
                sentence={currentSentence}
                totalTime={totalObservationTime}
                onTimeExpired={handleTimeExpired}
                onSkipMemory={handleTimeExpired}
                onReturnToMainScreen={handleReturnHome}
              />
            </motion.div>
          )}

          {/* STAGE 3: Typing Stage (Covered Text) */}
          {stage === 'typing' && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              <ParaphraseInputArea
                sentence={currentSentence}
                activePowerUps={powerUps}
                onSubmit={handleSubmitParaphrase}
                isEvaluating={isEvaluating}
                onReturnToMainScreen={handleReturnHome}
              />
            </motion.div>
          )}

          {/* STAGE 4: Feedback Verdict & Comparison Breakdown */}
          {stage === 'feedback' && evaluation && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <FeedbackCard
                evaluation={evaluation}
                sentence={currentSentence}
                userParaphrase={userParaphrase}
                onNextQuestion={handleNextQuestion}
                onRetryQuestion={handleRetryQuestion}
                onReturnToMainScreen={handleReturnHome}
              />
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Footer Info & Studio Credits */}
      <footer className="w-full py-4 text-center text-xs font-black uppercase text-black border-t-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-300 px-2 py-0.5 border border-black font-black">PARAPHRASE PANDEMONIUM</span>
            <span>•</span>
            <span>Educational Game Show Studio</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsHowToPlayOpen(true)}
              className="hover:underline cursor-pointer"
            >
              Rules & Strategy
            </button>
            <span>•</span>
            <button
              onClick={() => setIsLeaderboardOpen(true)}
              className="hover:underline cursor-pointer"
            >
              Session Ranks ({roundsPlayed} played)
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        entries={leaderboard}
        currentScore={score}
        currentStreak={streak}
        playerName={playerName}
        playerAvatar={playerAvatar}
        onUpdatePlayer={(name, av) => {
          setPlayerName(name);
          setPlayerAvatar(av);
        }}
      />

      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />

      <CustomSentenceModal
        isOpen={isCustomSentenceOpen}
        onClose={() => setIsCustomSentenceOpen(false)}
        onCreateCustomSentence={handleLaunchCustomSentence}
      />

    </div>
  );
}
