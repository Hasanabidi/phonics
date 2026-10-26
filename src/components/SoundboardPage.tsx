import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  Sparkles, 
  RefreshCw, 
  Award, 
  Star, 
  Flame, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';
import { ELKONIN_CHALLENGES, ElkoninWordChallenge } from '../data/siteData';

interface StickerItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlocked: boolean;
}

const DEFAULT_STICKERS: StickerItem[] = [
  { id: 'stk-1', name: 'Sound Sprout', emoji: '🌱', description: 'Solved your first phoneme challenge', unlocked: true },
  { id: 'stk-2', name: 'Cat Champion', emoji: '🐱', description: 'Mastered CVC word CAT', unlocked: false },
  { id: 'stk-3', name: 'Sunny Reader', emoji: '☀️', description: 'Blended SUN with pure phonemes', unlocked: false },
  { id: 'stk-4', name: 'Digraph Sailor', emoji: '🚢', description: 'Decoded digraph /sh/ in SHIP', unlocked: false },
  { id: 'stk-5', name: 'Streak Flame', emoji: '🔥', description: 'Reached a 3-challenge win streak', unlocked: false },
  { id: 'stk-6', name: 'Garden Master', emoji: '🏆', description: 'Earned 10+ Phonics stars', unlocked: false }
];

