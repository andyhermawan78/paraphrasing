import { DifficultyLevel, SentenceItem } from '../types';

export const DIFFICULTY_CONFIG: Record<DifficultyLevel, {
  name: string;
  emoji: string;
  timeSeconds: number;
  badgeColor: string;
  borderColor: string;
  glowColor: string;
  cardBg: string;
  description: string;
}> = {
  easy: {
    name: 'Easy Peasy',
    emoji: '🟢',
    timeSeconds: 7,
    badgeColor: 'bg-emerald-300 text-black border-2 border-black font-black',
    borderColor: 'border-black',
    glowColor: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    cardBg: 'bg-emerald-100',
    description: 'Simple 1-clause punchy sentences. Quick and light!'
  },
  medium: {
    name: 'Medium Mayhem',
    emoji: '🟡',
    timeSeconds: 10,
    badgeColor: 'bg-yellow-300 text-black border-2 border-black font-black',
    borderColor: 'border-black',
    glowColor: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    cardBg: 'bg-yellow-100',
    description: 'Complex sentences with multiple dependent clauses & connectors.'
  },
  hard: {
    name: 'Hardcore Havoc',
    emoji: '🔴',
    timeSeconds: 15,
    badgeColor: 'bg-orange-300 text-black border-2 border-black font-black',
    borderColor: 'border-black',
    glowColor: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    cardBg: 'bg-orange-100',
    description: 'Multi-sentence mini-passages packed with dense real-world facts.'
  },
  nightmare: {
    name: 'Mega Nightmare',
    emoji: '💀',
    timeSeconds: 20,
    badgeColor: 'bg-purple-300 text-black border-2 border-black font-black',
    borderColor: 'border-black',
    glowColor: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    cardBg: 'bg-purple-100',
    description: 'Hyper-academic jargon, verbose syntax, and ontological bamboozlement!'
  }
};

