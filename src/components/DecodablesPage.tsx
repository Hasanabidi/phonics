import React, { useState, useRef } from 'react';
import { 
  BookOpen, 
  Download, 
  Search, 
  Volume2, 
  Printer, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Scissors,
  CheckCircle2
} from 'lucide-react';
import { BOOKS_DATA, DecodableBook, PHONICS_PHASES } from '../data/siteData';
import { audioEngine } from '../utils/audioEngine';
import { printFoldableMiniBook } from '../utils/printEngine';
import { PaywallModal } from './PaywallModal';

interface DecodablesPageProps {
  selectedBookId: number;
  setSelectedBookId: (id: number) => void;
  openFreeBookModal: () => void;
  setActiveTab: (tab: string) => void;
}

export const DecodablesPage: React.FC<DecodablesPageProps> = ({
  selectedBookId,
  setSelectedBookId,
  setActiveTab
}) => {
  const [selectedPhase, setSelectedPhase] = useState<number | 'All'>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [paywallModalOpen, setPaywallModalOpen] = useState(false);
  const [paywallItemTitle, setPaywallItemTitle] = useState('Full Decodable Series');

  const readerSectionRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Short Vowels', 'Digraphs', 'Magic-E', 'Bossy-R', 'Diphthongs'];

  const filteredBooks = BOOKS_DATA.filter((b) => {
    const matchesPhase = selectedPhase === 'All' || b.phase === selectedPhase;
    const matchesCat = filterCategory === 'All' || b.category === filterCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.focusSound.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.targetWords.some(w => w.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPhase && matchesCat && matchesSearch;
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

  const handleReadStoryAloud = async () => {
    if (isPlayingAudio) {
      audioEngine.stopAll();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    await audioEngine.speakWord(currentBook.sampleText, 0.85);
    setIsPlayingAudio(false);
  };

  const handlePrintFoldable = (book: DecodableBook) => {
    if (!book.isFree) {
      setPaywallItemTitle(book.title);
      setPaywallModalOpen(true);
      return;
    }
    printFoldableMiniBook(book);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left select-none">
      
      {/* Playful Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 rounded-4xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border-4 border-rose-300">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider text-white">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" /> 
            <span>Science of Reading (SoR) Scope & Sequence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading">
            Systematic Decodable Readers
          </h1>
          <p className="text-rose-100 font-medium text-sm sm:text-base leading-relaxed">
            Eliminate guessing with 100% controlled-text decodables. Pure phoneme audio narration, heart words, and instant 1-sheet foldable 8-page pocket books.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => handlePrintFoldable(BOOKS_DATA[0])}
              className="px-5 py-3 rounded-2xl bg-white text-rose-950 font-black text-xs sm:text-sm shadow-md hover:bg-rose-50 transition-all flex items-center gap-2 cursor-pointer border-2 border-rose-200"
            >
              <Scissors className="w-4 h-4 text-rose-600" />
              <span>Print Free Foldable Mini-Book (Book 1) ✂️</span>
            </button>
            <button
              onClick={() => {
                setPaywallItemTitle("All 40 Decodable Books");
                setPaywallModalOpen(true);
              }}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs sm:text-sm transition-all cursor-pointer shadow-md"
            >
              Unlock Classroom Printing Rights ($49/yr) ⭐
            </button>
          </div>
        </div>
      </div>

      {/* SCIENCE OF READING 6-PHASE SCOPE & SEQUENCE FILTER */}
      <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Curriculum Scope & Sequence Filter:</span>
          </span>
          <span className="text-xs font-bold text-slate-400">
            Cumulative progression (Phases 1-6)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
          <button
            onClick={() => setSelectedPhase('All')}
            className={`px-3 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer border ${
              selectedPhase === 'All'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            All Phases (40 Books)
          </button>
          {PHONICS_PHASES.map((phase) => (
            <button
              key={phase.phase}
              onClick={() => setSelectedPhase(phase.phase)}
              className={`px-3 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer border text-left flex flex-col justify-between ${
                selectedPhase === phase.phase
                  ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                  : 'bg-white hover:bg-rose-50 text-slate-800 border-slate-200'
              }`}
            >
              <span className="font-extrabold text-[11px]">Phase {phase.phase}</span>
              <span className="text-[10px] opacity-80 truncate font-normal">
                {phase.graphemes.slice(0, 4).join(', ')}...
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* INTERACTIVE READER SECTION */}
      <div 
        ref={readerSectionRef}
        className="scroll-mt-28 bg-white rounded-4xl p-6 sm:p-8 border-4 border-rose-200 shadow-xl space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-rose-100 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 font-black flex items-center justify-center text-xl border border-rose-200 shrink-0">
              #{currentBook.id}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs bg-rose-100 text-rose-800 font-black px-2.5 py-0.5 rounded-full">
                  {currentBook.phaseName}
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {currentBook.decodabilityScore}% Decodable
                </span>
                {currentBook.isFree ? (
                  <span className="text-xs bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded-full">
                    Free Book 🎁
                  </span>
                ) : (
                  <span className="text-xs bg-slate-100 text-slate-700 font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-600" />
                    Classroom License
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">
                {currentBook.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleReadStoryAloud}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 border-2 transition-all cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-200'
              }`}
            >
              <Volume2 className="w-4 h-4 text-rose-700" />
              <span>{isPlayingAudio ? 'Reading Story Aloud...' : 'Listen Read-Aloud 🔊'}</span>
            </button>

            <button
              onClick={() => handlePrintFoldable(currentBook)}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black rounded-2xl text-xs flex items-center gap-2 shadow-sm border border-amber-300 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Foldable 8-Page Book ✂️</span>
            </button>
          </div>
        </div>

        {/* Live Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-rose-50/50 p-6 sm:p-8 rounded-3xl border border-rose-200/80">
          
          {/* Book Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className={`w-full max-w-sm rounded-3xl bg-gradient-to-tr ${currentBook.coverGradient} p-6 sm:p-8 text-white shadow-lg border-4 border-white relative overflow-hidden`}>
              <div className="flex justify-between items-center mb-6">
                <span className="bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black uppercase">
                  Book {currentBook.id} • Phase {currentBook.phase}
                </span>
                <span className="text-2xl">🌱</span>
              </div>
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl sm:text-3xl font-black font-heading leading-tight drop-shadow-xs">
                  {currentBook.title}
                </h3>
                <p className="text-xs font-bold text-white/90">
                  Focus Sound: {currentBook.focusSound}
                </p>
              </div>
              <div className="flex justify-between items-center text-xs font-black text-white/80 pt-3 border-t border-white/20">
                <span>{currentBook.pages} Pages</span>
                <span>{currentBook.decodabilityScore}% Decodable</span>
              </div>
            </div>
          </div>

          {/* Details & Target Words */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-rose-200 shadow-sm space-y-2">
              <span className="text-xs font-black text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>📖</span>
                <span>Story Page Excerpt</span>
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed font-heading">
                "{currentBook.sampleText}"
              </p>
            </div>

            {/* Target Decodable Words */}
            <div>
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>🎯</span>
                <span>Target Decodable Practice Words</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentBook.targetWords.map((word, idx) => (
                  <button 
                    key={idx}
                    onClick={() => audioEngine.speakWord(word)}
                    className="px-3.5 py-1.5 bg-white text-rose-900 border border-rose-200 rounded-xl text-xs font-black cursor-pointer hover:bg-rose-100 hover:scale-105 active:scale-95 transition-all shadow-xs"
                    title="Click to hear pure word sound"
                  >
                    🔊 {word}
                  </button>
                ))}
              </div>
            </div>

            {/* Tricky Heart Words (Science of Reading) */}
            <div className="pt-2">
              <h4 className="text-xs font-black text-rose-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Heart Words (Taught Irregular Words)</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentBook.trickyWords.map((word, idx) => (
                  <span 
                    key={idx}
                    onClick={() => audioEngine.speakWord(word)}
                    className="px-3 py-1 bg-rose-100 text-rose-900 border border-rose-300 rounded-xl text-xs font-black cursor-pointer hover:bg-rose-200 transition-all flex items-center gap-1"
                  >
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    <span>{word}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* FILTER & BOOKS GRID */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'bg-white hover:bg-rose-50 text-slate-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-rose-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, sounds, words..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>
        </div>

        {/* Books Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredBooks.map((book) => {
            const isCurrent = book.id === currentBook.id;
            return (
              <div
                key={book.id}
                onClick={() => handleSelectBook(book.id)}
                className={`bg-white rounded-3xl border-2 transition-all p-5 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                  isCurrent 
                    ? 'border-rose-500 shadow-lg ring-2 ring-rose-200 bg-rose-50/20' 
                    : 'border-slate-200 hover:border-rose-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className={`h-32 rounded-2xl bg-gradient-to-tr ${book.coverGradient} p-4 text-white flex flex-col justify-between shadow-xs relative overflow-hidden`}>
                    <div className="flex items-center justify-between">
                      <span className="bg-black/20 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-black">
                        Book {book.id}
                      </span>
                      {book.isFree ? (
                        <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                          Free
                        </span>
                      ) : (
                        <span className="text-[10px] font-black bg-black/30 text-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Pass
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-black text-base leading-snug font-heading drop-shadow-xs">{book.title}</h4>
                      <p className="text-[10px] text-white/95 font-bold">Sound: {book.focusSound}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 font-medium leading-relaxed">
                    {book.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {book.targetWords.slice(0, 3).map((w, idx) => (
                      <span key={idx} className="text-[10px] bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full font-bold">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-rose-700">
                  <span className="text-[11px] text-slate-400 font-bold">Phase {book.phase}</span>
                  <span className={`px-2.5 py-1 rounded-xl text-xs transition-all ${
                    isCurrent ? 'bg-rose-500 text-white' : 'bg-rose-100'
                  }`}>
                    {isCurrent ? 'Reading' : 'Select →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Paywall & School PO Modal */}
      <PaywallModal
        isOpen={paywallModalOpen}
        onClose={() => setPaywallModalOpen(false)}
        resourceTitle={paywallItemTitle}
        resourceType="Decodable Book"
      />

    </div>
  );
};
