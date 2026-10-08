import React, { useState, useRef } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles, 
  Download, 
  Headphones, 
  Radio, 
  CheckCircle2, 
  Disc,
  Star
} from 'lucide-react';
import { SONGS_DATA, SongTrack } from '../data/siteData';

interface MusicPageProps {
  setActiveTab: (tab: string) => void;
}

export const MusicPage: React.FC<MusicPageProps> = ({ setActiveTab }) => {
  const [activeTrack, setActiveTrack] = useState<SongTrack>(SONGS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Ref to scroll up to player when clicking tracks below
  const playerDockRef = useRef<HTMLDivElement>(null);

  const toggleTrack = (track: SongTrack) => {
    if (activeTrack.id === track.id && isPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setActiveTrack(track);
      setTimeout(() => {
        if (playerDockRef.current) {
          const yOffset = -90;
          const y = playerDockRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const text = `Now previewing: ${track.title}. ${track.genre}. Rhythm target: ${track.skills}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.3;
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left select-none">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 rounded-4xl p-8 sm:p-12 text-teal-950 shadow-lg relative overflow-hidden border-4 border-teal-300/60">
        <div className="absolute top-4 right-10 text-4xl opacity-50 animate-float pointer-events-none">
          🎵
        </div>
        <div className="absolute bottom-6 right-28 text-3xl opacity-50 animate-bounce-slow pointer-events-none">
          🎶
        </div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider text-teal-900 shadow-xs border border-white">
            <Radio className="w-3.5 h-3.5 text-teal-700" /> 
            <span>100s of Streamable & Downloadable MP3s! 🎈</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading text-teal-950">
            Phonics Music & Songs Station
          </h1>
          <p className="text-teal-900 font-bold text-base sm:text-lg leading-relaxed">
            Enhance auditory processing, stress intonation, and letter fluency through catchy musical beats. Studies prove rhyming music dramatically speeds up phonemic mapping.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-6 py-3.5 rounded-2xl bg-amber-300 hover:bg-amber-400 text-amber-950 font-black text-sm shadow-md transition-all cursor-pointer btn-bubbly border-2 border-amber-400"
            >
              Get Full MP3 Music Access ($29.95/yr) ⭐
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className="px-5 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-teal-900 font-black text-sm border-2 border-teal-200 transition-all cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <Music className="w-4 h-4 text-teal-700" />
              <span>Watch Matching Videos &rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE AUDIO PLAYER DOCK (No Dark Colors, Anchored with Ref) */}
      <div 
        ref={playerDockRef}
        className="scroll-mt-28 bg-gradient-to-r from-teal-100 via-emerald-100 to-amber-100 text-teal-950 rounded-4xl p-8 border-4 border-teal-300 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden animate-pop"
      >
        <div className="flex items-center gap-4">
          <div className={`w-18 h-18 rounded-3xl bg-gradient-to-tr from-teal-400 to-amber-300 text-teal-950 flex items-center justify-center text-4xl shadow-md border-2 border-white ${isPlaying ? 'animate-bounce-slow' : ''}`}>
            🎵
          </div>
          <div>
            <span className="text-xs text-teal-800 font-black uppercase tracking-wider bg-white/80 px-2.5 py-0.5 rounded-full border border-teal-200 shadow-xs">
              {activeTrack.genre}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-teal-950 font-heading mt-1">
              {activeTrack.title}
            </h3>
            <p className="text-xs text-teal-800 font-bold">{activeTrack.album} • {activeTrack.duration} • {activeTrack.skills}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleTrack(activeTrack)}
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md border-2 border-emerald-400 btn-bubbly"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white text-white" />}
            <span>{isPlaying ? 'Pause Track Preview' : 'Play Track Preview 🎶'}</span>
          </button>
          <button
            onClick={() => alert(`🎉 Downloading high-fidelity MP3 track: ${activeTrack.title}`)}
            className="p-3.5 bg-white hover:bg-teal-50 text-teal-900 border-2 border-teal-300 rounded-2xl transition-all cursor-pointer shadow-sm hover:scale-105"
            title="Download MP3"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TRACKS PLAYLIST */}
      <div className="bg-white rounded-4xl p-6 sm:p-8 border-3 border-amber-200 shadow-sm space-y-4">
        <h3 className="font-black text-xl text-slate-900 font-heading">
          Featured Phonics Singles & Albums 🎈
        </h3>
        
        <div className="divide-y divide-amber-100">
          {SONGS_DATA.map((track) => {
            const isCurrent = activeTrack.id === track.id;
            return (
              <div
                key={track.id}
                onClick={() => toggleTrack(track)}
                className={`py-4 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl transition-all cursor-pointer card-playful ${
                  isCurrent ? 'bg-teal-50 border-2 border-teal-300 shadow-xs' : 'hover:bg-amber-50/60'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTrack(track);
                    }}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black transition-all cursor-pointer shadow-xs border ${
                      isCurrent && isPlaying
                        ? 'bg-rose-500 text-white border-rose-600'
                        : 'bg-teal-100 text-teal-900 border-teal-200 hover:bg-teal-200'
                    }`}
                  >
                    {isCurrent && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 font-heading">{track.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">{track.skills}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto text-xs text-slate-500 font-bold">
                  <span className="bg-amber-100 text-amber-900 px-3 py-0.5 rounded-full font-black border border-amber-200">
                    {track.tempo}
                  </span>
                  <span className="font-mono text-slate-600">{track.duration}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`🎉 Downloading MP3: ${track.title}`);
                    }}
                    className="text-teal-700 hover:text-teal-900 font-black cursor-pointer hover:underline"
                  >
                    Download 💾
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
