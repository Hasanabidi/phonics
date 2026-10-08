import React, { useState, useRef } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Download, 
  Layers, 
  GraduationCap, 
  Palette, 
  ExternalLink,
  Star
} from 'lucide-react';
import { LEVELED_READERS_DATA, LeveledReader } from '../data/siteData';

interface LeveledReadersPageProps {
  setActiveTab: (tab: string) => void;
  openFreeBookModal: () => void;
}

export const LeveledReadersPage: React.FC<LeveledReadersPageProps> = ({ 
  setActiveTab, 
  openFreeBookModal 
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [activeTopic, setActiveTopic] = useState<string>('All');
  const [previewReader, setPreviewReader] = useState<LeveledReader>(LEVELED_READERS_DATA[0]);

  // Ref to scroll back up to preview when clicking cards below
  const readerPreviewRef = useRef<HTMLDivElement>(null);

  const levels = ['All', 'Level AA', 'Level A', 'Level B'];
  const topics = ['All', 'Science', 'Social Studies', 'Character Education', 'Animal Life', 'Community'];

  const filteredReaders = LEVELED_READERS_DATA.filter((r) => {
    const matchLvl = selectedLevel === 'All' || r.level === selectedLevel;
    const matchTop = activeTopic === 'All' || r.topic === activeTopic;
    return matchLvl && matchTop;
  });

  const handleSelectReader = (reader: LeveledReader) => {
    setPreviewReader(reader);
    setTimeout(() => {
      if (readerPreviewRef.current) {
        const yOffset = -90;
        const y = readerPreviewRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left select-none">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 rounded-4xl p-8 sm:p-12 text-sky-950 shadow-lg relative overflow-hidden border-4 border-sky-300/60">
        <div className="absolute top-4 right-10 text-4xl opacity-50 animate-float pointer-events-none">
          🎨
        </div>
        <div className="absolute bottom-6 right-28 text-3xl opacity-50 animate-bounce-slow pointer-events-none">
          📖
        </div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider text-sky-900 shadow-xs border border-white">
            <BookOpen className="w-3.5 h-3.5 text-sky-700" /> 
            <span>150 Printable Leveled Coloring Books! 🎈</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading text-sky-950">
            Leveled Readers Coloring Books
          </h1>
          <p className="text-sky-900 font-bold text-base sm:text-lg leading-relaxed">
            The perfect supplemental resource for science, social studies, character education, and language arts. Designed for kids aged 4 through 7 across 3 gentle stages (Levels AA, A, and B).
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-6 py-3.5 rounded-2xl bg-amber-300 hover:bg-amber-400 text-amber-950 font-black text-sm shadow-md transition-all cursor-pointer btn-bubbly border-2 border-amber-400"
            >
              Unlock 150 Readers Series ($29.95/yr) ⭐
            </button>
            <button
              onClick={openFreeBookModal}
              className="px-5 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-sky-900 font-black text-sm border-2 border-sky-200 transition-all cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <span>Get Free Sample PDF 📖</span>
            </button>
          </div>
        </div>
      </div>

      {/* THREE LEVEL OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm space-y-3 card-playful">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 font-black flex items-center justify-center text-base border border-amber-300 shadow-xs">
            AA
          </div>
          <h3 className="font-black text-lg text-slate-900 font-heading">Level AA: Emergent Readers</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            1 to 2 words per page. Strong visual picture clues with repetitive pattern sentences for preschool & kindergarten starters.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-sm space-y-3 card-playful">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 font-black flex items-center justify-center text-base border border-emerald-300 shadow-xs">
            A
          </div>
          <h3 className="font-black text-lg text-slate-900 font-heading">Level A: Early Steps</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Simple 1-line sentences with high-frequency sight words and consistent left-to-right sentence tracking.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-sm space-y-3 card-playful">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-900 font-black flex items-center justify-center text-base border border-sky-300 shadow-xs">
            B
          </div>
          <h3 className="font-black text-lg text-slate-900 font-heading">Level B: Developing Fluency</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            2 lines of text per page with mild sentence variations and rich vocabulary expansion.
          </p>
        </div>
      </div>

      {/* LIVE READER PREVIEW INSPECTOR (Anchored with ref for auto-scroll) */}
      {previewReader && (
        <div 
          ref={readerPreviewRef}
          className="scroll-mt-28 bg-white rounded-4xl p-6 sm:p-8 border-4 border-sky-300 shadow-xl space-y-6 relative overflow-hidden animate-pop"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-sky-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border shadow-xs ${previewReader.color}`}>
                  {previewReader.level}
                </span>
                <span className="text-xs bg-sky-100 text-sky-900 font-black px-2.5 py-0.5 rounded-full border border-sky-200">
                  {previewReader.topic}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1 flex items-center gap-2">
                <span>{previewReader.title}</span>
                <span className="text-xl">🎨</span>
              </h2>
            </div>

            <button
              onClick={() => alert(`🎉 Downloading Printable Coloring Reader: ${previewReader.title}`)}
              className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-2xl text-xs flex items-center gap-2 shadow-sm border-2 border-sky-400 transition-all cursor-pointer self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Print Coloring Book PDF 🖨️</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center bg-sky-50/70 p-6 rounded-3xl border-2 border-sky-200">
            <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-xs">
              <span className="text-xs text-slate-500 font-black uppercase">Total Pages</span>
              <p className="text-xl font-black text-slate-900 mt-1 font-heading">{previewReader.pages} Pages</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-xs">
              <span className="text-xs text-slate-500 font-black uppercase">Word Count</span>
              <p className="text-xl font-black text-slate-900 mt-1 font-heading">{previewReader.wordCount} Words</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-xs">
              <span className="text-xs text-slate-500 font-black uppercase">Curriculum Domain</span>
              <p className="text-xl font-black text-sky-700 mt-1 font-heading">{previewReader.topic}</p>
            </div>
          </div>
        </div>
      )}

      {/* FILTER & GRID */}
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-sky-500 text-white shadow-sm border-2 border-sky-600 scale-105'
                  : 'bg-white hover:bg-sky-50 text-slate-700 border-2 border-amber-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReaders.map((reader) => {
            const isSelected = previewReader?.id === reader.id;
            return (
              <div
                key={reader.id}
                onClick={() => handleSelectReader(reader)}
                className={`bg-white rounded-3xl border-3 transition-all p-5 flex flex-col justify-between cursor-pointer group card-playful relative overflow-hidden select-none ${
                  isSelected
                    ? 'border-sky-500 shadow-xl ring-4 ring-sky-200/70 bg-sky-50/30 scale-[1.02]'
                    : 'border-amber-200/90 hover:border-sky-400 shadow-sm hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border shadow-xs ${reader.color}`}>
                      {reader.level}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">
                      {reader.pages}p • {reader.wordCount} words
                    </span>
                  </div>
                  <h3 className="font-black text-base text-slate-900 group-hover:text-sky-700 transition-colors font-heading">
                    {reader.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    {reader.difficulty}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t-2 border-sky-100 flex items-center justify-between text-xs font-black text-sky-700">
                  <span className="text-slate-500 font-bold">{reader.topic}</span>
                  <span className={`px-2.5 py-1 rounded-xl transition-all ${
                    isSelected ? 'bg-sky-500 text-white' : 'bg-sky-100 group-hover:bg-sky-200'
                  }`}>
                    {isSelected ? '✨ Inspecting' : 'Inspect Book &rarr;'}
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
