export interface PhonicsPhaseInfo {
  phase: number;
  name: string;
  shortDescription: string;
  graphemes: string[];
  sampleWords: string[];
  color: string;
}

export const PHONICS_PHASES: PhonicsPhaseInfo[] = [
  {
    phase: 1,
    name: "Phase 1: First Sounds & CVC",
    shortDescription: "Foundational high-utility graphemes for early blending.",
    graphemes: ["s", "a", "t", "p", "i", "n", "m", "d"],
    sampleWords: ["sat", "pat", "tap", "pin", "pit", "sip", "mat", "dim"],
    color: "from-amber-400 to-orange-500"
  },
  {
    phase: 2,
    name: "Phase 2: Short Vowels & Consonants",
    shortDescription: "Complete short vowels (a, e, i, o, u) & consonant stops.",
    graphemes: ["c", "k", "o", "g", "e", "u", "r", "h", "b", "f", "l"],
    sampleWords: ["cat", "dog", "bed", "run", "hop", "fog", "cup", "leg"],
    color: "from-rose-400 to-pink-500"
  },
  {
    phase: 3,
    name: "Phase 3: Consonant Digraphs",
    shortDescription: "Two letters that make one unified sound.",
    graphemes: ["sh", "ch", "th", "ck", "wh", "ng", "ff", "ll", "ss"],
    sampleWords: ["ship", "chin", "that", "duck", "sing", "bell", "puff"],
    color: "from-emerald-400 to-teal-500"
  },
  {
    phase: 4,
    name: "Phase 4: Adjacent Consonants & Blends",
    shortDescription: "CCVC and CVCC 4-sound blending without introducing new graphemes.",
    graphemes: ["st", "sp", "bl", "cl", "fl", "gr", "tr", "nd", "nt", "mp"],
    sampleWords: ["stop", "frog", "jump", "nest", "flag", "crab", "tent"],
    color: "from-sky-400 to-blue-500"
  },
  {
    phase: 5,
    name: "Phase 5: Vowel Teams & Magic-E",
    shortDescription: "Long vowels, silent E markers (CVCe), and common vowel teams.",
    graphemes: ["a_e", "i_e", "o_e", "u_e", "ai", "ay", "ee", "ea", "igh", "oa", "ow"],
    sampleWords: ["bake", "time", "boat", "rain", "play", "seed", "night"],
    color: "from-indigo-400 to-purple-500"
  },
  {
    phase: 6,
    name: "Phase 6: Diphthongs & Bossy-R",
    shortDescription: "Complex vowel glides and r-controlled vowels.",
    graphemes: ["ar", "or", "er", "ir", "ur", "oi", "oy", "ou", "aw"],
    sampleWords: ["star", "corn", "bird", "surf", "coin", "boy", "cloud"],
    color: "from-fuchsia-400 to-rose-500"
  }
];

export interface ElkoninWordChallenge {
  id: string;
  word: string;
  phonemes: string[];
  pictureEmoji: string;
  hint: string;
  phase: number;
}

