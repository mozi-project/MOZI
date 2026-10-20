// MOZI: Bubble Ocean - Complete Interactive Speech-Practice Game
// Single-source modular React 18 application with Web Audio API, Speech Synthesis & Recognition

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ==========================================
// 1. DATA: TARGET WORDS & STICKERS
// ==========================================
const TARGET_WORDS = [
  {
    id: 'word-fish',
    word: 'fish',
    displayWord: 'Fish',
    phonetics: 'f • ih • sh',
    hint: 'A cheerful swimmer with shiny fins!',
    category: 'Ocean Friends',
    iconType: 'fish',
    primaryColor: '#06b6d4',
    accentColor: '#67e8f9',
    funFact: 'Fish breathe underwater through gills!'
  },
  {
    id: 'word-sun',
    word: 'sun',
    displayWord: 'Sun',
    phonetics: 's • uh • n',
    hint: 'Warm, golden, and smiling high in the sky!',
    category: 'Sky & Nature',
    iconType: 'sun',
    primaryColor: '#f59e0b',
    accentColor: '#fde047',
    funFact: 'The sun gives light to all ocean plants!'
  },
  {
    id: 'word-moon',
    word: 'moon',
    displayWord: 'Moon',
    phonetics: 'm • oo • n',
    hint: 'A glowing crescent watching over the night!',
    category: 'Sky & Nature',
    iconType: 'moon',
    primaryColor: '#8b5cf6',
    accentColor: '#c4b5fd',
    funFact: 'The moon controls the gentle ocean tides!'
  },
  {
    id: 'word-ball',
    word: 'ball',
    displayWord: 'Ball',
    phonetics: 'b • aw • l',
    hint: 'Round, bouncy, and ready for beach games!',
    category: 'Playful Things',
    iconType: 'ball',
    primaryColor: '#ec4899',
    accentColor: '#f472b6',
    funFact: 'Dolphins love to bounce balls on their snouts!'
  },
  {
    id: 'word-cat',
    word: 'cat',
    displayWord: 'Cat',
    phonetics: 'k • ae • t',
    hint: 'A fluffy friend who purrs and says meow!',
    category: 'Animals',
    iconType: 'cat',
    primaryColor: '#f97316',
    accentColor: '#fdba74',
    funFact: 'Some big cats like fishing cats love to swim!'
  },
  {
    id: 'word-ship',
    word: 'ship',
    displayWord: 'Ship',
    phonetics: 'sh • ih • p',
    hint: 'A brave cruiser sailing over big blue waves!',
    category: 'Ocean Friends',
    iconType: 'ship',
    primaryColor: '#0284c7',
    accentColor: '#7dd3fc',
    funFact: 'Ships use lighthouses to steer safely at night!'
  },
  {
    id: 'word-star',
    word: 'star',
    displayWord: 'Star',
    phonetics: 's • t • ah • r',
    hint: 'A sparkling sea-star resting on the coral!',
    category: 'Ocean Friends',
    iconType: 'star',
    primaryColor: '#eab308',
    accentColor: '#fef08a',
    funFact: 'Sea stars do not have brains or blood!'
  },
  {
    id: 'word-boat',
    word: 'boat',
    displayWord: 'Boat',
    phonetics: 'b • oh • t',
    hint: 'A cute little sailboat drifting in the breeze!',
    category: 'Ocean Friends',
    iconType: 'boat',
    primaryColor: '#10b981',
    accentColor: '#6ee7b7',
    funFact: 'Sailboats use the wind to glide gracefully!'
  },
  {
    id: 'word-wave',
    word: 'wave',
    displayWord: 'Wave',
    phonetics: 'w • ey • v',
    hint: 'A turquoise splash rolling to the sandy beach!',
    category: 'Ocean Friends',
    iconType: 'wave',
    primaryColor: '#0ea5e9',
    accentColor: '#93c5fd',
    funFact: 'Ocean waves are caused by winds blowing over water!'
  },
  {
    id: 'word-clam',
    word: 'clam',
    displayWord: 'Clam',
    phonetics: 'k • l • ae • m',
    hint: 'A pretty shell holding a secret pearl!',
    category: 'Ocean Friends',
    iconType: 'clam',
    primaryColor: '#d946ef',
    accentColor: '#f0abfc',
    funFact: 'Clams can live to be over 100 years old!'
  },
  {
    id: 'word-crab',
    word: 'crab',
    displayWord: 'Crab',
    phonetics: 'k • r • ae • b',
    hint: 'Scuttles sideways and waves cute friendly claws!',
    category: 'Ocean Friends',
    iconType: 'crab',
    primaryColor: '#ef4444',
    accentColor: '#fca5a5',
    funFact: 'Crabs communicate by drumming their claws!'
  },
  {
    id: 'word-whale',
    word: 'whale',
    displayWord: 'Whale',
    phonetics: 'w • ey • l',
    hint: 'Our gentle hero Mozi spouting water high!',
    category: 'Ocean Friends',
    iconType: 'whale',
    primaryColor: '#3b82f6',
    accentColor: '#93c5fd',
    funFact: 'Whales sing beautiful lullabies under the sea!'
  }
];

const STICKERS_DATA = [
  {
    id: 'sticker-mozi',
    name: 'Mozi the Whale',
    title: 'Ocean Guide',
    requiredPearls: 0,
    emoji: '🐋',
    description: 'Always sings joyful songs and guides little speech adventurers!',
    soundTone: 'whale'
  },
  {
    id: 'sticker-sparky',
    name: 'Sparky the Dolphin',
    title: 'Cheer Leader',
    requiredPearls: 20,
    image: './assets/fish.jpg',
    emoji: '🐬',
    description: 'A cheerful pink dolphin with a purple bow who loves high-fives!',
    soundTone: 'dolphin'
  },
  {
    id: 'sticker-coralie',
    name: 'Coralie Star',
    title: 'Shining Guide',
    requiredPearls: 40,
    emoji: '⭐',
    description: 'Glows softly to light up underwater caverns with smiles.',
    soundTone: 'sparkle'
  },
  {
    id: 'sticker-barnaby',
    name: 'Barnaby Crab',
    title: 'Rhythm Master',
    requiredPearls: 60,
    emoji: '🦀',
    description: 'Clicks his claws to count out syllables and words!',
    soundTone: 'click'
  },
  {
    id: 'sticker-bubbles',
    name: 'Pip the Puffer',
    title: 'Bubble Crafter',
    requiredPearls: 80,
    emoji: '🐡',
    description: 'Puffs up big when practicing open vowel sounds: "Oooo!"',
    soundTone: 'puff'
  },
  {
    id: 'sticker-luna',
    name: 'Luna Jelly',
    title: 'Dream Swimmer',
    requiredPearls: 100,
    emoji: '🪼',
    description: 'Floats gently on ocean currents and hums soothing melodies.',
    soundTone: 'hum'
  },
  {
    id: 'sticker-shelly',
    name: 'Captain Shelly',
    title: 'Deep Explorer',
    requiredPearls: 130,
    emoji: '🐢',
    description: 'Wise sea turtle who reminds everyone to take deep, calm breaths.',
    soundTone: 'wise'
  },
  {
    id: 'sticker-pearl-crown',
    name: 'Pearl Empress',
    title: 'Master Speaker',
    requiredPearls: 160,
    emoji: '👑',
    description: 'The golden crown awarded to brave speech ocean explorers!',
    soundTone: 'fanfare'
  }
];

