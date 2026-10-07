import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Film, 
  Sparkles, 
  CheckCircle2, 
  Filter, 
  Search,
  Music,
  Share2,
  Tv
} from 'lucide-react';
import { VIDEOS_DATA, VideoItem } from '../data/siteData';

interface VideosPageProps {
  setActiveTab: (tab: string) => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({ setActiveTab }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(VIDEOS_DATA[0]);
  const [activeSeries, setActiveSeries] = useState<string>('All');
  const [isPlaying, setIsPlaying] = useState(false);

  const seriesList = [
    'All',
    'AEIOU Vowels',
    'Bossy-R Pirate',
    'Calypso Puzzle',
    'Word Family Jazz',
    'Letter Search',
    'Magic-E'
  ];

  const filteredVideos = VIDEOS_DATA.filter(
    (v) => activeSeries === 'All' || v.series === activeSeries
  );

  const toggleSingAlong = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const textToSpeak = `${selectedVideo.title}. Focus Letters: ${selectedVideo.focusLetters.join(', ')}. ${selectedVideo.lyrics}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.9;
        utterance.pitch = 1.1; // Friendly teaching tone
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" /> Unlimited Streaming Videos
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            100s of Streaming Phonics Videos
          </h1>
          <p className="text-amber-100 text-base sm:text-lg leading-relaxed">
            No video rental fees with membership! Captivate your classroom with high-energy animated songs, calypso spelling puzzles, Bossy-R pirates, and jazz word family jams.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-sm shadow-md hover:bg-amber-50 transition-all cursor-pointer"
            >
              Get Video Streaming Pass ($29.95/yr)
            </button>
            <button
              onClick={() => setActiveTab('soundboard')}
              className="px-5 py-3 rounded-xl bg-amber-950/40 hover:bg-amber-950/60 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Try Interactive Soundboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* FEATURED STREAMING PLAYER STAGE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
        
        {/* Player Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                {selectedVideo.series}
              </span>
              <span className="text-xs text-slate-500 font-medium">Duration: {selectedVideo.duration} • {selectedVideo.ageGroup}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{selectedVideo.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSingAlong}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                isPlaying 
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? 'Pause Audio Player' : 'Play Animated Audio Demo'}</span>
            </button>
          </div>
        </div>

        {/* Video Canvas Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950 rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden min-h-[380px]">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs text-amber-400 font-mono tracking-wider">PHONICS GARDEN STREAMING LIVE</span>
            </div>

            {/* Lyric Karaoke Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" /> Sing-Along Lyric Prompts
              </span>
              <p className="text-xl sm:text-2xl font-black text-white leading-snug">
                "{selectedVideo.lyrics}"
              </p>
              <div className="pt-2 flex flex-wrap gap-2 items-center">
                <span className="text-xs text-slate-300">Target Sounds in Video:</span>
                {selectedVideo.focusLetters.map((letter, i) => (
                  <span key={i} className="px-2 py-0.5 bg-amber-400 text-slate-950 font-black rounded text-xs font-mono">
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              {selectedVideo.description}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center items-center text-center space-y-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl shadow-lg border border-amber-500/30">
              📺
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Full HD Video & Lyrics</h4>
              <p className="text-xs text-slate-400 mt-1">
                Optimized for interactive smartboards, tablets, and Google Classroom displays.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('pricing')}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition-colors cursor-pointer"
            >
              Unlock 100+ Videos ($29.95)
            </button>
          </div>

        </div>
      </div>

      {/* SERIES FILTER TABS */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {seriesList.map((series) => (
            <button
              key={series}
              onClick={() => setActiveSeries(series)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSeries === series
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {series}
            </button>
          ))}
        </div>

        {/* VIDEOS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => {
            const isSelected = vid.id === selectedVideo.id;
            return (
              <div
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between cursor-pointer group ${
                  isSelected 
                    ? 'border-2 border-amber-500 shadow-xl ring-4 ring-amber-50' 
                    : 'border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className={`h-40 rounded-xl bg-gradient-to-tr ${vid.thumbnailGradient} p-4 text-white flex flex-col justify-between shadow-xs relative overflow-hidden`}>
                    <div className="flex items-center justify-between">
                      <span className="bg-black/30 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        {vid.duration}
                      </span>
                      <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded">
                        {vid.ageGroup}
                      </span>
                    </div>

                    <div className="self-center w-12 h-12 rounded-full bg-white/30 backdrop-blur-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                    </div>

                    <div className="text-[11px] font-bold text-white/90">
                      {vid.series}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 mt-3 group-hover:text-amber-600 transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {vid.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                  <span className="text-slate-400 font-normal">{vid.views} classroom views</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {isSelected ? 'Playing Video' : 'Watch Now &rarr;'}
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