export const ELKONIN_CHALLENGES: ElkoninWordChallenge[] = [
  { id: 'elk-1', word: 'cat', phonemes: ['c', 'a', 't'], pictureEmoji: '🐱', hint: 'Furry feline pet', phase: 1 },
  { id: 'elk-2', word: 'sun', phonemes: ['s', 'u', 'n'], pictureEmoji: '☀️', hint: 'Bright yellow star in the sky', phase: 1 },
  { id: 'elk-3', word: 'pig', phonemes: ['p', 'i', 'g'], pictureEmoji: '🐷', hint: 'Pink animal on the farm', phase: 1 },
  { id: 'elk-4', word: 'bed', phonemes: ['b', 'e', 'd'], pictureEmoji: '🛏️', hint: 'Where you sleep at night', phase: 2 },
  { id: 'elk-5', word: 'dog', phonemes: ['d', 'o', 'g'], pictureEmoji: '🐶', hint: 'Loyal barking friend', phase: 2 },
  { id: 'elk-6', word: 'cup', phonemes: ['c', 'u', 'p'], pictureEmoji: '☕', hint: 'Used to drink warm milk', phase: 2 },
  { id: 'elk-7', word: 'ship', phonemes: ['sh', 'i', 'p'], pictureEmoji: '🚢', hint: 'Big boat sailing the ocean', phase: 3 },
  { id: 'elk-8', word: 'chin', phonemes: ['ch', 'i', 'n'], pictureEmoji: '🧔', hint: 'Bottom part of your face', phase: 3 },
  { id: 'elk-9', word: 'ring', phonemes: ['r', 'i', 'ng'], pictureEmoji: '💍', hint: 'Shiny jewelry for your finger', phase: 3 },
  { id: 'elk-10', word: 'duck', phonemes: ['d', 'u', 'ck'], pictureEmoji: '🦆', hint: 'Quacking water bird', phase: 3 },
  { id: 'elk-11', word: 'frog', phonemes: ['f', 'r', 'o', 'g'], pictureEmoji: '🐸', hint: 'Green hopping amphibian', phase: 4 },
  { id: 'elk-12', word: 'star', phonemes: ['s', 't', 'ar'], pictureEmoji: '⭐', hint: 'Twinkles in the night sky', phase: 6 }
];

export interface DecodableBook {
  id: number;
  title: string;
  focusSound: string;
  category: 'Short Vowels' | 'Blends' | 'Digraphs' | 'Magic-E' | 'Diphthongs' | 'Bossy-R';
  phase: number;
  phaseName: string;
  cumulativeGraphemes: string[];
  trickyWords: string[];
  decodabilityScore: number;
  isFree: boolean;
  printableFoldable8Page: boolean;
  description: string;
  pages: number;
  quizzes: number;
  sampleText: string;
  coverGradient: string;
  accentColor: string;
  targetWords: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  series: 'Alphabet Letter Sound' | 'AEIOU Vowels' | 'Calypso Puzzle' | 'Letter Search' | 'Bossy-R Pirate' | 'Word Family Jazz' | 'Magic-E';
  duration: string;
  ageGroup: string;
  description: string;
  thumbnailGradient: string;
  views: string;
  interactivePreviewUrl?: string;
  lyrics: string;
  focusLetters: string[];
}

export interface WorksheetItem {
  id: string;
  title: string;
  category: 'A to Z' | 'CVC Words' | 'Digraphs' | 'Blends' | 'Magic-E' | 'Color by Letter' | 'Handwriting' | 'Puzzles & Mazes' | 'Word Wheels';
  level: 'Pre-K' | 'Kindergarten' | 'Grade 1' | 'Grade 2';
  phase: number;
  focusPhonemes: string[];
  isFree: boolean;
  pageCount: number;
  downloadFormat: 'PDF' | 'Printable Pack';
  featured: boolean;
  downloads: number;
  samplePreview: string;
}

export interface LeveledReader {
  id: string;
  level: 'Level AA' | 'Level A' | 'Level B';
  title: string;
  topic: 'Science' | 'Social Studies' | 'Character Education' | 'Animal Life' | 'Community';
  pages: number;
  wordCount: number;
  difficulty: string;
  color: string;
}

export interface CraftProject {
  id: string;
  title: string;
  pairedBook: string;
  skillFocus: string;
  materials: string[];
  prepTime: string;
  difficulty: 'Easy Peasy' | 'Medium' | 'Fun Challenge';
  steps: string[];
}

export interface SongTrack {
  id: string;
  title: string;
  album: string;
  genre: 'Jazz Phonics' | 'Calypso Rhymes' | 'Letter Beats' | 'Acoustic Story';
  duration: string;
  tempo: 'Lively' | 'Calm' | 'Upbeat';
  skills: string;
}

export interface ShopProduct {
  id: string;
  title: string;
  category: 'Word Wheel' | 'Flip-Book' | 'Multi-Level Bundle' | 'Mega Series';
  regularPrice: number;
  salePrice: number;
  pages: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: string;
  description: string;
  popular?: boolean;
  features: string[];
  cta: string;
  badge?: string;
  isSchoolPO?: boolean;
}

