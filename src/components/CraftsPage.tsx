import React, { useState, useRef } from 'react';
import { 
  Scissors, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Heart, 
  Clock, 
  Layers, 
  Lightbulb, 
  Palette,
  Star
} from 'lucide-react';
import { CRAFTS_DATA, CraftProject } from '../data/siteData';

interface CraftsPageProps {
  setActiveTab: (tab: string) => void;
}

export const CraftsPage: React.FC<CraftsPageProps> = ({ setActiveTab }) => {
  const [selectedCraft, setSelectedCraft] = useState<CraftProject>(CRAFTS_DATA[0]);

  // Ref to scroll back up to preview when clicking cards below
  const craftPreviewRef = useRef<HTMLDivElement>(null);

  const handleSelectCraft = (craft: CraftProject) => {
    setSelectedCraft(craft);
    setTimeout(() => {
      if (craftPreviewRef.current) {
        const yOffset = -90;
        const y = craftPreviewRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  const developmentalPillars = [
    { title: "1. Motor Skills Development", desc: "Cutting, folding, and gluing build hand muscle strength essential for fluent pencil handwriting.", emoji: "✂️" },
    { title: "2. Reading Comprehension", desc: "Re-enacting story plots through handmade puppets cements sequence and thematic understanding.", emoji: "📖" },
    { title: "3. Vocabulary Growth", desc: "Introduces tactile descriptive adjectives (rough, glossy, scalloped) while creating.", emoji: "💬" },
    { title: "4. Creative Expression", desc: "Encourages artistic personal choice, color experimentation, and self-confidence.", emoji: "🎨" },
    { title: "5. Improved Self-Esteem", desc: "Taking pride in a finished tangible art project to take home and display on the fridge.", emoji: "🌟" },
    { title: "6. Communication & Sharing", desc: "Inspires group circle-time presentations and verbal peer-to-peer storytelling.", emoji: "🤝" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 text-left select-none">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-4xl p-8 sm:p-12 text-purple-950 shadow-lg relative overflow-hidden border-4 border-purple-300/60">
        <div className="absolute top-4 right-10 text-4xl opacity-50 animate-float pointer-events-none">
          ✂️
        </div>
        <div className="absolute bottom-6 right-28 text-3xl opacity-50 animate-bounce-slow pointer-events-none">
          🎨
        </div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider text-purple-900 shadow-xs border border-white">
            <Scissors className="w-3.5 h-3.5 text-purple-700" /> 
            <span>Over 80 Picture-Book Craft Guides! 🎈</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading text-purple-950">
            StoryTime Garden Crafts
          </h1>
          <p className="text-purple-900 font-bold text-base sm:text-lg leading-relaxed">
            Turn storytime into an unforgettable hands-on sensory experience. Pair iconic children's literature with easy-to-prep classroom art projects that develop motor skills and reinforce literacy.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-6 py-3.5 rounded-2xl bg-amber-300 hover:bg-amber-400 text-amber-950 font-black text-sm shadow-md transition-all cursor-pointer btn-bubbly border-2 border-amber-400"
            >
              Get Full Craft Library ($29.95/yr) ⭐
            </button>
            <button
              onClick={() => setActiveTab('decodables')}
              className="px-5 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-purple-900 font-black text-sm border-2 border-purple-200 transition-all cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-purple-700" />
              <span>Explore Matching Decodable Books &rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* FEATURED LIVE CRAFT GUIDE (Anchored with ref for auto-scroll) */}
      <div 
        ref={craftPreviewRef}
        className="scroll-mt-28 bg-white rounded-4xl p-6 sm:p-8 border-4 border-purple-300 shadow-xl space-y-6 relative overflow-hidden animate-pop"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-purple-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-purple-100 text-purple-900 font-black px-2.5 py-0.5 rounded-full border border-purple-200">
                {selectedCraft.difficulty}
              </span>
              <span className="text-xs text-slate-500 font-bold">Prep: {selectedCraft.prepTime}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1 flex items-center gap-2">
              <span>{selectedCraft.title}</span>
              <span className="text-2xl">✂️</span>
            </h2>
            <p className="text-xs text-purple-700 font-bold mt-1">Paired Storybook: "{selectedCraft.pairedBook}"</p>
          </div>

          <button
            onClick={() => alert(`🎉 Printing Craft Step-by-Step Template: ${selectedCraft.title}`)}
            className="px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white font-black rounded-2xl text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer border-2 border-purple-400 self-start sm:self-auto"
          >
            <Scissors className="w-4 h-4" />
            <span>Print Template Guide 🖨️</span>
          </button>
        </div>

        {/* Craft Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-purple-50/60 p-6 sm:p-8 rounded-3xl border-2 border-purple-200/80">
          
          {/* Materials Column */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border-2 border-purple-200 shadow-sm space-y-4">
            <h4 className="font-black text-sm text-purple-900 font-heading flex items-center gap-2">
              <span>🎨</span>
              <span>Supplies Needed</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 font-bold">
              {selectedCraft.materials.map((mat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-purple-100 text-xs text-purple-800 font-bold">
              <strong>Focus Skill:</strong> {selectedCraft.skillFocus}
            </div>
          </div>

          {/* Steps Column */}
          <div className="lg:col-span-8 space-y-4">
            <h4 className="font-black text-sm text-slate-900 font-heading flex items-center gap-2">
              <span>📋</span>
              <span>Step-by-Step Classroom Guide</span>
            </h4>
            <div className="space-y-3">
              {selectedCraft.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-2xl border-2 border-purple-100 shadow-xs">
                  <span className="w-7 h-7 rounded-full bg-purple-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-bold pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* CRAFTS SELECTOR LIST */}
      <div className="space-y-5">
        <h3 className="font-black text-xl text-slate-900 font-heading">
          Featured Picture-Book Crafts 🎈
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CRAFTS_DATA.map((craft) => {
            const isSelected = selectedCraft.id === craft.id;
            return (
              <div
                key={craft.id}
                onClick={() => handleSelectCraft(craft)}
                className={`bg-white rounded-3xl p-6 border-3 transition-all cursor-pointer group card-playful flex flex-col justify-between ${
                  isSelected
                    ? 'border-purple-500 shadow-xl ring-4 ring-purple-200/70 bg-purple-50/30 scale-[1.02]'
                    : 'border-amber-200/90 hover:border-purple-400 shadow-sm hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
                      {craft.difficulty}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">{craft.prepTime}</span>
                  </div>
                  <h4 className="font-black text-base text-slate-900 group-hover:text-purple-700 transition-colors font-heading">
                    {craft.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">Paired: "{craft.pairedBook}"</p>
                </div>

                <div className="pt-4 mt-4 border-t-2 border-purple-100 text-xs font-black text-purple-700 flex justify-end">
                  <span className={`px-2.5 py-1 rounded-xl transition-all ${
                    isSelected ? 'bg-purple-500 text-white' : 'bg-purple-100 group-hover:bg-purple-200'
                  }`}>
                    {isSelected ? '✨ Viewing Guide' : 'Select Craft &rarr;'}
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
