export interface DecodableBook {
  id: number;
  title: string;
  focusSound: string;
  category: 'Short Vowels' | 'Blends' | 'Digraphs' | 'Magic-E' | 'Diphthongs' | 'Bossy-R';
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
}

// ----------------- DATASETS -----------------

export const BOOKS_DATA: DecodableBook[] = [
  {
    id: 1,
    title: "Rick's Red Rag",
    focusSound: "Short /a/ & /i/",
    category: "Short Vowels",
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
    id: "plan-video",
    name: "Video & Music Streamer",
    price: 29.95,
    billingPeriod: "per year",
    description: "Ideal for screen-time phonemic awareness in the classroom and at home.",
    features: [
      "100s of Streaming Phonics Videos",
      "No rental fees with membership",
      "AEIOU, Calypso, Bossy-R & Word Family Jazz",
      "Streamable & Downloadable MP3 Music Library",
      "Classroom projector and tablet ready"
    ],
    cta: "Start Streaming Now"
  },
  {
    id: "plan-all-inclusive",
    name: "All-Inclusive Garden Pass",
    price: 59.95,
    billingPeriod: "per year",
    description: "The complete frustration-free literacy system. Everything unlocked without restriction.",
    popular: true,
    badge: "Best Value • Save 60%",
    features: [
      "Full 40-Book Decodable Phonics Series (PDF + eReader)",
      "Over 25,000+ Phonics Worksheets & Printables",
      "All 100s of Streaming Animated Videos",
      "150 Leveled Readers (Levels AA, A, B)",
      "StoryTime Garden 80+ Matching Craft Guides",
      "Full Music MP3 Library Access",
      "Unlimited Classroom & Home Printing Rights"
    ],
    cta: "Unlock All Resources"
  },
  {
    id: "plan-decodables",
    name: "Decodable Readers Series",
    price: 39.95,
    billingPeriod: "per year",
    description: "Targeted reading practice with systematic advancement from Book 1 to 40.",
    features: [
      "40 PDF Downloadable Decodable Readers",
      "Quiz for every single book",
      "Over 1,000 supplemental book worksheets",
      "40 Read-Aloud streaming videos",
      "40 Sight word video modules"
    ],
    cta: "Get Readers Series"
  },
  {
    id: "plan-worksheets",
    name: "Worksheet Station Pass",
    price: 39.95,
    billingPeriod: "per year",
    description: "Massive library of printable stations, centers, handwriting and phonics mats.",
    features: [
      "Over 25,000 worksheets and activities",
      "A to Z, CVC, Blends, Digraphs, Diphthongs",
      "Magic-E, Color by Letter, Cut & Paste",
      "Puzzles, mazes, and word wheels",
      "Instant PDF downloads anytime"
    ],
    cta: "Join Worksheet Station"
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
