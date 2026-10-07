import React, { useState } from 'react';
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
  ExternalLink
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

  const categories = ['All', 'Short Vowels', 'Digraphs', 'Magic-E', 'Bossy-R', 'Diphthongs'];

  const filteredBooks = BOOKS_DATA.filter((b) => {
    const matchesCat = filterCategory === 'All' || b.category === filterCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.focusSound.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.targetWords.some(w => w.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const currentBook = BOOKS_DATA.find((b) => b.id === selectedBookId) || BOOKS_DATA[0];

  const playSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> 40 Systematic Levels (Books 1 to 40)
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            The Systematic Decodable Phonics Series
          </h1>
          <p className="text-rose-100 text-base sm:text-lg leading-relaxed">
            Eliminate reading tears with sequential, controlled-vocabulary decodable books. Every book advances phonetic mastery one step at a time, backed by over 1,000 printable worksheets and read-aloud streaming videos.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={openFreeBookModal}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-sm shadow-md hover:bg-rose-50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-rose-600" />
              <span>Download Free Book Sample (Book 1)</span>
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-5 py-3 rounded-xl bg-rose-950/40 hover:bg-rose-950/60 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Unlock All 40 Books Series ($39.95/yr)
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE E-READER READER PREVIEW SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 font-black flex items-center justify-center text-lg">
              #{currentBook.id}
            </span>
            <div>
              <h2 className="text-2xl font-black text-slate-900">{currentBook.title}</h2>
              <p className="text-xs text-slate-500 font-semibold">Phonetic Focus: {currentBook.focusSound} • {currentBook.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => playSpeech(currentBook.sampleText)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingAudio ? 'Speaking Sample...' : 'Listen Read-Aloud'}</span>
            </button>
            <button
              onClick={openFreeBookModal}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Free PDF Sample</span>
            </button>
          </div>
        </div>

        {/* E-Reader Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/80 p-6 sm:p-8 rounded-2xl border border-slate-200">
          
          {/* Simulated Book Page */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl shadow-md border border-slate-200/80 space-y-6 min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-4">
                <span>PHONICS GARDEN DECODABLE SERIES</span>
                <span>PAGE 3 OF {currentBook.pages}</span>
              </div>
              
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-relaxed font-serif tracking-wide">
                "{currentBook.sampleText}"
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">
                Click any word below to practice sounding it out:
              </span>
              <div className="flex gap-1.5">
                {currentBook.targetWords.map((word, i) => (
                  <button
                    key={i}
                    onClick={() => playSpeech(word)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-800 hover:text-rose-700 text-xs font-mono font-bold transition-colors cursor-pointer"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Book Information & Metadata Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Book Pedagogical Specifications
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Target Sound:</span>
                  <span className="font-bold text-rose-600">{currentBook.focusSound}</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Book Length:</span>
                  <span className="font-bold">{currentBook.pages} illustrated pages</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Comprehension Quiz:</span>
                  <span className="font-bold">{currentBook.quizzes} multi-choice questions</span>
                </li>
                <li className="flex items-center justify-between py-1">
                  <span className="text-slate-500">Companion Sheets:</span>
                  <span className="font-bold">25+ Printable Book Sheets</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Frustration-Free Phonics Rule</span>
              </div>
              <p>
                Children only see phonetic sound-spellings they have already unlocked. Unfamiliar sight words are introduced with specific memory cues before opening each story.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, sounds, words..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                onClick={() => setSelectedBookId(book.id)}
                className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between cursor-pointer group ${
                  isCurrent 
                    ? 'border-2 border-rose-500 shadow-lg ring-4 ring-rose-50' 
                    : 'border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className={`h-36 rounded-xl bg-gradient-to-tr ${book.coverGradient} p-4 text-white flex flex-col justify-between shadow-xs relative overflow-hidden`}>
                    <div className="flex items-center justify-between">
                      <span className="bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-bold">
                        Book {book.id}
                      </span>
                      <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded">
                        {book.category}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base leading-snug">{book.title}</h4>
                      <p className="text-[11px] text-white/90">{book.focusSound}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2">
                    {book.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {book.targetWords.slice(0, 3).map((w, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-medium">
                        {w}
                      </span>
                    ))}
                    {book.targetWords.length > 3 && (
                      <span className="text-[10px] text-slate-400">+{book.targetWords.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
                  <span>{book.pages} Pages</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {isCurrent ? 'Previewing Now' : 'Select Book &rarr;'}
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