// ==========================================
// 2. PROCEDURAL WEB AUDIO SYNTHESIZER
// ==========================================
class SoundSynth {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  getContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playPop() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.06);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.14);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {}
  }

  playPearl() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [1046.5, 1318.5, 1567.98, 2093.0].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + idx * 0.05;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
      });
    } catch (e) {}
  }

  playCelebration() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const chord = [
        { f: 523.25, t: 0.0 },
        { f: 659.25, t: 0.09 },
        { f: 783.99, t: 0.18 },
        { f: 1046.5, t: 0.32 }
      ];
      chord.forEach(({ f, t }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + t);
        gain.gain.setValueAtTime(0.3, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + 0.46);
      });
    } catch (e) {}
  }

  playEncouragement() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [440, 554.37, 659.25].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + i * 0.1;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.36);
      });
    } catch (e) {}
  }

  playClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {}
  }

  playMicStart() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.11);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  playMicStop() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.09);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.11);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  speakWord(text, onEnd) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.rate = 0.84;
      utt.pitch = 1.2;
      utt.lang = 'en-US';
      const voices = window.speechSynthesis.getVoices();
      const friendlyVoice = voices.find(v => 
        (v.name.includes('Samantha') || v.name.includes('Google US English') || v.name.includes('Natural') || v.lang.startsWith('en')) &&
        !v.name.includes('Compact')
      );
      if (friendlyVoice) utt.voice = friendlyVoice;
      utt.onend = () => onEnd && onEnd();
      utt.onerror = () => onEnd && onEnd();
      window.speechSynthesis.speak(utt);
    } catch (e) {
      if (onEnd) onEnd();
    }
  }
}

const sounds = new SoundSynth();

// ==========================================
// 3. PRONUNCIATION & SIMILARITY HELPER
// ==========================================
function computeSimilarity(str1, str2) {
  const s1 = (str1 || '').trim().toLowerCase();
  const s2 = (str2 || '').trim().toLowerCase();
  if (s1 === s2) return 100;
  if (!s1 || !s2) return 0;
  if (s1.includes(s2) || s2.includes(s1)) {
    return Math.round((Math.min(s1.length, s2.length) / Math.max(s1.length, s2.length)) * 95);
  }
  const m = [];
  for (let i = 0; i <= s1.length; i++) m[i] = [i];
  for (let j = 0; j <= s2.length; j++) m[0][j] = j;
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      m[i][j] = s1[i - 1] === s2[j - 1]
        ? m[i - 1][j - 1]
        : Math.min(m[i - 1][j - 1] + 1, m[i][j - 1] + 1, m[i - 1][j] + 1);
    }
  }
  const dist = m[s1.length][s2.length];
  const maxL = Math.max(s1.length, s2.length);
  return Math.max(0, Math.round((1 - dist / maxL) * 100));
}

function evaluateAttempt(transcript, targetWord, isSimulated = false) {
  const cleanTranscript = (transcript || '').trim().toLowerCase();
  const cleanTarget = (targetWord || '').trim().toLowerCase();
  const isExact = cleanTranscript === cleanTarget;
  const similarity = isExact ? 100 : computeSimilarity(cleanTranscript, cleanTarget);

  let feedbackMessage = '';
  let feedbackLevel = 'encourage';
  let isMatch = false;

  // Exact or close match (threshold 65% for natural young children speech variation)
  if (isExact || similarity >= 65) {
    feedbackMessage = 'Amazing effort! You said the word!';
    feedbackLevel = 'excellent';
    isMatch = true;
  } else {
    feedbackMessage = "Lovely try! Let's say it together.";
    feedbackLevel = 'encourage';
    isMatch = false;
  }

  return {
    transcript,
    targetWord,
    similarity,
    isMatch,
    feedbackMessage,
    feedbackLevel,
    isSimulated
  };
}

// ==========================================
// 4. SVG ARTWORK COMPONENTS (Cute underwater elements)
// ==========================================
function WhaleIllustration({ excited = false, size = 180, className = "" }) {
  return (
    <div className={`relative inline-block transition-transform duration-500 ${excited ? 'animate-bounce' : 'animate-float-slow'} ${className}`} style={{ width: size, height: size * 0.75 }}>
      {/* Animated blowhole spout */}
      <div className={`absolute -top-6 left-1/3 flex flex-col items-center transition-opacity duration-300 ${excited ? 'opacity-100' : 'opacity-70'}`}>
        <div className="flex gap-1.5 animate-pulse">
          <span className="w-2.5 h-6 bg-cyan-200 rounded-full blur-[1px] -rotate-12 animate-bounce"></span>
          <span className="w-3 h-8 bg-sky-100 rounded-full blur-[0.5px] animate-bounce delay-100"></span>
          <span className="w-2.5 h-6 bg-cyan-200 rounded-full blur-[1px] rotate-12 animate-bounce delay-200"></span>
        </div>
        {excited && (
          <div className="text-pink-300 text-lg animate-ping absolute -top-4">💖</div>
        )}
      </div>

      <svg viewBox="0 0 240 180" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="whaleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="bellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
        </defs>

        {/* Tail */}
        <g className={excited ? "animate-wiggle origin-right" : ""}>
          <path d="M 45 95 C 25 80 10 65 5 50 C 18 68 35 78 45 85 Z" fill="#0284c7" />
          <path d="M 45 95 C 25 110 10 125 5 140 C 18 122 35 112 45 105 Z" fill="#0284c7" />
        </g>

        {/* Whale Body */}
        <path
          d="M 45 95 C 45 50 90 35 150 35 C 210 35 235 70 235 100 C 235 130 190 145 140 145 C 90 145 45 130 45 95 Z"
          fill="url(#whaleGrad)"
        />

        {/* White Belly */}
        <path
          d="M 90 120 C 130 145 180 145 220 115 C 215 135 180 145 140 145 C 105 145 85 135 90 120 Z"
          fill="url(#bellyGrad)"
        />

        {/* Cute eye */}
        <ellipse cx="190" cy="78" rx="7" ry="9" fill="#0f172a" />
        <ellipse cx="188" cy="75" rx="3.5" ry="4.5" fill="#ffffff" />
        <ellipse cx="192" cy="82" rx="1.5" ry="1.5" fill="#ffffff" />

        {/* Blushing cheek */}
        <ellipse cx="178" cy="94" rx="8" ry="5" fill="#f472b6" opacity="0.65" />

        {/* Smiling Mouth */}
        <path
          d={excited ? "M 195 95 Q 208 115 220 95" : "M 195 95 Q 210 108 220 98"}
          fill={excited ? "#f43f5e" : "none"}
          stroke="#0f172a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Flipper / Fin */}
        <path
          d="M 125 105 C 115 125 135 145 150 135 C 145 120 135 110 125 105 Z"
          fill="#38bdf8"
          stroke="#0284c7"
          strokeWidth="2"
          className="transition-transform duration-300 origin-top hover:rotate-12"
        />
      </svg>
    </div>
  );
}