export const SoundboardPage: React.FC = () => {
  const [activeTabMode, setActiveTabMode] = useState<'elkonin' | 'blender'>('elkonin');

  // Persistence for stars, streak, stickers
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('phonics_stars');
    return saved ? parseInt(saved, 10) : 4;
  });
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('phonics_streak');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [stickers, setStickers] = useState<StickerItem[]>(() => {
    const saved = localStorage.getItem('phonics_stickers');
    return saved ? JSON.parse(saved) : DEFAULT_STICKERS;
  });

  // Elkonin Sound Boxes State
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const currentChallenge: ElkoninWordChallenge = ELKONIN_CHALLENGES[challengeIndex % ELKONIN_CHALLENGES.length];
  const [placedPhonemes, setPlacedPhonemes] = useState<string[]>([]);
  const [activeBoxIndex, setActiveBoxIndex] = useState<number | null>(null);
  const [isChallengeSuccess, setIsChallengeSuccess] = useState<boolean>(false);
  const [isBlendingActive, setIsBlendingActive] = useState<boolean>(false);

  // Soundboard Blender State
  const [selectedOnset, setSelectedOnset] = useState<string>('c');
  const [selectedRime, setSelectedRime] = useState<string>('at');
  const [blenderActiveIndex, setBlenderActiveIndex] = useState<number | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('phonics_stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('phonics_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('phonics_stickers', JSON.stringify(stickers));
  }, [stickers]);

  // Reset placed tiles on challenge change
  useEffect(() => {
    setPlacedPhonemes(new Array(currentChallenge.phonemes.length).fill(''));
    setIsChallengeSuccess(false);
    setActiveBoxIndex(null);
  }, [challengeIndex]);

  // Animal Consonant bank for onset-rime blender
  const consonants = [
    { char: 'b', emoji: '🐻', name: 'Bear' },
    { char: 'c', emoji: '🐱', name: 'Cat' },
    { char: 'd', emoji: '🐶', name: 'Dog' },
    { char: 'f', emoji: '🦊', name: 'Fox' },
    { char: 'h', emoji: '🐴', name: 'Horse' },
    { char: 'm', emoji: '🐵', name: 'Monkey' },
    { char: 'p', emoji: '🐷', name: 'Pig' },
    { char: 'r', emoji: '🐰', name: 'Rabbit' },
    { char: 's', emoji: '🐍', name: 'Snake' },
    { char: 't', emoji: '🐯', name: 'Tiger' },
    { char: 'w', emoji: '🐺', name: 'Wolf' }
  ];

  const rimes = [
    { family: 'at', example: 'cat / bat', color: 'bg-rose-400 text-white' },
    { family: 'an', example: 'pan / can', color: 'bg-amber-400 text-amber-950' },
    { family: 'ap', example: 'cap / map', color: 'bg-orange-400 text-white' },
    { family: 'en', example: 'hen / pen', color: 'bg-emerald-400 text-white' },
    { family: 'et', example: 'net / pet', color: 'bg-teal-400 text-white' },
    { family: 'in', example: 'pin / win', color: 'bg-sky-400 text-white' },
    { family: 'ip', example: 'zip / ship', color: 'bg-blue-400 text-white' },
    { family: 'op', example: 'hop / mop', color: 'bg-indigo-400 text-white' },
    { family: 'ot', example: 'hot / pot', color: 'bg-purple-400 text-white' },
    { family: 'ug', example: 'bug / hug', color: 'bg-pink-400 text-white' },
    { family: 'un', example: 'sun / fun', color: 'bg-fuchsia-400 text-white' }
  ];

  const blendedWord = `${selectedOnset}${selectedRime}`.toUpperCase();

  // Handle tile placement in Elkonin box
  const handleSelectPhonemeTile = async (phoneme: string) => {
    if (isChallengeSuccess) return;

    // Find first empty slot
    const nextSlot = placedPhonemes.findIndex(p => p === '');
    if (nextSlot === -1) return;

    const newPlaced = [...placedPhonemes];
    newPlaced[nextSlot] = phoneme;
    setPlacedPhonemes(newPlaced);
    setActiveBoxIndex(nextSlot);

    // Play pure isolated phoneme
    await audioEngine.speakPhoneme(phoneme);
    setActiveBoxIndex(null);

    // If all slots are filled, evaluate!
    if (!newPlaced.includes('')) {
      const isMatch = newPlaced.join('').toLowerCase() === currentChallenge.word.toLowerCase();
      if (isMatch) {
        setIsChallengeSuccess(true);
        audioEngine.playSuccessChime();

        // Confetti burst
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.65 }
        });

        // Award stars & streak
        setStars(s => s + 2);
        const newStreak = streak + 1;
        setStreak(newStreak);

        // Check unlockable stickers
        setStickers(prev => prev.map(stk => {
          if (stk.id === 'stk-2' && currentChallenge.word === 'cat') return { ...stk, unlocked: true };
          if (stk.id === 'stk-3' && currentChallenge.word === 'sun') return { ...stk, unlocked: true };
          if (stk.id === 'stk-4' && currentChallenge.word === 'ship') return { ...stk, unlocked: true };
          if (stk.id === 'stk-5' && newStreak >= 3) return { ...stk, unlocked: true };
          if (stk.id === 'stk-6' && stars + 2 >= 10) return { ...stk, unlocked: true };
          return stk;
        }));
      } else {
        audioEngine.playRetryTone();
      }
    }
  };

  // Clear or undo last placed tile
  const handleRemovePhonemeTile = (index: number) => {
    if (isChallengeSuccess) return;
    const newPlaced = [...placedPhonemes];
    newPlaced[index] = '';
    setPlacedPhonemes(newPlaced);
    audioEngine.playTone(200, 'sine', 0.1, 0.05);
  };

  // Sequential Blend Playback for Elkonin
  const handleSlideToBlend = async () => {
    setIsBlendingActive(true);
    await audioEngine.blendPhonemesSequence(
      currentChallenge.phonemes, 
      currentChallenge.word, 
      (idx) => setActiveBoxIndex(idx)
    );
    setIsBlendingActive(false);
  };

  // Onset Rime Sequential Blend
  const handleBlendMachine = async () => {
    setBlenderActiveIndex(0);
    await audioEngine.speakPhoneme(selectedOnset);
    setBlenderActiveIndex(1);
    await audioEngine.speakPhoneme(selectedRime);
    setBlenderActiveIndex(2);
    await audioEngine.speakWord(blendedWord);
    setBlenderActiveIndex(null);
    audioEngine.playTone(523.25, 'sine', 0.2, 0.1);
  };

  // Candidate tiles pool: current phonemes shuffled with 3 distractor sounds
  const candidatePool = React.useMemo(() => {
    const distractors = ['s', 'p', 't', 'm', 'd', 'b', 'sh', 'a', 'o', 'e']
      .filter(d => !currentChallenge.phonemes.includes(d))
      .slice(0, 3);
    const combined = [...currentChallenge.phonemes, ...distractors];
    return combined.sort(() => 0.5 - Math.random());
  }, [currentChallenge]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
      
      {/* Top Header Banner with Garden Badges */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 rounded-4xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border-4 border-purple-300">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
              <span>🌱 Interactive Phonics Lab</span>
              <span className="text-amber-300">Science of Reading Compliant</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading">
              Pure Soundboard & Elkonin Lab
            </h1>
            <p className="text-purple-100 text-sm sm:text-base font-medium">
              Crisp pure phonemes without unwanted schwa vocalizations. Tap, stretch, and blend sounds seamlessly!
            </p>
          </div>

          {/* Gamified Star & Streak Bar */}
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-3.5 rounded-3xl border-2 border-white/30 shrink-0">
            <div className="flex items-center gap-1.5 text-amber-300 font-black text-lg">
              <Star className="w-5 h-5 fill-amber-300 animate-spin-slow" />
              <span>{stars} Stars</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-1.5 text-orange-200 font-black text-lg">
              <Flame className="w-5 h-5 fill-orange-400 text-orange-400" />
              <span>{streak} Streak</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/20">
          <button
            onClick={() => setActiveTabMode('elkonin')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTabMode === 'elkonin'
                ? 'bg-white text-purple-900 shadow-md scale-105'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            <span>📦 Elkonin Sound Boxes (Interactive Challenge)</span>
          </button>
          <button
            onClick={() => setActiveTabMode('blender')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTabMode === 'blender'
                ? 'bg-white text-purple-900 shadow-md scale-105'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            <span>🧪 CVC Word Machine & Onset-Rime Blender</span>
          </button>
        </div>
      </div>

      {/* MODE 1: ELKONIN SOUND BOXES */}
      {activeTabMode === 'elkonin' && (
        <div className="bg-white rounded-4xl p-6 sm:p-10 border-4 border-purple-200 shadow-xl space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Phase {currentChallenge.phase} Word Challenge
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
                <span>Map the Sounds in</span>
                <span className="text-purple-600 uppercase font-mono underline decoration-amber-400 decoration-4">
                  {currentChallenge.word}
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-bold mt-0.5">{currentChallenge.hint}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSlideToBlend}
                disabled={isBlendingActive}
                className="px-5 py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-2xl text-xs font-black flex items-center gap-2 cursor-pointer transition-all border border-purple-300 disabled:opacity-50"
              >
                <Volume2 className="w-4 h-4 text-purple-700" />
                <span>Hear Blend Demo</span>
              </button>
              <button
                onClick={() => setChallengeIndex(c => c + 1)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-black flex items-center gap-2 cursor-pointer transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Next Word</span>
              </button>
            </div>
          </div>

          {/* Picture Clue & Sound Boxes Arena */}
          <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-pink-50/50 rounded-3xl p-8 border-3 border-purple-200 text-center space-y-6">
            
            {/* Target Picture */}
            <div className="inline-block relative">
              <div className="text-7xl sm:text-8xl p-4 bg-white rounded-3xl shadow-md border-2 border-purple-200 inline-block transform hover:scale-105 transition-transform">
                {currentChallenge.pictureEmoji}
              </div>
            </div>

            {/* Elkonin Boxes (One slot per phoneme) */}
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              {currentChallenge.phonemes.map((targetPhoneme, idx) => {
                const placed = placedPhonemes[idx];
                const isActive = activeBoxIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => placed && handleRemovePhonemeTile(idx)}
                    className={`w-20 h-24 sm:w-28 sm:h-32 rounded-3xl border-4 flex flex-col items-center justify-center transition-all cursor-pointer relative shadow-sm ${
                      isActive
                        ? 'border-purple-600 bg-purple-100 scale-105 shadow-lg ring-4 ring-purple-300'
                        : placed
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-950 scale-100'
                        : 'border-dashed border-purple-300 bg-white/90 hover:bg-white'
                    }`}
                  >
                    <span className="text-3xl sm:text-5xl font-black font-mono">
                      {placed ? placed.toUpperCase() : ''}
                    </span>
                    {!placed && (
                      <span className="text-[10px] uppercase font-black text-purple-300 tracking-wider mt-1">
                        Sound {idx + 1}
                      </span>
                    )}
                    {placed && !isChallengeSuccess && (
                      <span className="text-[9px] text-slate-400 font-semibold absolute bottom-1.5">
                        tap to remove
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sweep-to-Blend Bar */}
            <div className="max-w-md mx-auto pt-2">
              <button
                onClick={handleSlideToBlend}
                disabled={isBlendingActive}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all border-2 border-emerald-300 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Tap to Sweep & Blend Sounds! 🔊</span>
              </button>
            </div>

            {/* Success Celebration Callout */}
            {isChallengeSuccess && (
              <div className="bg-emerald-500 text-white rounded-2xl p-4 max-w-lg mx-auto shadow-lg animate-bounce-slow flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-left">
                  <span className="text-3xl">🎉</span>
                  <div>
                    <h4 className="font-black text-sm">Phenomenal Blending!</h4>
                    <p className="text-xs text-emerald-100">You earned +2 Stars and expanded your garden!</p>
                  </div>
                </div>
                <button
                  onClick={() => setChallengeIndex(c => c + 1)}
                  className="px-4 py-2 bg-white text-emerald-900 font-black text-xs rounded-xl shadow cursor-pointer hover:bg-emerald-50 shrink-0"
                >
                  Next Challenge →
                </button>
              </div>
            )}
          </div>

          {/* Sound Tile Bank */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span>Tap a Sound Tile to Place in Empty Box:</span>
              </h3>
              <span className="text-xs text-slate-400 font-semibold">
                Pure unvoiced stop & continuous sounds
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {candidatePool.map((sound, i) => (
                <button
                  key={`${sound}-${i}`}
                  onClick={() => handleSelectPhonemeTile(sound)}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white hover:bg-amber-50 active:scale-95 border-3 border-amber-300 hover:border-amber-400 text-amber-950 rounded-2xl shadow-sm hover:shadow-md font-mono text-2xl sm:text-3xl font-black flex flex-col items-center justify-center cursor-pointer transition-all"
                >
                  <span>{sound}</span>
                  <span className="text-[9px] text-amber-600 font-sans font-bold">/{sound}/</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: ONSET-RIME BLENDER */}
      {activeTabMode === 'blender' && (
        <div className="bg-white rounded-4xl p-6 sm:p-10 border-4 border-amber-300 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-amber-100 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2 font-heading">
                <span className="text-3xl">🧪</span>
                <span>The CVC Word Laboratory</span>
              </h2>
              <p className="text-xs text-slate-500 font-bold mt-0.5">Pick onset consonant & rhyming family, then hear smooth blending!</p>
            </div>

            <button
              onClick={handleBlendMachine}
              className="px-7 py-3.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-sm rounded-3xl shadow-lg shadow-purple-500/30 flex items-center gap-2 cursor-pointer transition-all border-3 border-purple-300"
            >
              <Volume2 className="w-5 h-5" />
              <span>Blend & Speak Word! 🔊</span>
            </button>
          </div>

          {/* Large Word Display */}
          <div className="bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 rounded-3xl p-8 text-center text-white space-y-4 shadow-inner border-4 border-purple-400/40 relative overflow-hidden">
            <div className="flex items-center justify-center gap-3 sm:gap-6 text-4xl sm:text-7xl font-black tracking-wider font-mono">
              <span className={`px-5 sm:px-8 py-3 rounded-3xl border-3 shadow-lg transition-all ${
                blenderActiveIndex === 0
                  ? 'bg-amber-400 text-slate-900 border-white scale-110'
                  : 'text-amber-300 bg-slate-800/90 border-amber-400'
              }`}>
                {selectedOnset.toUpperCase()}
              </span>
              <span className="text-amber-400 text-3xl font-bold">+</span>
              <span className={`px-5 sm:px-8 py-3 rounded-3xl border-3 shadow-lg transition-all ${
                blenderActiveIndex === 1
                  ? 'bg-teal-400 text-slate-900 border-white scale-110'
                  : 'text-teal-300 bg-slate-800/90 border-teal-400'
              }`}>
                {selectedRime.toUpperCase()}
              </span>
              <span className="text-amber-400 text-3xl font-bold">=</span>
              <span className={`px-6 sm:px-10 py-3 rounded-3xl shadow-2xl border-4 transition-all ${
                blenderActiveIndex === 2
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 border-white scale-110'
                  : 'text-white bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 border-white'
              }`}>
                {blendedWord}
              </span>
            </div>

            <p className="text-xs text-purple-200 font-bold">
              Tap letters below to test different sound combinations!
            </p>
          </div>

          {/* Trays */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Onsets */}
            <div className="space-y-3 bg-amber-50/70 p-5 rounded-3xl border-2 border-amber-200">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm text-amber-950 uppercase tracking-wider">
                  1. Starting Sound (Onset)
                </h3>
                <span className="text-xs bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full font-black">
                  /{selectedOnset}/
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {consonants.map((item) => (
                  <button
                    key={item.char}
                    onClick={() => {
                      setSelectedOnset(item.char);
                      audioEngine.speakPhoneme(item.char);
                    }}
                    className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 font-mono text-xl font-black cursor-pointer transition-all ${
                      selectedOnset === item.char
                        ? 'bg-amber-400 text-amber-950 border-amber-600 scale-105 shadow-md'
                        : 'bg-white hover:bg-amber-100/50 text-slate-800 border-amber-200'
                    }`}
                  >
                    <span>{item.char}</span>
                    <span className="text-base">{item.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rimes */}
            <div className="space-y-3 bg-teal-50/70 p-5 rounded-3xl border-2 border-teal-200">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm text-teal-950 uppercase tracking-wider">
                  2. Rhyming Family (Rime)
                </h3>
                <span className="text-xs bg-teal-200 text-teal-950 px-2 py-0.5 rounded-full font-black">
                  -{selectedRime}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {rimes.map((item) => (
                  <button
                    key={item.family}
                    onClick={() => {
                      setSelectedRime(item.family);
                      audioEngine.speakWord(item.family);
                    }}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center border-2 font-mono text-lg font-black cursor-pointer transition-all ${
                      selectedRime === item.family
                        ? 'bg-teal-500 text-white border-teal-700 scale-105 shadow-md'
                        : 'bg-white hover:bg-teal-100/50 text-slate-800 border-teal-200'
                    }`}
                  >
                    <span>-{item.family}</span>
                    <span className="text-[10px] text-slate-400 font-sans font-semibold">
                      {item.example.split('/')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MY STICKER GARDEN & ACHIEVEMENTS */}
      <div className="bg-white rounded-4xl p-6 sm:p-8 border-4 border-slate-200 shadow-md space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <h3 className="text-xl font-black text-slate-900 font-heading">My Sticker Garden</h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {stickers.filter(s => s.unlocked).length} of {stickers.length} Badges Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {stickers.map(stk => (
            <div
              key={stk.id}
              className={`p-4 rounded-3xl border-2 flex flex-col items-center text-center transition-all ${
                stk.unlocked
                  ? 'bg-amber-50/60 border-amber-300 shadow-sm'
                  : 'bg-slate-50 border-dashed border-slate-200 opacity-50 grayscale'
              }`}
            >
              <div className="text-4xl mb-2">{stk.emoji}</div>
              <h4 className="text-xs font-black text-slate-900">{stk.name}</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-tight">{stk.description}</p>
              {stk.unlocked && (
                <span className="mt-2 text-[9px] bg-amber-200 text-amber-900 font-black px-2 py-0.5 rounded-full">
                  Unlocked ⭐
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
