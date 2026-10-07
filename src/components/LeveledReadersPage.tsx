import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Download, 
  Layers, 
  GraduationCap, 
  Palette,
  ExternalLink
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

  const levels = ['All', 'Level AA', 'Level A', 'Level B'];
  const topics = ['All', 'Science', 'Social Studies', 'Character Education', 'Animal Life', 'Community'];

  const filteredReaders = LEVELED_READERS_DATA.filter((r) => {
    const matchLvl = selectedLevel === 'All' || r.level === selectedLevel;
    const matchTop = activeTopic === 'All' || r.topic === activeTopic;
    return matchLvl && matchTop;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> 150 PDF Downloadable Leveled Books
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Leveled Readers Coloring Books
          </h1>
          <p className="text-sky-100 text-base sm:text-lg leading-relaxed">
            The perfect supplemental resource for science, social studies, character education, and language arts. Designed for kids aged 4 through 7 across 3 gentle stages (Levels AA, A, and B).
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-sm shadow-md hover:bg-sky-50 transition-all cursor-pointer"
            >
              Unlock 150 Readers Series ($29.95/yr)
            </button>
            <button
              onClick={openFreeBookModal}
              className="px-5 py-3 rounded-xl bg-sky-950/40 hover:bg-sky-950/60 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Get Free Sample PDF
            </button>
          </div>
        </div>
      </div>

      {/* THREE LEVEL OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center text-sm">
            AA
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Level AA: Emergent Readers</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ages 4-5. Short, repetitive 1-line sentences with direct picture support. Fosters early print concepts like left-to-right tracking and finger pointing.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 font-black flex items-center justify-center text-sm">
            A
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Level A: Early Readers</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ages 5-6. Introduction of simple two-clause sentences, high-frequency sight words, and basic dialogue punctuation.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 font-black flex items-center justify-center text-sm">
            B
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Level B: Developing Readers</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ages 6-7. Informational nonfiction texts with technical vocabulary, labels, multi-syllable sight words, and character reflection questions.
          </p>
        </div>
      </div>

      {/* READER DETAIL PREVIEW CARD */}
      {previewReader && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${previewReader.color}`}>
                  {previewReader.level}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                  {previewReader.topic}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-2">{previewReader.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{previewReader.difficulty}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Printing coloring book edition of: ${previewReader.title}`)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Palette className="w-4 h-4" />
                <span>Print Coloring Book Edition</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase">Total Pages</span>
              <p className="text-xl font-black text-slate-900 mt-1">{previewReader.pages} Pages</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase">Word Count</span>
              <p className="text-xl font-black text-slate-900 mt-1">{previewReader.wordCount} Words</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase">Curriculum Domain</span>
              <p className="text-xl font-black text-sky-700 mt-1">{previewReader.topic}</p>
            </div>
          </div>
        </div>
      )}

      {/* FILTER & GRID */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReaders.map((reader) => (
            <div
              key={reader.id}
              onClick={() => setPreviewReader(reader)}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${reader.color}`}>
                    {reader.level}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {reader.pages}p • {reader.wordCount} words
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-sky-700 transition-colors">
                  {reader.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {reader.difficulty}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
                <span>{reader.topic}</span>
                <span className="group-hover:translate-x-1 transition-transform">Inspect Book &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
