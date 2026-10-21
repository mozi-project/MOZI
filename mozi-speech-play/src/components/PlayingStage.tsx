import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio.ts';
import { MoziBunny, SasaSnake } from './Characters.tsx';

interface PlayingStageProps {
  onEarnTokens: (amount: number) => void;
  equippedHat: string;
  onBalloonPopped: () => void;
}

interface BalloonItem {
  id: number;
  word: string;
  phoneme: string;
  emoji: string;
  color: string;
  textColor: string;
  x: number;
  y: number;
  speed: number;
  popped: boolean;
}

export const PlayingStage: React.FC<PlayingStageProps> = ({
  onEarnTokens,
  equippedHat,
  onBalloonPopped
}) => {
  const [score, setScore] = useState(0);
  const [poppedCount, setPoppedCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0.2);
  const [targetSet, setTargetSet] = useState<'initial-s' | 'blends-s' | 'z-sounds'>('initial-s');
  const [sasaCheer, setSasaCheer] = useState<string>("Pop the /S/ balloons!");
  const [gameActive, setGameActive] = useState(true);

  const wordPools = {
    'initial-s': [
      { word: 'Sun', emoji: '☀️', phoneme: '/s/' },
      { word: 'Soup', emoji: '🥣', phoneme: '/s/' },
      { word: 'Star', emoji: '⭐', phoneme: '/s/' },
      { word: 'Sail', emoji: '⛵', phoneme: '/s/' },
      { word: 'Sand', emoji: '🏖️', phoneme: '/s/' },
      { word: 'Sock', emoji: '🧦', phoneme: '/s/' },
      { word: 'Seven', emoji: '7️⃣', phoneme: '/s/' },
      { word: 'Seal', emoji: '🦭', phoneme: '/s/' }
    ],
    'blends-s': [
      { word: 'Snake', emoji: '🐍', phoneme: '/sn/' },
      { word: 'Spoon', emoji: '🥄', phoneme: '/sp/' },
      { word: 'Spider', emoji: '🕷️', phoneme: '/sp/' },
      { word: 'Smile', emoji: '😊', phoneme: '/sm/' },
      { word: 'Swing', emoji: '🎪', phoneme: '/sw/' },
      { word: 'Skate', emoji: '⛸️', phoneme: '/sk/' }
    ],
    'z-sounds': [
      { word: 'Zip', emoji: '⚡', phoneme: '/z/' },
      { word: 'Zebra', emoji: '🦓', phoneme: '/z/' },
      { word: 'Zoo', emoji: '🦁', phoneme: '/z/' },
      { word: 'Zero', emoji: '0️⃣', phoneme: '/z/' },
      { word: 'Buzz', emoji: '🐝', phoneme: '/z/' },
      { word: 'Prize', emoji: '🏆', phoneme: '/z/' }
    ]
  };

  const balloonColors = [
    { bg: '#FF5D35', text: '#FFFFFF' }, // tomato
    { bg: '#13A4A0', text: '#FFFFFF' }, // teal
    { bg: '#FFDF9D', text: '#1F2A44' }, // sunny yellow
    { bg: '#7FF5F0', text: '#003231' }, // cyan
    { bg: '#6CC24A', text: '#FFFFFF' }, // leaf green
    { bg: '#B42801', text: '#FFFFFF' }  // dark red
  ];

  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  // Initialize Balloons
  useEffect(() => {
    const initialBalloons: BalloonItem[] = [];
    const pool = wordPools[targetSet];
    for (let i = 0; i < 5; i++) {
      const item = pool[i % pool.length];
      const colorScheme = balloonColors[i % balloonColors.length];
      initialBalloons.push({
        id: nextId.current++,
        word: item.word,
        phoneme: item.phoneme,
        emoji: item.emoji,
        color: colorScheme.bg,
        textColor: colorScheme.text,
        x: 10 + i * 18,
        y: 60 + (i % 2) * 20,
        speed: 0.15 + Math.random() * 0.15,
        popped: false
      });
    }
    setBalloons(initialBalloons);
  }, [targetSet]);

  // Floating animation loop
  useEffect(() => {
    if (!gameActive) return;
    const interval = setInterval(() => {
      setBalloons((prev) =>
        prev.map((b) => {
          if (b.popped) return b;
          let newY = b.y - b.speed;
          if (newY < -15) {
            // Respawn from bottom
            const pool = wordPools[targetSet];
            const randomItem = pool[Math.floor(Math.random() * pool.length)];
            const colorScheme = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            return {
              ...b,
              y: 105,
              x: 8 + Math.random() * 75,
              word: randomItem.word,
              phoneme: randomItem.phoneme,
              emoji: randomItem.emoji,
              color: colorScheme.bg,
              textColor: colorScheme.text,
              speed: 0.18 + Math.random() * 0.15,
              popped: false
            };
          }
          return { ...b, y: newY };
        })
      );
    }, 40);

    return () => clearInterval(interval);
  }, [gameActive, targetSet]);

  // Handle popping a balloon
  const handlePop = (balloon: BalloonItem, event?: React.MouseEvent) => {
    if (balloon.popped) return;

    soundManager.playPop();
    soundManager.speak(balloon.word);
    onEarnTokens(10);
    onBalloonPopped();

    // Visual confetti
    const rect = (event?.currentTarget as HTMLElement)?.getBoundingClientRect();
    const originX = rect ? rect.left / window.innerWidth : 0.5;
    const originY = rect ? rect.top / window.innerHeight : 0.5;
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { x: originX, y: originY }
    });

    setScore((s) => s + 100);
    setPoppedCount((c) => c + 1);
    setStreak((str) => str + 1);

    const cheers = [
      `Sss-super! ${balloon.word}!`,
      `Awesome /S/ sound!`,
      `Pop! Pop! You rock, Aarav!`,
      `Crisp articulation! +10 Tokens!`,
      `Sasa is dancing!`
    ];
    setSasaCheer(cheers[Math.floor(Math.random() * cheers.length)]);

    setBalloons((prev) =>
      prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b))
    );

    // Respawn after short delay
    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((b) => {
          if (b.id !== balloon.id) return b;
          const pool = wordPools[targetSet];
          const randomItem = pool[Math.floor(Math.random() * pool.length)];
          const colorScheme = balloonColors[Math.floor(Math.random() * balloonColors.length)];
          return {
            ...b,
            y: 105,
            x: 8 + Math.random() * 75,
            word: randomItem.word,
            phoneme: randomItem.phoneme,
            emoji: randomItem.emoji,
            color: colorScheme.bg,
            textColor: colorScheme.text,
            speed: 0.2 + Math.random() * 0.15,
            popped: false
          };
        })
      );
    }, 800);
  };

  // Toggle Microphone / Voice Detection
  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      soundManager.playSnakeHiss();
      setSasaCheer("Say 'Sss-Sun' into your mic!");
      // Simulate real-time audio visualization
      const anim = setInterval(() => {
        setAudioLevel(0.1 + Math.random() * 0.85);
      }, 100);
      (window as unknown as { _visInterval?: NodeJS.Timeout })._visInterval = anim;
    } else {
      setIsListening(false);
      clearInterval((window as unknown as { _visInterval?: NodeJS.Timeout })._visInterval);
      setAudioLevel(0.2);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Game Stage Header */}
      <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-[4px] border-[1.5px] border-[#1F2A44] mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-[#13A4A0]"></span>
            <span className="font-label-md text-xs uppercase tracking-wider text-[#006A67] font-bold">
              Playing Stage
            </span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#0F1B34] mt-1">
            Sound Balloon Pop
          </h2>
          <p className="font-body-md text-sm text-[#3D4948]">
            Hiss your snake sounds or tap balloons to pop the target words!
          </p>
        </div>

        {/* Stats Chips */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="px-3 py-1.5 rounded-[4px] bg-[#FFF4DC] border-[1.5px] border-[#1F2A44] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#FF5D35]">bubble_chart</span>
            <span className="font-headline-sm text-sm text-[#0F1B34]">{poppedCount} Popped</span>
          </div>

          <div className="px-3 py-1.5 rounded-[4px] bg-[#FFDF9D] border-[1.5px] border-[#1F2A44] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#785900]">local_fire_department</span>
            <span className="font-headline-sm text-sm text-[#251A00]">{streak}x Combo</span>
          </div>

          <div className="px-3 py-1.5 rounded-[4px] bg-[#E1E7FF] border-[1.5px] border-[#1F2A44] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#006A67]">stars</span>
            <span className="font-headline-sm text-sm text-[#0F1B34]">{score} Pts</span>
          </div>
        </div>
      </div>

      {/* Target Phoneme Filter Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-[#FFF4DC] p-2.5 rounded-[4px] border-[1.5px] border-[#1F2A44]">
        <div className="flex items-center gap-2">
          <span className="font-label-md text-xs sm:text-sm font-bold text-[#0F1B34]">Phoneme Target:</span>
          <div className="flex items-center gap-1.5">
            {[
              { id: 'initial-s', label: 'Initial /S/' },
              { id: 'blends-s', label: '/S/ Blends (Sn, Sp, Sm)' },
              { id: 'z-sounds', label: 'Voiced /Z/' }
            ].map((set) => (
              <button
                key={set.id}
                onClick={() => setTargetSet(set.id as typeof targetSet)}
                className={`px-2.5 py-1 rounded-[4px] text-xs font-bold border-[1.5px] border-[#1F2A44] cursor-pointer transition-colors ${
                  targetSet === set.id
                    ? 'bg-[#006A67] text-white'
                    : 'bg-[#FFFFFF] text-[#0F1B34] hover:bg-[#E9EDFF]'
                }`}
              >
                {set.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mic Speech Button */}
        <button
          onClick={toggleListening}
          className={`px-3 py-1.5 rounded-[4px] border-[1.5px] border-[#1F2A44] font-label-md text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-none transition-transform active:scale-95 ${
            isListening ? 'bg-[#FF5D35] text-white animate-pulse' : 'bg-[#FFFFFF] text-[#0F1B34] hover:bg-[#FAF8FF]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isListening ? 'mic' : 'mic_off'}
          </span>
          {isListening ? 'Listening for /S/...' : 'Enable Speech Mic'}
        </button>
      </div>

      {/* Interactive Balloon Canvas Arena */}
      <div
        ref={containerRef}
        className="relative w-full h-[460px] sm:h-[500px] bg-gradient-to-b from-[#E1E7FF] to-[#FAF8FF] rounded-[6px] border-[3px] border-[#1F2A44] overflow-hidden shadow-[0_4px_0_#1F2A44]"
      >
        {/* Floating Clouds Background Vector */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-6 left-12 w-28 h-10 bg-white rounded-full border border-[#1F2A44]"></div>
          <div className="absolute top-16 right-20 w-36 h-12 bg-white rounded-full border border-[#1F2A44]"></div>
          <div className="absolute top-36 left-1/3 w-32 h-10 bg-white rounded-full border border-[#1F2A44]"></div>
        </div>

        {/* Active Balloons Floating */}
        {balloons.map((b) => {
          if (b.popped) {
            return (
              <div
                key={b.id}
                style={{ left: `${b.x}%`, top: `${b.y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-3xl font-extrabold text-[#B42801] animate-ping"
              >
                💥 POP!
              </div>
            );
          }

          return (
            <div
              key={b.id}
              onClick={(e) => handlePop(b, e)}
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                backgroundColor: b.color,
                color: b.textColor
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none group transition-transform hover:scale-110 active:scale-90"
            >
              {/* Balloon Oval Body */}
              <div className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] border-[2.5px] border-[#1F2A44] flex flex-col items-center justify-center p-2 shadow-[0_3px_0_#1F2A44]">
                {/* Shiny Highlight */}
                <div className="absolute top-3 left-4 w-4 h-6 rounded-full bg-white/40 transform -rotate-25"></div>

                {/* Content Inside Balloon */}
                <span className="text-3xl sm:text-4xl">{b.emoji}</span>
                <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight mt-0.5 leading-none">
                  {b.word}
                </span>
                <span className="font-label-md text-xs font-mono opacity-90">
                  {b.phoneme}
                </span>

                {/* Balloon Tie Knot */}
                <div
                  style={{ borderTopColor: b.color }}
                  className="absolute -bottom-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px]"
                ></div>

                {/* String */}
                <div className="absolute top-full w-[1.5px] h-8 bg-[#1F2A44]"></div>
              </div>
            </div>
          );
        })}

        {/* Mascot Cheering Sidebar on the Stage Floor */}
        <div className="absolute bottom-2 left-4 right-4 flex items-end justify-between pointer-events-none">
          <div className="flex items-end gap-2">
            <SasaSnake className="w-16 h-24 sm:w-20 sm:h-32" />
            <div className="bg-[#FFFFFF] px-3 py-1.5 rounded-[4px] border-[1.5px] border-[#1F2A44] mb-3 shadow-[0_2px_0_#1F2A44] pointer-events-auto">
              <span className="font-label-md text-xs sm:text-sm text-[#0F1B34] font-extrabold">
                {sasaCheer}
              </span>
            </div>
          </div>

          <div className="flex items-end">
            <MoziBunny equippedHat={equippedHat} className="w-24 h-24 sm:w-32 sm:h-32" />
          </div>
        </div>
      </div>

      {/* Tactile Audio Waveform & Speech Visualizer Box (As specified in Image_3_ca0e314f.markdown) */}
      <div className="mt-4 p-4 bg-[#FFFFFF] rounded-[4px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#006A67]">graphic_eq</span>
            <span className="font-label-md text-sm text-[#0F1B34] font-bold">
              Voice Articulation Monitor
            </span>
          </div>
          <span className="text-xs text-[#3D4948] font-medium">
            {isListening ? 'Hiss detection active' : 'Click microphone or tap balloons to practice'}
          </span>
        </div>

        {/* Waveform track with alternating teal (#13A4A0) and tomato red (#FF5D35) rounded pill bars */}
        <div className="h-16 bg-[#FFF4DC] rounded-[4px] border-[1.5px] border-[#1F2A44] flex items-center justify-center gap-1.5 px-4 overflow-hidden">
          {Array.from({ length: 28 }).map((_, idx) => {
            const isTeal = idx % 2 === 0;
            const barColor = isTeal ? '#13A4A0' : '#FF5D35';
            const baseHeight = 12;
            const dynamicScale = isListening ? Math.sin(idx * 0.4 + Date.now() * 0.005) * audioLevel : 0.2;
            const height = Math.max(8, Math.min(52, baseHeight + dynamicScale * 40));

            return (
              <div
                key={idx}
                style={{
                  height: `${height}px`,
                  backgroundColor: barColor
                }}
                className="w-2 sm:w-2.5 rounded-full border-[1px] border-[#1F2A44] transition-all duration-75"
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
