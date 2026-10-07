import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight,
  BrainCircuit
} from 'lucide-react';

interface AboutPhonicsPageProps {
  setActiveTab: (tab: string) => void;
  openFreeBookModal: () => void;
}

export const AboutPhonicsPage: React.FC<AboutPhonicsPageProps> = ({ setActiveTab, openFreeBookModal }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 text-left">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
            The Science of Reading
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            What is Phonics & Systematic Instruction?
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Phonics is the understanding that there is a predictable relationship between phonemes (sounds of spoken language) and graphemes (letters and spellings representing those sounds in written language).
          </p>
        </div>
      </div>

      {/* 3 Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-black">
            1
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Explicit Instruction</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Teachers directly explain the letter-sound relationships rather than expecting children to deduce them from reading random picture books.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-xl font-black">
            2
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Systematic Progression</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            A carefully planned scope and sequence that introduces simple, high-frequency consonants and vowels first before moving to digraphs, blends, and complex vowel teams.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-black">
            3
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Decodable Practice</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Children read controlled texts containing ONLY the letters and sounds they have learned, ensuring 100% success without guessing.
          </p>
        </div>
      </div>

      {/* The 40-Book Staircase Explanation */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-6">
        <h2 className="text-2xl font-black text-slate-900">The Phonics Garden 40-Book Roadmap</h2>
        
        <div className="space-y-4 text-xs text-slate-700">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-4">
            <span className="font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg shrink-0">Books 1 – 10</span>
            <div>
              <strong className="text-slate-900 block text-sm">Short Vowels & Early CVC Words</strong>
              <span>Mastering /a/, /e/, /i/, /o/, and /u/ with simple 3-letter blends. Initial consonant blending.</span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-4">
            <span className="font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg shrink-0">Books 11 – 20</span>
            <div>
              <strong className="text-slate-900 block text-sm">Consonant Blends & Common Digraphs</strong>
              <span>Introduction of sh, ch, th, wh, ck, and l/r/s blends (bl, cl, fl, dr, tr, st).</span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-4">
            <span className="font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg shrink-0">Books 21 – 30</span>
            <div>
              <strong className="text-slate-900 block text-sm">Magic-E (Silent E) Long Vowel Patterns</strong>
              <span>Transforming short vowels to long vowel names: a_e, i_e, o_e, u_e with fluently linked stories.</span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-4">
            <span className="font-black text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg shrink-0">Books 31 – 40</span>
            <div>
              <strong className="text-slate-900 block text-sm">Bossy-R (r-Controlled) & Diphthongs</strong>
              <span>Advanced phonetic decoding with ar, er, ir, or, ur, oi/oy, ou/ow, and multi-syllable fluencies.</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={() => setActiveTab('decodables')}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Explore All 40 Books &rarr;
          </button>
          <button
            onClick={openFreeBookModal}
            className="px-5 py-3 bg-white text-slate-800 border border-slate-300 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Get Free Book 1 Sample
          </button>
        </div>
      </div>

    </div>
  );
};