// ----------------- DATASETS -----------------

export const BOOKS_DATA: DecodableBook[] = [
  {
    id: 1,
    title: "Rick's Red Rag",
    focusSound: "Short /a/ & /i/",
    category: "Short Vowels",
    phase: 1,
    phaseName: "Phase 1: Foundations",
    cumulativeGraphemes: ["s", "a", "t", "p", "i", "n", "r", "d"],
    trickyWords: ["is", "the", "said"],
    decodabilityScore: 97,
    isFree: true,
    printableFoldable8Page: true,
    description: "Follow puppy Rick as he races through the backyard with his bright red rag! Perfect first systematic decodable.",
    pages: 16,
    quizzes: 5,
    sampleText: "Rick is a quick pup. Rick ran to the red rag. 'Get that rag!' said Pat.",
    coverGradient: "from-rose-500 to-amber-500",
    accentColor: "#f43f5e",
    targetWords: ["rag", "ran", "Rick", "pup", "red", "pat"]
  },
  {
    id: 2,
    title: "Sam the Fat Cat",
    focusSound: "Short /a/ CVC",
    category: "Short Vowels",
    phase: 1,
    phaseName: "Phase 1: Foundations",
    cumulativeGraphemes: ["s", "a", "t", "p", "c", "m", "f"],
    trickyWords: ["the", "a", "yes"],
    decodabilityScore: 98,
    isFree: true,
    printableFoldable8Page: true,
    description: "Sam loves sunny mats and chasing little bugs across the warm kitchen tiles.",
    pages: 16,
    quizzes: 5,
    sampleText: "Sam sat on a mat. A fat cat sat flat. Can Sam tap the pan? Yes, Sam can tap!",
    coverGradient: "from-amber-500 to-orange-500",
    accentColor: "#f59e0b",
    targetWords: ["cat", "fat", "mat", "sat", "tap", "pan"]
  },
  {
    id: 3,
    title: "Hop in the Mud, Pup!",
    focusSound: "Short /u/ & /o/",
    category: "Short Vowels",
    phase: 2,
    phaseName: "Phase 2: Short Vowels",
    cumulativeGraphemes: ["h", "o", "p", "m", "u", "d", "t", "b"],
    trickyWords: ["the", "is", "for"],
    decodabilityScore: 95,
    isFree: false,
    printableFoldable8Page: true,
    description: "A funny rainy adventure where puppy Bob finds the biggest puddle in the garden.",
    pages: 18,
    quizzes: 6,
    sampleText: "The sun is hot. Pup hops in the tub. Mud is fun for Pup!",
    coverGradient: "from-emerald-500 to-teal-500",
    accentColor: "#10b981",
    targetWords: ["hop", "mud", "pup", "tub", "fun", "hot"]
  },
  {
    id: 4,
    title: "The King’s Silver Ring",
    focusSound: "Digraph -ng",
    category: "Digraphs",
    phase: 3,
    phaseName: "Phase 3: Digraphs",
    cumulativeGraphemes: ["k", "i", "ng", "s", "r", "o", "b", "ll"],
    trickyWords: ["the", "before"],
    decodabilityScore: 94,
    isFree: false,
    printableFoldable8Page: true,
    description: "The playful king sings songs all spring until his shiny ring bounces into the pond.",
    pages: 20,
    quizzes: 6,
    sampleText: "Sing a song for the king! Bring the ring on a string before the bell rings.",
    coverGradient: "from-indigo-500 to-purple-500",
    accentColor: "#6366f1",
    targetWords: ["ring", "king", "song", "sing", "wing", "bring"]
  },
  {
    id: 5,
    title: "Captain Pete & The Bossy-R Pirate",
    focusSound: "r-Controlled Vowels (ar, er, or)",
    category: "Bossy-R",
    phase: 6,
    phaseName: "Phase 6: Bossy-R",
    cumulativeGraphemes: ["ar", "er", "or", "p", "t", "b", "k", "f", "m"],
    trickyWords: ["the", "shouted", "pirate"],
    decodabilityScore: 92,
    isFree: false,
    printableFoldable8Page: true,
    description: "Ahoy! Learn how Bossy-R changes every vowel he touches with pirate charts and treasure maps.",
    pages: 24,
    quizzes: 8,
    sampleText: "Barnaby the dog barks in the dark yard. 'Arrr!' shouted the pirate star.",
    coverGradient: "from-amber-600 to-red-600",
    accentColor: "#d97706",
    targetWords: ["bark", "dark", "star", "park", "car", "farm"]
  },
  {
    id: 6,
    title: "Jake's Brave Magic-E Cave",
    focusSound: "Magic-e /a_e/",
    category: "Magic-E",
    phase: 5,
    phaseName: "Phase 5: Vowel Teams & Magic-E",
    cumulativeGraphemes: ["a_e", "b", "k", "l", "s", "n", "v"],
    trickyWords: ["will", "by", "the", "do"],
    decodabilityScore: 95,
    isFree: false,
    printableFoldable8Page: true,
    description: "Jake the snake finds a lake with a brave cake! Watch how silent E makes vowels say their name.",
    pages: 22,
    quizzes: 7,
    sampleText: "Jake will bake a cake by the lake. Do not take the snake's rake!",
    coverGradient: "from-blue-500 to-cyan-500",
    accentColor: "#3b82f6",
    targetWords: ["cake", "lake", "bake", "snake", "brave", "cave"]
  },
  {
    id: 7,
    title: "Chad’s Chipmunk Chase",
    focusSound: "Digraph /ch/ & /sh/",
    category: "Digraphs",
    phase: 3,
    phaseName: "Phase 3: Digraphs",
    cumulativeGraphemes: ["ch", "sh", "a", "d", "i", "p", "m", "n", "k"],
    trickyWords: ["for", "the", "to"],
    decodabilityScore: 96,
    isFree: false,
    printableFoldable8Page: true,
    description: "Chad munches crunchy chips while watching chipmunks dash behind the garden shed.",
    pages: 20,
    quizzes: 6,
    sampleText: "Chad had chips for lunch. Chomp, chomp! The chipmunk ran to the bench.",
    coverGradient: "from-teal-500 to-emerald-600",
    accentColor: "#14b8a6",
    targetWords: ["chip", "chop", "chat", "rich", "bench", "much"]
  },
  {
    id: 8,
    title: "Glow in the Snow",
    focusSound: "Long Vowel Teams /ow/ & /oa/",
    category: "Diphthongs",
    phase: 5,
    phaseName: "Phase 5: Vowel Teams",
    cumulativeGraphemes: ["ow", "oa", "g", "l", "s", "n", "b", "t", "c"],
    trickyWords: ["the", "in", "of", "put"],
    decodabilityScore: 93,
    isFree: false,
    printableFoldable8Page: true,
    description: "A cozy evening story as children glide on coats down glowing snowy slopes.",
    pages: 22,
    quizzes: 6,
    sampleText: "Row the boat slow in the glow of snow. Put on the warm yellow coat.",
    coverGradient: "from-violet-500 to-fuchsia-600",
    accentColor: "#8b5cf6",
    targetWords: ["glow", "snow", "boat", "coat", "slow", "road"]
  }
];

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: "vid-1",
    title: "AEIOU Short Vowels Rap & Dance",
    series: "AEIOU Vowels",
    duration: "4:12",
    ageGroup: "Pre-K to Gr 1",
    description: "High-energy animation introducing Apple /a/, Elephant /e/, Iguana /i/, Octopus /o/, and Umbrella /u/ with memorable mnemonic beats.",
    thumbnailGradient: "from-orange-400 to-rose-500",
    views: "240k",
    lyrics: "A-E-I-O-U! Vowels are like glue! They stick words together for me and for you!",
    focusLetters: ["A", "E", "I", "O", "U"]
  },
  {
    id: "vid-2",
    title: "Bossy-R The Pirate: Car, Star, and Jar",
    series: "Bossy-R Pirate",
    duration: "3:45",
    ageGroup: "Kindergarten to Gr 2",
    description: "Sail the phonics seven seas! Whenever letter R stands next to vowels, he barks out his bold R-controlled pirate sound.",
    thumbnailGradient: "from-red-500 to-amber-600",
    views: "185k",
    lyrics: "Arrr! I am the Bossy-R! When I hop by the 'A' we zoom in a CAR!",
    focusLetters: ["AR", "OR", "ER", "IR", "UR"]
  },
  {
    id: "vid-3",
    title: "Calypso Puzzle Spelling Songs: CVC Blend",
    series: "Calypso Puzzle",
    duration: "5:20",
    ageGroup: "Pre-K & Kindergarten",
    description: "Warm tropical steel drums bring puzzle pieces together letter-by-letter to blend sounds into words smoothly.",
    thumbnailGradient: "from-emerald-400 to-cyan-500",
    views: "310k",
    lyrics: "Hear the first sound /c/, hear the next sound /a/, put the /t/ right at the end: CAT!",
    focusLetters: ["C", "A", "T", "B", "O", "X"]
  },
  {
    id: "vid-4",
    title: "Word Family Jazz: -AT, -OP, -IN, -UG",
    series: "Word Family Jazz",
    duration: "6:05",
    ageGroup: "Kindergarten to Gr 2",
    description: "Smooth trumpet and swing rhythms teach early readers how swapping onset letters creates rhyming families effortlessly.",
    thumbnailGradient: "from-purple-500 to-indigo-600",
    views: "142k",
    lyrics: "Cat, bat, hat, mat, rat! Jazz it up when you rhyme like that!",
    focusLetters: ["-AT", "-OP", "-IN", "-UG"]
  },
  {
    id: "vid-5",
    title: "Letter Search Detective: Finding Mystery /Sh/ & /Ch/",
    series: "Letter Search",
    duration: "4:30",
    ageGroup: "Kindergarten to Gr 1",
    description: "Grab your magnifying glass! Detective Dot searches colorful parks to discover hidden digraph clues.",
    thumbnailGradient: "from-blue-500 to-teal-500",
    views: "98k",
    lyrics: "Quiet please: SH! SH! Chugging train: CH! CH! Let's find every clue today!",
    focusLetters: ["SH", "CH", "TH", "WH"]
  },
  {
    id: "vid-6",
    title: "Magic-E Wand: Turning Cap into Cape",
    series: "Magic-E",
    duration: "3:58",
    ageGroup: "Gr 1 to Gr 2",
    description: "With a flick of the magic wand, silent E whispers across the word and tells the short vowel: 'Say your name!'",
    thumbnailGradient: "from-fuchsia-500 to-pink-500",
    views: "215k",
    lyrics: "Tap, tap, cape! Hop, hop, hope! Magic-E makes the vowel reach high!",
    focusLetters: ["A_E", "I_E", "O_E", "U_E"]
  }
];

