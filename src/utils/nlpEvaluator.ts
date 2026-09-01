import { EvaluationResult, SentenceItem } from '../types';

// Common English stop words
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been', 'before', 'being',
  'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot', 'could',
  'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t',
  'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t',
  'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s',
  'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how',
  'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is',
  'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most',
  'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over',
  'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should',
  'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their',
  'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they',
  'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to',
  'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll',
  'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s',
  'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s',
  'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re',
  'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

function cleanToken(w: string): string {
  return w.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function extractWords(text: string): string[] {
  return text
    .split(/\s+/)
    .map(cleanToken)
    .filter(w => w.length > 0);
}

function extractContentWords(text: string): string[] {
  return extractWords(text).filter(w => !STOP_WORDS.has(w));
}

// Compute Levenshtein distance for fuzzy root matching
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

function isSimilarWord(w1: string, w2: string): boolean {
  if (w1 === w2) return true;
  if (Math.abs(w1.length - w2.length) > 3) return false;
  const maxLen = Math.max(w1.length, w2.length);
  if (maxLen <= 3) return w1 === w2;
  const dist = levenshtein(w1, w2);
  return dist <= 2;
}

export function evaluateParaphrase(
  userText: string,
  targetSentence: SentenceItem,
  isDoublePoints: boolean = false
): EvaluationResult {
  const cleanUser = userText.trim();
  const userWords = extractWords(cleanUser);
  const userContentWords = extractContentWords(cleanUser);
  const origWords = extractWords(targetSentence.originalText);
  const origContentWords = extractContentWords(targetSentence.originalText);

  // Check 1: Empty or extremely short
  if (userWords.length < 3) {
    return {
      synonymScore: 0,
      structureScore: 0,
      meaningScore: 0,
      totalStars: 0,
      awardedPoints: 0,
      bonusPoints: 0,
      titleFeedback: 'Too Brief!',
      humorousMessage: 'Uh oh... did your keyboard run out of ink? We need at least a full sentence! 🪶',
      mascotReaction: 'confused',
      mascotEmoji: '🧐',
      breakdown: {
        wordsChangedPercentage: 0,
        originalWordCount: origWords.length,
        userWordCount: userWords.length,
        matchedKeywordsCount: 0,
        totalKeywordsCount: targetSentence.keywords.length,
        detectedSynonymReplacements: [],
        wordsKeptVerbatim: [],
        structureAnalysis: 'Sentence was too short to evaluate structure.',
        meaningNotes: 'Incomplete thought provided.',
        isVerbatimCopy: false,
        isTooShort: true,
        isGibberish: false
      }
    };
  }

  // Check 2: Verbatim plagiarism check (n-gram overlap)
  let matchingTrigrams = 0;
  const origTrigrams = new Set<string>();
  for (let i = 0; i <= origWords.length - 3; i++) {
    origTrigrams.add(`${origWords[i]} ${origWords[i+1]} ${origWords[i+2]}`);
  }
  for (let i = 0; i <= userWords.length - 3; i++) {
    const tri = `${userWords[i]} ${userWords[i+1]} ${userWords[i+2]}`;
    if (origTrigrams.has(tri)) {
      matchingTrigrams++;
    }
  }

  const maxTris = Math.max(1, origWords.length - 2);
  const trigramOverlapRatio = matchingTrigrams / maxTris;

  // Words kept verbatim
  const keptVerbatim: string[] = [];
  origContentWords.forEach(ow => {
    if (userContentWords.some(uw => isSimilarWord(ow, uw))) {
      if (!keptVerbatim.includes(ow)) {
        keptVerbatim.push(ow);
      }
    }
  });

  const contentWordsCount = Math.max(1, origContentWords.length);
  const exactKeptRatio = keptVerbatim.length / contentWordsCount;
  const isVerbatimCopy = trigramOverlapRatio > 0.65 || exactKeptRatio > 0.85;

  // Special Trick Handling for Nightmare #1 ("The cat sat on the mat" verbose trick)
  if (targetSentence.isSpecialTrick) {
    const userCleanSimple = cleanUser.toLowerCase();
    const isDejargonized = userCleanSimple.includes('cat') && (userCleanSimple.includes('sat') || userCleanSimple.includes('mat') || userCleanSimple.includes('rug'));
    if (isDejargonized) {
      const basePts = 300;
      const bonusPts = isDoublePoints ? 300 : 0;
      return {
        synonymScore: 98,
        structureScore: 95,
        meaningScore: 100,
        totalStars: 3,
        awardedPoints: basePts + bonusPts,
        bonusPoints: bonusPts,
        titleFeedback: 'TRICK SOLVED! 🎯🐱',
        humorousMessage: 'CHEF\'S KISS! 👨‍🍳💋 You saw right through the monstrous academic fluff and decoded the cat on the mat!',
        mascotReaction: 'nightmare_slayer',
        mascotEmoji: '👑😸',
        breakdown: {
          wordsChangedPercentage: 90,
          originalWordCount: origWords.length,
          userWordCount: userWords.length,
          matchedKeywordsCount: 3,
          totalKeywordsCount: 3,
          detectedSynonymReplacements: [
            { original: 'domesticated feline', replacedWith: 'cat' },
            { original: 'sedentary posture', replacedWith: 'sat' },
            { original: 'floor-covering apparatus', replacedWith: 'mat' }
          ],
          wordsKeptVerbatim: [],
          structureAnalysis: 'Brilliantly simplified 1000% of pretentious verbosity into pure crystal clarity.',
          meaningNotes: 'Perfect meaning preservation!',
          isVerbatimCopy: false,
          isTooShort: false,
          isGibberish: false
        }
      };
    }
  }

  // 1. Synonym Score: (How many content words were swapped with fresh synonyms or rephrased)
  const wordsChangedPercentage = Math.round(Math.max(0, Math.min(100, (1 - exactKeptRatio) * 100)));
  let synonymScore = wordsChangedPercentage;

  // Detect identified synonyms from dictionary
  const detectedReplacements: { original: string; replacedWith: string }[] = [];
  if (targetSentence.suggestedSynonyms) {
    Object.entries(targetSentence.suggestedSynonyms).forEach(([origKey, syns]) => {
      syns.forEach(syn => {
        const synWords = extractWords(syn);
        const hasSyn = synWords.every(sw => userWords.includes(sw));
        if (hasSyn) {
          detectedReplacements.push({ original: origKey, replacedWith: syn });
        }
      });
    });
  }

  // 2. Structure Score:
  // Check if first word changed, clause order shifted, punctuation or sentence length adjusted
  let structureScore = 50;
  if (userWords[0] !== origWords[0]) structureScore += 20; // changed starting word
  if (userWords[userWords.length - 1] !== origWords[origWords.length - 1]) structureScore += 10;
  
  // Sentence length proportion
  const lengthRatio = userWords.length / origWords.length;
  if (lengthRatio >= 0.6 && lengthRatio <= 1.5) {
    structureScore += 15;
  } else if (lengthRatio < 0.4 || lengthRatio > 2.2) {
    structureScore -= 25;
  }

  // Check for structural transition words (because, although, while, despite, since, consequently, however, by, as a result)
  const connectors = ['because', 'although', 'despite', 'while', 'since', 'consequently', 'therefore', 'however', 'by', 'as', 'due', 'after', 'before', 'whenever'];
  const userHasConnector = userWords.some(w => connectors.includes(w));
  const origHasConnector = origWords.some(w => connectors.includes(w));
  if (userHasConnector && !origHasConnector) structureScore += 10;
  if (userHasConnector && origHasConnector) structureScore += 5;

  structureScore = Math.max(10, Math.min(100, structureScore));

  // 3. Meaning Score:
  // Check semantic coverage of keywords (either exact, fuzzy, or via detected synonyms)
  let matchedKeywords = 0;
  targetSentence.keywords.forEach(kw => {
    const cleanKw = cleanToken(kw);
    const inUser = userWords.some(uw => isSimilarWord(uw, cleanKw));
    const inSyns = detectedReplacements.some(dr => dr.original.toLowerCase().includes(cleanKw));
    if (inUser || inSyns) {
      matchedKeywords++;
    }
  });

  const keywordCoverageRatio = matchedKeywords / Math.max(1, targetSentence.keywords.length);
  let meaningScore = Math.round(keywordCoverageRatio * 75);

  // Bonus for matching length and having detected synonyms
  if (detectedReplacements.length > 0) {
    meaningScore += Math.min(25, detectedReplacements.length * 10);
  }
  if (lengthRatio >= 0.7 && lengthRatio <= 1.4) {
    meaningScore += 10;
  }
  meaningScore = Math.max(15, Math.min(100, meaningScore));

  // Penalty if it is a verbatim copy
  if (isVerbatimCopy) {
    synonymScore = Math.min(15, synonymScore);
    structureScore = Math.min(20, structureScore);
    
    return {
      synonymScore,
      structureScore,
      meaningScore: 80, // technically kept meaning, but zero paraphrasing
      totalStars: 0,
      awardedPoints: 20,
      bonusPoints: 0,
      titleFeedback: 'Robot Detected! 🤖',
      humorousMessage: 'Uh oh... you channeled a robotic Xerox copier! 🤖 Try swapping words with synonyms and changing the sentence order!',
      mascotReaction: 'robot',
      mascotEmoji: '🤖',
      breakdown: {
        wordsChangedPercentage,
        originalWordCount: origWords.length,
        userWordCount: userWords.length,
        matchedKeywordsCount: matchedKeywords,
        totalKeywordsCount: targetSentence.keywords.length,
        detectedSynonymReplacements: detectedReplacements,
        wordsKeptVerbatim: keptVerbatim,
        structureAnalysis: 'Copied almost verbatim in original sequence.',
        meaningNotes: 'Meaning preserved, but no paraphrase skill applied!',
        isVerbatimCopy: true,
        isTooShort: false,
        isGibberish: false
      }
    };
  }

  // Calculate Star Rating (0 - 3)
  const compositeScore = (synonymScore * 0.4) + (structureScore * 0.3) + (meaningScore * 0.3);
  let totalStars = 0;
  let titleFeedback = '';
  let humorousMessage = '';
  let mascotReaction: EvaluationResult['mascotReaction'] = 'confused';
  let mascotEmoji = '🤔';

  if (compositeScore >= 72 && synonymScore >= 50 && meaningScore >= 60) {
    totalStars = 3;
    const compliments = [
      "That was CHEF'S KISS! 👨‍🍳💋 Shakespeare is quaking in his ruffled collar!",
      "ABSOLUTE LEXICAL MASTERY! 🌟 The game show audience is on their feet cheering!",
      "Phenomenal word gymnastics! 🤸 Perfect balance of fresh vocab and core meaning!",
      "You turned that sentence into pure gold! 🏆 A dictionary hall-of-famer!"
    ];
    humorousMessage = compliments[Math.floor(Math.random() * compliments.length)];
    titleFeedback = 'PERFECT PARAPHRASE! ⭐⭐⭐';
    mascotReaction = 'chef_kiss';
    mascotEmoji = '👨‍🍳💋';
  } else if (compositeScore >= 48) {
    totalStars = 2;
    const mediumMsgs = [
      "Not bad at all! 👵 My grandma could do slightly better, but you're getting super warm!",
      "Solid attempt! 🎩 You grabbed great synonyms, now try flipping the sentence structure upside down!",
      "Nice work! 👏 Keep stretching those vocabulary muscles and watch those repeated words!"
    ];
    humorousMessage = mediumMsgs[Math.floor(Math.random() * mediumMsgs.length)];
    titleFeedback = 'GREAT EFFORT! ⭐⭐';
    mascotReaction = 'impressed';
    mascotEmoji = '🧐';
  } else if (compositeScore >= 25) {
    totalStars = 1;
    const lowMsgs = [
      "A bit wobbly! 🎪 You swapped some words, but the sentence structure is clinging to dear life.",
      "Close, but no cigar! 🎺 Make sure you keep all key ideas intact while rewriting.",
      "The parrot is scratching its feathers... 🦜 You lost a few critical concepts on the way!"
    ];
    humorousMessage = lowMsgs[Math.floor(Math.random() * lowMsgs.length)];
    titleFeedback = 'NEEDS POLISH! ⭐';
    mascotReaction = 'laughing';
    mascotEmoji = '🦜';
  } else {
    totalStars = 0;
    humorousMessage = "Whoa there! 🌀 That drifted completely off track. Take a breath and let's try another round!";
    titleFeedback = 'MISS! ❌';
    mascotReaction = 'facepalm';
    mascotEmoji = '🤦';
  }

  // Base points calculation:
  // Easy: 100 pts per star
  // Medium: 150 pts per star
  // Hard: 200 pts per star
  // Nightmare: 300 pts per star
  const diffMultiplier = targetSentence.difficulty === 'nightmare' ? 100 : targetSentence.difficulty === 'hard' ? 75 : targetSentence.difficulty === 'medium' ? 50 : 35;
  const basePoints = totalStars * diffMultiplier;
  const bonusPoints = isDoublePoints ? basePoints : 0;

  return {
    synonymScore,
    structureScore,
    meaningScore,
    totalStars,
    awardedPoints: basePoints + bonusPoints,
    bonusPoints,
    titleFeedback,
    humorousMessage,
    mascotReaction,
    mascotEmoji,
    breakdown: {
      wordsChangedPercentage,
      originalWordCount: origWords.length,
      userWordCount: userWords.length,
      matchedKeywordsCount: matchedKeywords,
      totalKeywordsCount: targetSentence.keywords.length,
      detectedSynonymReplacements: detectedReplacements,
      wordsKeptVerbatim: keptVerbatim,
      structureAnalysis: structureScore > 70 ? 'Excellent syntactic restructuring & flow' : 'Fair structure, could benefit from clause inversion',
      meaningNotes: meaningScore > 75 ? 'All primary concepts successfully retained' : 'Some core ideas need clearer framing',
      isVerbatimCopy: false,
      isTooShort: false,
      isGibberish: false
    }
  };
}
