export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'nightmare';

export interface SentenceItem {
  id: string;
  difficulty: DifficultyLevel;
  originalText: string;
  category: string;
  keywords: string[];
  keyIdeas: string[];
  suggestedSynonyms: Record<string, string[]>;
  sampleGoodParaphrase: string;
  educationalTip: string;
  humorousContext?: string;
  isSpecialTrick?: boolean;
}

export interface EvaluationResult {
  synonymScore: number;       // 0 - 100%
  structureScore: number;     // 0 - 100%
  meaningScore: number;       // 0 - 100%
  totalStars: number;         // 0, 1, 2, or 3
  awardedPoints: number;      // raw points awarded
  bonusPoints: number;        // bonus from multipliers / power-ups
  humorousMessage: string;
  mascotReaction: 'chef_kiss' | 'impressed' | 'laughing' | 'robot' | 'grandma' | 'confused' | 'nightmare_slayer' | 'facepalm';
  mascotEmoji: string;
  titleFeedback: string;
  breakdown: {
    wordsChangedPercentage: number;
    originalWordCount: number;
    userWordCount: number;
    matchedKeywordsCount: number;
    totalKeywordsCount: number;
    detectedSynonymReplacements: { original: string; replacedWith: string }[];
    wordsKeptVerbatim: string[];
    structureAnalysis: string;
    meaningNotes: string;
    isVerbatimCopy: boolean;
    isTooShort: boolean;
    isGibberish: boolean;
  };
}

export interface PowerUp {
  id: 'double_points' | 'extra_time' | 'synonym_hint' | 'streak_shield';
  name: string;
  icon: string;
  description: string;
  count: number;
  isActive?: boolean;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  avatar: string;
  score: number;
  starsTotal: number;
  highestStreak: number;
  difficulty: DifficultyLevel | 'mixed';
  roundsPlayed: number;
  date: string;
  titleBadge: string;
}

export type GameStage = 
  | 'menu'
  | 'preview_spin'
  | 'countdown'
  | 'typing'
  | 'feedback'
  | 'summary';
