import React, { useState } from 'react';
import { soundManager } from '../utils/audio.ts';

export const PracticeSheets: React.FC = () => {
  const [selectedSheet, setSelectedSheet] = useState<number>(0);

  const sheets = [
    {
      id: 0,
      title: "Sasa's /S/ Snake Maze & Coloring Board",
      category: "Articulatory Trace & Color",
      difficulty: "Beginner",
      description: "Follow Sasa along the winding path while hissing 'sssss'. Color in the /S/ discovery items!",
      words: ["Sun", "Star", "Soup", "Sail", "Sand", "Spoon"]
    },
    {
      id: 1,
      title: "Visual Mouth & Tongue Placement Guide",
      category: "Clinician Diagram",
      difficulty: "Foundational",
      description: "Anatomical poster demonstrating alveolar ridge tongue positioning, lip retraction, and dental occlusion.",
      words: ["Smile", "Teeth", "Tongue", "Airflow"]
    },
    {
      id: 2,
      title: "Snake /S/ vs Bee /Z/ Vocal Cord Contrast",
      category: "Voicing Discrimination",
      difficulty: "Intermediate",
      description: "Tactile throat-touch exercises comparing unvoiced alveolar fricative /s/ and voiced alveolar fricative /z/.",
      words: ["Zip", "Buzz", "Zoo", "Zebra", "Sun", "Soup"]
    },
    {
      id: 3,
      title: "12 Cut-Out Pocket Articulation Flashcards",
      category: "Home Practice Cards",
      difficulty: "All Levels",
      description: "Printable 3x4 card grid for daily backpack drills, dinner table games, and phoneme flash challenges.",
      words: ["Sun", "Soup", "Star", "Sail", "Sock", "Seven", "Snake", "Spider", "Spoon", "Zip", "Zebra", "Buzz"]
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header */}
      <div className="bg-[#FFFFFF] p-6 rounded-[4px] border-[1.5px] border-[#1F2A44] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-[#13A4A0]"></span>
            <span className="font-label-md text-xs uppercase tracking-wider text-[#006A67] font-bold">
              Printable Learning Lab
            </span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#0F1B34] mt-1">
            Practice Sheets &amp; Guides
          </h2>
          <p className="font-body-md text-sm text-[#3D4948]">
            Print physical coloring boards, mouth anatomy charts, and flashcards for offline play.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-6 py-3 rounded-[4px] bg-[#006A67] hover:bg-[#00504E] text-white font-headline-md text-base border-[1.5px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44] active:translate-y-1 active:shadow-[0_1px_0_#1F2A44] flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">print</span>
          Print Active Sheet
        </button>
      </div>

      {/* Tabs for 4 Sheets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sheets.map((sheet, index) => (
          <button
            key={sheet.id}
            onClick={() => setSelectedSheet(index)}
            className={`p-4 rounded-[6px] border-[2px] border-[#1F2A44] text-left transition-all cursor-pointer ${
              selectedSheet === index
                ? 'bg-[#FFDF9D] shadow-[0_4px_0_#1F2A44] translate-y-[-2px]'
                : 'bg-[#FFFFFF] hover:bg-[#FAF8FF]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006A67]">
                Sheet {index + 1}
              </span>
              <span className="text-xs bg-white px-2 py-0.5 rounded border border-[#1F2A44]">
                {sheet.difficulty}
              </span>
            </div>
            <h3 className="font-headline-sm text-sm sm:text-base text-[#0F1B34] leading-snug line-clamp-2">
              {sheet.title}
            </h3>
            <p className="font-body-md text-xs text-[#3D4948] mt-1 line-clamp-2">
              {sheet.description}
            </p>
          </button>
        ))}
      </div>

      {/* Active Sheet Printable Canvas Display */}
      <div className="bg-[#FFFFFF] p-8 sm:p-12 rounded-[6px] border-[3px] border-[#1F2A44] shadow-[0_6px_0_#1F2A44] print:border-none print:shadow-none print:p-0">
        {/* Top Sheet Header Banner */}
        <div className="border-b-[3px] border-[#1F2A44] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-[4px] bg-[#13A4A0] border border-[#1F2A44] flex items-center justify-center text-white font-bold">
                M
              </span>
              <span className="font-headline-sm text-lg text-[#0F1B34]">Mozi Speech Studio Workbooks</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl text-[#0F1B34]">
              {sheets[selectedSheet].title}
            </h1>
            <p className="font-body-md text-sm text-[#3D4948] mt-1">
              Student: <strong>Aarav Sharma</strong> &bull; Target: <strong>/S/ &amp; /Z/ Phonemes</strong> &bull; Clinic: <strong>Mozi Speech Interactive</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playSnakeHiss();
                sheets[selectedSheet].words.forEach((w, i) => {
                  setTimeout(() => soundManager.speak(w), i * 1000);
                });
              }}
              className="px-3 py-1.5 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#FFF4DC] hover:bg-[#FFDF9D] font-label-md text-xs font-bold flex items-center gap-1 cursor-pointer print:hidden"
            >
              <span className="material-symbols-outlined text-[18px] text-[#006A67]">volume_up</span>
              Hear Sheet Words
            </button>
          </div>
        </div>

        {/* Dynamic Sheet Content */}
        {selectedSheet === 0 && (
          <div className="space-y-8">
            <div className="p-4 bg-[#FFF4DC] rounded-[4px] border-[2px] border-[#1F2A44]">
              <h3 className="font-headline-sm text-base text-[#006A67] mb-1">
                Parent/Clinician Instruction:
              </h3>
              <p className="font-body-md text-sm text-[#3D4948]">
                Instruct the child to trace Sasa's wavy body with a crayon. Every time the child reaches an icon, have them pause, hold a 3-second gentle snake hiss <em>"Ssssss"</em>, and then say the word cleanly!
              </p>
            </div>

            {/* Wavy Coloring Road */}
            <div className="relative py-8 px-4 border-[2px] border-dashed border-[#1F2A44] rounded-[6px] bg-[#FAF8FF]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {sheets[0].words.map((w, idx) => (
                  <div
                    key={w}
                    onClick={() => soundManager.speak(w)}
                    className="p-4 rounded-[6px] border-[2px] border-[#1F2A44] bg-white flex flex-col items-center text-center cursor-pointer hover:bg-[#FFDF9D] transition-colors"
                  >
                    <div className="text-4xl mb-2">
                      {idx === 0 ? '☀️' : idx === 1 ? '⭐' : idx === 2 ? '🥣' : idx === 3 ? '⛵' : idx === 4 ? '🏖️' : '🥄'}
                    </div>
                    <div className="font-display text-xl text-[#0F1B34]">{w}</div>
                    <div className="text-xs text-[#006A67] font-mono mt-0.5">/s/ sound</div>
                    <div className="mt-3 flex gap-1">
                      {[1, 2, 3].map((star) => (
                        <span key={star} className="w-5 h-5 rounded-full border border-[#1F2A44] flex items-center justify-center text-xs">
                          ☆
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedSheet === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-[#E1E7FF] rounded-[6px] border-[2px] border-[#1F2A44]">
              <h3 className="font-headline-md text-xl text-[#0F1B34] mb-3">
                1. Tongue Position Anatomy
              </h3>
              <div className="w-full h-48 bg-white rounded-[4px] border-[2px] border-[#1F2A44] flex items-center justify-center p-4">
                <svg className="w-full h-full" viewBox="0 0 240 160">
                  <path d="M40 30 Q120 10 200 30" stroke="#1F2A44" strokeWidth="4" fill="none" />
                  <rect x="100" y="28" width="16" height="24" rx="2" fill="#FAF8FF" stroke="#1F2A44" strokeWidth="2" />
                  <rect x="124" y="28" width="16" height="24" rx="2" fill="#FAF8FF" stroke="#1F2A44" strokeWidth="2" />
                  {/* Tongue tip behind upper teeth */}
                  <path d="M60 130 C90 130 110 65 118 56 C124 65 140 130 180 130 Z" fill="#FF5D35" stroke="#1F2A44" strokeWidth="3" />
                  <text x="145" y="70" fontSize="11" fontWeight="bold" fill="#006A67">Alveolar Ridge</text>
                  <line x1="140" y1="66" x2="124" y2="58" stroke="#006A67" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="font-body-md text-sm text-[#3D4948] mt-3">
                The tongue tip rests lightly behind the top teeth without touching them. The sides of the tongue seal against the upper molars.
              </p>
            </div>

            <div className="p-6 bg-[#FFF4DC] rounded-[6px] border-[2px] border-[#1F2A44]">
              <h3 className="font-headline-md text-xl text-[#0F1B34] mb-3">
                2. Airway Channel &amp; Hiss Test
              </h3>
              <div className="w-full h-48 bg-white rounded-[4px] border-[2px] border-[#1F2A44] flex items-center justify-center p-4">
                <svg className="w-full h-full" viewBox="0 0 240 160">
                  <path d="M30 80 Q120 70 210 80" stroke="#7FF5F0" strokeWidth="12" strokeDasharray="6 4" fill="none" />
                  <text x="60" y="55" fontSize="13" fontWeight="bold" fill="#006A67">Narrow Cool Air Stream 💨</text>
                </svg>
              </div>
              <p className="font-body-md text-sm text-[#3D4948] mt-3">
                Air flows through a central grooved channel along the middle of the tongue. The sound should be sharp and hiss-like, not slushy.
              </p>
            </div>
          </div>
        )}

        {selectedSheet === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#FFFFFF] rounded-[6px] border-[2px] border-[#1F2A44]">
                <div className="text-4xl mb-2">🐍</div>
                <h3 className="font-headline-md text-xl text-[#006A67]">The Snake /S/ Sound</h3>
                <span className="font-label-md text-xs font-bold uppercase text-[#785900] bg-[#FFDF9D] px-2 py-0.5 rounded">
                  Voiceless (Motor Off)
                </span>
                <p className="font-body-md text-sm text-[#3D4948] mt-3">
                  Touch your neck with two fingers. Say <em>"Sssss"</em>. You should feel <strong>NO vibration</strong>! Your vocal cords are resting.
                </p>
              </div>

              <div className="p-6 bg-[#FFFFFF] rounded-[6px] border-[2px] border-[#1F2A44]">
                <div className="text-4xl mb-2">🐝</div>
                <h3 className="font-headline-md text-xl text-[#B42801]">The Bumblebee /Z/ Sound</h3>
                <span className="font-label-md text-xs font-bold uppercase text-white bg-[#B42801] px-2 py-0.5 rounded">
                  Voiced (Motor On!)
                </span>
                <p className="font-body-md text-sm text-[#3D4948] mt-3">
                  Keep your mouth in the exact same shape! Turn on your voice motor: <em>"Zzzzz"</em>. You will feel a <strong>ticklish vibration</strong> in your neck!
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedSheet === 3 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {sheets[3].words.map((w, idx) => (
              <div
                key={w}
                onClick={() => soundManager.speak(w)}
                className="p-3 border-[2px] border-dashed border-[#1F2A44] rounded-[4px] bg-white flex flex-col items-center text-center cursor-pointer hover:bg-[#FAF8FF]"
              >
                <span className="text-3xl mb-1">
                  {['☀️', '🥣', '⭐', '⛵', '🧦', '7️⃣', '🐍', '🕷️', '🥄', '⚡', '🦓', '🐝'][idx]}
                </span>
                <span className="font-display text-lg text-[#0F1B34]">{w}</span>
                <span className="text-[10px] font-mono text-[#006A67]">Target #{idx + 1}</span>
                <div className="mt-2 text-[10px] text-gray-500">✂️ Cut out</div>
              </div>
            ))}
          </div>
        )}

        {/* Footer info stamp */}
        <div className="mt-10 pt-4 border-t-[2px] border-[#1F2A44] flex flex-col sm:flex-row items-center justify-between text-xs text-[#3D4948]">
          <span>Mozi Speech Play Clinical Resource #MSP-2025</span>
          <span>Parent Coaching Tip: Practice 5 minutes daily for optimal motor speech consolidation.</span>
        </div>
      </div>
    </div>
  );
};