export const SENTENCE_DATABASE: SentenceItem[] = [
  // ================= EASY (5s) =================
  {
    id: 'easy-1',
    difficulty: 'easy',
    category: 'Animals & Pets',
    originalText: 'The cat sat on the mat.',
    keywords: ['cat', 'sat', 'mat'],
    keyIdeas: ['feline animal rested', 'positioned on a rug or floor cover'],
    suggestedSynonyms: {
      'cat': ['feline', 'kitty', 'pet', 'tabby'],
      'sat': ['rested', 'perched', 'relaxed', 'settled'],
      'mat': ['rug', 'carpet', 'floor pad', 'cushion']
    },
    sampleGoodParaphrase: 'A feline relaxed upon the small rug.',
    educationalTip: 'Replace key nouns and verbs, or invert the sentence: "On the rug rested a small feline."',
    humorousContext: 'A classic nursery rhyme standard!'
  },
  {
    id: 'easy-2',
    difficulty: 'easy',
    category: 'Nature & Weather',
    originalText: 'The bright sun warmed the cold puppy.',
    keywords: ['bright', 'sun', 'warmed', 'cold', 'puppy'],
    keyIdeas: ['sunlight provided warmth', 'chilly young dog'],
    suggestedSynonyms: {
      'bright': ['radiant', 'gleaming', 'shining', 'dazzling'],
      'sun': ['sunlight', 'sunshine', 'daylight', 'solar rays'],
      'warmed': ['heated', 'thawed', 'comforted', 'toasted'],
      'cold': ['shivering', 'freezing', 'chilly', 'frosty'],
      'puppy': ['young canine', 'little dog', 'pup', 'pooch']
    },
    sampleGoodParaphrase: 'Radiant sunshine thawed the shivering young dog.',
    educationalTip: 'Try flipping the focus: "The chilly pup was heated by the radiant sunshine."',
    humorousContext: '10/10 good boy getting cozy.'
  },
  {
    id: 'easy-3',
    difficulty: 'easy',
    category: 'Food & Cooking',
    originalText: 'She loves eating crispy chocolate cookies.',
    keywords: ['loves', 'eating', 'crispy', 'chocolate', 'cookies'],
    keyIdeas: ['person enjoys consuming', 'crunchy cocoa biscuits'],
    suggestedSynonyms: {
      'loves': ['adores', 'enjoys', 'relishes', 'savors'],
      'eating': ['snacking on', 'devouring', 'munching', 'consuming'],
      'crispy': ['crunchy', 'brittle', 'crusty'],
      'chocolate': ['cocoa', 'fudge', 'sweet'],
      'cookies': ['biscuits', 'baked treats', 'sweets', 'wafers']
    },
    sampleGoodParaphrase: 'Munching on crunchy cocoa biscuits brings her immense joy.',
    educationalTip: 'Convert verbs into gerunds (eating -> snacking on) or shift the subject to the cookies.',
    humorousContext: 'Cookie monster would be proud.'
  },
  {
    id: 'easy-4',
    difficulty: 'easy',
    category: 'Fantasy & Adventure',
    originalText: 'The angry dragon burned the wooden bridge.',
    keywords: ['angry', 'dragon', 'burned', 'wooden', 'bridge'],
    keyIdeas: ['furious mythical beast', 'incinerated timber crossing'],
    suggestedSynonyms: {
      'angry': ['furious', 'enraged', 'wrathful', 'infuriated'],
      'dragon': ['fire-breathing beast', 'serpent', 'wyrm', 'monster'],
      'burned': ['torched', 'incinerated', 'ignited', 'destroyed with flame'],
      'wooden': ['timber', 'lumber'],
      'bridge': ['crossing', 'overpass', 'footbridge', 'pathway']
    },
    sampleGoodParaphrase: 'A furious mythical beast torched the timber crossing.',
    educationalTip: 'Passive voice transformation: "The timber crossing was incinerated by the enraged beast."',
    humorousContext: 'Nobody cross the dragon today!'
  },
  {
    id: 'easy-5',
    difficulty: 'easy',
    category: 'Wildlife',
    originalText: 'A loud noise scared the little rabbit.',
    keywords: ['loud', 'noise', 'scared', 'little', 'rabbit'],
    keyIdeas: ['sudden sound', 'startled a small bunny'],
    suggestedSynonyms: {
      'loud': ['booming', 'piercing', 'deafening', 'sudden'],
      'noise': ['sound', 'clamor', 'bang', 'racket'],
      'scared': ['frightened', 'spooked', 'startled', 'terrified'],
      'little': ['tiny', 'small', 'miniature'],
      'rabbit': ['bunny', 'hare', 'creature']
    },
    sampleGoodParaphrase: 'The tiny hare was spooked by a sudden booming sound.',
    educationalTip: 'Change word order: put the rabbit at the start of your sentence.',
    humorousContext: 'Hop, hop, away into the bushes!'
  },
  {
    id: 'easy-6',
    difficulty: 'easy',
    category: 'Transportation',
    originalText: 'He drove his fast red car down the hill.',
    keywords: ['drove', 'fast', 'red', 'car', 'hill'],
    keyIdeas: ['person operated speedy crimson vehicle', 'descended slope'],
    suggestedSynonyms: {
      'drove': ['steered', 'navigated', 'cruised', 'sped'],
      'fast': ['speedy', 'swift', 'quick', 'rapid'],
      'red': ['crimson', 'scarlet', 'ruby'],
      'car': ['automobile', 'vehicle', 'sports car', 'ride'],
      'hill': ['slope', 'incline', 'descent']
    },
    sampleGoodParaphrase: 'Speeding down the slope, he steered his crimson automobile.',
    educationalTip: 'Use a participial phrase ("Speeding down the slope...") to shake up the syntax!',
    humorousContext: 'Fast and Furious: Paraphrase Drift.'
  },
  {
    id: 'easy-7',
    difficulty: 'easy',
    category: 'Sci-Fi & Space',
    originalText: 'The tired astronaut slept inside the spaceship.',
    keywords: ['tired', 'astronaut', 'slept', 'inside', 'spaceship'],
    keyIdeas: ['exhausted space explorer', 'dozed in vessel'],
    suggestedSynonyms: {
      'tired': ['exhausted', 'weary', 'fatigued', 'drowsy'],
      'astronaut': ['space explorer', 'cosmonaut', 'stellar traveler'],
      'slept': ['rested', 'dozed', 'slumbered', 'napped'],
      'spaceship': ['spacecraft', 'orbital vessel', 'rocket cabin']
    },
    sampleGoodParaphrase: 'An exhausted space traveler dozed within the orbital craft.',
    educationalTip: 'Swap general nouns for rich domain phrases ("space explorer", "orbital vessel").',
    humorousContext: 'Zero gravity snoozing.'
  },
  {
    id: 'easy-8',
    difficulty: 'easy',
    category: 'Comedy & Animals',
    originalText: 'My hungry parrot stole a piece of cheese.',
    keywords: ['hungry', 'parrot', 'stole', 'piece', 'cheese'],
    keyIdeas: ['starving bird', 'snatched dairy snack'],
    suggestedSynonyms: {
      'hungry': ['famished', 'starving', 'peckish', 'greedy'],
      'parrot': ['bird', 'feathered pet', 'macaw', 'cockatoo'],
      'stole': ['pilfered', 'swiped', 'snatched', 'nicked'],
      'cheese': ['dairy treat', 'cheddar slice', 'snack']
    },
    sampleGoodParaphrase: 'A famished feathered pet swiped a slice of dairy snack from me.',
    educationalTip: 'Use action verbs like "pilfered" or "snatched" instead of plain "stole".',
    humorousContext: 'Polly wants cheddar, not crackers!'
  },
  {
    id: 'easy-9',
    difficulty: 'easy',
    category: 'Gaming & Fantasy',
    originalText: 'The brave knight defeated the giant slime.',
    keywords: ['brave', 'knight', 'defeated', 'giant', 'slime'],
    keyIdeas: ['courageous warrior', 'vanquished enormous gelatinous monster'],
    suggestedSynonyms: {
      'brave': ['courageous', 'valiant', 'fearless', 'heroic'],
      'knight': ['warrior', 'champion', 'paladin', 'swordsman'],
      'defeated': ['vanquished', 'overcame', 'crushed', 'slayed'],
      'giant': ['enormous', 'colossal', 'massive', 'huge'],
      'slime': ['gelatinous monster', 'ooze creature', 'blob']
    },
    sampleGoodParaphrase: 'A valiant warrior vanquished the colossal blob monster.',
    educationalTip: 'Describe the attributes of the monster rather than using the same simple word.',
    humorousContext: 'Level 1 RPG boss defeated!'
  },
  {
    id: 'easy-10',
    difficulty: 'easy',
    category: 'Atmosphere',
    originalText: 'Heavy rain poured down on the quiet town.',
    keywords: ['heavy', 'rain', 'poured', 'quiet', 'town'],
    keyIdeas: ['intense downpour fell', 'peaceful sleepy settlement'],
    suggestedSynonyms: {
      'heavy': ['torrential', 'intense', 'relentless', 'severe'],
      'rain': ['downpour', 'deluge', 'precipitation', 'storm'],
      'poured': ['drenched', 'cascaded', 'showered', 'battered'],
      'quiet': ['peaceful', 'sleepy', 'tranquil', 'deserted'],
      'town': ['village', 'settlement', 'community', 'city']
    },
    sampleGoodParaphrase: 'A torrential downpour drenched the sleepy settlement.',
    educationalTip: 'Make the action the verb ("drenched the town") instead of relying on "poured down on".',
    humorousContext: 'Don\'t forget your rain boots!'
  },

  // ================= MEDIUM (7s) =================
  {
    id: 'med-1',
    difficulty: 'medium',
    category: 'Academics & School',
    originalText: 'Because she studied diligently all weekend, Maya achieved a perfect score on her biology exam.',
    keywords: ['studied', 'diligently', 'weekend', 'Maya', 'perfect', 'score', 'biology', 'exam'],
    keyIdeas: ['hard work during weekend', 'earned highest marks in biology test'],
    suggestedSynonyms: {
      'studied diligently': ['prepared rigorously', 'worked tirelessly', 'reviewed thoroughly'],
      'achieved': ['earned', 'secured', 'attained', 'scored'],
      'perfect score': ['flawless grade', 'top mark', '100 percent', 'impeccable result'],
      'exam': ['test', 'assessment', 'evaluation']
    },
    sampleGoodParaphrase: 'Maya earned a flawless grade on her biology test as a result of thorough weekend preparation.',
    educationalTip: 'Reverse the cause-and-effect clauses: put the test result first, followed by the reason!',
    humorousContext: 'Teacher was definitely impressed.'
  },
  {
    id: 'med-2',
    difficulty: 'medium',
    category: 'Events & Weather',
    originalText: 'Although the weather forecast predicted heavy thunderstorms, our picnic at the park went ahead as planned.',
    keywords: ['forecast', 'predicted', 'thunderstorms', 'picnic', 'park', 'planned'],
    keyIdeas: ['bad storm was forecasted', 'outdoor gathering took place anyway'],
    suggestedSynonyms: {
      'predicted': ['warned of', 'anticipated', 'forecasted', 'expected'],
      'thunderstorms': ['severe tempests', 'heavy downpours', 'stormy weather'],
      'picnic': ['outdoor lunch', 'gathering', 'meal in the park'],
      'went ahead': ['proceeded', 'continued', 'took place']
    },
    sampleGoodParaphrase: 'Despite warnings of severe tempests, we proceeded with our outdoor meal in the park as scheduled.',
    educationalTip: 'Replace "Although..." with "Despite + noun phrase..." to transform sentence architecture.',
    humorousContext: 'Braving lightning for potato salad!'
  },
  {
    id: 'med-3',
    difficulty: 'medium',
    category: 'Health & Fitness',
    originalText: 'Whenever students take frequent short breaks during study sessions, their long-term memory retention improves significantly.',
    keywords: ['frequent', 'breaks', 'study', 'sessions', 'memory', 'retention', 'improves'],
    keyIdeas: ['regular rest intervals while learning', 'boosts brain memory capacity'],
    suggestedSynonyms: {
      'frequent': ['regular', 'periodic', 'intermittent'],
      'breaks': ['pauses', 'rest intervals', 'breathings'],
      'study sessions': ['learning periods', 'revision routines'],
      'memory retention': ['information recall', 'cognitive storage'],
      'improves significantly': ['is markedly boosted', 'substantially increases', 'enhances']
    },
    sampleGoodParaphrase: 'Taking periodic rest intervals during revision routines substantially enhances a learner\'s information recall.',
    educationalTip: 'Turn the "Whenever..." clause into a nominal gerund subject ("Taking periodic rest intervals... enhances...").',
    humorousContext: 'Science says you can go take a snack break right now!'
  },
  {
    id: 'med-4',
    difficulty: 'medium',
    category: 'Environment & Tech',
    originalText: 'Since electric vehicles produce zero tailpipe emissions, many cities are rapidly expanding public charging stations.',
    keywords: ['electric', 'vehicles', 'emissions', 'cities', 'expanding', 'charging', 'stations'],
    keyIdeas: ['clean battery-powered cars', 'municipalities building more power plugs'],
    suggestedSynonyms: {
      'electric vehicles': ['battery-powered cars', 'EVs', 'zero-emission automobiles'],
      'produce zero': ['generate no', 'eliminate', 'emit no'],
      'cities': ['municipalities', 'urban centers', 'local governments'],
      'rapidly expanding': ['swiftly installing', 'multiplying', 'building out']
    },
    sampleGoodParaphrase: 'Urban municipalities are swiftly installing more power outlets because battery-powered automobiles generate no exhaust pollution.',
    educationalTip: 'Swap "Since X, Y" into "Y because X" and use synonyms for exhaust/emissions.',
    humorousContext: 'Vroom vroom... wait, beep beep silently!'
  },
  {
    id: 'med-5',
    difficulty: 'medium',
    category: 'Mystery & Adventure',
    originalText: 'Even though the mysterious locked chest was buried deep underground, the pirates discovered its exact location using an ancient parchment.',
    keywords: ['mysterious', 'locked', 'chest', 'buried', 'pirates', 'discovered', 'ancient', 'parchment'],
    keyIdeas: ['hidden subterranean treasure box', 'sailors located it with antique map'],
    suggestedSynonyms: {
      'mysterious locked chest': ['hidden treasure container', 'enigmatic strongbox'],
      'buried deep underground': ['concealed subterraneanly', 'interred beneath the earth'],
      'pirates': ['buccaneers', 'seafarers', 'corsairs'],
      'discovered': ['uncovered', 'pinpointed', 'found'],
      'ancient parchment': ['antique map', 'aged scroll', 'historical chart']
    },
    sampleGoodParaphrase: 'By decoding an aged scroll, the buccaneers pinpointed the enigmatic strongbox concealed deep beneath the earth.',
    educationalTip: 'Start with the method ("By decoding an aged scroll...") followed by the action.',
    humorousContext: 'X marks the spot on the paraphrasing map!'
  },
  {
    id: 'med-6',
    difficulty: 'medium',
    category: 'Culinary Chaos',
    originalText: 'While the master chef prepared the secret sauce, an unruly raccoon sneaked into the kitchen pantry and devoured the marshmallows.',
    keywords: ['chef', 'prepared', 'secret', 'sauce', 'raccoon', 'sneaked', 'pantry', 'devoured', 'marshmallows'],
    keyIdeas: ['cook busy with recipe', 'mischievous critter raided sweet treats'],
    suggestedSynonyms: {
      'master chef': ['head cook', 'culinary artist'],
      'prepared': ['simmered', 'crafted', 'mixed'],
      'unruly raccoon': ['mischievous bandit critter', 'sneaky trash panda'],
      'sneaked into': ['infiltrated', 'crept inside'],
      'devoured': ['gobbled up', 'munched through', 'consumed']
    },
    sampleGoodParaphrase: 'During the head cook\'s secret recipe preparation, a mischievous bandit critter infiltrated the pantry to gobble up the sweets.',
    educationalTip: 'Condense clauses into prepositions: "During the sauce preparation, a raccoon infiltrated..."',
    humorousContext: 'Marshmallow heist of the century!'
  },
  {
    id: 'med-7',
    difficulty: 'medium',
    category: 'Travel & Mishaps',
    originalText: 'Although he forgot his umbrella on the morning bus, Samuel managed to arrive at the wedding without getting soaked.',
    keywords: ['forgot', 'umbrella', 'bus', 'Samuel', 'arrived', 'wedding', 'soaked'],
    keyIdeas: ['left rain gear on transit', 'reached ceremony dry'],
    suggestedSynonyms: {
      'forgot': ['left behind', 'misplaced', 'abandoned'],
      'umbrella': ['rain cover', 'parasol'],
      'managed to arrive': ['reached', 'showed up at', 'made it to'],
      'wedding': ['nuptial ceremony', 'marriage celebration'],
      'without getting soaked': ['staying completely dry', 'unscathed by the rain']
    },
    sampleGoodParaphrase: 'Samuel reached the marriage ceremony completely dry, despite having left his rain cover on public transit.',
    educationalTip: 'Move the concessive clause ("despite having left...") to the tail end of the sentence.',
    humorousContext: 'Dodging raindrops like a ninja.'
  },
  {
    id: 'med-8',
    difficulty: 'medium',
    category: 'Engineering & Space',
    originalText: 'Before launching the rocket into orbit, aerospace engineers conducted dozens of rigorous safety simulations.',
    keywords: ['launching', 'rocket', 'orbit', 'aerospace', 'engineers', 'conducted', 'simulations'],
    keyIdeas: ['prior to spaceflight', 'technicians ran thorough tests'],
    suggestedSynonyms: {
      'launching': ['propelling', 'sending', 'firing'],
      'rocket': ['spacecraft', 'booster', 'vessel'],
      'aerospace engineers': ['flight scientists', 'space technicians'],
      'conducted': ['executed', 'performed', 'carried out'],
      'rigorous safety simulations': ['intensive safety checks', 'thorough computer drills']
    },
    sampleGoodParaphrase: 'Dozens of intensive safety drills were executed by flight technicians prior to propelling the spacecraft into space.',
    educationalTip: 'Switch to passive voice and change "Before launching..." into "prior to propelling...".',
    humorousContext: '3, 2, 1... check the checklist again!'
  },

  // ================= HARD (10s) =================
  {
    id: 'hard-1',
    difficulty: 'hard',
    category: 'Climate & Earth Science',
    originalText: 'Global temperatures have steadily climbed over the past century due to greenhouse gas emissions. Consequently, polar ice caps are melting at alarming rates, contributing to rising sea levels worldwide.',
    keywords: ['temperatures', 'climbed', 'century', 'greenhouse', 'emissions', 'polar', 'ice', 'melting', 'sea', 'levels'],
    keyIdeas: ['industrial gases warming the planet over 100 years', 'polar glaciers shrinking and ocean heights escalating'],
    suggestedSynonyms: {
      'temperatures have steadily climbed': ['planetary heat has risen continuously', 'global warming has accelerated'],
      'greenhouse gas emissions': ['carbon pollution', 'atmospheric trapping gases'],
      'Consequently': ['As a direct result', 'This has triggered', 'Leading to'],
      'polar ice caps are melting': ['glaciers are thawing rapidly', 'arctic sheets are disintegrating'],
      'rising sea levels worldwide': ['global ocean expansion', 'elevated marine coastlines']
    },
    sampleGoodParaphrase: 'Centuries of carbon pollution have steadily warmed our planet, triggering rapid glacier thaw and escalating ocean coastlines around the globe.',
    educationalTip: 'Synthesize two separate sentences into one fluid cause-and-effect statement with strong verbs.',
    humorousContext: 'Penguins are currently negotiating swimming lessons.'
  },
  {
    id: 'hard-2',
    difficulty: 'hard',
    category: 'History & Technology',
    originalText: 'The invention of the printing press revolutionized human communication by making books affordable. As a result, literacy rates skyrocketed across Europe and sparked the Scientific Revolution.',
    keywords: ['invention', 'printing', 'press', 'revolutionized', 'communication', 'books', 'affordable', 'literacy', 'Europe', 'Scientific', 'Revolution'],
    keyIdeas: ['movable type made reading material inexpensive', 'widespread reading ability catalyzed scientific discoveries'],
    suggestedSynonyms: {
      'invention': ['creation', 'development', 'debut'],
      'revolutionized': ['transformed', 'overhauled', 'fundamentally reshaped'],
      'affordable': ['inexpensive', 'widely accessible', 'budget-friendly'],
      'literacy rates skyrocketed': ['reading skills surged', 'widespread reading flourished'],
      'sparked': ['ignited', 'catalyzed', 'breathed life into']
    },
    sampleGoodParaphrase: 'By making published literature accessible to the public, the development of movable type surged European reading comprehension and ignited the modern scientific era.',
    educationalTip: 'Group the historical concepts together: combine the economic cause (cheap books) with intellectual impact (scientific era).',
    humorousContext: 'Gutenberg dropped the ultimate hot mix-tape of books.'
  },
  {
    id: 'hard-3',
    difficulty: 'hard',
    category: 'Neuroscience & Sleep',
    originalText: 'Excessive screen time before sleep suppresses melatonin production in the brain. This disruption leads to poor sleep quality, chronic daytime fatigue, and reduced cognitive focus in teenagers.',
    keywords: ['excessive', 'screen', 'time', 'melatonin', 'brain', 'sleep', 'quality', 'fatigue', 'cognitive', 'focus', 'teenagers'],
    keyIdeas: ['late-night device usage blocks sleep hormones', 'causes exhaustion, fuzzy thinking, and restlessness in youth'],
    suggestedSynonyms: {
      'Excessive screen time': ['Overusing digital devices', 'Prolonged exposure to glowing displays'],
      'suppresses': ['inhibits', 'stifles', 'blocks', 'curtails'],
      'melatonin production': ['vital sleep hormone synthesis'],
      'poor sleep quality': ['restless nights', 'disturbed slumber'],
      'chronic daytime fatigue': ['exhaustion throughout the day', 'constant tiredness'],
      'reduced cognitive focus': ['diminished mental sharpness', 'impaired concentration']
    },
    sampleGoodParaphrase: 'Using digital monitors late at night blocks the brain\'s sleep hormones, which leaves young individuals chronically exhausted and struggling with mental concentration.',
    educationalTip: 'Substitute technical symptoms ("chronic daytime fatigue") with plain-English equivalents ("chronically exhausted").',
    humorousContext: 'Put that phone down and embrace the sweet darkness!'
  },
  {
    id: 'hard-4',
    difficulty: 'hard',
    category: 'Ecology & Biodiversity',
    originalText: 'Bees play an indispensable role in pollinating essential crops that nourish billions of people. Unfortunately, habitat destruction and pesticide overuse have caused a critical decline in global bee populations.',
    keywords: ['bees', 'indispensable', 'pollinating', 'crops', 'nourish', 'habitat', 'destruction', 'pesticide', 'decline', 'populations'],
    keyIdeas: ['insects vital for human food supply', 'chemical toxins and land loss are wiping them out'],
    suggestedSynonyms: {
      'indispensable role': ['crucial function', 'vital part', 'essential service'],
      'pollinating essential crops': ['fertilizing food plants', 'sustaining agricultural harvests'],
      'nourish billions': ['feed humankind', 'sustain global populations'],
      'habitat destruction': ['territory loss', 'ecosystem degradation'],
      'pesticide overuse': ['excessive chemical treatments', 'toxic sprays'],
      'critical decline': ['alarming crash', 'drastic drop', 'perilous reduction']
    },
    sampleGoodParaphrase: 'Humankind\'s food security relies heavily on insect pollination, yet chemical agriculture and environmental destruction have triggered a catastrophic drop in bee colonies.',
    educationalTip: 'Lead with the existential impact on human food security, then contrast with the human causes.',
    humorousContext: 'Save the fuzzy buzzy friends!'
  },
  {
    id: 'hard-5',
    difficulty: 'hard',
    category: 'Medicine & AI',
    originalText: 'Artificial intelligence algorithms can now diagnose medical scans with remarkable accuracy. However, healthcare professionals caution that algorithmic bias and lack of transparency still pose substantial ethical dilemmas.',
    keywords: ['artificial', 'intelligence', 'algorithms', 'diagnose', 'medical', 'scans', 'accuracy', 'bias', 'transparency', 'ethical'],
    keyIdeas: ['smart computer models analyze patient imaging well', 'doctors worry about hidden errors and moral questions'],
    suggestedSynonyms: {
      'Artificial intelligence algorithms': ['Automated machine learning models', 'Diagnostic AI software'],
      'remarkable accuracy': ['impressive precision', 'high reliability'],
      'healthcare professionals': ['medical practitioners', 'physicians', 'clinicians'],
      'caution': ['warn', 'remind the public', 'voice concerns'],
      'transparency': ['interpretability', 'clarity', 'explainability'],
      'substantial ethical dilemmas': ['major moral hurdles', 'significant dilemmas']
    },
    sampleGoodParaphrase: 'While machine learning software demonstrates impressive precision in evaluating radiology images, clinicians warn that opaque decision-making and automated prejudices present major moral challenges.',
    educationalTip: 'Contrast the positive and negative sides using a "While X..., Y..." subordination pattern.',
    humorousContext: 'Robot doctor, please don\'t give me a software update instead of medicine.'
  },
  {
    id: 'hard-6',
    difficulty: 'hard',
    category: 'Economics & Commerce',
    originalText: 'The rapid expansion of e-commerce has transformed urban logistics and retail industries. While consumers enjoy unprecedented convenience, traditional brick-and-mortar stores face existential financial pressures.',
    keywords: ['expansion', 'e-commerce', 'transformed', 'logistics', 'retail', 'consumers', 'convenience', 'brick-and-mortar', 'stores', 'financial'],
    keyIdeas: ['online shopping surged and altered delivery networks', 'shoppers love ease while physical shops struggle to survive'],
    suggestedSynonyms: {
      'rapid expansion of e-commerce': ['boom in digital shopping', 'rise of online commerce'],
      'transformed': ['reconfigured', 'revolutionized', 'upended'],
      'urban logistics': ['city shipping networks', 'package delivery infrastructure'],
      'unprecedented convenience': ['effortless home delivery', 'maximum ease'],
      'brick-and-mortar stores': ['physical storefronts', 'traditional retail shops'],
      'existential financial pressures': ['threats to economic survival', 'severe monetary hardship']
    },
    sampleGoodParaphrase: 'The boom in digital shopping has revolutionized city delivery networks, providing effortless shopping for customers while pushing physical storefronts to the brink of bankruptcy.',
    educationalTip: 'Condense "unprecedented convenience" into "effortless shopping" and replace "existential pressures" with "brink of bankruptcy".',
    humorousContext: 'Another package arrived for you today!'
  },

  // ================= MEGA NIGHTMARE (12s) =================
  {
    id: 'nightmare-1',
    difficulty: 'nightmare',
    category: 'The Verbose Trick!',
    originalText: 'The domesticated feline positioned its quadrupedal corporeal form in a sedentary posture atop the rectangular woven floor-covering apparatus.',
    keywords: ['feline', 'quadrupedal', 'corporeal', 'sedentary', 'posture', 'woven', 'floor-covering'],
    keyIdeas: ['a four-legged cat rested its body', 'sat directly upon a floor mat'],
    suggestedSynonyms: {
      'domesticated feline': ['house cat', 'kitty', 'pet feline'],
      'positioned... in a sedentary posture': ['sat down', 'parked itself', 'rested', 'perched'],
      'rectangular woven floor-covering apparatus': ['rug', 'mat', 'carpet', 'door mat']
    },
    sampleGoodParaphrase: 'The cat sat on the mat.',
    educationalTip: 'TRICK QUESTION ALERT: Cut through all the pompous academic puffery and translate it straight into simple, crystal-clear prose!',
    humorousContext: '🎯 THE ULTIMATE TRICK! Did you recognize our 5-second friend wearing a monocle and a tuxedo?',
    isSpecialTrick: true
  },
  {
    id: 'nightmare-2',
    difficulty: 'nightmare',
    category: 'Quantum Epistemology',
    originalText: 'The epistemological implications of quantum indeterminacy fundamentally challenge Newtonian paradigms of deterministic causality in theoretical physics.',
    keywords: ['epistemological', 'quantum', 'indeterminacy', 'Newtonian', 'paradigms', 'deterministic', 'causality', 'physics'],
    keyIdeas: ['unpredictable quantum particle behavior', 'shatters traditional rules where every cause has an exact mechanical effect'],
    suggestedSynonyms: {
      'epistemological implications': ['philosophical consequences', 'ways we understand reality'],
      'quantum indeterminacy': ['unpredictability in subatomic particles', 'random quantum behavior'],
      'fundamentally challenge': ['undermine', 'disprove', 'overthrow', 'call into question'],
      'Newtonian paradigms': ['classical mechanical models', 'traditional physical laws'],
      'deterministic causality': ['predictable cause-and-effect', 'clockwork certainty']
    },
    sampleGoodParaphrase: 'Subatomic randomness directly overthrows classical notions that the physical universe operates with clockwork, predictable cause-and-effect.',
    educationalTip: 'De-jargonize heavy philosophical terms into clear physical dynamics (e.g. "quantum indeterminacy" -> "subatomic randomness").',
    humorousContext: 'Schrödinger\'s cat is both paraphrased and not paraphrased right now.'
  },
  {
    id: 'nightmare-3',
    difficulty: 'nightmare',
    category: 'Sociology & Urbanism',
    originalText: 'Socioeconomic stratification within post-industrial metropolises exacerbates spatial segregation, perpetually disenfranchising marginalized demographics from municipal resource allocation.',
    keywords: ['socioeconomic', 'stratification', 'metropolises', 'exacerbates', 'spatial', 'segregation', 'disenfranchising', 'marginalized', 'municipal', 'resources'],
    keyIdeas: ['wealth inequality in modern cities deepens neighborhood divisions', 'keeps poorer populations from getting public services'],
    suggestedSynonyms: {
      'Socioeconomic stratification': ['Wealth inequality', 'Income divides', 'Class division'],
      'post-industrial metropolises': ['modern major cities', 'contemporary urban areas'],
      'exacerbates spatial segregation': ['deepens neighborhood divides', 'worsens divided communities'],
      'perpetually disenfranchising': ['continually cutting off', 'depriving'],
      'municipal resource allocation': ['city funding and public infrastructure', 'civic amenities']
    },
    sampleGoodParaphrase: 'Income inequality across modern cities worsens neighborhood division, depriving vulnerable communities of fair access to essential civic amenities.',
    educationalTip: 'Translate noun strings ("socioeconomic stratification") into active human realities ("Income inequality... depriving vulnerable communities").',
    humorousContext: 'Fancy way to say cities need better bus routes and libraries!'
  },
  {
    id: 'nightmare-4',
    difficulty: 'nightmare',
    category: 'Biochemistry & Photosynthesis',
    originalText: 'Photosynthetic bio-catalysis in chloroplast thylakoid membranes transduces photon flux into adenosine triphosphate via chemiosmotic proton gradients.',
    keywords: ['photosynthetic', 'chloroplast', 'thylakoid', 'transduces', 'photon', 'adenosine', 'triphosphate', 'chemiosmotic', 'proton'],
    keyIdeas: ['plant cells capture sunlight', 'convert solar energy into chemical fuel using particle pressure'],
    suggestedSynonyms: {
      'Photosynthetic bio-catalysis': ['Light-driven plant chemistry', 'Plant photosynthesis'],
      'transduces photon flux': ['converts incoming light rays', 'transforms sunlight'],
      'adenosine triphosphate': ['cellular energy molecules', 'chemical fuel', 'ATP'],
      'chemiosmotic proton gradients': ['pressurized microscopic hydrogen charges', 'molecular electrochemical pumps']
    },
    sampleGoodParaphrase: 'Inside plant cells, light-harvesting structures convert solar rays into usable chemical energy through microscopic electrochemical pressure.',
    educationalTip: 'Focus on what the biology actually accomplishes: converting light into living fuel.',
    humorousContext: 'Plants doing high-octane rocket science while sunbathing.'
  },
  {
    id: 'nightmare-5',
    difficulty: 'nightmare',
    category: 'High-Frequency Finance',
    originalText: 'Unregulated algorithmic high-frequency trading destabilizes macroeconomic equilibrium through hyper-accelerated arbitrage loops and liquidity fragmentation.',
    keywords: ['algorithmic', 'high-frequency', 'trading', 'destabilizes', 'macroeconomic', 'equilibrium', 'arbitrage', 'liquidity', 'fragmentation'],
    keyIdeas: ['lightning-fast automated stock trading bot code', 'makes financial markets chaotic and breaks down cash flow'],
    suggestedSynonyms: {
      'Unregulated algorithmic high-frequency trading': ['Unchecked automated trading computers', 'High-speed algorithmic bots'],
      'destabilizes macroeconomic equilibrium': ['wreaks havoc on market stability', 'unbalances national economies'],
      'hyper-accelerated arbitrage loops': ['lightning-quick price exploitation', 'instantaneous trading loops'],
      'liquidity fragmentation': ['scattering available cash reserves', 'breaking capital flow']
    },
    sampleGoodParaphrase: 'Unchecked computer trading bots threaten economic stability by exploiting price discrepancies at millisecond speeds and scattering market funds.',
    educationalTip: 'Strip out Latinate buzzwords and highlight the speed and danger of automated trading algorithms.',
    humorousContext: 'Computers buying stocks faster than you can blink an eyelid!'
  },
  {
    id: 'nightmare-6',
    difficulty: 'nightmare',
    category: 'Digital Surveillance',
    originalText: 'The panoptic apparatus of surveillance capitalism commodifies behavioral surplus, transmuting human autonomy into predictive market telemetry.',
    keywords: ['panoptic', 'apparatus', 'surveillance', 'capitalism', 'commodifies', 'behavioral', 'surplus', 'autonomy', 'predictive', 'telemetry'],
    keyIdeas: ['tech corporations harvest personal user activity data', 'sell predictions of human choices for corporate profit'],
    suggestedSynonyms: {
      'panoptic apparatus of surveillance capitalism': ['Modern corporate data monitoring', 'Big tech tracking systems'],
      'commodifies behavioral surplus': ['monetizes private online habits', 'turns extra user activity into merchandise'],
      'transmuting human autonomy': ['converting personal free will', 'sacrificing individual choice'],
      'predictive market telemetry': ['forecasts sold to advertisers', 'consumer prediction data']
    },
    sampleGoodParaphrase: 'Big tech tracking systems harvest private user actions and monetize them by selling forecasts of human behavior to commercial advertisers.',
    educationalTip: 'Explain what the machinery does to everyday people: tech firms turning personal habits into advertising products.',
    humorousContext: 'That advertisement knows you wanted pizza before you did!'
  },
  {
    id: 'nightmare-7',
    difficulty: 'nightmare',
    category: 'Forest Botany & Fungi',
    originalText: 'Subterranean mycorrhizal networks facilitate inter-organismal biochemical signaling and nutrient transshipment among silvan flora communities.',
    keywords: ['subterranean', 'mycorrhizal', 'networks', 'biochemical', 'signaling', 'nutrient', 'transshipment', 'silvan', 'flora'],
    keyIdeas: ['underground mushroom fungal threads', 'allow trees to send warning messages and share food in forests'],
    suggestedSynonyms: {
      'Subterranean mycorrhizal networks': ['Underground fungal webs', 'Root-connected mushroom threads'],
      'facilitate': ['enable', 'allow', 'coordinate'],
      'biochemical signaling': ['chemical communication', 'warning messages'],
      'nutrient transshipment': ['food sharing', 'mineral distribution'],
      'silvan flora communities': ['forest trees and woodland plants']
    },
    sampleGoodParaphrase: 'Underground fungal webs allow woodland trees to communicate chemically and share essential nourishment throughout the forest.',
    educationalTip: 'Turn abstract multi-word Latin terms ("silvan flora communities") into evocative native words ("woodland trees").',
    humorousContext: 'The original "Wood Wide Web" internet system!'
  },
  {
    id: 'nightmare-8',
    difficulty: 'nightmare',
    category: 'Existential Philosophy',
    originalText: 'The hermeneutic analysis of existential literature elucidates humanity\'s perpetual struggle against pervasive absurdity and ontological angst.',
    keywords: ['hermeneutic', 'existential', 'literature', 'elucidates', 'perpetual', 'struggle', 'absurdity', 'ontological', 'angst'],
    keyIdeas: ['studying philosophical books', 'reveals the endless human quest to find meaning in a chaotic universe'],
    suggestedSynonyms: {
      'hermeneutic analysis': ['In-depth interpretation', 'Critical examination'],
      'existential literature': ['philosophical writings on existence', 'classic existentialist books'],
      'elucidates': ['clarifies', 'highlights', 'reveals', 'sheds light on'],
      'perpetual struggle': ['endless battle', 'constant fight'],
      'pervasive absurdity and ontological angst': ['life\'s inherent chaos and existential dread', 'the search for meaning']
    },
    sampleGoodParaphrase: 'Examining existentialist texts reveals the endless human struggle to find purpose amid the dread and chaos of existence.',
    educationalTip: 'Boil down the highfalutin phrasing into the emotional core: human beings seeking purpose.',
    humorousContext: 'Pass the espresso, we are pondering the void!'
  }
];