export const WORKSHEETS_DATA: WorksheetItem[] = [
  {
    id: "ws-1",
    title: "A to Z Letter Sound Handwriting & Trace Mats",
    category: "Handwriting",
    level: "Pre-K",
    phase: 1,
    focusPhonemes: ["s", "a", "t", "p", "i", "n"],
    isFree: true,
    pageCount: 26,
    downloadFormat: "PDF",
    featured: true,
    downloads: 14200,
    samplePreview: "Includes starting dots, stroke arrow guides, and sound isolation coloring bubbles."
  },
  {
    id: "ws-2",
    title: "CVC Word Family Matching Wheel Activity",
    category: "Word Wheels",
    level: "Kindergarten",
    phase: 2,
    focusPhonemes: ["c", "a", "t", "d", "o", "g"],
    isFree: true,
    pageCount: 35,
    downloadFormat: "Printable Pack",
    featured: true,
    downloads: 28900,
    samplePreview: "Interactive spin-and-read circular cards covering 24 high-utility word families."
  },
  {
    id: "ws-3",
    title: "Digraphs Detective Cut & Paste Sorting Sheets",
    category: "Digraphs",
    level: "Grade 1",
    phase: 3,
    focusPhonemes: ["sh", "ch", "th", "ck"],
    isFree: false,
    pageCount: 42,
    downloadFormat: "PDF",
    featured: true,
    downloads: 19400,
    samplePreview: "Cut picture tiles (ship, cheese, thorn, whale) and paste into labeled sorting chests."
  },
  {
    id: "ws-4",
    title: "Color By Code: Magic-E Long Vowels",
    category: "Color by Letter",
    level: "Grade 1",
    phase: 5,
    focusPhonemes: ["a_e", "i_e", "o_e", "u_e"],
    isFree: false,
    pageCount: 18,
    downloadFormat: "PDF",
    featured: false,
    downloads: 11200,
    samplePreview: "Kids reveal garden butterflies by identifying long A, I, O, and U vowel combinations."
  },
  {
    id: "ws-5",
    title: "Phonemic Awareness Puzzles & Rhyme Mazes",
    category: "Puzzles & Mazes",
    level: "Kindergarten",
    phase: 2,
    focusPhonemes: ["an", "un", "in", "op"],
    isFree: false,
    pageCount: 50,
    downloadFormat: "Printable Pack",
    featured: false,
    downloads: 23100,
    samplePreview: "Help Milo the puppy find his bone by following pictures that rhyme with 'pan' and 'sun'."
  },
  {
    id: "ws-6",
    title: "Initial & Final Consonant Blends Fluency Drills",
    category: "Blends",
    level: "Grade 2",
    phase: 4,
    focusPhonemes: ["bl", "cl", "fl", "st", "sp", "gr"],
    isFree: false,
    pageCount: 60,
    downloadFormat: "PDF",
    featured: true,
    downloads: 16800,
    samplePreview: "Timed 1-minute read fluency strips for bl, cl, fl, gl, pl, sl, br, cr, dr, and st."
  }
];

