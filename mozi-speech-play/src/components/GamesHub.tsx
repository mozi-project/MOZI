import React, { useState } from 'react';
import { NavigationPath } from '../types/index.ts';
import { soundManager } from '../utils/audio.ts';
import confetti from 'canvas-confetti';

interface GamesHubProps {
  onNavigate: (path: NavigationPath) => void;
  onEarnTokens: (amount: number) => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({ onNavigate, onEarnTokens }) => {
  const [activeMiniGame, setActiveMiniGame] = useState<'safari' | 'mirror' | null>(null);

  // Word Safari mini-game state
  const safariItems = [
    { word: 'Sun', emoji: '☀️', hasTarget: true },
    { word: 'Dog', emoji: '🐶', hasTarget: false },
    { word: 'Star', emoji: '⭐', hasTarget: true },
    { word: 'Cup', emoji: '🥤', hasTarget: false },
    { word: 'Soup', emoji: '🥣', hasTarget: true },
    { word: 'Cat', emoji: '🐱', hasTarget: false },
    { word: 'Snake', emoji: '🐍', hasTarget: true },
    { word: 'Car', emoji: '🚗', hasTarget: false }
  ];
  const [safariSelected, setSafariSelected] = useState<Record<string, boolean>>({});

  const handleSafariSelect = (item: typeof safariItems[0]) => {
    if (safariSelected[item.word]) return;

    soundManager.speak(item.word);
    if (item.hasTarget) {
      soundManager.playSnakeHiss();
      onEarnTokens(10);
      setSafariSelected(prev => ({ ...prev, [item.word]: true }));
      confetti({ particleCount: 20, spread: 40 });
    } else {
      soundManager.speak(`Oops! ${item.word} does not start with /S/. Try again!`);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header */}
      <div className="bg-[#FFFFFF] p-6 rounded-[4px] border-[1.5px] border-[#1F2A44] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-[#B42801]"></span>
            <span className="font-label-md text-xs uppercase tracking-wider text-[#006A67] font-bold">
              Speech Game Arcade
            </span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#0F1B34] mt-1">
            Joyful Speech Games
          </h2>
          <p className="font-body-md text-sm text-[#3D4948]">
            Clinically crafted games that transform repetitive articulation drills into magical play.
          </p>
        </div>

        <button
          onClick={() => onNavigate('playing-stage')}
          className="px-6 py-3 rounded-[4px] bg-[#B42801] hover:bg-[#8A1C00] text-white font-headline-md text-base border-[1.5px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44] active:translate-y-1 active:shadow-[0_1px_0_#1F2A44] flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">sports_esports</span>
          Play Sound Balloon Pop
        </button>
      </div>

      {/* Grid of 4 Games */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Game 1: Sound Balloon Pop (Featured) */}
        <div className="p-6 bg-[#E1E7FF] rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-[4px] bg-[#FF5D35] border-[1.5px] border-[#1F2A44] flex items-center justify-center text-3xl">
                🎈
              </div>
              <span className="px-3 py-1 rounded-[4px] bg-[#006A67] text-white font-label-md text-xs font-bold uppercase">
                Featured Live Game
              </span>
            </div>
            <h3 className="font-headline-md text-xl text-[#0F1B34]">Sound Balloon Pop</h3>
            <p className="font-body-md text-sm text-[#3D4948] mt-2">
              Practice phoneme bursts as floating balloons rise up! Speak target words into the microphone or tap to pop. Earn +10 Voice Tokens for each pop!
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-[#006A67]">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Target Sounds: /S/, /Z/, /SP/, /ST/, /SM/
            </div>
          </div>
          <div className="pt-6">
            <button
              onClick={() => onNavigate('playing-stage')}
              className="w-full py-3 rounded-[4px] bg-[#13A4A0] hover:bg-[#006A67] text-white font-headline-md text-base border-[1.5px] border-[#1F2A44] shadow-[0_3px_0_#1F2A44] active:translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              Launch Sound Balloon Pop
            </button>
          </div>
        </div>

        {/* Game 2: Sasa's Word Safari */}
        <div className="p-6 bg-[#FFFFFF] rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-[4px] bg-[#FFDF9D] border-[1.5px] border-[#1F2A44] flex items-center justify-center text-3xl">
                🐍
              </div>
              <span className="px-3 py-1 rounded-[4px] bg-[#E9EDFF] text-[#006A67] font-label-md text-xs font-bold uppercase border border-[#1F2A44]">
                Phoneme Safari
              </span>
            </div>
            <h3 className="font-headline-md text-xl text-[#0F1B34]">Sasa's S-Sound Safari</h3>
            <p className="font-body-md text-sm text-[#3D4948] mt-2">
              Help Sasa find all the hidden objects that start with the crisp snake hissing /S/ sound! Watch out for tricky distractors.
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-[#006A67]">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              Auditory Discrimination & Phonological Awareness
            </div>
          </div>
          <div className="pt-6">
            <button
              onClick={() => setActiveMiniGame(activeMiniGame === 'safari' ? null : 'safari')}
              className="w-full py-3 rounded-[4px] bg-[#FFDF9D] hover:bg-[#F7BE29] text-[#251A00] font-headline-md text-base border-[1.5px] border-[#1F2A44] shadow-[0_3px_0_#1F2A44] active:translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">travel_explore</span>
              {activeMiniGame === 'safari' ? 'Close Safari' : 'Explore Safari'}
            </button>
          </div>
        </div>

        {/* Game 3: Bubble Mouth Mirror */}
        <div className="p-6 bg-[#FFFFFF] rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-[4px] bg-[#7FF5F0] border-[1.5px] border-[#1F2A44] flex items-center justify-center text-3xl">
                🪞
              </div>
              <span className="px-3 py-1 rounded-[4px] bg-[#E9EDFF] text-[#006A67] font-label-md text-xs font-bold uppercase border border-[#1F2A44]">
                Biofeedback Tool
              </span>
            </div>
            <h3 className="font-headline-md text-xl text-[#0F1B34]">Bubble Mouth Mirror</h3>
            <p className="font-body-md text-sm text-[#3D4948] mt-2">
              Visual anatomical mirror showing exactly where the tongue sits behind the upper teeth to eliminate lisps and fronting.
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-[#006A67]">
              <span className="material-symbols-outlined text-[16px]">face</span>
              Visual Articulatory Feedback
            </div>
          </div>
          <div className="pt-6">
            <button
              onClick={() => setActiveMiniGame(activeMiniGame === 'mirror' ? null : 'mirror')}
              className="w-full py-3 rounded-[4px] bg-[#FAF8FF] hover:bg-[#E1E7FF] text-[#0F1B34] font-headline-md text-base border-[1.5px] border-[#1F2A44] shadow-[0_3px_0_#1F2A44] active:translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">visibility</span>
              {activeMiniGame === 'mirror' ? 'Close Mirror' : 'Open Mouth Mirror'}
            </button>
          </div>
        </div>

        {/* Game 4: Silly Snake Sing-Along */}
        <div className="p-6 bg-[#E1E7FF] rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-[4px] bg-[#FF5D35] border-[1.5px] border-[#1F2A44] flex items-center justify-center text-3xl">
                🎵
              </div>
              <span className="px-3 py-1 rounded-[4px] bg-[#006A67] text-white font-label-md text-xs font-bold uppercase">
                Musical Rhythm
              </span>
            </div>
            <h3 className="font-headline-md text-xl text-[#0F1B34]">The Silly Snake Sing-Along</h3>
            <p className="font-body-md text-sm text-[#3D4948] mt-2">
              Sing along with Sasa the Snake to rhythmically practice prolonged /s/ phoneme streams and melodic pitch control.
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-[#006A67]">
              <span className="material-symbols-outlined text-[16px]">music_note</span>
              Prosody & Vocal Control Drills
            </div>
          </div>
          <div className="pt-6">
            <button
              onClick={() => onNavigate('child-home')}
              className="w-full py-3 rounded-[4px] bg-[#FF5D35] hover:bg-[#B42801] text-white font-headline-md text-base border-[1.5px] border-[#1F2A44] shadow-[0_3px_0_#1F2A44] active:translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">music_note</span>
              Sing with Sasa
            </button>
          </div>
        </div>
      </div>

      {/* Mini-Game: Safari Interactive Modal / Panel */}
      {activeMiniGame === 'safari' && (
        <div className="p-6 bg-[#FFF4DC] border-[3px] border-[#1F2A44] rounded-[6px] shadow-[0_6px_0_#1F2A44] animate-in fade-in">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-headline-md text-xl text-[#0F1B34]">
              Find items that start with /S/! 🐍
            </h4>
            <span className="font-label-md text-xs bg-[#FFDF9D] px-2.5 py-1 rounded-[4px] border border-[#1F2A44]">
              Earn 10 Tokens per find
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {safariItems.map((item) => {
              const isFound = safariSelected[item.word];
              return (
                <button
                  key={item.word}
                  onClick={() => handleSafariSelect(item)}
                  className={`p-4 rounded-[6px] border-[2px] border-[#1F2A44] flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isFound
                      ? 'bg-[#13A4A0] text-white scale-102 shadow-[0_3px_0_#1F2A44]'
                      : 'bg-white text-[#0F1B34] hover:bg-[#FAF8FF]'
                  }`}
                >
                  <span className="text-4xl mb-1">{item.emoji}</span>
                  <span className="font-display text-lg">{item.word}</span>
                  {isFound && (
                    <span className="text-xs font-bold text-[#FFDF9D] mt-1 flex items-center gap-0.5">
                      ✓ S-Sound Found!
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mini-Game: Mouth Mirror Panel */}
      {activeMiniGame === 'mirror' && (
        <div className="p-6 bg-[#FAF8FF] border-[3px] border-[#1F2A44] rounded-[6px] shadow-[0_6px_0_#1F2A44] animate-in fade-in">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-headline-md text-xl text-[#0F1B34]">
              Mouth Position Anatomical Mirror
            </h4>
            <button
              onClick={() => setActiveMiniGame(null)}
              className="text-xs font-bold bg-[#E9EDFF] px-2 py-1 rounded-[4px] border border-[#1F2A44]"
            >
              Close
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2 p-6 bg-[#FFFFFF] rounded-[6px] border-[2px] border-[#1F2A44] text-center">
              <div className="text-6xl mb-3">😬</div>
              <div className="font-display text-2xl text-[#006A67]">Smiling Teeth Touch Lightly</div>
              <p className="font-body-md text-sm text-[#3D4948] mt-2">
                Keep the tongue hidden behind the front gate (teeth). Do not let the snake peek outside!
              </p>
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              <div className="p-3 bg-[#FFF4DC] rounded-[4px] border-[1.5px] border-[#1F2A44]">
                <strong className="text-[#006A67]">Airflow Check:</strong> Place your hand 2 inches in front of your mouth. When saying /S/, you should feel a cold, narrow stream of air on your fingers!
              </div>
              <div className="p-3 bg-[#E1E7FF] rounded-[4px] border-[1.5px] border-[#1F2A44]">
                <strong className="text-[#B42801]">Voicing Check:</strong> Touch your throat. The snake /S/ is silent (no throat vibration), while the bee /Z/ buzzes and vibrates your vocal cords!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