function WordIcon({ type, size = 64 }) {
  switch (type) {
    case 'fish':
      return (
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          <path d="M 20 50 C 40 25 75 35 90 50 C 75 65 40 75 20 50 Z" fill="#06b6d4" />
          <path d="M 20 50 L 5 30 L 10 50 L 5 70 Z" fill="#22d3ee" />
          <path d="M 45 35 Q 55 45 45 65" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="75" cy="45" r="4" fill="#0f172a" />
          <circle cx="73" cy="43" r="1.5" fill="#ffffff" />
          <circle cx="68" cy="54" r="3.5" fill="#fda4af" opacity="0.8" />
        </svg>
      );
    case 'sun':
      return (
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          <circle cx="50" cy="50" r="28" fill="#facc15" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="50"
              y1="12"
              x2="50"
              y2="4"
              stroke="#f59e0b"
              strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
          <circle cx="42" cy="46" r="3.5" fill="#78350f" />
          <circle cx="58" cy="46" r="3.5" fill="#78350f" />
          <ellipse cx="36" cy="54" rx="3.5" ry="2" fill="#fb7185" />
          <ellipse cx="64" cy="54" rx="3.5" ry="2" fill="#fb7185" />
          <path d="M 44 56 Q 50 63 56 56" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'moon':
      return (
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          <path
            d="M 55 20 C 35 20 20 38 20 60 C 20 80 38 90 55 90 C 42 78 40 45 60 25 C 58 22 56 21 55 20 Z"
            fill="#a78bfa"
          />
          <circle cx="36" cy="52" r="3" fill="#312e81" />
          <circle cx="35" cy="51" r="1" fill="#ffffff" />
          <ellipse cx="32" cy="60" rx="3" ry="1.8" fill="#f472b6" />
          <path d="M 38 62 Q 43 66 46 60" stroke="#312e81" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <text x="65" y="40" fontSize="16" fill="#fef08a">✨</text>
        </svg>
      );
    case 'ball':
      return (
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          <circle cx="50" cy="50" r="36" fill="#ec4899" />
          <path d="M 50 14 C 30 25 30 75 50 86 C 40 70 40 30 50 14 Z" fill="#38bdf8" />
          <path d="M 50 14 C 70 25 70 75 50 86 C 60 70 60 30 50 14 Z" fill="#facc15" />
          <circle cx="50" cy="50" r="10" fill="#ffffff" />
        </svg>
      );
    case 'cat':
      return (
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          <circle cx="50" cy="55" r="28" fill="#fb923c" />
          <polygon points="26,35 34,18 44,32" fill="#ea580c" />
          <polygon points="74,35 66,18 56,32" fill="#ea580c" />
          <circle cx="40" cy="50" r="4" fill="#0f172a" />
          <circle cx="60" cy="50" r="4" fill="#0f172a" />
          <circle cx="38" cy="48" r="1.5" fill="#ffffff" />
          <circle cx="58" cy="48" r="1.5" fill="#ffffff" />
          <polygon points="50,56 47,53 53,53" fill="#f43f5e" />
          <path d="M 44 60 Q 50 64 50 58 Q 50 64 56 60" stroke="#0f172a" strokeWidth="2" fill="none" />
          <line x1="26" y1="53" x2="16" y2="50" stroke="#fed7aa" strokeWidth="2" />
          <line x1="26" y1="58" x2="16" y2="60" stroke="#fed7aa" strokeWidth="2" />
          <line x1="74" y1="53" x2="84" y2="50" stroke="#fed7aa" strokeWidth="2" />
          <line x1="74" y1="58" x2="84" y2="60" stroke="#fed7aa" strokeWidth="2" />
        </svg>
      );
    case 'ship':
      return (
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          <path d="M 18 64 L 82 64 L 72 82 L 28 82 Z" fill="#0284c7" />
          <rect x="25" y="58" width="50" height="6" fill="#f8fafc" rx="2" />
          <line x1="48" y1="20" x2="48" y2="58" stroke="#78350f" strokeWidth="4" />
          <path d="M 50 22 L 78 40 L 50 54 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <path d="M 46 26 L 24 44 L 46 54 Z" fill="#38bdf8" />
          <circle cx="50" cy="73" r="3.5" fill="#ffffff" />
          <circle cx="62" cy="73" r="3.5" fill="#ffffff" />
          <circle cx="38" cy="73" r="3.5" fill="#ffffff" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          <polygon
            points="50,15 61,38 86,40 67,58 73,83 50,70 27,83 33,58 14,40 39,38"
            fill="#facc15"
            stroke="#eab308"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="43" cy="48" r="3" fill="#78350f" />
          <circle cx="57" cy="48" r="3" fill="#78350f" />
          <path d="M 46 56 Q 50 60 54 56" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'boat':
      return (
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          <path d="M 20 62 L 80 62 L 70 78 L 30 78 Z" fill="#10b981" />
          <polygon points="50,22 50,56 75,56" fill="#fef08a" />
          <polygon points="46,30 46,56 28,56" fill="#6ee7b7" />
          <line x1="48" y1="20" x2="48" y2="58" stroke="#475569" strokeWidth="3" />
        </svg>
      );
    case 'wave':
      return (
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          <path
            d="M 10 70 Q 30 40 50 70 T 90 70 L 90 90 L 10 90 Z"
            fill="#0ea5e9"
          />
          <path
            d="M 10 60 Q 30 30 50 60 T 90 60 L 90 70 L 10 70 Z"
            fill="#7dd3fc"
            opacity="0.8"
          />
          <circle cx="40" cy="38" r="4" fill="#ffffff" opacity="0.9" />
          <circle cx="65" cy="44" r="3" fill="#ffffff" opacity="0.9" />
          <circle cx="28" cy="48" r="2.5" fill="#ffffff" opacity="0.9" />
        </svg>
      );
    case 'clam':
      return (
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          <path d="M 20 70 C 20 40 80 40 80 70 Z" fill="#d946ef" />
          <path d="M 20 70 C 20 90 80 90 80 70 Z" fill="#a21caf" />
          <circle cx="50" cy="65" r="11" fill="#f8fafc" stroke="#f1f5f9" strokeWidth="2" />
          <circle cx="47" cy="62" r="3" fill="#ffffff" />
        </svg>
      );
    case 'crab':
      return (
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          <ellipse cx="50" cy="60" rx="26" ry="18" fill="#ef4444" />
          <circle cx="40" cy="44" r="5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
          <circle cx="60" cy="44" r="5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
          <circle cx="40" cy="44" r="2.5" fill="#0f172a" />
          <circle cx="60" cy="44" r="2.5" fill="#0f172a" />
          <path d="M 24 55 Q 10 40 20 30 Q 30 40 26 50" fill="#dc2626" />
          <path d="M 76 55 Q 90 40 80 30 Q 70 40 74 50" fill="#dc2626" />
          <path d="M 44 65 Q 50 70 56 65" stroke="#7f1d1d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'whale':
    default:
      return <WhaleIllustration size={size} excited={false} />;
  }
}

// ==========================================
// 5. MAIN APPLICATION COMPONENT
// ==========================================
function MoziBubbleOceanApp() {
  // Screen state
  const [screen, setScreen] = useState('welcome'); // 'welcome' | 'game' | 'completion'

  // Modals state
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showStickerBook, setShowStickerBook] = useState(false);
  const [showEducatorPanel, setShowEducatorPanel] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Settings & Toggles
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Progress state (persisted)
  const [pearls, setPearls] = useState(() => {
    try {
      return parseInt(localStorage.getItem('mozi_pearls') || '0', 10);
    } catch (e) {
      return 0;
    }
  });

  const [unlockedStickers, setUnlockedStickers] = useState(() => {
    try {
      const saved = localStorage.getItem('mozi_unlocked_stickers');
      return saved ? JSON.parse(saved) : ['sticker-mozi'];
    } catch (e) {
      return ['sticker-mozi'];
    }
  });

  const [completedWordsCount, setCompletedWordsCount] = useState(() => {
    try {
      return parseInt(localStorage.getItem('mozi_words_practiced') || '0', 10);
    } catch (e) {
      return 0;
    }
  });

  const [roundsCount, setRoundsCount] = useState(() => {
    try {
      return parseInt(localStorage.getItem('mozi_rounds_count') || '0', 10);
    } catch (e) {
      return 0;
    }
  });

  // Active Game State
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [bubblePopped, setBubblePopped] = useState(false);
  const [whaleExcited, setWhaleExcited] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('Tap microphone to speak');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [feedbackResult, setFeedbackResult] = useState(null);
  const [flyingPearls, setFlyingPearls] = useState([]);
  const [newlyUnlockedSticker, setNewlyUnlockedSticker] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  const currentWord = TARGET_WORDS[currentWordIdx] || TARGET_WORDS[0];

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mozi_pearls', pearls.toString());
      localStorage.setItem('mozi_unlocked_stickers', JSON.stringify(unlockedStickers));
      localStorage.setItem('mozi_words_practiced', completedWordsCount.toString());
      localStorage.setItem('mozi_rounds_count', roundsCount.toString());
    } catch (e) {}
  }, [pearls, unlockedStickers, completedWordsCount, roundsCount]);

  // Check Sticker Unlock Milestones
  useEffect(() => {
    STICKERS_DATA.forEach(sticker => {
      if (!unlockedStickers.includes(sticker.id) && pearls >= sticker.requiredPearls) {
        setUnlockedStickers(prev => [...prev, sticker.id]);
        setNewlyUnlockedSticker(sticker);
        sounds.playCelebration();
      }
    });
  }, [pearls, unlockedStickers]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playClick();
  };

  const toggleDemoMode = () => {
    sounds.playClick();
    setDemoMode(prev => !prev);
  };

  // Launch Game
  const handleStartGame = () => {
    sounds.playClick();
    setCurrentWordIdx(0);
    setBubblePopped(false);
    setWhaleExcited(false);
    setFeedbackResult(null);
    setRecordedAudioUrl(null);
    setRecordingStatus('Tap microphone to speak');
    setScreen('game');

    // Friendly greeting speak
    setTimeout(() => {
      sounds.speakWord(TARGET_WORDS[0].word);
    }, 600);
  };

  // Speak Current Target Word
  const handleHearWord = () => {
    sounds.playClick();
    sounds.speakWord(currentWord.word);
  };

  // Trigger Bubble Pop Automatically upon speech match
  const triggerBubblePop = () => {
    if (bubblePopped) return;
    sounds.playPop();
    setBubblePopped(true);
    setWhaleExcited(true);

    // Trigger canvas confetti if loaded
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 55,
        spread: 75,
        origin: { y: 0.45 },
        colors: ['#38bdf8', '#f472b6', '#facc15', '#2dd4bf', '#ffffff']
      });
    }

    // Create flying pearls animation to counter
    const newPearls = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 100,
      y: window.innerHeight / 2 - 40 + (Math.random() - 0.5) * 60
    }));
    setFlyingPearls(newPearls);

    // Chimes
    setTimeout(() => sounds.playPearl(), 200);
    setTimeout(() => sounds.playPearl(), 420);

    // Award Pearls & increment stats
    const earned = 10;
    setPearls(p => p + earned);
    setCompletedWordsCount(c => c + 1);

    setTimeout(() => setWhaleExcited(false), 3500);
    setTimeout(() => setFlyingPearls([]), 1200);
  };

  // Start Speech Practice (Recording)
  const handleStartRecording = async () => {
    setFeedbackResult(null);
    setRecordedAudioUrl(null);
    audioChunksRef.current = [];
    setIsRecording(true);
    setRecordingStatus('Listening to your lovely voice... Say ' + currentWord.word.toUpperCase() + '!');
    sounds.playMicStart();

    // In Demo Mode, simulate clean match automatically after a brief listening delay
    if (demoMode) {
      setTimeout(() => {
        handleTriggerDemo('match');
      }, 1500);
      return;
    }

    // MediaRecorder for child audio replay
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mr = new MediaRecorder(stream);
        mr.ondataavailable = e => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };
        mr.start();
        mediaRecorderRef.current = mr;
      } catch (err) {
        console.warn('Microphone stream notice:', err);
      }
    }

    // SpeechRecognition for best-effort transcription
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        const recog = new SpeechRec();
        recog.lang = 'en-US';
        recog.interimResults = false;
        recog.maxAlternatives = 2;

        recog.onresult = event => {
          const transcript = event.results[0][0].transcript;
          const evaluation = evaluateAttempt(transcript, currentWord.word, false);
          setIsRecording(false);
          setFeedbackResult(evaluation);

          if (evaluation.isMatch) {
            setRecordingStatus('Great speaking! The bubble popped!');
            sounds.playCelebration();
            triggerBubblePop();
          } else {
            setRecordingStatus("Lovely try! Let's say it together.");
            sounds.playEncouragement();
          }
        };

        recog.onerror = event => {
          setIsRecording(false);
          if (event.error === 'not-allowed') {
            setRecordingStatus('Microphone permission blocked. Please allow mic or use Demo Mode!');
          } else {
            const evalRes = {
              transcript: '',
              targetWord: currentWord.word,
              similarity: 0,
              isMatch: false,
              feedbackMessage: "Lovely try! Let's say it together.",
              feedbackLevel: 'encourage'
            };
            setFeedbackResult(evalRes);
            setRecordingStatus("Lovely try! Let's say it together.");
            sounds.playEncouragement();
          }
        };

        recog.onend = () => {
          setIsRecording(false);
        };

        recog.start();
        recognitionRef.current = recog;
      } catch (e) {
        setIsRecording(false);
        setRecordingStatus('Could not start speech recognition. You can use Demo Mode!');
      }
    } else {
      // Speech recognition not supported in this browser: graceful fallback
      // Do NOT pretend the word was recognised!
      setTimeout(() => {
        setIsRecording(false);
        setRecordingStatus('Speech recognition is unavailable in this browser. You can listen back to your recording or use Demo Mode to test the scoring engine!');
      }, 1200);
    }
  };

  // Stop Recording
  const handleStopRecording = () => {
    setIsRecording(false);
    sounds.playMicStop();

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedAudioUrl(url);
      };
      mediaRecorderRef.current.stop();
    }
  };

  // Replay child's recorded voice
  const handleReplayVoice = () => {
    if (!recordedAudioUrl) return;
    sounds.playClick();
    const audio = new Audio(recordedAudioUrl);
    audio.play().catch(e => console.warn(e));
  };

  // Simulated Demo Trigger for College Presentation Panel
  const handleTriggerDemo = scenario => {
    setIsRecording(false);
    let evalRes;

    if (scenario === 'match') {
      evalRes = evaluateAttempt(currentWord.word, currentWord.word, true);
      evalRes.feedbackMessage = 'Amazing effort! You said the word!';
      setFeedbackResult(evalRes);
      setRecordingStatus('Great speaking! The bubble popped!');
      sounds.playCelebration();
      triggerBubblePop();
    } else {
      // Unsuccessful attempt simulation
      evalRes = {
        transcript: 'bloop',
        targetWord: currentWord.word,
        similarity: 20,
        isMatch: false,
        feedbackMessage: "Lovely try! Let's say it together.",
        feedbackLevel: 'encourage',
        isSimulated: true
      };
      setFeedbackResult(evalRes);
      setRecordingStatus("Lovely try! Let's say it together.");
      sounds.playEncouragement();
    }
  };

  // Continue to Next Word
  const handleNextWord = () => {
    sounds.playClick();
    if (currentWordIdx + 1 < TARGET_WORDS.length) {
      setCurrentWordIdx(i => i + 1);
      setBubblePopped(false);
      setWhaleExcited(false);
      setFeedbackResult(null);
      setRecordedAudioUrl(null);
      setRecordingStatus('Tap microphone to speak');

      const nextWordObj = TARGET_WORDS[currentWordIdx + 1];
      setTimeout(() => {
        sounds.speakWord(nextWordObj.word);
      }, 500);
    } else {
      // Completed all words in session!
      setRoundsCount(r => r + 1);
      setScreen('completion');
      sounds.playCelebration();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
      }
    }
  };

  // Reset Progress
  const handleResetProgress = () => {
    sounds.playClick();
    setPearls(0);
    setUnlockedStickers(['sticker-mozi']);
    setCompletedWordsCount(0);
    setRoundsCount(0);
    localStorage.removeItem('mozi_pearls');
    localStorage.removeItem('mozi_unlocked_stickers');
    localStorage.removeItem('mozi_words_practiced');
    localStorage.removeItem('mozi_rounds_count');
    setShowResetConfirm(false);
    setScreen('welcome');
  };

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden font-bubble selection:bg-cyan-200 selection:text-cyan-900 ${
        highContrast ? 'contrast-125' : ''
      }`}
      style={{
        backgroundImage: "url('./assets/seabg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Translucent water overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900/40 via-cyan-900/30 to-blue-950/70 pointer-events-none" />

      {/* Ambient floating bubbles stream */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full border border-white/40 bg-white/10 backdrop-blur-[1px] ${
              reducedMotion ? '' : 'animate-float-slow'
            }`}
            style={{
              width: `${16 + (i * 7) % 36}px`,
              height: `${16 + (i * 7) % 36}px`,
              left: `${(i * 7.5 + 4) % 96}%`,
              bottom: `${(i * 12 + 5) % 90}%`,
              animationDelay: `${(i * 0.7) % 5}s`,
              animationDuration: `${4 + (i % 5)}s`
            }}
          />
        ))}
      </div>

      {/* Floating Sparky the Pink Dolphin companion swimming across background */}
      <div
        className={`fixed top-24 pointer-events-none z-10 transition-transform duration-1000 ${
          reducedMotion ? 'left-8 opacity-40' : 'animate-swim-left opacity-80'
        }`}
        style={{ width: 140, height: 140 }}
      >
        <div className="relative group">
          <img
            src="./assets/fish.jpg"
            alt="Sparky the Dolphin"
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full shadow-lg border-2 border-pink-200/60 p-1 bg-white/20 backdrop-blur-sm"
          />
          <div className="absolute -bottom-2 -right-1 bg-pink-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
            Sparky 🐬
          </div>
        </div>
      </div>

      {/* Top Header Bar */}
      <header className="relative z-30 max-w-5xl mx-auto px-4 pt-4 pb-2 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div
          onClick={() => { sounds.playClick(); setScreen('welcome'); }}
          className="cursor-pointer flex items-center gap-2.5 bg-white/80 hover:bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-cyan-100 transition-all hover:scale-105 active:scale-95"
          role="button"
          tabIndex={0}
          aria-label="Return to MOZI home screen"
        >
          <span className="text-2xl animate-bounce">🐋</span>
          <div>
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-pink-500 bg-clip-text text-transparent leading-none">
              MOZI
            </div>
            <div className="text-[10px] font-semibold text-sky-700 tracking-wide">
              Bubble Ocean
            </div>
          </div>
        </div>

        {/* Status Counters & Control Pills */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Pearl Counter Pill */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 px-3.5 py-1.5 rounded-full shadow-md font-bold text-sm border border-yellow-200">
            <span className="text-base animate-pulse">✨</span>
            <span className="text-xs uppercase tracking-wider text-amber-900/80">Pearls:</span>
            <span className="text-base font-extrabold text-white drop-shadow-sm">{pearls}</span>
          </div>

          {/* Stickers Book Button */}
          <button
            onClick={() => { sounds.playClick(); setShowStickerBook(true); }}
            className="flex items-center gap-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-1.5 rounded-full shadow-sm font-semibold text-xs border border-pink-300 transition-all hover:scale-105"
            title="Open Sea Creature Stickers"
          >
            <span>🐬</span>
            <span>Stickers ({unlockedStickers.length}/8)</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full shadow-sm text-sm border transition-all hover:scale-110 ${
              soundEnabled
                ? 'bg-cyan-100 text-cyan-800 border-cyan-300'
                : 'bg-slate-200 text-slate-500 border-slate-300 line-through'
            }`}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Demo Mode Toggle */}
          <button
            onClick={toggleDemoMode}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border transition-all ${
              demoMode
                ? 'bg-amber-500 text-white border-amber-300 ring-2 ring-amber-300 animate-pulse'
                : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200'
            }`}
            title="Toggle Demo Presentation Mode for Panelists"
          >
            {demoMode ? '⚡ Demo Active' : '🎮 Demo Mode'}
          </button>

          {/* Educator / Judge Panel */}
          <button
            onClick={() => { sounds.playClick(); setShowEducatorPanel(true); }}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-full shadow font-semibold text-xs transition-all hover:scale-105"
            title="College Presentation / Educator Panel"
          >
            <span>🎓</span>
            <span>Presentation Info</span>
          </button>
        </div>
      </header>

      {/* Main Content Area: Screen Switcher */}
      <main className="relative z-20 max-w-4xl mx-auto px-4 py-4 min-h-[78vh] flex flex-col justify-center items-center">
        {screen === 'welcome' && (
          <WelcomeView
            onPlay={handleStartGame}
            onHowToPlay={() => { sounds.playClick(); setShowHowToPlay(true); }}
            onStickers={() => { sounds.playClick(); setShowStickerBook(true); }}
            onReset={() => { sounds.playClick(); setShowResetConfirm(true); }}
            pearls={pearls}
            wordsPracticed={completedWordsCount}
            demoMode={demoMode}
            onToggleDemo={toggleDemoMode}
          />
        )}

        {screen === 'game' && (
          <GameView
            currentWord={currentWord}
            wordIndex={currentWordIdx}
            totalWords={TARGET_WORDS.length}
            onHearWord={handleHearWord}
            onStartRecord={handleStartRecording}
            onStopRecord={handleStopRecording}
            isRecording={isRecording}
            recordingStatus={recordingStatus}
            feedbackResult={feedbackResult}
            recordedAudioUrl={recordedAudioUrl}
            onReplayVoice={handleReplayVoice}
            bubblePopped={bubblePopped}
            onNextWord={handleNextWord}
            whaleExcited={whaleExcited}
            demoMode={demoMode}
            onTriggerDemo={handleTriggerDemo}
            onBackToHome={() => { sounds.playClick(); setScreen('welcome'); }}
          />
        )}

        {screen === 'completion' && (
          <CompletionView
            pearls={pearls}
            wordsPracticed={completedWordsCount}
            roundsCompleted={roundsCount}
            unlockedStickers={unlockedStickers}
            onPlayAgain={handleStartGame}
            onHome={() => { sounds.playClick(); setScreen('welcome'); }}
            onOpenStickers={() => { sounds.playClick(); setShowStickerBook(true); }}
          />
        )}
      </main>

      {/* Flying Pearls Animation Overlay */}
      {flyingPearls.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {flyingPearls.map(p => (
            <div
              key={p.id}
              className="absolute text-2xl animate-ping transition-all duration-700 ease-out"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      {/* Milestone Sticker Unlocked Toast */}
      {newlyUnlockedSticker && (
        <div className="fixed bottom-6 right-6 z-50 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl border-4 border-pink-300 max-w-sm animate-bounce">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{newlyUnlockedSticker.emoji}</span>
            <div>
              <div className="text-xs font-bold text-pink-600 uppercase tracking-wide">
                🎉 New Sticker Unlocked!
              </div>
              <div className="font-extrabold text-slate-800 text-lg">
                {newlyUnlockedSticker.name}
              </div>
              <div className="text-xs text-slate-600">
                {newlyUnlockedSticker.description}
              </div>
            </div>
          </div>
          <button
            onClick={() => { sounds.playClick(); setNewlyUnlockedSticker(null); setShowStickerBook(true); }}
            className="mt-2.5 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-1.5 rounded-xl text-xs hover:opacity-90"
          >
            View in Sticker Album ➔
          </button>
        </div>
      )}

      {/* Modals */}
      {showHowToPlay && (
        <HowToPlayModal
          onClose={() => { sounds.playClick(); setShowHowToPlay(false); }}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          reducedMotion={reducedMotion}
          setReducedMotion={setReducedMotion}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
        />
      )}

      {showStickerBook && (
        <StickerBookModal
          onClose={() => { sounds.playClick(); setShowStickerBook(false); }}
          unlockedIds={unlockedStickers}
          totalPearls={pearls}
        />
      )}

      {showEducatorPanel && (
        <EducatorPanelModal
          onClose={() => { sounds.playClick(); setShowEducatorPanel(false); }}
          demoMode={demoMode}
          onToggleDemo={toggleDemoMode}
          currentWord={currentWord.word}
          onSimulate={handleTriggerDemo}
        />
      )}

      {showResetConfirm && (
        <ResetConfirmModal
          onConfirm={handleResetProgress}
          onCancel={() => { sounds.playClick(); setShowResetConfirm(false); }}
        />
      )}
    </div>
  );
}

// ==========================================
// 6. WELCOME SCREEN VIEW
// ==========================================
function WelcomeView({ onPlay, onHowToPlay, onStickers, onReset, pearls, wordsPracticed, demoMode, onToggleDemo }) {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center">
      {/* Friendly Mozi Animated Whale Hero */}
      <div className="mb-2">
        <WhaleIllustration size={220} excited={false} />
      </div>

      {/* Main Title Card */}
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-cyan-200/80 w-full mb-6 relative">
        <div className="inline-block bg-cyan-100 text-cyan-800 text-xs sm:text-sm font-extrabold px-4 py-1 rounded-full mb-2 uppercase tracking-widest shadow-inner">
          Speech Practice for Little Explorers
        </div>

        <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-sky-600 via-cyan-500 to-pink-500 bg-clip-text text-transparent pb-1">
          MOZI: Bubble Ocean
        </h1>

        <p className="text-base sm:text-lg font-bold text-sky-800 mt-1 mb-4">
          “Little Words, Big Waves!” 🌊
        </p>

        <p className="text-sm sm:text-base text-slate-600 font-medium mb-6 max-w-md mx-auto leading-relaxed">
          Ready to explore the magical ocean of sounds? Speak the words floating inside the sparkling bubbles, pop them with your voice, and collect pearls!
        </p>

        {/* Big Touch-Friendly Play Button */}
        <button
          onClick={onPlay}
          className="w-full sm:w-72 mx-auto py-4 px-8 rounded-full font-black text-xl text-white bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/60 flex items-center justify-center gap-3 animate-pulse"
        >
          <span className="text-2xl">🫧</span>
          <span>PLAY GAME</span>
          <span className="text-2xl">➔</span>
        </button>

        {/* Secondary Navigation Buttons */}
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            onClick={onHowToPlay}
            className="px-4 py-2 bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-sm rounded-2xl shadow-sm transition-all hover:scale-105"
          >
            ❓ How to Play
          </button>
          <button
            onClick={onStickers}
            className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-sm rounded-2xl shadow-sm transition-all hover:scale-105"
          >
            🐬 Sticker Album
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 font-bold text-sm rounded-2xl shadow-sm transition-all"
            title="Reset all pearls & progress"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Progress Recap Footer */}
      <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-white bg-sky-950/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-sky-400/30">
        <span className="flex items-center gap-1">
          <span>✨</span>
          <span>{pearls} Pearls Collected</span>
        </span>
        <span className="text-sky-300">•</span>
        <span className="flex items-center gap-1">
          <span>🎯</span>
          <span>{wordsPracticed} Words Practiced</span>
        </span>
        <span className="text-sky-300">•</span>
        <span
          onClick={onToggleDemo}
          className={`cursor-pointer px-2 py-0.5 rounded-full ${
            demoMode ? 'bg-amber-400 text-slate-900 font-extrabold' : 'hover:text-amber-200'
          }`}
        >
          {demoMode ? 'Demo Mode ON' : 'Demo Mode OFF'}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 7. GAMEPLAY SCREEN VIEW (Target word inside the bubble!)
// ==========================================
function GameView({
  currentWord,
  wordIndex,
  totalWords,
  onHearWord,
  onStartRecord,
  onStopRecord,
  isRecording,
  recordingStatus,
  feedbackResult,
  recordedAudioUrl,
  onReplayVoice,
  bubblePopped,
  onNextWord,
  whaleExcited,
  demoMode,
  onTriggerDemo,
  onBackToHome
}) {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      {/* Session Progress Header */}
      <div className="w-full bg-white/85 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md border border-cyan-100 mb-4 flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="text-xs font-bold text-slate-600 hover:text-sky-700 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
        >
          <span>⬅</span>
          <span>Home</span>
        </button>

        {/* Progress Bar & Word Counter */}
        <div className="flex-1 max-w-sm">
          <div className="flex justify-between text-xs font-extrabold text-sky-900 mb-1">
            <span>Word {wordIndex + 1} of {totalWords}</span>
            <span className="text-pink-600 font-black">{currentWord.category}</span>
          </div>
          <div className="w-full h-3 bg-sky-200/60 rounded-full overflow-hidden p-0.5 border border-sky-300/40">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-pink-400 rounded-full transition-all duration-500"
              style={{ width: `${((wordIndex + 1) / totalWords) * 100}%` }}
            />
          </div>
        </div>

        {/* Demo Indicator */}
        {demoMode && (
          <div className="bg-amber-100 text-amber-800 text-[11px] font-black px-2.5 py-1 rounded-xl border border-amber-300 animate-pulse">
            Demo Mode Active
          </div>
        )}
      </div>

      {/* Main Centerpiece: The Giant Floating Bubble with Target Word Inside! */}
      <div className="w-full flex flex-col items-center justify-center my-2 relative">
        {!bubblePopped ? (
          <div className="relative flex flex-col items-center">
            {/* The Translucent Floating Bubble */}
            <div
              className="w-64 h-64 sm:w-80 sm:h-80 rounded-full relative overflow-hidden flex flex-col items-center justify-center shadow-2xl border-4 border-white/80 animate-bubble-wobble"
              style={{
                backgroundImage: "url('./assets/bubble.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Iridescent shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-300/30 via-pink-200/20 to-white/40 rounded-full pointer-events-none" />

              {/* Sparkling inner pearls */}
              <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none opacity-60">
                <span className="text-2xl animate-pulse">✨</span>
                <span className="text-xl animate-bounce delay-150">🔮</span>
                <span className="text-2xl animate-pulse delay-300">✨</span>
              </div>

              {/* Centered Target Word & Illustration inside the bubble */}
              <div className="relative z-10 flex flex-col items-center text-center px-4">
                {/* Cute Icon */}
                <div className="drop-shadow-md transition-transform hover:scale-110">
                  <WordIcon type={currentWord.iconType} size={58} />
                </div>

                {/* Target Word in Large, Readable, Centered Bubbly Typography */}
                <h2 className="text-4xl sm:text-6xl font-black tracking-wider text-slate-900 drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)] my-1 select-none">
                  {currentWord.displayWord.toUpperCase()}
                </h2>

                {/* Phonetics syllable pill inside bubble */}
                <div className="text-xs sm:text-sm font-extrabold text-sky-900 bg-white/90 backdrop-blur-md px-3.5 py-0.5 rounded-full shadow-sm border border-cyan-100">
                  {currentWord.phonetics}
                </div>
              </div>
            </div>

            {/* Bubble subtitle prompt */}
            <div className="text-center mt-3 text-xs sm:text-sm font-bold text-white drop-shadow-md bg-sky-950/50 backdrop-blur-sm px-4 py-1.5 rounded-full">
              🎤 Say <span className="font-extrabold text-yellow-300">"{currentWord.displayWord.toUpperCase()}"</span> to pop this bubble!
            </div>
          </div>
        ) : (
          /* Automatically Popped Bubble Celebration State */
          <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-white/95 backdrop-blur-md border-4 border-amber-300 shadow-2xl flex flex-col items-center justify-center p-6 text-center animate-pop relative">
            <span className="text-5xl sm:text-6xl animate-bounce">🎉</span>
            <span className="text-amber-900 font-black text-2xl sm:text-3xl mt-1">POPPED!</span>
            <span className="text-emerald-700 font-extrabold text-base mt-1">+10 Pearls Collected! ✨</span>
            <span className="text-xs font-bold text-slate-600 mt-1">
              “{currentWord.displayWord}” spoke beautifully!
            </span>
          </div>
        )}
      </div>

      {/* Controls & Speech Feedback Zone */}
      <div className="w-full max-w-lg mt-3 flex flex-col items-center">
        {!bubblePopped ? (
          /* Speech Input Controls when Bubble is Floating */
          <div className="w-full bg-white/90 backdrop-blur-lg rounded-3xl p-5 shadow-xl border-4 border-cyan-200/90 flex flex-col items-center">
            {/* Listen button to model pronunciation */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={onHearWord}
                className="flex items-center gap-1.5 bg-sky-100 hover:bg-sky-200 text-sky-800 font-extrabold text-xs sm:text-sm px-4 py-2 rounded-full shadow-sm transition-all hover:scale-105 active:scale-95"
                title="Hear Mozi pronounce the target word"
              >
                <span>🔊</span>
                <span>Listen to “{currentWord.displayWord}”</span>
              </button>
            </div>

            {/* Microphone Button ("Your turn!") */}
            <div className="flex flex-col items-center my-1">
              {!isRecording ? (
                <button
                  onClick={onStartRecord}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 flex flex-col items-center justify-center border-4 border-white animate-pulse"
                  aria-label="Tap to speak"
                >
                  <span className="text-3xl">🎤</span>
                  <span className="text-[10px] font-black uppercase mt-0.5">Your turn!</span>
                </button>
              ) : (
                <button
                  onClick={onStopRecord}
                  className="w-20 h-20 rounded-full bg-rose-600 text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center border-4 border-rose-200 animate-bounce"
                  aria-label="Stop recording"
                >
                  <span className="text-2xl">⏹️</span>
                  <span className="text-[10px] font-black uppercase mt-0.5">Done!</span>
                </button>
              )}

              <p className="text-xs sm:text-sm font-bold text-slate-700 mt-2 text-center">
                {recordingStatus}
              </p>
            </div>

            {/* Pulsating Soundwave Simulation when Recording */}
            {isRecording && (
              <div className="flex justify-center items-center gap-1.5 h-8 my-1.5">
                {[12, 24, 16, 32, 20, 28, 14, 26, 18].map((h, i) => (
                  <span
                    key={i}
                    className="w-1.5 bg-pink-500 rounded-full animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '0.6s'
                    }}
                  />
                ))}
              </div>
            )}

            {/* Unsuccessful Attempt Feedback: Gentle message and retry actions */}
            {feedbackResult && !feedbackResult.isMatch && (
              <div className="w-full mt-3 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-center animate-fade-in">
                <div className="text-xl mb-0.5">💖</div>
                <div className="font-extrabold text-sm sm:text-base text-amber-950">
                  {feedbackResult.feedbackMessage}
                </div>
                {feedbackResult.transcript && (
                  <div className="text-xs text-slate-600 mt-1">
                    Captured: <span className="font-bold">“{feedbackResult.transcript}”</span>
                    {feedbackResult.isSimulated && <span className="italic text-amber-600 ml-1">(Demo)</span>}
                  </div>
                )}

                {/* Helpful Action Buttons for Retry */}
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  <button
                    onClick={onHearWord}
                    className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1"
                  >
                    <span>🔊</span>
                    <span>Listen Again</span>
                  </button>
                  <button
                    onClick={onStartRecord}
                    className="px-3.5 py-1.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1"
                  >
                    <span>🎤</span>
                    <span>Try Again</span>
                  </button>
                  {recordedAudioUrl && (
                    <button
                      onClick={onReplayVoice}
                      className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-xs rounded-xl transition flex items-center gap-1"
                    >
                      <span>🎧</span>
                      <span>Replay Voice</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Panelist Demo Simulation Bar */}
            {demoMode && (
              <div className="mt-3 pt-3 border-t border-slate-200 w-full flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Panelist Quick Demo Controls:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => onTriggerDemo('match')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-sm"
                  >
                    🎯 Simulate Success (Pops Bubble)
                  </button>
                  <button
                    onClick={() => onTriggerDemo('unsuccessful')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black shadow-sm"
                  >
                    💫 Simulate Unsuccessful (Gentle Retry)
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Reward & Continue to Next Word Bar when Bubble is Popped */
          <div className="w-full flex flex-col items-center">
            {/* Encouraging Success Feedback Card */}
            <div className="w-full bg-emerald-50/95 border-2 border-emerald-300 p-4 rounded-3xl text-center shadow-lg mb-3">
              <span className="text-2xl">🌟</span>
              <div className="font-extrabold text-base sm:text-lg text-emerald-900">
                {feedbackResult ? feedbackResult.feedbackMessage : 'Amazing effort! You said the word!'}
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-0.5">
                The magical bubble popped and released pearls to Mozi!
              </div>
            </div>

            {/* Continue Button to show the next floating bubble */}
            <button
              onClick={onNextWord}
              className="w-full sm:w-80 py-4 px-8 rounded-full font-black text-xl text-white bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 animate-pulse border-2 border-white/80"
            >
              <span>{wordIndex + 1 < totalWords ? 'Continue to Next Word' : 'See Celebration!'}</span>
              <span className="text-2xl">➔</span>
            </button>
          </div>
        )}

        {/* Happy Whale Companion Mascot */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <WhaleIllustration size={150} excited={whaleExcited} />
          {whaleExcited && (
            <div className="bg-pink-500 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg animate-bounce">
              Mozi collected +10 Pearls! 🌊✨
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. COMPLETION & CELEBRATION SCREEN
// ==========================================
function CompletionView({ pearls, wordsPracticed, roundsCompleted, unlockedStickers, onPlayAgain, onHome, onOpenStickers }) {
  return (
    <div className="w-full max-w-xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 text-center animate-float-medium">
      <div className="text-5xl sm:text-6xl mb-2 animate-bounce">🏆</div>

      <div className="inline-block bg-amber-100 text-amber-900 font-extrabold text-xs px-4 py-1 rounded-full uppercase tracking-wider mb-2">
        Ocean Explorer Certificate
      </div>

      <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-600 via-pink-500 to-amber-500 bg-clip-text text-transparent mb-2">
        Hooray! Fantastic Job!
      </h1>

      <p className="text-sm sm:text-base text-slate-700 font-medium mb-6">
        You spoke clearly, popped magical sound bubbles, and made big waves in Bubble Ocean!
      </p>

      {/* Mascot Celebration Pair */}
      <div className="flex justify-center items-center gap-4 my-4">
        <WhaleIllustration size={140} excited={true} />
        <div className="relative">
          <img
            src="./assets/fish.jpg"
            alt="Sparky the Dolphin"
            className="w-24 h-24 object-cover rounded-full shadow-lg border-2 border-pink-300"
          />
          <div className="absolute -bottom-1 -right-1 text-xl">💖</div>
        </div>
      </div>

      {/* Summary Score Cards */}
      <div className="grid grid-cols-3 gap-3 my-6">
        <div className="bg-sky-50 p-3 rounded-2xl border border-sky-200">
          <div className="text-2xl font-black text-sky-700">{wordsPracticed}</div>
          <div className="text-xs font-bold text-slate-600">Words Practiced</div>
        </div>
        <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
          <div className="text-2xl font-black text-amber-700">✨ {pearls}</div>
          <div className="text-xs font-bold text-slate-600">Total Pearls</div>
        </div>
        <div className="bg-pink-50 p-3 rounded-2xl border border-pink-200">
          <div className="text-2xl font-black text-pink-700">{unlockedStickers.length}/8</div>
          <div className="text-xs font-bold text-slate-600">Stickers Won</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
        <button
          onClick={onPlayAgain}
          className="py-3 px-6 rounded-full font-black text-base text-white bg-gradient-to-r from-pink-500 to-rose-400 hover:scale-105 active:scale-95 shadow-lg transition-all"
        >
          🔄 Play Again
        </button>
        <button
          onClick={onOpenStickers}
          className="py-3 px-6 rounded-full font-black text-base text-purple-800 bg-purple-100 hover:bg-purple-200 hover:scale-105 active:scale-95 shadow transition-all"
        >
          🐬 View Stickers
        </button>
        <button
          onClick={onHome}
          className="py-3 px-6 rounded-full font-bold text-base text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
        >
          🏠 Return Home
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 9. HOW TO PLAY & ACCESSIBILITY MODAL
// ==========================================
function HowToPlayModal({ onClose, highContrast, setHighContrast, reducedMotion, setReducedMotion, soundEnabled, toggleSound }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white/95 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-4 border-cyan-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h2 className="text-2xl font-black text-sky-900 flex items-center gap-2">
            <span>🌊</span>
            <span>How to Play</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* 3 Step Illustrated Guide */}
        <div className="my-5 flex flex-col gap-4">
          <div className="flex items-start gap-3 bg-sky-50 p-3.5 rounded-2xl border border-sky-200">
            <span className="text-3xl bg-white p-2 rounded-2xl shadow-sm">🔊</span>
            <div>
              <div className="font-extrabold text-sky-900 text-base">Step 1: Look & Listen</div>
              <div className="text-xs sm:text-sm text-slate-600">
                See the word inside the floating bubble! Tap the speaker button to hear Mozi say it clearly.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-pink-50 p-3.5 rounded-2xl border border-pink-200">
            <span className="text-3xl bg-white p-2 rounded-2xl shadow-sm">🎤</span>
            <div>
              <div className="font-extrabold text-pink-900 text-base">Step 2: Say the Word!</div>
              <div className="text-xs sm:text-sm text-slate-600">
                Tap the big microphone button and speak the word shown inside the bubble.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
            <span className="text-3xl bg-white p-2 rounded-2xl shadow-sm">🫧</span>
            <div>
              <div className="font-extrabold text-amber-900 text-base">Step 3: Pop Automatically & Collect Pearls!</div>
              <div className="text-xs sm:text-sm text-slate-600">
                When you say the word, the bubble automatically bursts with sparkles and pearls! If you need another try, Mozi will help you practice together.
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility & Controls Section */}
        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide mb-3">
            ♿ Accessibility & Controls
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
            <label className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={e => setHighContrast(e.target.checked)}
                className="w-4 h-4 text-cyan-600 rounded"
              />
              <span>High Contrast Mode</span>
            </label>

            <label className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={e => setReducedMotion(e.target.checked)}
                className="w-4 h-4 text-cyan-600 rounded"
              />
              <span>Reduced Motion</span>
            </label>

            <label className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={toggleSound}
                className="w-4 h-4 text-cyan-600 rounded"
              />
              <span>Sound Effects</span>
            </label>

            <div className="bg-slate-50 p-2.5 rounded-xl border text-slate-600 flex items-center gap-1.5">
              <span>⌨️</span>
              <span>Space / Enter to Record & Continue</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-extrabold rounded-2xl shadow hover:opacity-95"
        >
          Got it! Let’s Play ➔
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 10. STICKER BOOK MODAL
// ==========================================
function StickerBookModal({ onClose, unlockedIds, totalPearls }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white/95 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border-4 border-pink-300 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-black text-pink-700 flex items-center gap-2">
              <span>🐬</span>
              <span>Sea Creature Sticker Album</span>
            </h2>
            <p className="text-xs text-slate-600 font-bold">
              Collect pearls by practicing speech to unlock all ocean friends!
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Sticker Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          {STICKERS_DATA.map(stk => {
            const isUnlocked = unlockedIds.includes(stk.id);
            return (
              <div
                key={stk.id}
                onClick={() => {
                  if (isUnlocked) {
                    sounds.playCelebration();
                  }
                }}
                className={`p-3 rounded-2xl border-2 text-center transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-pink-50 to-purple-50 border-pink-300 shadow-md cursor-pointer hover:scale-105 active:scale-95'
                    : 'bg-slate-100 border-dashed border-slate-300 opacity-60'
                }`}
              >
                {/* Image or Emoji */}
                <div className="h-16 flex items-center justify-center">
                  {stk.image && isUnlocked ? (
                    <img
                      src={stk.image}
                      alt={stk.name}
                      className="w-14 h-14 object-cover rounded-full shadow border-2 border-pink-200"
                    />
                  ) : (
                    <span className={`text-4xl ${!isUnlocked ? 'filter grayscale blur-[0.5px]' : 'animate-bounce'}`}>
                      {isUnlocked ? stk.emoji : '🔒'}
                    </span>
                  )}
                </div>

                <div className="text-xs font-black text-slate-800 mt-2 truncate">
                  {isUnlocked ? stk.name : 'Secret Creature'}
                </div>

                <div className="text-[10px] text-slate-500 font-bold">
                  {isUnlocked ? stk.title : `${stk.requiredPearls} Pearls Needed`}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center text-xs font-bold text-slate-600 bg-pink-50 p-2.5 rounded-2xl border border-pink-100">
          Current Balance: <span className="text-amber-600 font-extrabold">{totalPearls} Pearls</span>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-extrabold rounded-2xl shadow"
        >
          Back to Ocean ➔
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 11. EDUCATOR & COLLEGE PRESENTATION PANEL
// ==========================================
function EducatorPanelModal({ onClose, demoMode, onToggleDemo, currentWord, onSimulate }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border-4 border-indigo-300 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
              College Project Demonstration
            </div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🎓</span>
              <span>Educator & Evaluation Panel</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="my-4 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Project Objective */}
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200">
            <h3 className="font-extrabold text-indigo-900 text-sm mb-1">
              1. Project Objective & Pedagogical Foundation
            </h3>
            <p>
              <strong>MOZI: Bubble Ocean</strong> is an interactive speech-practice prototype designed for early childhood speech sound development. In this updated architecture:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li><strong>Target Word in Bubble:</strong> The target word is embedded directly inside the floating translucent bubble, focusing the child's visual attention on a single interactive element.</li>
              <li><strong>Automated Speech Reward:</strong> Speaking the word matching the target closely pops the bubble automatically, creating an immediate dopamine-rich acoustic & visual reward loop.</li>
              <li><strong>Gentle Non-Punitive Feedback:</strong> When speech does not yet match, the bubble remains floating with "Lovely try! Let's say it together" and TTS auditory modeling to encourage repeat practice without frustration.</li>
            </ul>
          </div>

          {/* Technical Architecture */}
          <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200">
            <h3 className="font-extrabold text-sky-900 text-sm mb-1">
              2. Technical Architecture & In-Browser Speech Stack
            </h3>
            <ul className="list-disc pl-5 space-y-0.5">
              <li><strong>Frontend:</strong> React 18, Tailwind CSS, responsive single-center bubble layout.</li>
              <li><strong>Audio Synthesis:</strong> Web Audio API oscillators (100% offline, procedural sound effects).</li>
              <li><strong>Speech Recognition:</strong> W3C <code>SpeechRecognition</code> / <code>webkitSpeechRecognition</code> with case-insensitive matching & Levenshtein string distance similarity.</li>
              <li><strong>Fallback:</strong> Graceful fallback notification when speech recognition is absent, offering voice recording replay and Demo Mode simulator.</li>
            </ul>
          </div>

          {/* Clinical Ethics & Limitations */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
            <h3 className="font-extrabold text-amber-900 text-sm mb-1">
              3. Clinical Disclaimer & Ethical Boundaries
            </h3>
            <p className="text-amber-900">
              <strong>Notice:</strong> Browser-based transcription is an educational prototype demonstration. It does <em>not</em> provide clinical diagnostic assessment or phoneme-level acoustic formant analysis. Feedback states are intentionally kept encouraging to foster confidence and prevent speech anxiety in young children.
            </p>
          </div>

          {/* Panelist Testing Suite */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-slate-900 text-sm">
                4. Live Evaluation Controller (Demo Mode)
              </h3>
              <button
                onClick={onToggleDemo}
                className={`px-3 py-1 rounded-full text-xs font-black transition ${
                  demoMode ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {demoMode ? 'Demo Mode Active' : 'Enable Demo Mode'}
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Test both successful and unsuccessful speech attempts on <strong>{currentWord.toUpperCase()}</strong> without needing a physical microphone:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { onSimulate('match'); onClose(); }}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow"
              >
                🎯 Simulate Success (Pops Bubble)
              </button>
              <button
                onClick={() => { onSimulate('unsuccessful'); onClose(); }}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black shadow"
              >
                💫 Simulate Unsuccessful (Gentle Retry)
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow"
        >
          Close Panel ➔
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 12. RESET PROGRESS CONFIRMATION MODAL
// ==========================================
function ResetConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-rose-300 text-center">
        <div className="text-4xl mb-2">🔄</div>
        <h3 className="text-xl font-black text-slate-800">Reset All Progress?</h3>
        <p className="text-xs text-slate-600 my-2">
          This will reset your collected pearls, words practiced, and unlocked stickers. Are you sure?
        </p>
        <div className="flex gap-2 justify-center mt-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs shadow"
          >
            Yes, Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 13. BOOTSTRAP REACT APPLICATION
// ==========================================
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<MoziBubbleOceanApp />);
}
