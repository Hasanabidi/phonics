import React, { useState } from 'react';
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
  SlidersHorizontal
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
                        ws.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchLevel && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <Printer className="w-3.5 h-3.5" /> Over 25,000 Printables & Activities
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            The Ultimate Worksheet Station
          </h1>
          <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
            Never run out of engaging early literacy centers. Download and print thousands of teacher-tested handwriting mats, cut-and-paste sorts, rhyme puzzles, and phonics word wheels.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-sm shadow-md hover:bg-emerald-50 transition-all cursor-pointer"
            >
              Unlock 25k Worksheets ($39.95/yr)
            </button>
            <button
              onClick={openFreeBookModal}
              className="px-5 py-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/60 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Free Sample Packet</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK PREVIEW & INSPECTOR DRAWER */}
      {previewItem && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/50 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {previewItem.level}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                  {previewItem.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">{previewItem.downloads.toLocaleString()} downloads</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-1">{previewItem.title}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Downloading high-resolution PDF: ${previewItem.title}`)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Instant PDF Print ({previewItem.pageCount} Pages)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
            {/* Visual sheet mock */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border-2 border-dashed border-slate-300 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-3xl font-black">
                📝
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Standard 8.5" x 11" Clean Print Layout</h4>
                <p className="text-xs text-slate-500 mt-1">High-contrast ink-saving black & white borders for classroom photocopiers.</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 text-left font-medium">
                <strong>Activity Focus:</strong> {previewItem.samplePreview}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-extrabold text-base text-slate-900">Classroom Features Included in this Pack</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dotted handwriting guidelines</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Self-checking answer keys</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fine motor cut & paste tiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Compatible with standard page protectors</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('pricing')}
                  className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Join membership for unlimited daily printing &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FILTER CONTROLS */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Level Dropdown & Search */}
          <div className="flex gap-2">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl === 'All' ? 'All Grades' : lvl}
                </option>
              ))}
            </select>

            <div className="relative w-48 sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sheets..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

        </div>

        {/* WORKSHEETS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorksheets.map((item) => {
            const isSelected = previewItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setPreviewItem(item)}
                className={`bg-white rounded-2xl border transition-all p-6 flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'border-2 border-emerald-500 shadow-lg ring-4 ring-emerald-50'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      {item.level}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {item.pageCount} Pages • {item.downloadFormat}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {item.samplePreview}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span className="text-slate-400 font-normal">{item.downloads.toLocaleString()} prints</span>
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isSelected ? 'Previewing' : 'Inspect Pack'}</span>
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
