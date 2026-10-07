import React, { useState } from 'react';
import { 
  Gamepad2, 
  Volume2, 
  Sparkles, 
  RefreshCw, 
  Award,
  Zap,
  Star,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const SoundboardPage: React.FC = () => {
  const [selectedOnset, setSelectedOnset] = useState<string>('c');
  const [selectedRime, setSelectedRime] = useState<string>('at');
  const [recentBlends, setRecentBlends] = useState<string[]>(['cat', 'dog', 'sun', 'pig']);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [stars, setStars] = useState<number>(3);

  // Sound banks with playful emojis
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

  const speakSound = (text: string, rate: number = 0.9) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = 1.35; // friendly kids voice
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleBlend = () => {
    // 1. Speak onset
    speakSound(selectedOnset, 0.8);
    setTimeout(() => {
      // 2. Speak rime
      speakSound(selectedRime, 0.8);
      setTimeout(() => {
        // 3. Blend together with celebration
        speakSound(blendedWord, 1.0);
        setStars((s) => s + 1);
        if (!recentBlends.includes(blendedWord.toLowerCase())) {
          setRecentBlends([blendedWord.toLowerCase(), ...recentBlends.slice(0, 4)]);
        }
      }, 700);
    }, 700);
  };

  // Fun Kid Quiz Questions
  const quizQuestions = [
    {
      prompt: "Which word starts with /b/ and rhymes with 'CAT'?",
      emoji: "🦇",
      options: ['BAT', 'RAT', 'MAT', 'HAT'],
      correct: 'BAT'
    },
    {
      prompt: "Blend these sounds together: /s/ + /u/ + /n/",
      emoji: "☀️",
      options: ['FUN', 'RUN', 'SUN', 'BUN'],
      correct: 'SUN'
    },
    {
      prompt: "Which animal has the short /e/ vowel sound?",
      emoji: "🐔",
      options: ['DOG', 'HEN', 'PIG', 'CAT'],
      correct: 'HEN'
    },
    {
      prompt: "Find the word with the digraph /sh/:",
      emoji: "🚢",
      options: ['SHIP', 'CHIP', 'WHIP', 'TRIP'],
      correct: 'SHIP'
    }
  ];

  const handleQuizAnswer = (option: string) => {
    const currentQ = quizQuestions[currentQuizIndex];
    if (option === currentQ.correct) {
      setQuizFeedback("🎉 YAY! You got it right! Awesome reader!");
      setQuizScore(quizScore + 10);
      setStars(stars + 2);
      speakSound("Great job! " + option);
    } else {
      setQuizFeedback(`Try again! "${option}" is a fun word, but listen closely.`);
      speakSound(option);
    }

    setTimeout(() => {
      setQuizFeedback(null);
      setCurrentQuizIndex((prev) => (prev + 1) % quizQuestions.length);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      {/* Playful Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 rounded-4xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border-4 border-purple-300">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
            <span>🎮 Level 1 Sound Station</span>
            <span className="text-amber-300">⭐ {stars} Stars Collected!</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading">
            Phonics Sound Machine & Word Blending Game!
          </h1>
          <p className="text-purple-100 text-base sm:text-lg font-semibold leading-relaxed">
            Click any starting animal sound, tap a rhyming family, and watch the magical word machine blend them together out loud!
          </p>
        </div>
      </div>

      {/* THE SOUND BLENDING STATION */}
      <div className="bg-white rounded-4xl p-6 sm:p-10 border-4 border-amber-300 shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-amber-100 pb-4 gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2 font-heading">
              <span className="text-3xl">🧪</span>
              <span>The Magical CVC Word Blender</span>
            </h2>
            <p className="text-xs text-slate-500 font-bold mt-0.5">Pick your letter blocks, then hit Blend & Speak!</p>
          </div>

          <button
            onClick={handleBlend}
            className="px-7 py-3.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-sm rounded-3xl shadow-lg shadow-purple-500/30 flex items-center gap-2 cursor-pointer btn-bubbly border-3 border-purple-300"
          >
            <Volume2 className="w-5 h-5" />
            <span>Blend & Speak Word! 🔊</span>
          </button>
        </div>

        {/* Large Animated Word Screen */}
        <div className="bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 rounded-3xl p-8 text-center text-white space-y-4 shadow-inner border-4 border-purple-400/40 relative overflow-hidden">
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-4xl sm:text-7xl font-black tracking-wider font-mono">
            <span className="text-amber-300 bg-slate-800/90 px-5 sm:px-8 py-3 rounded-3xl border-3 border-amber-400 shadow-lg">
              {selectedOnset.toUpperCase()}
            </span>
            <span className="text-amber-400 text-3xl font-bold">+</span>
            <span className="text-teal-300 bg-slate-800/90 px-5 sm:px-8 py-3 rounded-3xl border-3 border-teal-400 shadow-lg">
              {selectedRime.toUpperCase()}
            </span>
            <span className="text-amber-400 text-3xl font-bold">=</span>
            <span className="text-white bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 px-6 sm:px-10 py-3 rounded-3xl shadow-2xl border-4 border-white animate-bounce-slow">
              {blendedWord}
            </span>
          </div>

          <p className="text-xs text-purple-200 font-bold">
            Tap letters below to test different sound combinations!
          </p>
        </div>

        {/* Two Letter Trays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          
          {/* Starting Letter (Onset) */}
          <div className="space-y-3 bg-amber-50/70 p-5 rounded-3xl border-2 border-amber-200">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-amber-950 uppercase tracking-wider flex items-center gap-1.5 font-heading">
                <span>1. Choose Animal Onset Sound</span>
              </h3>
              <span className="text-xs bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full font-black">
                Selected: /{selectedOnset}/
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {consonants.map((item) => (
                <button
                  key={item.char}
                  onClick={() => {
                    setSelectedOnset(item.char);
                    speakSound(`${item.char}! ${item.name}`);
                  }}
                  className={`p-2.5 rounded-2xl font-mono text-center transition-all cursor-pointer border-2 ${
                    selectedOnset === item.char
                      ? 'bg-amber-400 text-amber-950 border-amber-600 shadow-md scale-105 font-black'
                      : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-200'
                  }`}
                >
                  <div className="text-base">{item.emoji}</div>
                  <div className="text-lg font-black">{item.char.toUpperCase()}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Word Family (Rime) */}
          <div className="space-y-3 bg-teal-50/70 p-5 rounded-3xl border-2 border-teal-200">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-teal-950 uppercase tracking-wider flex items-center gap-1.5 font-heading">
                <span>2. Choose Rhyming Family</span>
              </h3>
              <span className="text-xs bg-teal-200 text-teal-950 px-2 py-0.5 rounded-full font-black">
                Selected: -{selectedRime}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {rimes.map((item) => (
                <button
                  key={item.family}
                  onClick={() => {
                    setSelectedRime(item.family);
                    speakSound(`Word family -${item.family}! like ${item.example}`);
                  }}
                  className={`p-3 rounded-2xl text-center transition-all cursor-pointer border-2 ${
                    selectedRime === item.family
                      ? 'bg-teal-500 text-white border-teal-700 shadow-md scale-105 font-black'
                      : 'bg-white hover:bg-teal-100 text-slate-800 border-teal-200'
                  }`}
                >
                  <div className="text-lg font-black font-mono">-{item.family}</div>
                  <div className="text-[10px] text-slate-500 font-bold truncate">{item.example}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Word History List */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-slate-500">Your Blended Words:</span>
          {recentBlends.map((w, idx) => (
            <button
              key={idx}
              onClick={() => speakSound(w)}
              className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-900 font-mono text-xs font-black rounded-xl cursor-pointer"
            >
              {w.toUpperCase()} 🔊
            </button>
          ))}
        </div>
      </div>

      {/* PHONICS SOUND CHALLENGE QUIZ */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900 text-white rounded-4xl p-8 sm:p-12 border-4 border-amber-300 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-bounce">🎯</span>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading">
                Phonics Sound Challenge!
              </h3>
              <p className="text-xs text-purple-200 font-bold">
                Question {currentQuizIndex + 1} of {quizQuestions.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-400 text-amber-950 px-4 py-2 rounded-2xl text-xs font-black shadow-md">
            <Star className="w-4 h-4 fill-amber-950" />
            <span>Score: {quizScore} XP</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-black">
            <span>{quizQuestions[currentQuizIndex].emoji}</span>
            <span>"{quizQuestions[currentQuizIndex].prompt}"</span>
          </div>

          {quizFeedback && (
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl text-sm font-black text-amber-300 animate-wiggle">
              {quizFeedback}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3">
            {quizQuestions[currentQuizIndex].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleQuizAnswer(option)}
                className="p-6 bg-white/10 hover:bg-amber-400 hover:text-amber-950 text-white border-3 border-white/30 hover:border-white rounded-3xl text-3xl font-black font-mono transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg text-center"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
