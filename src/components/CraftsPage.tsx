import React, { useState } from 'react';
import { 
  Scissors, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Heart, 
  Clock, 
  Layers, 
  Lightbulb,
  Palette
} from 'lucide-react';
import { CRAFTS_DATA, CraftProject } from '../data/siteData';

interface CraftsPageProps {
  setActiveTab: (tab: string) => void;
}

export const CraftsPage: React.FC<CraftsPageProps> = ({ setActiveTab }) => {
  const [selectedCraft, setSelectedCraft] = useState<CraftProject>(CRAFTS_DATA[0]);

  const developmentalPillars = [
    { title: "1. Motor Skills Development", desc: "Cutting, folding, and gluing build hand muscle strength essential for fluent pencil handwriting.", emoji: "✂️" },
    { title: "2. Reading Comprehension", desc: "Re-enacting story plots through handmade puppets cements sequence and thematic understanding.", emoji: "📖" },
    { title: "3. Vocabulary Growth", desc: "Introduces tactile descriptive adjectives (rough, glossy, scalloped) while creating.", emoji: "💬" },
    { title: "4. Creative Expression", desc: "Encourages artistic personal choice, color experimentation, and self-confidence.", emoji: "🎨" },
    { title: "5. Improved Self-Esteem", desc: "Taking pride in a finished tangible art project to take home and display on the fridge.", emoji: "🌟" },
    { title: "6. Communication & Sharing", desc: "Inspires group circle-time presentations and verbal peer-to-peer storytelling.", emoji: "🤝" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 text-left">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <Scissors className="w-3.5 h-3.5" /> Over 80 Picture-Book Craft Guides
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            StoryTime Garden Crafts
          </h1>
          <p className="text-pink-100 text-base sm:text-lg leading-relaxed">
            Turn storytime into an unforgettable hands-on sensory experience. Pair iconic children's literature with easy-to-prep classroom art projects that develop motor skills and reinforce literacy.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-sm shadow-md hover:bg-pink-50 transition-all cursor-pointer"
            >
              Get Full Craft Library ($29.95/yr)
            </button>
            <button
              onClick={() => setActiveTab('decodables')}
              className="px-5 py-3 rounded-xl bg-purple-950/40 hover:bg-purple-950/60 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Explore Matching Decodable Books &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* 6 DEVELOPMENTAL PILLARS */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-purple-700 uppercase tracking-widest bg-purple-100 px-3 py-1 rounded-full">
            Pedagogical Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            6 Ways Story Crafts Accelerate Child Development
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developmentalPillars.map((p, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
              <span className="text-3xl">{p.emoji}</span>
              <h3 className="font-bold text-base text-slate-900">{p.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVE CRAFT INSTRUCTION LAB */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-pink-100 text-pink-800 px-2.5 py-0.5 rounded-full">
                {selectedCraft.difficulty}
              </span>
              <span className="text-xs text-slate-500 font-medium">Prep Time: {selectedCraft.prepTime}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{selectedCraft.title}</h2>
            <p className="text-xs text-purple-700 font-semibold mt-0.5">Paired Book: "{selectedCraft.pairedBook}"</p>
          </div>

          <button
            onClick={() => alert(`Downloading printable step-by-step craft template for: ${selectedCraft.title}`)}
            className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md cursor-pointer hover:opacity-95"
          >
            <Scissors className="w-4 h-4" />
            <span>Download Craft Cutout Template (PDF)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          
          {/* Materials Column */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-purple-600" /> Materials Needed
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {selectedCraft.materials.map((m, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Core Skill Focus</span>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">{selectedCraft.skillFocus}</p>
            </div>
          </div>

          {/* Steps Column */}
          <div className="lg:col-span-8 space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900">Step-by-Step Classroom Guide</h4>
            <div className="space-y-3">
              {selectedCraft.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* CRAFTS SELECTOR LIST */}
      <div className="space-y-4">
        <h3 className="font-black text-xl text-slate-900">Featured Picture-Book Crafts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CRAFTS_DATA.map((craft) => {
            const isSelected = selectedCraft.id === craft.id;
            return (
              <div
                key={craft.id}
                onClick={() => setSelectedCraft(craft)}
                className={`bg-white rounded-2xl p-6 border transition-all cursor-pointer group ${
                  isSelected
                    ? 'border-2 border-purple-500 shadow-xl ring-4 ring-purple-50'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    {craft.difficulty}
                  </span>
                  <span className="text-xs text-slate-400">{craft.prepTime}</span>
                </div>
                <h4 className="font-extrabold text-base text-slate-900 group-hover:text-purple-700 transition-colors">
                  {craft.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">Paired: "{craft.pairedBook}"</p>
                <div className="pt-4 mt-3 border-t border-slate-100 text-xs font-bold text-purple-600 flex justify-end">
                  {isSelected ? 'Viewing Guide' : 'Select Craft &rarr;'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