export const LEVELED_READERS_DATA: LeveledReader[] = [
  {
    id: "lr-1",
    level: "Level AA",
    title: "We See the Sun",
    topic: "Science",
    pages: 12,
    wordCount: 35,
    difficulty: "Emergent • 1 line per page • Repetitive pattern",
    color: "bg-amber-100 text-amber-800 border-amber-300"
  },
  {
    id: "lr-2",
    level: "Level AA",
    title: "I Like Animals",
    topic: "Animal Life",
    pages: 12,
    wordCount: 40,
    difficulty: "Emergent • Picture-supported vocabulary",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300"
  },
  {
    id: "lr-3",
    level: "Level A",
    title: "In My Community Garden",
    topic: "Social Studies",
    pages: 16,
    wordCount: 75,
    difficulty: "Early • Simple sentences • High-frequency words",
    color: "bg-sky-100 text-sky-800 border-sky-300"
  },
  {
    id: "lr-4",
    level: "Level A",
    title: "Sharing Is Caring",
    topic: "Character Education",
    pages: 16,
    wordCount: 85,
    difficulty: "Early • Social emotional dialogue prompts",
    color: "bg-rose-100 text-rose-800 border-rose-300"
  },
  {
    id: "lr-5",
    level: "Level B",
    title: "The Life of a Butterfly",
    topic: "Science",
    pages: 20,
    wordCount: 140,
    difficulty: "Developing • Compound sentences • Informational labels",
    color: "bg-purple-100 text-purple-800 border-purple-300"
  },
  {
    id: "lr-6",
    level: "Level B",
    title: "Builders and Bakers",
    topic: "Community",
    pages: 20,
    wordCount: 160,
    difficulty: "Developing • Varied punctuation • Descriptive details",
    color: "bg-indigo-100 text-indigo-800 border-indigo-300"
  }
];

