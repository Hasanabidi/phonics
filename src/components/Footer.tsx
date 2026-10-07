import React from 'react';
import { 
  Sparkles, 
  Heart, 
  Mail, 
  BookOpen, 
  Video, 
  FileText, 
  Award,
  Star
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openFreeBookModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openFreeBookModal }) => {
  const navigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-indigo-950 text-slate-300 pt-16 pb-12 border-t-6 border-amber-300 relative overflow-hidden">
      
      {/* Decorative cloud stars */}
      <div className="absolute top-4 left-10 text-2xl opacity-40 select-none">✨</div>
      <div className="absolute top-6 right-20 text-2xl opacity-40 select-none">🌟</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Playful Top Newsletter & Free Gift Box */}
        <div className="bg-gradient-to-r from-emerald-800/80 via-teal-800/80 to-indigo-900/80 rounded-4xl p-8 sm:p-10 border-4 border-emerald-400/40 mb-14 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black tracking-wider uppercase mb-3 shadow-xs">
                🎈 Weekly Free Activities
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-heading">
                Get New Phonics Printables in Your Inbox!
              </h3>
              <p className="text-emerald-100 mt-2 text-sm sm:text-base font-semibold leading-relaxed">
                Join 45,000+ happy teachers and parents receiving free weekly coloring worksheets, reader excerpts, and sing-along song videos.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("🎉 High five! You are subscribed to Phonics Garden weekly freebies!");
                }} 
                className="flex flex-col sm:flex-row gap-2.5"
              >
                <input 
                  type="email" 
                  required
                  placeholder="Enter parent or teacher email" 
                  className="px-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:ring-4 focus:ring-amber-300 text-sm flex-1 shadow-sm"
                />
                <button 
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm shadow-md transition-transform hover:scale-105 cursor-pointer whitespace-nowrap btn-bubbly"
                >
                  Join Free 🎈
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 4-Column Child & Educator Navigation Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800 text-left">
          
          {/* Brand & Kid Mascot */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center text-2xl shadow-md border-2 border-white">
                🌱
              </div>
              <span className="text-2xl font-black text-white tracking-tight font-heading">
                Phonics Garden
              </span>
            </div>
            <p className="text-slate-400 text-sm font-semibold leading-relaxed mb-4 max-w-sm">
              The happy place where young readers grow! An explicit, systematic phonics universe packed with 40 storybooks, animated sing-alongs, games, and 25,000 worksheets.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Questions?</span>
              <a href="mailto:info@phonicsgarden.com" className="text-amber-400 hover:underline font-bold">
                info@phonicsgarden.com
              </a>
            </div>
          </div>

          {/* Fun Stations */}
          <div>
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-4 font-heading">
              Fun Stations 🎪
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li>
                <button onClick={() => navigate('soundboard')} className="text-purple-300 hover:text-purple-200 transition-colors cursor-pointer flex items-center gap-1">
                  <span>🎮 Sound Game</span>
                  <span className="bg-purple-500/50 text-[10px] px-1.5 rounded">NEW</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('decodables')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  📚 40 Story Books
                </button>
              </li>
              <li>
                <button onClick={() => navigate('videos')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  🎬 Sing & Watch
                </button>
              </li>
              <li>
                <button onClick={() => navigate('worksheets')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  🖍️ 25k Worksheets
                </button>
              </li>
              <li>
                <button onClick={() => navigate('crafts')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  ✂️ Puppet Crafts
                </button>
              </li>
            </ul>
          </div>

          {/* Learning Series */}
          <div>
            <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-4 font-heading">
              Learning Media 🎵
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li>
                <button onClick={() => navigate('music')} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  🎶 MP3 Audio Tracks
                </button>
              </li>
              <li>
                <button onClick={() => navigate('leveled')} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  🎨 Coloring Books (AA-B)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('videos')} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  🏴‍☠️ Bossy-R Pirate
                </button>
              </li>
              <li>
                <button onClick={() => navigate('videos')} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  🍏 AEIOU Vowels Rap
                </button>
              </li>
            </ul>
          </div>

          {/* Memberships & Freebies */}
          <div>
            <h4 className="text-xs font-black text-rose-400 uppercase tracking-wider mb-4 font-heading">
              Gifts & Pass ⭐
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li>
                <button onClick={openFreeBookModal} className="text-amber-300 hover:underline cursor-pointer">
                  📖 Free Book 1 Sample
                </button>
              </li>
              <li>
                <button onClick={() => navigate('pricing')} className="text-emerald-400 hover:underline cursor-pointer">
                  ⭐ Join Pass ($59.95/yr)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop')} className="hover:text-rose-300 transition-colors cursor-pointer">
                  🛍️ A-La-Carte Shop
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-rose-300 transition-colors cursor-pointer">
                  ✉️ Teacher Support
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-semibold gap-4">
          <p>© 2012–2026 Phonics Garden. Made with joyful smiles for growing minds.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('terms')} className="hover:text-slate-400 cursor-pointer">
              Terms & Conditions
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for early readers
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
