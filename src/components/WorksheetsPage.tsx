import React, { useState, useRef } from 'react';
import { 
  Download, 
  Search, 
  Printer, 
  Scissors, 
  Volume2, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import { WORKSHEETS_DATA, WorksheetItem, PHONICS_PHASES } from '../data/siteData';
import { audioEngine } from '../utils/audioEngine';
import { printWorksheetSheet } from '../utils/printEngine';
import { PaywallModal } from './PaywallModal';

interface WorksheetsPageProps {
  setActiveTab: (tab: string) => void;
  openFreeBookModal: () => void;
}

export const WorksheetsPage: React.FC<WorksheetsPageProps> = ({ setActiveTab }) => {
  const [selectedPhase, setSelectedPhase] = useState<number | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewItem, setPreviewItem] = useState<WorksheetItem | null>(WORKSHEETS_DATA[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallTitle, setPaywallTitle] = useState('Full Worksheet Station');

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
    const matchPhase = selectedPhase === 'All' || ws.phase === selectedPhase;
    const matchCat = selectedCategory === 'All' || ws.category === selectedCategory;
    const matchLevel = selectedLevel === 'All' || ws.level === selectedLevel;
    const matchSearch = ws.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ws.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ws.samplePreview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPhase && matchCat && matchLevel && matchSearch;
  });

  const handleSelectWorksheet = (item: WorksheetItem) => {
    setPreviewItem(item);
    setTimeout(() => {
      if (previewSectionRef.current) {
        const yOffset = -90;
        const y = previewSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  const handlePrintWorksheet = (item: WorksheetItem) => {
    if (!item.isFree) {
      setPaywallTitle(item.title);
      setPaywallOpen(true);
      return;
    }
    printWorksheetSheet(item);
  };

  const speakDirections = async (text: string) => {
    if (isSpeaking) {
      audioEngine.stopAll();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    await audioEngine.speakWord(text, 0.9);
    setIsSpeaking(false);
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Pre-K':
        return 'bg-pink-100 text-pink-900 border-pink-200';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left select-none">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-4xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border-4 border-emerald-300">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider text-white">
            <Printer className="w-3.5 h-3.5 text-amber-300" /> 
            <span>Instant Classroom & Home Printables</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading">
            The Phonics Worksheet Station
          </h1>
          <p className="text-emerald-100 font-medium text-sm sm:text-base leading-relaxed">
            High-utility, ink-saving printable worksheets designed with Science of Reading handwriting midlines, sound isolation dots, and word wheels.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => handlePrintWorksheet(WORKSHEETS_DATA[0])}
              className="px-5 py-3 rounded-2xl bg-white text-emerald-950 font-black text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition-all flex items-center gap-2 cursor-pointer border-2 border-emerald-200"
            >
              <Printer className="w-4 h-4 text-emerald-600" />
              <span>Print Free A-Z Trace Sheet 🖨️</span>
            </button>
            <button
              onClick={() => {
                setPaywallTitle("Complete 25k Worksheet Station");
                setPaywallOpen(true);
              }}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs sm:text-sm transition-all cursor-pointer shadow-md"
            >
              Unlock All 25,000+ Printables ($49/yr) ⭐
            </button>
          </div>
        </div>
      </div>

      {/* PHASE FILTER */}
      <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
            Filter by Scope & Sequence Phase:
          </span>
          <span className="text-xs font-bold text-slate-400">
            Systematic Phonics Progression
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          <button
            onClick={() => setSelectedPhase('All')}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
              selectedPhase === 'All'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            All Phases
          </button>
          {PHONICS_PHASES.map((p) => (
            <button
              key={p.phase}
              onClick={() => setSelectedPhase(p.phase)}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                selectedPhase === p.phase
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                  : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200'
              }`}
            >
              Phase {p.phase}
            </button>
          ))}
        </div>
      </div>

      {/* INSPECTOR & LIVE PRINT PREVIEW */}
      {previewItem && (
        <div 
          ref={previewSectionRef} 
          className="scroll-mt-28 bg-white rounded-4xl p-6 sm:p-8 border-4 border-emerald-300 shadow-xl space-y-6 relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-emerald-100 gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${getLevelBadge(previewItem.level)}`}>
                  {previewItem.level}
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-900 border border-emerald-200 px-2.5 py-0.5 rounded-full font-black">
                  {previewItem.category}
                </span>
                <span className="text-xs bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full font-black">
                  Phase {previewItem.phase}
                </span>
                {previewItem.isFree ? (
                  <span className="text-xs bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded-full">
                    Free Printable 🎁
                  </span>
                ) : (
                  <span className="text-xs bg-slate-100 text-slate-700 font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-600" /> Classroom License
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1.5">
                {previewItem.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => speakDirections(`Worksheet Activity: ${previewItem.title}. Recommended level: ${previewItem.level}. Activity preview: ${previewItem.samplePreview}. Happy learning!`)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 border-2 transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-purple-200 text-purple-950 border-purple-400 animate-pulse'
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-200'
                }`}
              >
                <Volume2 className="w-4 h-4 text-purple-700" />
                <span>{isSpeaking ? 'Listening...' : 'Hear Directions 🔊'}</span>
              </button>

              <button
                onClick={() => handlePrintWorksheet(previewItem)}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-2xl text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer border border-emerald-400"
              >
                <Printer className="w-4 h-4" />
                <span>Print Eco Activity Sheet 🖨️</span>
              </button>
            </div>
          </div>

          {/* Interactive Layout Mockup */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-inner space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs font-black text-slate-600">Sample Page Layout</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">Standard 8.5x11 Letter</span>
              </div>
              <div className="border border-dashed border-slate-300 p-4 rounded-xl space-y-3 bg-amber-50/20">
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-8 border-2 border-slate-400 rounded flex items-center px-3">
                  <div className="w-full border-t border-dashed border-slate-400"></div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {previewItem.focusPhonemes.slice(0, 3).map((p, idx) => (
                    <div key={idx} className="border border-slate-300 rounded p-2 text-center">
                      <span className="font-mono font-black text-xl">{p.toUpperCase()}</span>
                      <div className="flex justify-center gap-1 mt-1">
                        <div className="w-2 h-2 rounded-full border border-slate-400"></div>
                        <div className="w-2 h-2 rounded-full border border-slate-400"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div>
                <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Activity Focus</h4>
                <p className="text-sm sm:text-base font-bold text-slate-800 mt-1 leading-relaxed">
                  {previewItem.samplePreview}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-1.5">Focus Phonemes (Tap to Listen):</h4>
                <div className="flex flex-wrap gap-2">
                  {previewItem.focusPhonemes.map((ph, idx) => (
                    <button
                      key={idx}
                      onClick={() => audioEngine.speakPhoneme(ph)}
                      className="px-3.5 py-1.5 bg-white text-emerald-950 border border-emerald-300 hover:bg-emerald-100 rounded-xl text-xs font-black cursor-pointer shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>/{ph}/</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-500">
                Format: <strong>{previewItem.downloadFormat}</strong> • Print Ready • Single sheet ink-saver design
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FILTER & WORKSHEET CARDS GRID */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search worksheets..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWorksheets.map((item) => {
            const isSelected = previewItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelectWorksheet(item)}
                className={`bg-white rounded-3xl border-2 transition-all p-5 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-emerald-500 shadow-lg ring-2 ring-emerald-200 bg-emerald-50/20'
                    : 'border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${getLevelBadge(item.level)}`}>
                      {item.level}
                    </span>
                    {item.isFree ? (
                      <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                        Free
                      </span>
                    ) : (
                      <span className="text-[10px] font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Pass
                      </span>
                    )}
                  </div>

                  <h3 className="font-black text-base text-slate-900 leading-snug font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.samplePreview}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {item.focusPhonemes.map((ph, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                        /{ph}/
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700">
                  <span className="text-[11px] text-slate-400 font-bold">Phase {item.phase}</span>
                  <span className={`px-2.5 py-1 rounded-xl text-xs transition-all ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-emerald-50'
                  }`}>
                    {isSelected ? 'Viewing' : 'Select Sheet →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        resourceTitle={paywallTitle}
        resourceType="Worksheet Pack"
      />

    </div>
  );
};