export const CRAFTS_DATA: CraftProject[] = [
  {
    id: "craft-1",
    title: "Pop-Up Hungry Caterpillar Puppet",
    pairedBook: "The Very Hungry Caterpillar",
    skillFocus: "Fine Motor Skills & Sequencing Days of the Week",
    materials: ["Green paper cups", "Pipe cleaners", "Googly eyes", "Hole punch", "Red felt"],
    prepTime: "15 mins",
    difficulty: "Easy Peasy",
    steps: [
      "Fold green paper into accordion rings for the caterpillar body.",
      "Punch holes and thread yarn so children can expand and shrink their bug.",
      "Add googly eyes and recount the foods eaten in chronological order."
    ]
  },
  {
    id: "craft-2",
    title: "Bossy-R Pirate Ship Word Wheel",
    pairedBook: "Captain Pete & The Bossy-R Pirate",
    skillFocus: "Auditory Processing & r-Controlled Vowel Decoding",
    materials: ["Cardstock sail cutouts", "Paper fasteners (brads)", "Crayons", "Black paper sails"],
    prepTime: "20 mins",
    difficulty: "Medium",
    steps: [
      "Cut out circular ship hulls and inner wheel discs.",
      "Fasten with a brad so turning the wheel pairs AR, OR, and ER with root consonants.",
      "Have students act out pirate chants whenever a real word is created!"
    ]
  },
  {
    id: "craft-3",
    title: "Rainbow Fish Sparkling Scales Collage",
    pairedBook: "The Rainbow Fish",
    skillFocus: "Vocabulary Development & Empathy Discussions",
    materials: ["Foil wrappers", "Tissue paper tiles", "Glue sticks", "Fish templates"],
    prepTime: "10 mins",
    difficulty: "Easy Peasy",
    steps: [
      "Tear small vibrant tissue paper rectangles for body scale texture.",
      "Add 1-2 shiny holographic foil scales to share with a classmate.",
      "Write three kindness adjectives around the perimeter of the ocean paper."
    ]
  }
];

