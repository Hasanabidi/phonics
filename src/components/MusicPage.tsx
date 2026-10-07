import React, { useState } from 'react';
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
  Disc
} from 'lucide-react';
import { SONGS_DATA, SongTrack } from '../data/siteData';

interface MusicPageProps {
  setActiveTab: (tab: string) => void;
}

export const MusicPage: React.FC<MusicPageProps> = ({ setActiveTab }) => {
  const [activeTrack, setActiveTrack] = useState<SongTrack>(SONGS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const toggleTrack = (track: SongTrack) => {
    if (activeTrack.id === track.id && isPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setActiveTrack(track);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const text = `Now previewing: ${track.title}. ${track.genre}. Rhythm target: ${track.skills}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5" /> 100s of Streamable & Downloadable MP3s
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Phonics Music & Songs Station
          </h1>
          <p className="text-teal-100 text-base sm:text-lg leading-relaxed">
            Enhance auditory processing, stress intonation, and letter fluency through catchy musical beats. Studies prove rhyming music dramatically speeds up phonemic mapping.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-sm shadow-md hover:bg-teal-50 transition-all cursor-pointer"
            >
              Get Full MP3 Music Access ($29.95/yr)
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className="px-5 py-3 rounded-xl bg-teal-950/40 hover:bg-teal-950/60 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Watch Matching Videos &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE AUDIO PLAYER DOCK */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-3xl shadow-lg ${isPlaying ? 'animate-spin' : ''}`}>
            🎵
          </div>
          <div>
            <span className="text-xs text-teal-400 font-bold uppercase tracking-wider">{activeTrack.genre}</span>
            <h3 className="text-2xl font-black text-white">{activeTrack.title}</h3>
            <p className="text-xs text-slate-400">{activeTrack.album} • {activeTrack.duration}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleTrack(activeTrack)}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
            <span>{isPlaying ? 'Pause Track Preview' : 'Play Track Preview'}</span>
          </button>
          <button
            onClick={() => alert(`Downloading high-fidelity MP3 track: ${activeTrack.title}`)}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl transition-colors cursor-pointer"
            title="Download MP3"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TRACKS PLAYLIST */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-xl text-slate-900">Featured Phonics Singles & Albums</h3>
        
        <div className="divide-y divide-slate-100">
          {SONGS_DATA.map((track) => {
            const isCurrent = activeTrack.id === track.id;
            return (
              <div
                key={track.id}
                className={`py-4 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl transition-all ${
                  isCurrent ? 'bg-teal-50/70' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTrack(track)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                      isCurrent && isPlaying
                        ? 'bg-rose-500 text-white'
                        : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                    }`}
                  >
                    {isCurrent && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{track.title}</h4>
                    <p className="text-xs text-slate-500">{track.skills}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto text-xs text-slate-500">
                  <span className="bg-slate-100 px-2.5 py-0.5 rounded-full font-semibold">{track.tempo}</span>
                  <span className="font-mono">{track.duration}</span>
                  <button
                    onClick={() => alert(`Downloading MP3: ${track.title}`)}
                    className="text-teal-700 hover:underline font-bold cursor-pointer"
                  >
                    Download
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
