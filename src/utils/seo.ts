export interface RouteMeta {
  path: string;
  tabId: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  breadcrumb: string;
  emoji: string;
  ogType: string;
}

export const BASE_URL = 'https://phonicsgarden.com';

export const ROUTES_CONFIG: Record<string, RouteMeta> = {
  home: {
    path: '/',
    tabId: 'home',
    title: 'Phonics Garden 🌱 Play, Read & Learn Adventures! Early Phonics for Kids',
    description: 'Systematic phonics learning universe for kids, parents & teachers. 40 decodable books, 25,000+ printable worksheets, animated sing-alongs, and interactive sound games aligned with the Science of Reading.',
    keywords: 'phonics for kids, decodable books, phonics worksheets, science of reading, CVC words, alphabet sounds, early literacy, kindergarten reading, learn to read games, systematic synthetic phonics',
    canonical: `${BASE_URL}/`,
    breadcrumb: 'Garden Fun',
    emoji: '🏡',
    ogType: 'website'
  },
  decodables: {
    path: '/decodables',
    tabId: 'decodables',
    title: '40 Decodable Phonics Books Series | Sound-Out Readers | Phonics Garden',
    description: '40 sequential, controlled-vocabulary decodable storybooks for early readers. Master short vowels, blends, digraphs, and Magic-E step by step with read-aloud audio and printable review quizzes.',
    keywords: 'decodable books, decodable readers, phonics storybooks, short vowel books, consonant blends, digraphs, magic e readers, Orton-Gillingham books, controlled vocabulary readers',
    canonical: `${BASE_URL}/decodables`,
    breadcrumb: 'Decodable Story Books',
    emoji: '📚',
    ogType: 'article'
  },
  leveled: {
    path: '/leveled-readers',
    tabId: 'leveled',
    title: 'Leveled Readers & Coloring Books (Pre-K to 2nd Grade) | Phonics Garden',
    description: '150 printable leveled reading and coloring books covering Levels AA, A, and B. Connect reading practice to science, animal life, and social studies with picture-supported sentences.',
    keywords: 'leveled readers, coloring storybooks, emergent readers level aa, level a readers, level b readers, kindergarten reading books, printable phonics coloring',
    canonical: `${BASE_URL}/leveled-readers`,
    breadcrumb: 'Leveled Readers & Coloring',
    emoji: '🎨',
    ogType: 'article'
  },
  videos: {
    path: '/videos',
    tabId: 'videos',
    title: 'Sing & Watch Animated Phonics Videos | Letter Sound Songs | Phonics Garden',
    description: 'Catchy, classroom-tested animated phonics song episodes. Streaming videos for alphabet letter sounds, AEIOU vowels, Bossy-R pirates, and word family jazz jams.',
    keywords: 'phonics videos for kids, animated letter songs, phonics cartoons, vowel song, pirate phonics, sing along reading videos, educational children videos',
    canonical: `${BASE_URL}/videos`,
    breadcrumb: 'Sing & Watch Videos',
    emoji: '🎬',
    ogType: 'video.other'
  },
  worksheets: {
    path: '/worksheets',
    tabId: 'worksheets',
    title: '25,000+ Printable Phonics Worksheets & Packs | Pre-K to Grade 2 | Phonics Garden',
    description: 'Download and print thousands of teacher-tested handwriting mats, cut-and-paste sorts, CVC word family wheels, phonics mazes, and color-by-letter printables.',
    keywords: 'phonics worksheets, printable CVC worksheets, handwriting mats, digraph sorting sheets, color by letter, word wheels printable, kindergarten literacy centers, homeschool phonics',
    canonical: `${BASE_URL}/worksheets`,
    breadcrumb: 'Worksheets & Printables',
    emoji: '🖍️',
    ogType: 'article'
  },
  crafts: {
    path: '/crafts',
    tabId: 'crafts',
    title: 'Hands-On Story Crafts & Classroom Puppet Guides | Phonics Garden',
    description: 'Over 80 hands-on picture-book craft guides. Step-by-step paper folding, cut-and-paste puppets, and fine-motor activities that boost comprehension and reading enthusiasm.',
    keywords: 'phonics crafts, storybook crafts for kids, kindergarten paper crafts, reading comprehension crafts, fine motor literacy activities, classroom craft guides',
    canonical: `${BASE_URL}/crafts`,
    breadcrumb: 'Story Crafts & Fun',
    emoji: '✂️',
    ogType: 'article'
  },
  music: {
    path: '/music',
    tabId: 'music',
    title: 'Phonics Songs & MP3 Audio Tracks | Catchy Letter Beats | Phonics Garden',
    description: 'Stream and download upbeat phonics MP3 tracks. Melodic jazz, calypso rhymes, and energetic rhythm tracks that accelerate phonemic mapping and auditory processing.',
    keywords: 'phonics songs mp3, phonics audio tracks, alphabet rhymes, phonemic awareness music, classroom clean songs, sing-along letter beats',
    canonical: `${BASE_URL}/music`,
    breadcrumb: 'Music & Audio Tracks',
    emoji: '🎵',
    ogType: 'music.playlist'
  },
  soundboard: {
    path: '/sound-game',
    tabId: 'soundboard',
    title: 'Interactive Phonics Sound Game & Board | Play & Hear Letter Sounds | Phonics Garden',
    description: 'Play the interactive Phonics Sound Game! Click letters, phonemes, and decodable words to hear crystal-clear pronunciation and audio cheers in a joyful garden world.',
    keywords: 'phonics sound game, interactive letter sounds, phonics soundboard, online reading game for kids, letter pronunciation game, sound out words online',
    canonical: `${BASE_URL}/sound-game`,
    breadcrumb: 'Interactive Sound Game',
    emoji: '🎮',
    ogType: 'website'
  },
  shop: {
    path: '/shop',
    tabId: 'shop',
    title: 'Phonics Print Shop | Physical Decodable Books & Flashcards | Phonics Garden',
    description: 'Order hardcopy decodable book sets, laminated CVC word wheels, flipbooks, and classroom multi-level mega bundles delivered straight to your door.',
    keywords: 'buy decodable books, phonics book sets, printed phonics packs, classroom reading bundles, tactile word wheels, decodables in print',
    canonical: `${BASE_URL}/shop`,
    breadcrumb: 'Print Shop',
    emoji: '🛍️',
    ogType: 'website'
  },
  pricing: {
    path: '/pricing',
    tabId: 'pricing',
    title: 'All-Access Membership Pass & School Pricing ($59.95/yr) | Phonics Garden',
    description: 'Unlimited access to all 40 decodable books, 25,000+ worksheets, streaming animated videos, songs, and games. Family passes and school purchase orders available.',
    keywords: 'phonics membership, teacher reading subscription, homeschool phonics curriculum cost, classroom phonics license, phonics garden pass',
    canonical: `${BASE_URL}/pricing`,
    breadcrumb: 'Join Pass & Pricing',
    emoji: '⭐',
    ogType: 'website'
  },
  about: {
    path: '/about',
    tabId: 'about',
    title: 'About Phonics Garden | Science of Reading Systematic Phonics Curriculum',
    description: 'Learn about the Phonics Garden mission and evidence-based systematic synthetic phonics methodology. Designed by literacy specialists for preschool through 2nd grade.',
    keywords: 'about phonics garden, systematic synthetic phonics, science of reading curriculum, early childhood literacy specialists, Orton-Gillingham alignment',
    canonical: `${BASE_URL}/about`,
    breadcrumb: 'About Our Method',
    emoji: '🌱',
    ogType: 'profile'
  },
  contact: {
    path: '/contact',
    tabId: 'contact',
    title: 'Contact Phonics Garden | Support & School Purchase Orders',
    description: 'Have questions about classroom licenses, purchase orders, or homeschool curriculum? Contact the Phonics Garden education team for fast, friendly help.',
    keywords: 'contact phonics garden, school purchase order phonics, educator support, phonics license help, teacher assistance',
    canonical: `${BASE_URL}/contact`,
    breadcrumb: 'Help & Contact',
    emoji: '💌',
    ogType: 'website'
  },
  terms: {
    path: '/terms',
    tabId: 'terms',
    title: 'Terms of Service & Classroom License | Phonics Garden',
    description: 'Read the terms of service and classroom & personal licensing policy for Phonics Garden books, printables, videos, and membership subscriptions.',
    keywords: 'phonics garden terms, classroom printing license, educational usage rights, terms of service',
    canonical: `${BASE_URL}/terms`,
    breadcrumb: 'Terms & Licensing',
    emoji: '📜',
    ogType: 'website'
  }
};

