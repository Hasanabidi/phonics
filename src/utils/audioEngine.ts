// Web Audio & Phoneme Synthesis Engine for Science of Reading (SoR)
// Generates unvoiced crisp phonemes without unwanted schwas ("uh") and coordinates blended word playback

class PhonicsAudioEngine {
  private ctx: AudioContext | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a gentle UI interaction chime
  public playTone(freq = 440, type: OscillatorType = 'sine', duration = 0.15, gainVal = 0.15) {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio context autoplay policy blocks prior to user gesture
    }
  }

  // Success chime for phonics rewards
  public playSuccessChime() {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.25, 0.2);
      }, idx * 100);
    });
  }

  // Gentle error / retry tone
  public playRetryTone() {
    this.playTone(280, 'sine', 0.2, 0.15);
    setTimeout(() => {
      this.playTone(220, 'sine', 0.25, 0.15);
    }, 120);
  }

  // Phonetic representation guide to prevent TTS schwa ("buh", "duh", "kuh")
  private getCleanPhoneticSpelling(phoneme: string): { speakText: string; rate: number; pitch: number } {
    const p = phoneme.toLowerCase().trim();

    // Mapping to force browser speech engines into pure unvoiced or clean phonemic articulations
    const phonemeMap: Record<string, { speakText: string; rate: number; pitch: number }> = {
      // Continuous unvoiced consonants (elongated fricatives prevent "uh")
      's': { speakText: 'ssss', rate: 1.1, pitch: 1.0 },
      'f': { speakText: 'ffff', rate: 1.1, pitch: 1.0 },
      'm': { speakText: 'mmmm', rate: 0.9, pitch: 1.0 },
      'n': { speakText: 'nnnn', rate: 0.9, pitch: 1.0 },
      'z': { speakText: 'zzzz', rate: 1.0, pitch: 1.0 },
      'v': { speakText: 'vvvv', rate: 1.0, pitch: 1.0 },
      'l': { speakText: 'lll', rate: 0.9, pitch: 1.0 },
      'r': { speakText: 'rrr', rate: 0.9, pitch: 0.95 },
      'h': { speakText: 'hhh', rate: 1.2, pitch: 1.0 },
      'sh': { speakText: 'shhh', rate: 1.1, pitch: 1.0 },
      'th': { speakText: 'th', rate: 1.1, pitch: 1.0 },
      'ch': { speakText: 'ch', rate: 1.2, pitch: 1.0 },
      'ng': { speakText: 'ng', rate: 0.9, pitch: 1.0 },

      // Crisp unvoiced stop consonants (fast rate cuts off schwa tail)
      't': { speakText: 't', rate: 1.4, pitch: 1.1 },
      'p': { speakText: 'p', rate: 1.4, pitch: 1.1 },
      'k': { speakText: 'k', rate: 1.4, pitch: 1.1 },
      'c': { speakText: 'k', rate: 1.4, pitch: 1.1 },
      'ck': { speakText: 'k', rate: 1.4, pitch: 1.1 },
      'd': { speakText: 'd', rate: 1.3, pitch: 1.0 },
      'b': { speakText: 'b', rate: 1.3, pitch: 1.0 },
      'g': { speakText: 'g', rate: 1.3, pitch: 1.0 },
      'j': { speakText: 'j', rate: 1.2, pitch: 1.0 },
      'w': { speakText: 'w', rate: 1.2, pitch: 1.0 },
      'qu': { speakText: 'kw', rate: 1.2, pitch: 1.0 },
      'x': { speakText: 'ks', rate: 1.2, pitch: 1.0 },
      'y': { speakText: 'y', rate: 1.1, pitch: 1.0 },

      // Pure short vowels
      'a': { speakText: 'ah', rate: 0.9, pitch: 1.15 },
      'e': { speakText: 'eh', rate: 0.9, pitch: 1.15 },
      'i': { speakText: 'ih', rate: 0.9, pitch: 1.15 },
      'o': { speakText: 'aw', rate: 0.9, pitch: 1.1 },
      'u': { speakText: 'uh', rate: 0.9, pitch: 1.1 },

      // Vowel teams & long vowels
      'ai': { speakText: 'ay', rate: 0.85, pitch: 1.1 },
      'ay': { speakText: 'ay', rate: 0.85, pitch: 1.1 },
      'ee': { speakText: 'ee', rate: 0.85, pitch: 1.15 },
      'ea': { speakText: 'ee', rate: 0.85, pitch: 1.15 },
      'igh': { speakText: 'eye', rate: 0.85, pitch: 1.1 },
      'oa': { speakText: 'oh', rate: 0.85, pitch: 1.1 },
      'ow': { speakText: 'ow', rate: 0.85, pitch: 1.1 },
      'oo': { speakText: 'oo', rate: 0.85, pitch: 1.1 },
      'ar': { speakText: 'ar', rate: 0.85, pitch: 1.0 },
      'or': { speakText: 'or', rate: 0.85, pitch: 1.0 },
      'ur': { speakText: 'er', rate: 0.85, pitch: 1.0 },
      'er': { speakText: 'er', rate: 0.85, pitch: 1.0 },
      'ir': { speakText: 'er', rate: 0.85, pitch: 1.0 },
      'oi': { speakText: 'oy', rate: 0.85, pitch: 1.1 },
      'oy': { speakText: 'oy', rate: 0.85, pitch: 1.1 }
    };

    return phonemeMap[p] || { speakText: p, rate: 0.9, pitch: 1.15 };
  }

  // Speaks an isolated pure phoneme
  public speakPhoneme(phoneme: string): Promise<void> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();
      const config = this.getCleanPhoneticSpelling(phoneme);
      const utterance = new SpeechSynthesisUtterance(config.speakText);
      utterance.rate = config.rate;
      utterance.pitch = config.pitch;

      // Select high quality English voice if available
      const voices = window.speechSynthesis.getVoices();
      const friendlyVoice = voices.find(v => 
        (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Jenny') || v.name.includes('Zira')))
      ) || voices.find(v => v.lang.startsWith('en'));

      if (friendlyVoice) {
        utterance.voice = friendlyVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      // Acoustic pop tone for stop consonants
      this.playTone(320, 'sine', 0.05, 0.05);

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    });
  }

  // Speaks a full blended word naturally
  public speakWord(word: string, rate = 0.85): Promise<void> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = rate;
      utterance.pitch = 1.15;

      const voices = window.speechSynthesis.getVoices();
      const friendlyVoice = voices.find(v => 
        (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Jenny')))
      ) || voices.find(v => v.lang.startsWith('en'));

      if (friendlyVoice) {
        utterance.voice = friendlyVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    });
  }

  // Sequential Blend: Tap-to-Blend / Slide-to-Blend
  // Plays phoneme 1 -> pause -> phoneme 2 -> pause -> phoneme 3 -> sweep chime -> whole word
  public async blendPhonemesSequence(
    phonemes: string[], 
    wholeWord: string,
    onActiveIndex?: (index: number | null) => void
  ): Promise<void> {
    for (let i = 0; i < phonemes.length; i++) {
      if (onActiveIndex) onActiveIndex(i);
      await this.speakPhoneme(phonemes[i]);
      await new Promise(r => setTimeout(r, 220));
    }

    if (onActiveIndex) onActiveIndex(null);
    await new Promise(r => setTimeout(r, 150));

    // Little blending sweep sound
    this.playTone(580, 'sine', 0.12, 0.1);
    await new Promise(r => setTimeout(r, 80));

    // Speak final unified word
    await this.speakWord(wholeWord);
  }

  public stopAll() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioEngine = new PhonicsAudioEngine();