export const SONGS_DATA: SongTrack[] = [
  {
    id: "track-1",
    title: "Jump for the Alphabet (A to Z)",
    album: "Phonics Garden Beats Vol. 1",
    genre: "Letter Beats",
    duration: "3:18",
    tempo: "Lively",
    skills: "Letter names, isolated phonemes, kinesthetic motor movement"
  },
  {
    id: "track-2",
    title: "The Bossy-R Blues",
    album: "Groovy Grammar & Phonics",
    genre: "Jazz Phonics",
    duration: "2:54",
    tempo: "Upbeat",
    skills: "r-Controlled vowels: ar, er, ir, or, ur"
  },
  {
    id: "track-3",
    title: "Soft C, Hard C: The Circus Cat",
    album: "Phonics Garden Beats Vol. 2",
    genre: "Acoustic Story",
    duration: "3:42",
    tempo: "Calm",
    skills: "Phonics spelling rules & auditory discrimination"
  },
  {
    id: "track-4",
    title: "Calypso Blends: BL, CL, FL, GL, PL, SL",
    album: "Island Phonics Rhythms",
    genre: "Calypso Rhymes",
    duration: "4:05",
    tempo: "Lively",
    skills: "L-Blends pronunciation & rapid automatic naming"
  }
];

export const SHOP_DATA: ShopProduct[] = [
  {
    id: "prod-1",
    title: "Bossy-R Word Wheel BUNDLE | Pat-a-Word (40+ Pages)",
    category: "Word Wheel",
    regularPrice: 17.94,
    salePrice: 8.97,
    pages: 42,
    badge: "50% OFF",
    rating: 4.9,
    reviewsCount: 128
  },
  {
    id: "prod-2",
    title: "Bossy-R Flip-Book BUNDLE | Pat-a-Word (20+ Pages)",
    category: "Flip-Book",
    regularPrice: 11.94,
    salePrice: 5.97,
    pages: 24,
    badge: "Best Seller",
    rating: 4.8,
    reviewsCount: 94
  },
  {
    id: "prod-3",
    title: "Bossy-R Multi-Level BUNDLE | Pat-a-Word (500+ Pages)",
    category: "Multi-Level Bundle",
    regularPrice: 29.94,
    salePrice: 14.97,
    pages: 512,
    badge: "Teacher Favorite",
    rating: 5.0,
    reviewsCount: 312
  },
  {
    id: "prod-4",
    title: "Word Family Word Wheel BUNDLE | Short /U/ (20+ Pages)",
    category: "Word Wheel",
    regularPrice: 8.97,
    salePrice: 4.49,
    pages: 22,
    badge: "Sale",
    rating: 4.9,
    reviewsCount: 76
  },
  {
    id: "prod-5",
    title: "Word Family Flip-Book BUNDLE | Short /U/ (6 Pages)",
    category: "Flip-Book",
    regularPrice: 5.97,
    salePrice: 2.99,
    pages: 6,
    rating: 4.7,
    reviewsCount: 42
  },
  {
    id: "prod-6",
    title: "Word Family Multi-Level BUNDLE | Short /U/ (200+ Pages)",
    category: "Multi-Level Bundle",
    regularPrice: 14.97,
    salePrice: 7.50,
    pages: 215,
    badge: "Hot",
    rating: 4.9,
    reviewsCount: 180
  },
  {
    id: "prod-7",
    title: "Complete 40-Book Decodable Reader Mega Bundle",
    category: "Mega Series",
    regularPrice: 79.99,
    salePrice: 39.95,
    pages: 1200,
    badge: "Ultimate Pack",
    rating: 5.0,
    reviewsCount: 520
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "plan-free",
    name: "Free Explorer Pass",
    price: 0,
    billingPeriod: "free forever",
    description: "Great for testing with students at home or trying a sample reading station.",
    badge: "Free Starter",
    features: [
      "2 Full Decodable Readers with Audio",
      "Interactive Soundboard & Elkonin Word Lab",
      "10 Sample Printable Worksheets & Trace Mats",
      "Streaming Songs & Short Sample Videos",
      "No Credit Card Required"
    ],
    cta: "Start Free Practice"
  },
  {
    id: "plan-classroom",
    name: "Teacher Classroom Pass",
    price: 49.00,
    billingPeriod: "per school year",
    description: "Built for K-2 teachers needing unlimited printables and smartboard presentation.",
    popular: true,
    badge: "Most Popular for Teachers",
    features: [
      "All 40 Decodable Readers & Foldable 8-Page Books",
      "Over 25,000+ Classroom Phonics Worksheets",
      "Full Pure Phoneme Audio & Sequential Blending Engine",
      "Classroom Smartboard Distraction-Free Mode",
      "Copyright License to print up to 35 student copies",
      "Instant 1-Click Eco Print Templates"
    ],
    cta: "Join Classroom Pass"
  },
  {
    id: "plan-school-po",
    name: "School & District PO Pass",
    price: 199.00,
    billingPeriod: "per school building / yr",
    description: "Official school purchase order billing with multi-seat licenses and admin tools.",
    badge: "District PO / Invoice Ready",
    isSchoolPO: true,
    features: [
      "Building-wide license for all teachers & specialists",
      "Official PO, W-9, & Vendor Packet generation",
      "Clever & Google Classroom SSO Integration Support",
      "Dedicated School Onboarding Specialist",
      "Tax-Exempt Purchase Verification",
      "Priority Curriculum Alignment Support"
    ],
    cta: "Generate Official PO Quote"
  }
];

export const TESTIMONIALS = [
  {
    name: "Renea Johnson",
    role: "International School Primary Teacher",
    avatar: "👩‍🏫",
    quote: "The Phonics Garden reading book stories have been a key foundational support system for me in my classroom with my kindergarten students. The kids love the stories, the creative and fun characters, and find the sequential and systematic advancement easy to grasp. As a teacher, I have not found a program that has consistently helped my students become fluent readers more than the Phonics Garden reading series."
  },
  {
    name: "Sarah Miller, M.Ed.",
    role: "Grade 1 Reading Specialist",
    avatar: "🎓",
    quote: "The decodable readers solved our classroom frustration. Kids aren't guessing words based on pictures anymore — they are actually reading systematically. The matching song videos make phonemic awareness stick instantly!"
  },
  {
    name: "Marcus Davies",
    role: "Homeschooling Parent of 2",
    avatar: "👨‍👧‍👦",
    quote: "Everything we need in one place! The worksheet station has kept both my 4-year-old and 6-year-old totally engaged, and the crafts paired with classic picture books have become our favorite Friday tradition."
  }
];
