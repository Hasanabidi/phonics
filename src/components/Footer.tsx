import React from 'react';
import { 
  Heart, 
  Mail, 
  Sparkles,
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
    <footer className="bg-gradient-to-b from-amber-50 via-yellow-50 to-emerald-50 text-slate-800 pt-16 pb-10 border-t-6 border-amber-300 relative overflow-hidden select-none">
      
      {/* Playful Floating Garden Elements & Animations */}
      <div className="absolute top-4 left-6 text-3xl opacity-70 animate-float pointer-events-none">
        🦋
      </div>
      <div className="absolute top-10 right-10 text-3xl opacity-70 animate-float-reverse pointer-events-none">
        🎈
      </div>
      <div className="absolute top-28 left-1/4 text-2xl opacity-60 animate-bounce-slow pointer-events-none">
        ⭐
      </div>
      <div className="absolute top-20 right-1/4 text-3xl opacity-60 animate-spin-slow pointer-events-none">
        🌻
      </div>
      <div className="absolute bottom-16 right-8 text-2xl opacity-60 animate-wiggle pointer-events-none">
        🐝
      </div>
      <div className="absolute bottom-24 left-10 text-2xl opacity-60 animate-float pointer-events-none">
        🌈
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Playful Joyful Newsletter & Free Gift Box */}
        <div className="bg-gradient-to-r from-amber-100 via-emerald-100 to-teal-100 rounded-4xl p-8 sm:p-10 border-4 border-emerald-300/80 mb-14 shadow-lg relative overflow-hidden text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-emerald-800 text-xs font-black tracking-wider uppercase mb-3 shadow-xs border border-emerald-200">
                <span>🎈</span>
                <span>Weekly Free Activities</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight font-heading">
                Get New Phonics Printables in Your Inbox!
              </h3>
              <p className="text-emerald-900 font-bold mt-2 text-sm sm:text-base leading-relaxed">
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
                  className="px-4 py-3.5 rounded-2xl bg-white text-slate-800 placeholder-slate-400 font-bold focus:outline-none focus:ring-4 focus:ring-amber-300 text-sm flex-1 shadow-sm border-2 border-emerald-200"
                />
                <button 
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap btn-bubbly border border-amber-500/50"
                >
                  Join Free 🎈
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 4-Column Child & Educator Navigation Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b-2 border-amber-200/80 text-left">
          
          {/* Brand & Kid Mascot */}
          <div className="col-span-2">
            <div 
              onClick={() => navigate('home')}
              className="flex items-center gap-3 mb-4 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-300 to-emerald-300 flex items-center justify-center text-2xl shadow-sm border-2 border-emerald-300 group-hover:rotate-6 group-hover:scale-105 transition-all">
                🌱
              </div>
              <span className="text-2xl font-black text-emerald-800 tracking-tight font-heading">
                Phonics Garden
              </span>
            </div>
            <p className="text-slate-600 text-sm font-semibold leading-relaxed mb-4 max-w-sm">
              The happy place where young readers grow! An explicit, systematic phonics universe packed with 40 storybooks, animated sing-alongs, games, and 25,000 worksheets.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold bg-white px-3.5 py-2 rounded-2xl border border-amber-200 shadow-xs text-amber-950">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>Questions?</span>
              <a href="mailto:info@phonicsgarden.com" className="text-emerald-700 hover:underline font-black">
                info@phonicsgarden.com
              </a>
            </div>
          </div>

          {/* Fun Stations */}
          <div>
            <h4 className="text-xs font-black text-purple-800 uppercase tracking-wider mb-4 font-heading flex items-center gap-1.5">
              <span>🎪</span>
              <span>Fun Stations</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li>
                <button 
                  onClick={() => navigate('soundboard')} 
                  className="text-purple-800 hover:text-purple-950 hover:bg-purple-100/70 px-2 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>🎮 Sound Game</span>
                  <span className="bg-purple-200 text-purple-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">NEW</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('decodables')} 
                  className="text-slate-700 hover:text-purple-800 hover:bg-purple-50 px-2 py-1 rounded-xl transition-all cursor-pointer"
                >
                  📚 40 Story Books
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('videos')} 
                  className="text-slate-700 hover:text-purple-800 hover:bg-purple-50 px-2 py-1 rounded-xl transition-all cursor-pointer"
                >
                  🎬 Sing & Watch
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('worksheets')} 
                  className="text-slate-700 hover:text-purple-800 hover:bg-purple-50 px-2 py-1 rounded-xl transition-all cursor-pointer"
                >
                  🖍️ 25k Worksheets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('crafts')} 
                  className="text-slate-700 hover:text-purple-800 hover:bg-purple-50 px-2 py-1 rounded-xl transition-all cursor-pointer"
                >
                  ✂️ Puppet Crafts
                </button>
              </li>
            </ul>
          </div>

          {/* Learning Media */}
          <div>
            <h4 className="text-xs font-black text-teal-800 uppercase tracking-wider mb-4 font-heading flex items-center gap-1.5">
              <span>🎵</span>
              <span>Learning Media</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li>
                <button 
                  onClick={() => navigate('music')} 
                  className="text-slate-700 hover:text-teal-800 hover:bg-teal-50 px-2 py-1 rounded-xl transition-all cursor-pointer"
                >
                  🎶 MP3 Audio Tracks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('leveled')} 
                  className="text-slate-700 hover:text-teal-800 hover:bg-teal-50 px-2 py-1 rounded-xl transition-all cursor-pointer"
                >
                  🎨 Coloring Books (AA-B)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('videos')} 
                  className="text-slate-700 hover:text-teal-800 hover:bg-teal-50 px-2 py-1 rounded-xl transition-all cursor-pointer"
                >
                  🏴‍☠️ Bossy-R Pirate
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('videos')} 
                  className="text-slate-700 hover:text-teal-800 hover:bg-teal-50 px-2 py-1 rounded-xl transition-all cursor-pointer"
                >
                  🍏 AEIOU Vowels Rap
                </button>
              </li>
            </ul>
          </div>

          {/* Memberships & Freebies */}
          <div>
            <h4 className="text-xs font-black text-rose-800 uppercase tracking-wider mb-4 font-heading flex items-center gap-1.5">
              <span>⭐</span>
              <span>Gifts & Pass</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li>
                <button 
                  onClick={openFreeBookModal} 
                  className="text-rose-700 hover:text-rose-900 hover:bg-rose-50 px-2 py-1 rounded-xl transition-all cursor-pointer"
                >
                  📖 Free Book Sample
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('pricing')} 
                  className="text-amber-900 bg-amber-200/90 hover:bg-amber-300 px-2.5 py-1 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  <span>⭐ Join Pass ($59.95)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('shop')} 
                  className="text-slate-700 hover:text-rose-800 hover:bg-rose-50 px-2 py-1 rounded-xl transition-all cursor-pointer"
                >
                  🛍️ A-La-Carte Shop
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('contact')} 
                  className="text-slate-700 hover:text-rose-800 hover:bg-rose-50 px-2 py-1 rounded-xl transition-all cursor-pointer"
                >
                  ✉️ Teacher Support
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-950 font-bold gap-4 text-center sm:text-left">
          <p>© 2012–2026 Phonics Garden. Made with joyful smiles for growing minds. 🎈</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('terms')} 
              className="text-emerald-800 hover:underline cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span className="text-amber-400">•</span>
            <span className="flex items-center gap-1 text-slate-600">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> for early readers
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