// URL path mapping to tab ID
export const PATH_TO_TAB: Record<string, string> = {
  '/': 'home',
  '/home': 'home',
  '/decodables': 'decodables',
  '/books': 'decodables',
  '/leveled-readers': 'leveled',
  '/leveled': 'leveled',
  '/videos': 'videos',
  '/worksheets': 'worksheets',
  '/printables': 'worksheets',
  '/crafts': 'crafts',
  '/music': 'music',
  '/songs': 'music',
  '/sound-game': 'soundboard',
  '/soundboard': 'soundboard',
  '/shop': 'shop',
  '/pricing': 'pricing',
  '/membership': 'pricing',
  '/about': 'about',
  '/contact': 'contact',
  '/support': 'contact',
  '/terms': 'terms'
};

// Tab ID mapping to canonical path
export const TAB_TO_PATH: Record<string, string> = {
  home: '/',
  decodables: '/decodables',
  leveled: '/leveled-readers',
  videos: '/videos',
  worksheets: '/worksheets',
  crafts: '/crafts',
  music: '/music',
  soundboard: '/sound-game',
  shop: '/shop',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
  terms: '/terms'
};

/**
 * Update document title, description, keywords, canonical link, and OpenGraph meta tags
 */
export function updateSEO(tabId: string) {
  const meta = ROUTES_CONFIG[tabId] || ROUTES_CONFIG.home;

  // Title
  document.title = meta.title;

  // Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', meta.description);

  // Meta Keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', meta.keywords);

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', meta.canonical);

  // Open Graph Tags
  const setMetaProperty = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaProperty('og:title', meta.title);
  setMetaProperty('og:description', meta.description);
  setMetaProperty('og:url', meta.canonical);
  setMetaProperty('og:type', meta.ogType);

  // Twitter Cards
  const setMetaName = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaName('twitter:title', meta.title);
  setMetaName('twitter:description', meta.description);

  // Update BreadcrumbList Schema in head
  updateBreadcrumbSchema(meta);
}

function updateBreadcrumbSchema(meta: RouteMeta) {
  const schemaId = 'schema-breadcrumbs';
  let script = document.getElementById(schemaId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const breadcrumbsData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${BASE_URL}/`
      },
      ...(meta.tabId !== 'home' ? [{
        '@type': 'ListItem',
        'position': 2,
        'name': meta.breadcrumb,
        'item': meta.canonical
      }] : [])
    ]
  };

  script.textContent = JSON.stringify(breadcrumbsData);
}
