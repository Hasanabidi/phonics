import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  BookOpen, 
  FileText, 
  Video, 
  Music, 
  Scissors, 
  Star, 
  Download, 
  Volume2,
  Gamepad2,
  Smile,
  Heart,
  Palette
} from 'lucide-react';
import { BOOKS_DATA, VIDEOS_DATA, TESTIMONIALS, SHOP_DATA } from '../data/siteData';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  openFreeBookModal: () => void;
  setSelectedBook: (id: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  setActiveTab, 
  openFreeBookModal,
  setSelectedBook 
}) => {
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [activeLetter, setActiveLetter] = useState<string>('A');

  // Friendly character speech
  const speakVoice = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.35; // friendly energetic kids tone
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const interactiveAlphabet = [
    { letter: 'A', sound: 'Apple /æ/', emoji: '🍎', color: 'from-rose-400 to-red-500' },
    { letter: 'B', sound: 'Butterfly /b/', emoji: '🦋', color: 'from-sky-400 to-blue-500' },
    { letter: 'C', sound: 'Cat /k/', emoji: '🐱', color: 'from-amber-400 to-orange-500' },
    { letter: 'D', sound: 'Dolphin /d/', emoji: '🐬', color: 'from-teal-400 to-cyan-500' },
    { letter: 'E', sound: 'Elephant /ɛ/', emoji: '🐘', color: 'from-purple-400 to-indigo-500' },
    { letter: 'F', sound: 'Frog /f/', emoji: '🐸', color: 'from-emerald-400 to-green-500' },
    { letter: 'G', sound: 'Guitar /g/', emoji: '🎸', color: 'from-pink-400 to-rose-500' },
    { letter: 'H', sound: 'Heart /h/', emoji: '💖', color: 'from-yellow-400 to-amber-500' },
  ];

  const funAdventures = [
    {
      id: 'soundboard',
      title: 'Sound & Blend Lab',
      subtitle: 'Mix letters like magic potions!',
      emoji: '🧪',
      tag: 'Super Fun Game!',
      bg: 'bg-gradient-to-br from-purple-400 to-indigo-500 text-white',
      border: 'border-purple-300',
      action: 'Play Game 🎮'
    },
    {
      id: 'decodables',
      title: '40 Story Books',
      subtitle: 'Read funny stories step-by-step!',
      emoji: '📖',
      tag: 'Books 1 to 40',
      bg: 'bg-gradient-to-br from-rose-400 to-orange-400 text-white',
      border: 'border-rose-300',
      action: 'Open Books 📚'
    },
    {
      id: 'videos',
      title: 'Animated Phonics Songs',
      subtitle: 'Dance with Pirates, Cats & Vowels!',
      emoji: '🎬',
      tag: 'Sing Along!',
      bg: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white',
      border: 'border-amber-300',
      action: 'Watch Videos 📺'
    },
    {
      id: 'worksheets',
      title: '25,000+ Coloring Pages',
      subtitle: 'Mazes, tracing, puzzles & wheels!',
      emoji: '🖍️',
      tag: 'Print & Color',
      bg: 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white',
      border: 'border-emerald-300',
      action: 'Get Sheets 🎨'
    },
    {
      id: 'crafts',
      title: 'StoryTime Crafts',
      subtitle: 'Make paper puppets & cool masks!',
      emoji: '✂️',
      tag: 'Hands-On Art',
      bg: 'bg-gradient-to-br from-pink-400 to-rose-400 text-white',
      border: 'border-pink-300',
      action: 'Make Crafts 🌟'
    },
    {
      id: 'music',
      title: 'Garden Beat Tracks',
      subtitle: 'Sing out loud with jazz & island drums!',
      emoji: '🎶',
      tag: 'Fun MP3 Songs',
      bg: 'bg-gradient-to-br from-teal-400 to-cyan-500 text-white',
      border: 'border-teal-300',
      action: 'Listen MP3 🎵'
    }
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden text-left">
      
      {/* PLAYFUL KIDS HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Playful Floating Cloud & Balloon Background Accents */}
        <div className="absolute top-8 left-10 text-4xl sm:text-6xl animate-bounce-slow opacity-80 pointer-events-none select-none">
          🎈
        </div>
        <div className="absolute top-20 right-14 text-4xl sm:text-6xl animate-bounce-slow opacity-80 pointer-events-none select-none" style={{ animationDelay: '1.2s' }}>
          ⭐
        </div>
        <div className="absolute bottom-6 left-1/4 text-4xl sm:text-5xl animate-bounce-slow opacity-75 pointer-events-none select-none" style={{ animationDelay: '2s' }}>
          🌈
        </div>
        <div className="absolute bottom-10 right-1/3 text-4xl sm:text-5xl animate-bounce-slow opacity-75 pointer-events-none select-none" style={{ animationDelay: '0.8s' }}>
          🦋
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Energetic Headline & Interactive Buddy */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-300/80 border-2 border-amber-400 text-amber-950 text-xs sm:text-sm font-black shadow-sm">
              <span className="text-xl animate-wiggle">🌱</span>
              <span>Welcome to the magical Phonics Garden!</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] font-heading">
              Learning to Read is an{' '}
              <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent underline decoration-wavy decoration-amber-400">
                Exciting Adventure!
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-700 leading-relaxed font-semibold max-w-2xl">
              Meet <strong>Mr. Flows</strong> & friendly animal buddies! Explore <strong>40 exciting storybooks</strong>, sing happy phonics songs, blend letters together, and color over <strong>25,000 printable worksheets</strong>.
            </p>

            {/* Click-to-Hear Audio Alphabet Ribbon */}
            <div className="bg-white/90 p-4 rounded-3xl border-3 border-amber-300 shadow-md space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-amber-900">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4 text-rose-500" /> Tap any letter sound to hear it speak:
                </span>
                <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  Try it! 🔊
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {interactiveAlphabet.map((item) => (
                  <button
                    key={item.letter}
                    onClick={() => {
                      setActiveLetter(item.letter);
                      speakVoice(`${item.letter}! ${item.sound}`);
                    }}
                    className={`p-2 rounded-2xl text-center transition-all cursor-pointer bg-gradient-to-tr ${item.color} text-white shadow-sm hover:scale-110 active:scale-95 border-2 border-white`}
                  >
                    <div className="text-xl font-black leading-none">{item.letter}</div>
                    <div className="text-sm mt-0.5">{item.emoji}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons: Big & Playful */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => setActiveTab('soundboard')}
                className="px-8 py-4 rounded-3xl bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white font-black text-base shadow-lg shadow-purple-500/30 btn-bubbly border-3 border-purple-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="text-2xl">🎮</span>
                <span>Play Sound Game Now!</span>
              </button>
              
              <button
                onClick={openFreeBookModal}
                className="px-7 py-4 rounded-3xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-base shadow-lg shadow-rose-500/20 btn-bubbly border-3 border-rose-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="text-2xl">📖</span>
                <span>Read "Rick's Red Rag" (Free!)</span>
              </button>
            </div>

            {/* Joyful Kid Stat Badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-900 text-xs font-black">
                ✨ 100% Frustration-Free
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-sky-100 border-2 border-sky-300 text-sky-900 text-xs font-black">
                📚 40 Decodable Readers
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-900 text-xs font-black">
                🎈 Loved by 45,000+ Kids!
              </span>
            </div>

          </div>

          {/* Right Column: Friendly Buddy Character Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-4xl p-6 sm:p-8 border-4 border-amber-300 shadow-2xl space-y-6 relative overflow-hidden">
              
              {/* Character Header Bubble */}
              <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-6 text-white text-center relative overflow-hidden shadow-inner border-2 border-white">
                <div className="text-6xl mb-2 animate-bounce-slow">🐶</div>
                <h3 className="text-2xl font-black font-heading">Meet Puppy Rick!</h3>
                <p className="text-amber-100 text-xs font-bold mt-1">
                  "Hi! Want to read my favorite red rag story with me?"
                </p>
                <button
                  onClick={() => {
                    setSelectedBook(1);
                    setActiveTab('decodables');
                    speakVoice("Puppy Rick is ready! Let's read Book 1 together!");
                  }}
                  className="mt-4 px-5 py-2.5 bg-white text-rose-600 rounded-2xl font-black text-xs shadow-md hover:bg-rose-50 transition-all cursor-pointer inline-flex items-center gap-1.5 hover:scale-105"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Book 1 Adventure &rarr;</span>
                </button>
              </div>

              {/* Quick Word Blending Machine Preview */}
              <div className="bg-purple-50 rounded-3xl p-5 border-2 border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-900 flex items-center gap-1">
                    <Gamepad2 className="w-4 h-4 text-purple-600" /> Tap to blend this word:
                  </span>
                  <span className="text-[10px] bg-purple-200 text-purple-900 font-black px-2 py-0.5 rounded-full">
                    CVC Word
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { char: 'R', sound: '/r/', bg: 'bg-rose-400 text-white' },
                    { char: 'E', sound: '/ɛ/', bg: 'bg-amber-400 text-amber-950' },
                    { char: 'D', sound: '/d/', bg: 'bg-emerald-400 text-white' },
                    { char: 'RED!', sound: 'Blend!', bg: 'bg-purple-600 text-white animate-pulse' }
                  ].map((tile, i) => (
                    <button
                      key={i}
                      onClick={() => speakVoice(tile.char)}
                      className={`${tile.bg} p-3 rounded-2xl shadow-sm border-2 border-white hover:scale-110 active:scale-95 transition-transform cursor-pointer`}
                    >
                      <div className="text-lg font-black">{tile.char}</div>
                      <div className="text-[10px] opacity-80">{tile.sound}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Perks list */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5 bg-amber-50 p-2 rounded-xl">
                  <span>🎨 Coloring Book Fun</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 p-2 rounded-xl">
                  <span>🎵 Catchy Phonics Songs</span>
                </div>
                <div className="flex items-center gap-1.5 bg-rose-50 p-2 rounded-xl">
                  <span>✂️ Easy Puppet Crafts</span>
                </div>
                <div className="flex items-center gap-1.5 bg-sky-50 p-2 rounded-xl">
                  <span>⭐ Earn Stars & Badges</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CHOOSE YOUR ADVENTURE: 6 COLORFUL THEMED WORLD CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-purple-700 font-black text-xs uppercase tracking-widest bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
            Pick Your Learning Station 🎈
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
            What fun adventure do you want to explore today?
          </h2>
          <p className="text-slate-600 text-base font-semibold">
            Choose any station to read books, play sound games, sing songs, or download coloring sheets!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {funAdventures.map((station) => (
            <div
              key={station.id}
              onClick={() => setActiveTab(station.id)}
              className={`${station.bg} rounded-4xl p-7 border-4 ${station.border} shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-2`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl p-2 bg-white/20 rounded-2xl backdrop-blur-xs group-hover:rotate-12 transition-transform">
                    {station.emoji}
                  </span>
                  <span className="text-xs font-black bg-white/25 px-3 py-1 rounded-full uppercase tracking-wider">
                    {station.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-black font-heading leading-snug">
                  {station.title}
                </h3>
                <p className="text-white/90 text-sm font-semibold mt-1.5">
                  {station.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-black">
                <span className="bg-white text-slate-900 px-4 py-2 rounded-2xl shadow-xs group-hover:scale-105 transition-transform">
                  {station.action}
                </span>
                <span className="text-lg">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE BOOK SHOWCASE: RICK'S RED RAG & FRIENDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-4xl p-8 sm:p-12 border-4 border-amber-300 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-200">
                ⭐ Books 1 to 40
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-2 font-heading">
                Step-by-Step Decodable Story Books
              </h2>
              <p className="text-slate-600 text-sm font-semibold mt-0.5">
                Every story introduces only sounds your child knows — no guessing, no tears!
              </p>
            </div>
            <button
              onClick={() => setActiveTab('decodables')}
              className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs rounded-2xl shadow-sm cursor-pointer self-start md:self-auto hover:scale-105 transition-transform"
            >
              See All 40 Books &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BOOKS_DATA.slice(0, 4).map((book) => (
              <div
                key={book.id}
                onClick={() => {
                  setSelectedBook(book.id);
                  setActiveTab('decodables');
                }}
                className="bg-slate-50 rounded-3xl border-3 border-slate-200 p-5 flex flex-col justify-between hover:border-amber-400 transition-all cursor-pointer group hover:-translate-y-1 shadow-xs hover:shadow-md"
              >
                <div>
                  <div className={`h-36 rounded-2xl bg-gradient-to-tr ${book.coverGradient} p-4 text-white flex flex-col justify-between shadow-xs border-2 border-white`}>
                    <div className="flex justify-between items-center text-[10px] font-black">
                      <span className="bg-black/30 px-2 py-0.5 rounded-full">Book {book.id}</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded">{book.category}</span>
                    </div>
                    <div>
                      <h4 className="font-black text-base leading-snug">{book.title}</h4>
                      <p className="text-[11px] text-white/90">{book.focusSound}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 font-medium line-clamp-2">
                    {book.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs font-black text-rose-600">
                  <span>{book.pages} Pages</span>
                  <span className="group-hover:translate-x-1 transition-transform">Read Story &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHER & PARENT REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            From Classrooms & Living Rooms
          </span>
          <h2 className="text-3xl font-black text-slate-900 font-heading">
            Why Kids and Teachers Love Phonics Garden
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border-3 border-amber-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-400 gap-1 text-sm">
                  {'⭐⭐⭐⭐⭐'}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <span className="text-3xl">{t.avatar}</span>
                <div>
                  <h4 className="font-black text-xs text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BIG BUBBLY BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-4xl p-10 sm:p-14 text-white text-center shadow-2xl border-4 border-emerald-300 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-4xl animate-bounce">🎈</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading">
              Ready to start your phonics reading journey today?
            </h2>
            <p className="text-emerald-50 text-base sm:text-lg font-semibold max-w-xl mx-auto">
              Get unlimited access to over 10,000 resources, 40 step-by-step readers, and streamable songs for home or school!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button
                onClick={() => setActiveTab('pricing')}
                className="px-8 py-4 rounded-3xl bg-amber-400 text-amber-950 font-black text-base shadow-lg hover:bg-amber-300 btn-bubbly cursor-pointer border-3 border-amber-500"
              >
                Join Garden Pass ($59.95/yr) ⭐
              </button>
              <button
                onClick={openFreeBookModal}
                className="px-7 py-4 rounded-3xl bg-white text-slate-800 font-black text-base border-3 border-white/60 hover:bg-slate-50 cursor-pointer shadow-md"
              >
                Get Free Sample Book 📖
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
