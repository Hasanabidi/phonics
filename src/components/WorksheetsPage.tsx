import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  Printer, 
  Sparkles, 
  Scissors, 
  Eye,
  SlidersHorizontal,
  Volume2,
  Check,
  Star
} from 'lucide-react';
import { WORKSHEETS_DATA, WorksheetItem } from '../data/siteData';

interface WorksheetsPageProps {
  setActiveTab: (tab: string) => void;
  openFreeBookModal: () => void;
}

export const WorksheetsPage: React.FC<WorksheetsPageProps> = ({ setActiveTab, openFreeBookModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewItem, setPreviewItem] = useState<WorksheetItem | null>(WORKSHEETS_DATA[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Ref to scroll up to when clicking any card
  const previewSectionRef = useRef<HTMLDivElement>(null);

  const categories = [
    'All',
    'Handwriting',
    'Word Wheels',
    'Digraphs',
    'Color by Letter',
    'Puzzles & Mazes',
    'Blends'
  ];

  const levels = ['All', 'Pre-K', 'Kindergarten', 'Grade 1', 'Grade 2'];

  const filteredWorksheets = WORKSHEETS_DATA.filter((ws) => {
    const matchCat = selectedCategory === 'All' || ws.category === selectedCategory;
    const matchLevel = selectedLevel === 'All' || ws.level === selectedLevel;
    const matchSearch = ws.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ws.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ws.samplePreview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchLevel && matchSearch;
  });

  const handleSelectWorksheet = (item: WorksheetItem) => {
    setPreviewItem(item);
    setTimeout(() => {
      if (previewSectionRef.current) {
        const yOffset = -90; // room for sticky header
        const y = previewSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  const speakDirections = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.3;
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Handwriting':
        return {
          bannerGradient: 'from-emerald-400 via-teal-300 to-green-300',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          emoji: '✏️',
          sticker: 'Trace & Write',
          accentColor: 'text-emerald-700'
        };
      case 'Word Wheels':
        return {
          bannerGradient: 'from-purple-400 via-indigo-300 to-pink-300',
          badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
          emoji: '🎡',
          sticker: 'Spin & Read',
          accentColor: 'text-purple-700'
        };
      case 'Digraphs':
        return {
          bannerGradient: 'from-rose-400 via-pink-300 to-red-300',
          badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
          emoji: '🔍',
          sticker: 'Sound Detective',
          accentColor: 'text-rose-700'
        };
      case 'Color by Letter':
        return {
          bannerGradient: 'from-amber-400 via-yellow-300 to-orange-300',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
          emoji: '🎨',
          sticker: 'Color & Reveal',
          accentColor: 'text-amber-700'
        };
      case 'Puzzles & Mazes':
        return {
          bannerGradient: 'from-sky-400 via-cyan-300 to-blue-300',
          badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
          emoji: '🧩',
          sticker: 'Phonics Maze',
          accentColor: 'text-sky-700'
        };
      case 'Blends':
        return {
          bannerGradient: 'from-teal-400 via-emerald-300 to-cyan-300',
          badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
          emoji: '🔤',
          sticker: 'Blend Wheels',
          accentColor: 'text-teal-700'
        };
      default:
        return {
          bannerGradient: 'from-amber-300 via-orange-300 to-yellow-300',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
          emoji: '📝',
          sticker: 'Phonics Station',
          accentColor: 'text-amber-700'
        };
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Pre-K':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'Kindergarten':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'Grade 1':
        return 'bg-sky-100 text-sky-900 border-sky-200';
      case 'Grade 2':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left select-none">
      
      {/* Playful Header Banner */}
      <div className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-4xl p-8 sm:p-12 text-emerald-950 shadow-lg relative overflow-hidden border-4 border-emerald-300/60">
        {/* Floating playful background stickers */}
        <div className="absolute top-4 right-10 text-4xl opacity-50 animate-float pointer-events-none">
          🖍️
        </div>
        <div className="absolute bottom-6 right-28 text-3xl opacity-50 animate-bounce-slow pointer-events-none">
          ✂️
        </div>
        <div className="absolute top-1/2 right-1/4 text-2xl opacity-40 animate-spin-slow pointer-events-none">
          ⭐
        </div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider text-emerald-900 shadow-xs border border-white">
            <Printer className="w-3.5 h-3.5 text-emerald-700" /> 
            <span>Over 25,000 Classroom Printables! 🎈</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-emerald-950 font-heading">
            The Ultimate Worksheet Station
          </h1>
          <p className="text-emerald-900 font-bold text-base sm:text-lg leading-relaxed">
            Never run out of engaging early literacy centers. Download and print thousands of teacher-tested handwriting mats, cut-and-paste sorts, rhyme puzzles, and phonics word wheels.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-6 py-3.5 rounded-2xl bg-amber-300 hover:bg-amber-400 text-amber-950 font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer btn-bubbly border-2 border-amber-400"
            >
              Unlock 25k Worksheets ($39.95/yr) ⭐
            </button>
            <button
              onClick={openFreeBookModal}
              className="px-5 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-emerald-900 font-black text-sm border-2 border-emerald-200 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>Download Free Sample Packet</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK PREVIEW & INSPECTOR DRAWER (Anchored with ref for auto-scroll) */}
      {previewItem && (
        <div 
          ref={previewSectionRef} 
          className="scroll-mt-28 bg-white rounded-4xl p-6 sm:p-8 border-4 border-emerald-300 shadow-xl space-y-6 relative overflow-hidden animate-pop"
        >
          {/* Top Inspector Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-amber-100 gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border shadow-xs ${getLevelBadge(previewItem.level)}`}>
                  {previewItem.level}
                </span>
                <span className="text-xs bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-full font-black">
                  {previewItem.category}
                </span>
                <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                  <span>✨</span>
                  <span>{previewItem.downloads.toLocaleString()} happy kid prints</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1.5 flex items-center gap-2">
                <span>{previewItem.title}</span>
                <span className="text-xl">🎒</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => speakDirections(`Worksheet Activity: ${previewItem.title}. Recommended level: ${previewItem.level}. Activity details: ${previewItem.samplePreview}. Happy learning!`)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 border-2 transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-purple-200 text-purple-950 border-purple-400 animate-pulse'
                    : 'bg-purple-100 hover:bg-purple-200 text-purple-900 border-purple-200'
                }`}
                title="Hear activity directions aloud"
              >
                <Volume2 className="w-4 h-4 text-purple-700" />
                <span>{isSpeaking ? 'Listening...' : 'Hear Directions 🔊'}</span>
              </button>

              <button
                onClick={() => alert(`🎉 Downloading printable packet: ${previewItem.title}`)}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer border-2 border-emerald-400"
              >
                <Download className="w-4 h-4" />
                <span>Print PDF Pack ({previewItem.pageCount} Pages) 🖨️</span>
              </button>
            </div>
          </div>

          {/* Visual Interactive Desk Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-amber-50/70 p-6 sm:p-8 rounded-3xl border-2 border-amber-200/90">
            {/* Visual sheet mock with playful kids styling */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border-3 border-dashed border-emerald-300 text-center space-y-4 shadow-sm relative">
              <div className="absolute -top-3 right-6 bg-amber-300 text-amber-950 font-black text-[10px] px-2.5 py-0.5 rounded-full border border-amber-400 shadow-xs">
                📎 Print Preview
              </div>

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-200 to-amber-200 text-emerald-800 mx-auto flex items-center justify-center text-3xl font-black shadow-xs">
                {getCategoryTheme(previewItem.category).emoji}
              </div>
              <div>
                <h4 className="font-black text-sm text-slate-800 font-heading">
                  Standard 8.5" x 11" Classroom Worksheet
                </h4>
                <p className="text-xs text-slate-500 font-bold mt-1">
                  High-contrast, ink-friendly clean lines for classroom copiers or home printing.
                </p>
              </div>

              <div className="p-3.5 bg-emerald-100/70 border border-emerald-200 rounded-2xl text-xs text-emerald-950 text-left font-bold">
                <span className="text-emerald-800 block mb-1">🎯 Activity Highlights:</span>
                {previewItem.samplePreview}
              </div>
            </div>

            {/* Features & Kid-friendly Perks */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-black text-base text-slate-900 font-heading flex items-center gap-2">
                <span>🌟 What Makes This Activity Great For Kids</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-bold">
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-amber-200 shadow-xs">
                  <span className="text-lg">✏️</span>
                  <span>Clear dotted handwriting guidelines</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-amber-200 shadow-xs">
                  <span className="text-lg">✅</span>
                  <span>Self-checking answer keys included</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-amber-200 shadow-xs">
                  <span className="text-lg">✂️</span>
                  <span>Fine motor cut & paste activities</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-amber-200 shadow-xs">
                  <span className="text-lg">🛡️</span>
                  <span>Compatible with dry-erase pouches</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('pricing')}
                  className="text-xs font-black text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>⭐ Unlimited daily downloads with All-Access Pass</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FILTER CONTROLS */}
      <div className="space-y-5">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white shadow-sm border-2 border-emerald-600 scale-105'
                    : 'bg-white hover:bg-emerald-50 text-slate-700 border-2 border-amber-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Level Dropdown & Search */}
          <div className="flex gap-2.5">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3.5 py-2.5 bg-white border-2 border-amber-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-amber-300 cursor-pointer shadow-xs"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl === 'All' ? 'All Grades 🎒' : `${lvl} 🎈`}
                </option>
              ))}
            </select>

            <div className="relative w-48 sm:w-64">
              <Search className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sheets or sounds..."
                className="w-full pl-9 pr-3 py-2.5 bg-white border-2 border-amber-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-xs"
              />
            </div>
          </div>

        </div>

        {/* PLAYFUL WORKSHEETS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorksheets.map((item) => {
            const isSelected = previewItem?.id === item.id;
            const theme = getCategoryTheme(item.category);

            return (
              <div
                key={item.id}
                onClick={() => handleSelectWorksheet(item)}
                className={`bg-white rounded-3xl border-3 transition-all p-5 flex flex-col justify-between cursor-pointer group card-playful relative overflow-hidden select-none ${
                  isSelected
                    ? 'border-emerald-500 shadow-xl ring-4 ring-emerald-200/70 bg-emerald-50/30 scale-[1.02]'
                    : 'border-amber-200/90 hover:border-emerald-400 shadow-sm hover:shadow-lg'
                }`}
              >
                {/* Colorful Illustrated Header Banner for each card */}
                <div className={`h-24 rounded-2xl bg-gradient-to-r ${theme.bannerGradient} p-3 text-slate-900 flex items-center justify-between relative overflow-hidden shadow-xs mb-3`}>
                  <div className="relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/90 text-slate-800 px-2.5 py-0.5 rounded-full shadow-xs border border-white">
                      {theme.sticker}
                    </span>
                    <p className="text-xs font-black text-slate-900 mt-2 truncate max-w-[170px]">
                      {item.category}
                    </p>
                  </div>
                  <div className="text-4xl group-hover:scale-125 group-hover:rotate-6 transition-transform select-none">
                    {theme.emoji}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border shadow-xs ${getLevelBadge(item.level)}`}>
                      {item.level}
                    </span>
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-full">
                      {item.pageCount} Pages • {item.downloadFormat}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-slate-900 group-hover:text-emerald-700 transition-colors font-heading leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 font-medium leading-relaxed">
                    {item.samplePreview}
                  </p>
                </div>

                {/* Bottom interactive row */}
                <div className="pt-4 mt-4 border-t-2 border-amber-100 flex items-center justify-between text-xs font-black">
                  <span className="text-slate-500 font-bold flex items-center gap-1">
                    <span>🌱</span>
                    <span>{item.downloads.toLocaleString()} prints</span>
                  </span>
                  
                  <span className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-emerald-100 group-hover:bg-emerald-200 text-emerald-900'
                  }`}>
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isSelected ? '✨ Previewing' : 'Inspect Pack &rarr;'}</span>
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
