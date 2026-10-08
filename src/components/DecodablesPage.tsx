import React, { useState, useRef } from 'react';
import { 
  BookOpen, 
  Download, 
  Play, 
  HelpCircle, 
  CheckCircle2, 
  Search, 
  FileText, 
  Sparkles, 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Star
} from 'lucide-react';
import { BOOKS_DATA, DecodableBook } from '../data/siteData';

interface DecodablesPageProps {
  selectedBookId: number;
  setSelectedBookId: (id: number) => void;
  openFreeBookModal: () => void;
  setActiveTab: (tab: string) => void;
}

export const DecodablesPage: React.FC<DecodablesPageProps> = ({
  selectedBookId,
  setSelectedBookId,
  openFreeBookModal,
  setActiveTab
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Ref to scroll back up to preview when clicking cards below
  const readerSectionRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Short Vowels', 'Digraphs', 'Magic-E', 'Bossy-R', 'Diphthongs'];

  const filteredBooks = BOOKS_DATA.filter((b) => {
    const matchesCat = filterCategory === 'All' || b.category === filterCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.focusSound.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.targetWords.some(w => w.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const currentBook = BOOKS_DATA.find((b) => b.id === selectedBookId) || BOOKS_DATA[0];

  const handleSelectBook = (bookId: number) => {
    setSelectedBookId(bookId);
    setTimeout(() => {
      if (readerSectionRef.current) {
        const yOffset = -90;
        const y = readerSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  const playSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.3;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left select-none">
      
      {/* Playful Header Banner */}
      <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 rounded-4xl p-8 sm:p-12 text-rose-950 shadow-lg relative overflow-hidden border-4 border-rose-300/60">
        <div className="absolute top-4 right-10 text-4xl opacity-50 animate-float pointer-events-none">
          📚
        </div>
        <div className="absolute bottom-6 right-28 text-3xl opacity-50 animate-bounce-slow pointer-events-none">
          ✨
        </div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider text-rose-900 shadow-xs border border-white">
            <BookOpen className="w-3.5 h-3.5 text-rose-600" /> 
            <span>40 Systematic Levels (Books 1 to 40) 🎈</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading text-rose-950">
            The Systematic Decodable Phonics Series
          </h1>
          <p className="text-rose-900 font-bold text-base sm:text-lg leading-relaxed">
            Eliminate reading tears with sequential, controlled-vocabulary decodable books. Every book advances phonetic mastery one step at a time, backed by printable worksheets and read-aloud audio.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={openFreeBookModal}
              className="px-6 py-3.5 rounded-2xl bg-white text-rose-900 font-black text-sm shadow-md hover:bg-rose-50 transition-all flex items-center gap-2 cursor-pointer btn-bubbly border-2 border-rose-200"
            >
              <Download className="w-4 h-4 text-rose-600" />
              <span>Download Free Book Sample (Book 1) 📖</span>
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-6 py-3.5 rounded-2xl bg-amber-300 hover:bg-amber-400 text-amber-950 font-black text-sm border-2 border-amber-400 transition-all cursor-pointer btn-bubbly shadow-md"
            >
              Unlock All 40 Books Series ($39.95/yr) ⭐
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE E-READER READER PREVIEW SECTION (Anchored with ref for auto-scroll) */}
      <div 
        ref={readerSectionRef}
        className="scroll-mt-28 bg-white rounded-4xl p-6 sm:p-8 border-4 border-rose-300 shadow-xl space-y-6 relative overflow-hidden animate-pop"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-rose-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 font-black flex items-center justify-center text-xl shadow-xs border border-rose-200">
              #{currentBook.id}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-rose-100 text-rose-800 font-black px-2.5 py-0.5 rounded-full border border-rose-200">
                  {currentBook.category}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  Target Sound: <strong className="text-rose-700 font-black">{currentBook.focusSound}</strong>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">
                {currentBook.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => playSpeech(currentBook.sampleText)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 border-2 transition-all cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-200'
              }`}
            >
              <Volume2 className="w-4 h-4 text-rose-700" />
              <span>{isPlayingAudio ? 'Speaking Story...' : 'Listen Read-Aloud 🔊'}</span>
            </button>

            <button
              onClick={openFreeBookModal}
              className="px-5 py-2.5 bg-amber-300 hover:bg-amber-400 text-amber-950 font-black rounded-2xl text-xs flex items-center gap-2 shadow-sm border-2 border-amber-400 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Print Book PDF Pack ({currentBook.pages} Pages) 🖨️</span>
            </button>
          </div>
        </div>

        {/* Live Reader Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-rose-50/60 p-6 sm:p-8 rounded-3xl border-2 border-rose-200/80">
          
          {/* Animated Illustrated Book Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className={`w-full max-w-sm rounded-3xl bg-gradient-to-tr ${currentBook.coverGradient} p-6 sm:p-8 text-white shadow-lg border-4 border-white relative overflow-hidden transform hover:rotate-1 transition-transform`}>
              <div className="flex justify-between items-center mb-6">
                <span className="bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black uppercase">
                  Level {currentBook.id}
                </span>
                <span className="text-2xl">🌱</span>
              </div>
              <div className="space-y-2 mb-8">
                <h3 className="text-2xl sm:text-3xl font-black font-heading leading-tight drop-shadow-xs">
                  {currentBook.title}
                </h3>
                <p className="text-sm font-bold text-white/90">
                  Focus Sound: {currentBook.focusSound}
                </p>
              </div>
              <div className="flex justify-between items-center text-xs font-black text-white/80 pt-4 border-t border-white/20">
                <span>{currentBook.pages} Pages</span>
                <span>{currentBook.quizzes} Review Quizzes</span>
              </div>
            </div>
          </div>

          {/* Story Excerpt & Target Decodables */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white p-6 rounded-3xl border-2 border-rose-200 shadow-sm space-y-3">
              <span className="text-xs font-black text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>📖</span>
                <span>Story Page Excerpt</span>
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed font-heading">
                "{currentBook.sampleText}"
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>🎯</span>
                <span>Target Decodable Practice Words</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentBook.targetWords.map((word, idx) => (
                  <span 
                    key={idx}
                    onClick={() => playSpeech(word)}
                    className="px-3.5 py-1.5 bg-white text-rose-900 border-2 border-rose-200 rounded-2xl text-xs font-black cursor-pointer hover:bg-rose-100 hover:scale-105 active:scale-95 transition-all shadow-xs"
                    title="Click to hear word sound"
                  >
                    🔊 {word}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setActiveTab('pricing')}
                className="text-xs font-black text-rose-700 hover:text-rose-900 hover:underline cursor-pointer"
              >
                Join membership to unlock printable quizzes & read-along audio &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-rose-500 text-white shadow-sm border-2 border-rose-600 scale-105'
                    : 'bg-white hover:bg-rose-50 text-slate-700 border-2 border-amber-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-rose-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, sounds, words..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-amber-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-rose-300 shadow-xs"
            />
          </div>
        </div>

        {/* 40 BOOKS GRID LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const isCurrent = book.id === currentBook.id;
            return (
              <div
                key={book.id}
                onClick={() => handleSelectBook(book.id)}
                className={`bg-white rounded-3xl border-3 transition-all p-5 flex flex-col justify-between cursor-pointer group card-playful relative overflow-hidden select-none ${
                  isCurrent 
                    ? 'border-rose-500 shadow-xl ring-4 ring-rose-200/70 bg-rose-50/20 scale-[1.02]' 
                    : 'border-amber-200/90 hover:border-rose-400 shadow-sm hover:shadow-lg'
                }`}
              >
                <div>
                  <div className={`h-36 rounded-2xl bg-gradient-to-tr ${book.coverGradient} p-4 text-white flex flex-col justify-between shadow-xs relative overflow-hidden`}>
                    <div className="flex items-center justify-between">
                      <span className="bg-black/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-black">
                        Book {book.id}
                      </span>
                      <span className="text-[10px] font-black bg-white/20 px-2.5 py-0.5 rounded-full">
                        {book.category}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-black text-base leading-snug font-heading drop-shadow-xs">{book.title}</h4>
                      <p className="text-[11px] text-white/95 font-bold">Sound: {book.focusSound}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 font-medium leading-relaxed">
                    {book.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {book.targetWords.slice(0, 3).map((w, idx) => (
                      <span key={idx} className="text-[10px] bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full font-bold">
                        {w}
                      </span>
                    ))}
                    {book.targetWords.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-bold">+{book.targetWords.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t-2 border-rose-100 flex items-center justify-between text-xs font-black text-rose-700">
                  <span className="text-slate-500 font-bold">{book.pages} Pages</span>
                  <span className={`px-2.5 py-1 rounded-xl transition-all ${
                    isCurrent ? 'bg-rose-500 text-white' : 'bg-rose-100 group-hover:bg-rose-200'
                  }`}>
                    {isCurrent ? '✨ Reading Now' : 'Select Book &rarr;'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
