import React, { useState, useRef } from 'react';
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
  Tv,
  Star
} from 'lucide-react';
import { VIDEOS_DATA, VideoItem } from '../data/siteData';

interface VideosPageProps {
  setActiveTab: (tab: string) => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({ setActiveTab }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(VIDEOS_DATA[0]);
  const [activeSeries, setActiveSeries] = useState<string>('All');
  const [isPlaying, setIsPlaying] = useState(false);

  // Ref to scroll up to video player when clicking cards below
  const playerSectionRef = useRef<HTMLDivElement>(null);

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

  const handleSelectVideo = (vid: VideoItem) => {
    setSelectedVideo(vid);
    setTimeout(() => {
      if (playerSectionRef.current) {
        const yOffset = -90;
        const y = playerSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  const toggleSingAlong = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const textToSpeak = `${selectedVideo.title}. Focus Letters: ${selectedVideo.focusLetters.join(', ')}. ${selectedVideo.lyrics}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.9;
        utterance.pitch = 1.3; // Friendly kids tone
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left select-none">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-4xl p-8 sm:p-12 text-amber-950 shadow-lg relative overflow-hidden border-4 border-amber-300/60">
        <div className="absolute top-4 right-10 text-4xl opacity-50 animate-float pointer-events-none">
          🎬
        </div>
        <div className="absolute bottom-6 right-28 text-3xl opacity-50 animate-bounce-slow pointer-events-none">
          🍿
        </div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider text-amber-900 shadow-xs border border-white">
            <Tv className="w-3.5 h-3.5 text-amber-600" /> 
            <span>Unlimited Sing & Watch Videos! 📺</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading text-amber-950">
            100s of Streaming Phonics Videos
          </h1>
          <p className="text-amber-900 font-bold text-base sm:text-lg leading-relaxed">
            Zero rental fees with membership! Captivate your classroom with high-energy animated songs, calypso spelling puzzles, Bossy-R pirates, and jazz word family jams.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-6 py-3.5 rounded-2xl bg-white text-amber-950 font-black text-sm shadow-md hover:bg-amber-50 transition-all cursor-pointer btn-bubbly border-2 border-amber-200"
            >
              Unlock All Streaming Videos ($39.95/yr) ⭐
            </button>
            <button
              onClick={() => setActiveTab('soundboard')}
              className="px-5 py-3.5 rounded-2xl bg-amber-300/90 hover:bg-amber-300 text-amber-950 font-black text-sm border-2 border-amber-400 transition-all cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Try Interactive Soundboard 🎮</span>
            </button>
          </div>
        </div>
      </div>

      {/* FEATURED STREAMING PLAYER STAGE (Anchored with ref for auto-scroll) */}
      <div 
        ref={playerSectionRef}
        className="scroll-mt-28 bg-white rounded-4xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl space-y-6 relative overflow-hidden animate-pop"
      >
        
        {/* Player Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-amber-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-100 text-amber-900 font-black px-2.5 py-0.5 rounded-full border border-amber-200">
                {selectedVideo.series}
              </span>
              <span className="text-xs text-slate-500 font-bold">
                Duration: {selectedVideo.duration} • {selectedVideo.ageGroup}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">
              {selectedVideo.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSingAlong}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer border-2 ${
                isPlaying 
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'bg-amber-400 hover:bg-amber-300 text-amber-950 border-amber-500'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-amber-950 text-amber-950" />}
              <span>{isPlaying ? 'Pause Audio Player' : 'Sing Along Read-Aloud 🎶'}</span>
            </button>
          </div>
        </div>

        {/* Playful Colorful Theatre Stage Simulator (No Dark Colors) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden min-h-[360px] shadow-lg border-4 border-white">
          {/* Decorative floating stage sparkles */}
          <div className="absolute top-3 right-6 text-2xl opacity-60 animate-bounce-slow pointer-events-none">✨</div>
          <div className="absolute bottom-4 left-6 text-2xl opacity-60 animate-float pointer-events-none">🎵</div>

          <div className="lg:col-span-8 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
              <span>PHONICS GARDEN THEATRE 🎬</span>
            </div>

            {/* Lyric Karaoke Card */}
            <div className="bg-white/95 text-slate-900 p-6 rounded-3xl border-2 border-white shadow-md space-y-3">
              <div className="flex items-center justify-between text-xs font-black text-purple-700">
                <span>🎤 SING-ALONG LYRICS DISPLAY</span>
                <span>{selectedVideo.views} kids sang this</span>
              </div>
              <p className="text-base sm:text-lg font-bold leading-relaxed font-heading text-slate-800">
                "{selectedVideo.lyrics}"
              </p>
            </div>

            {/* Focus letter tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-white/90">Letters in this song:</span>
              {selectedVideo.focusLetters.map((letter) => (
                <span 
                  key={letter} 
                  className="w-9 h-9 rounded-xl bg-white text-purple-900 font-black flex items-center justify-center text-sm shadow-xs border border-purple-200"
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 space-y-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white text-purple-700 flex items-center justify-center mx-auto text-3xl shadow-sm">
              🎬
            </div>
            <div>
              <h4 className="font-black text-sm text-white">Full Classroom Video</h4>
              <p className="text-xs text-white/80 font-semibold mt-1">
                Zero advertisements, 100% child-safe, and streaming directly to classroom projectors.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('pricing')}
              className="w-full py-2.5 bg-amber-300 hover:bg-amber-400 text-amber-950 font-black rounded-xl text-xs shadow-sm transition-all cursor-pointer border border-amber-400"
            >
              Watch in Full HD 📺
            </button>
          </div>

        </div>
      </div>

      {/* FILTER & SERIES TABS */}
      <div className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            {seriesList.map((series) => (
              <button
                key={series}
                onClick={() => setActiveSeries(series)}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  activeSeries === series
                    ? 'bg-amber-400 text-amber-950 shadow-sm border-2 border-amber-500 scale-105'
                    : 'bg-white hover:bg-amber-50 text-slate-700 border-2 border-amber-200'
                }`}
              >
                {series}
              </button>
            ))}
          </div>
        </div>

        {/* VIDEOS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => {
            const isSelected = vid.id === selectedVideo.id;
            return (
              <div
                key={vid.id}
                onClick={() => handleSelectVideo(vid)}
                className={`bg-white rounded-3xl border-3 transition-all p-5 flex flex-col justify-between cursor-pointer group card-playful relative overflow-hidden select-none ${
                  isSelected 
                    ? 'border-amber-500 shadow-xl ring-4 ring-amber-200/70 bg-amber-50/30 scale-[1.02]' 
                    : 'border-amber-200/90 hover:border-amber-400 shadow-sm hover:shadow-lg'
                }`}
              >
                <div>
                  <div className={`h-40 rounded-2xl bg-gradient-to-tr ${vid.thumbnailGradient} p-4 text-white flex flex-col justify-between shadow-xs relative overflow-hidden`}>
                    <div className="flex items-center justify-between">
                      <span className="bg-black/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-black">
                        {vid.duration}
                      </span>
                      <span className="text-[10px] font-black bg-white/20 px-2.5 py-0.5 rounded-full">
                        {vid.ageGroup}
                      </span>
                    </div>

                    <div className="self-center w-12 h-12 rounded-full bg-white/40 backdrop-blur-xs flex items-center justify-center group-hover:scale-125 transition-transform shadow-md">
                      <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                    </div>

                    <div className="text-[11px] font-black text-white/95">
                      {vid.series}
                    </div>
                  </div>

                  <h3 className="font-black text-base text-slate-900 mt-3 group-hover:text-amber-700 transition-colors font-heading">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-medium">
                    {vid.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t-2 border-amber-100 flex items-center justify-between text-xs font-black text-amber-800">
                  <span className="text-slate-500 font-bold">{vid.views} views</span>
                  <span className={`px-2.5 py-1 rounded-xl transition-all ${
                    isSelected ? 'bg-amber-400 text-amber-950' : 'bg-amber-100 group-hover:bg-amber-200'
                  }`}>
                    {isSelected ? '✨ Playing Video' : 'Watch Now &rarr;'}
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
