import React, { useState } from 'react';
import { NavigationPath, SoundQuest } from '../types/index.ts';
import { MoziBunny, SasaSnake } from './Characters.tsx';
import { soundManager } from '../utils/audio.ts';
import confetti from 'canvas-confetti';
import { SingSongModal, WordPracticeModal, SpeechHelperModal } from './Modals.tsx';

interface ChildHomeProps {
  onNavigate: (path: NavigationPath) => void;
  equippedHat: string;
  quests: SoundQuest[];
  onCompleteQuest: (id: string) => void;
}

export const ChildHome: React.FC<ChildHomeProps> = ({
  onNavigate,
  equippedHat,
  quests,
  onCompleteQuest
}) => {
  const [bubbleActive, setBubbleActive] = useState(false);
  const [singModalOpen, setSingModalOpen] = useState(false);
  const [wordModalOpen, setWordModalOpen] = useState(false);
  const [helperModalOpen, setHelperModalOpen] = useState(false);

  const completedCount = quests.filter((q) => q.completed).length;

  const handleSasaBubbleClick = () => {
    setBubbleActive(true);
    soundManager.playSnakeHiss();
    soundManager.speak("Hi, I'm Sasa! Sss-super! Great job practicing your sounds today, Aarav!");
    setTimeout(() => setBubbleActive(false), 600);
  };

  const handleStreakClick = () => {
    soundManager.playRewardChime();
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.25 } });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Modals */}
      <SingSongModal
        isOpen={singModalOpen}
        onClose={() => setSingModalOpen(false)}
        onComplete={() => {
          onCompleteQuest('song');
          setSingModalOpen(false);
        }}
      />
      <WordPracticeModal
        isOpen={wordModalOpen}
        onClose={() => setWordModalOpen(false)}
        onComplete={() => {
          onCompleteQuest('words');
          setWordModalOpen(false);
        }}
      />
      <SpeechHelperModal
        isOpen={helperModalOpen}
        onClose={() => setHelperModalOpen(false)}
        onOpenPrint={() => onNavigate('practice-sheets')}
      />

      {/* Teal Hero Banner */}
      <section className="relative w-full bg-[#13A4A0] rounded-[4px] overflow-visible border-[1.5px] border-[#1F2A44] shadow-none">
        {/* Starburst & Doodles Background (SVG Vector Art) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[4px]">
          <svg className="absolute top-6 left-8 w-14 h-14 text-[#006A67] opacity-35" fill="currentColor" viewBox="0 0 100 100">
            <polygon points="50,0 62,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 38,35"></polygon>
          </svg>
          <svg className="absolute top-12 right-16 w-10 h-10 text-[#006A67] opacity-30" fill="currentColor" viewBox="0 0 100 100">
            <polygon points="50,0 62,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 38,35"></polygon>
          </svg>
          <svg className="absolute bottom-16 left-1/4 w-8 h-8 text-[#006A67] opacity-25" fill="currentColor" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="30" stroke="currentColor" strokeDasharray="10 10" strokeWidth="8"></circle>
          </svg>
          <svg className="absolute top-8 left-1/2 w-6 h-6 text-[#006A67] opacity-30" fill="currentColor" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="8"></circle>
          </svg>
        </div>

        {/* Hero Content & Character Stage */}
        <div className="relative z-10 px-4 sm:px-6 pt-10 pb-8 flex flex-col items-center text-center">
          {/* Kid Badges: Level & Daily Streak */}
          <button 
            onClick={handleStreakClick}
            className="inline-flex items-center gap-2 bg-[#006A67] px-4 py-1.5 rounded-[4px] border-[1.5px] border-[#1F2A44] mb-4 shadow-none hover:bg-[#00504E] cursor-pointer transition-transform active:scale-95"
            title="Click to celebrate your streak!"
          >
            <span className="flex items-center gap-1 text-[#FFFFFF] font-label-md text-sm font-extrabold tracking-wide">
              <span className="material-symbols-outlined text-[20px] text-[#FFDF9D]">local_fire_department</span>
              Day 4 Streak!
            </span>
            <span className="w-1.5 h-1.5 rounded-[4px] bg-[#7FF5F0]"></span>
            <span className="text-[#7FF5F0] font-label-md text-sm">Explorer Aarav</span>
          </button>

          {/* Main Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF] tracking-tight max-w-2xl">
            Hi Aarav! Ready to play?
          </h1>
          <p className="font-headline-md text-lg sm:text-2xl text-[#FAF8FF] font-medium mt-2 max-w-xl">
            Let's explore today's sound quests together.
          </p>

          {/* Center Characters: Mozi Bunny & Sasa Snake */}
          <div className="relative w-full max-w-lg h-56 sm:h-64 mt-4 flex items-end justify-center select-none">
            {/* Sasa Speech Bubble */}
            <div
              onClick={handleSasaBubbleClick}
              className={`absolute -top-3 left-4 sm:left-10 z-20 bg-[#FFFFFF] px-4 py-1.5 rounded-[4px] border-[1.5px] border-[#1F2A44] cursor-pointer shadow-none transition-all duration-200 hover:scale-105 active:scale-95 ${
                bubbleActive ? 'opacity-80 scale-105 bg-[#FFDF9D]' : ''
              }`}
              title="Click Sasa to hear speech!"
            >
              <p className="font-label-md text-sm text-[#0F1B34] font-extrabold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-[#006A67]">volume_up</span>
                Hi, I'm Sasa! Sss-super!
              </p>
              {/* Speech Pointer */}
              <div className="absolute -bottom-2 left-8 w-3 h-3 bg-inherit border-r-[1.5px] border-b-[1.5px] border-[#1F2A44] transform rotate-45"></div>
            </div>

            {/* Mozi & Sasa Vector Display */}
            <div className="relative flex items-end justify-center gap-2 w-full h-full">
              <SasaSnake />
              <MoziBunny equippedHat={equippedHat} />
            </div>
          </div>

          {/* Action Button: Sunny Yellow chunky button */}
          <div className="relative z-30 -mt-2">
            <button
              onClick={() => onNavigate('playing-stage')}
              className="group inline-flex items-center gap-3 px-8 py-3 sm:py-3.5 rounded-[4px] bg-[#FFDF9D] hover:bg-[#F7BE29] text-[#251A00] font-headline-md text-xl sm:text-2xl border-[1.5px] border-[#1F2A44] shadow-none cursor-pointer transition-transform active:translate-y-1"
            >
              <span className="material-symbols-outlined text-[32px] text-[#1F2A44] font-extrabold">play_arrow</span>
              <span>Play now</span>
              <span className="material-symbols-outlined text-[30px] text-[#1F2A44] transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Scalloped Wavy Divider Cutout at base of Hero */}
        <div className="w-full overflow-hidden leading-none relative z-10 text-[#FAF8FF]">
          <svg className="block w-full h-8 sm:h-12 text-[#FAF8FF]" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,-20 1050,60 C1120,95 1170,80 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Hand-Drawn Marginalia Stars & Notes */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 select-none">
        <div className="flex items-center gap-2 text-[#1F2A44]">
          <span className="material-symbols-outlined text-[20px] text-[#1F2A44]">auto_awesome</span>
          <span className="font-label-md text-xs sm:text-sm font-bold tracking-widest uppercase text-[#1F2A44]">
            TARGET SOUND: /S/ &amp; /Z/
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#1F2A44]">
          <span className="material-symbols-outlined text-[18px]">star</span>
          <span className="material-symbols-outlined text-[14px]">star</span>
          <span className="material-symbols-outlined text-[18px]">star</span>
        </div>
      </div>

      {/* "Today" Strip: 3 Tactile Mission Chips */}
      <section className="w-full my-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-[#FF5D35]"></span>
            <h2 className="font-headline-sm text-lg sm:text-xl text-[#0F1B34]">Today's Sound Quests</h2>
          </div>
          <span className="font-label-md text-xs sm:text-sm text-[#006A67] font-extrabold bg-[#E9EDFF] px-3 py-1 rounded-[4px] border-[1.5px] border-[#1F2A44] shadow-none">
            {completedCount} of 3 Done
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mission 1: Pop 5 Balloons in Sound Balloon Pop */}
          <div 
            onClick={() => onNavigate('playing-stage')}
            className="relative flex items-center justify-between p-4 bg-[#FFFFFF] rounded-[4px] border-[1.5px] border-[#1F2A44] shadow-none cursor-pointer hover:bg-[#F2F3FF] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[30px] text-[#1F2A44]">bubble_chart</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-sm sm:text-base text-[#0F1B34]">Pop 5 balloons in Sound Balloon Pop</h3>
                <p className="font-body-md text-xs sm:text-sm text-[#3D4948] font-medium">Practice /S/ bursts</p>
              </div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center text-[#006A67]" title="Completed">
              <span className="material-symbols-outlined text-[24px] font-extrabold text-[#1F2A44]">check</span>
            </div>
          </div>

          {/* Mission 2: Say 3 Words */}
          <div 
            onClick={() => setWordModalOpen(true)}
            className="relative flex items-center justify-between p-4 bg-[#FFFFFF] rounded-[4px] border-[1.5px] border-[#1F2A44] shadow-none cursor-pointer hover:bg-[#F2F3FF] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[30px] text-[#1F2A44]">record_voice_over</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-sm sm:text-base text-[#0F1B34]">Say 3 words</h3>
                <p className="font-body-md text-xs sm:text-sm text-[#3D4948] font-medium">"Sun", "Soup", "Star"</p>
              </div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center text-[#006A67]" title="Completed">
              <span className="material-symbols-outlined text-[24px] font-extrabold text-[#1F2A44]">check</span>
            </div>
          </div>

          {/* Mission 3: Sing 1 Song */}
          <div className="relative flex items-center justify-between p-4 bg-[#E1E7FF] rounded-[4px] border-[1.5px] border-[#1F2A44] shadow-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[30px] text-[#1F2A44]">music_note</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-sm sm:text-base text-[#0F1B34]">Sing 1 song</h3>
                <p className="font-body-md text-xs sm:text-sm text-[#3D4948] font-medium">The Silly Snake Song</p>
              </div>
            </div>
            {quests.find(q => q.type === 'song')?.completed ? (
              <div className="w-8 h-8 flex items-center justify-center text-[#006A67]">
                <span className="material-symbols-outlined text-[24px] font-extrabold text-[#1F2A44]">check</span>
              </div>
            ) : (
              <button
                onClick={() => setSingModalOpen(true)}
                className="px-3 py-1.5 rounded-[4px] bg-[#FF5D35] hover:bg-[#B42801] text-white font-label-md text-xs sm:text-sm border-[1.5px] border-[#1F2A44] shadow-none cursor-pointer transition-transform active:scale-95"
              >
                Start
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Large Card: 4 Chunky Activity Tiles */}
      <section className="w-full mt-6 mb-8">
        <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[4px] border-[1.5px] border-[#1F2A44] shadow-none">
          {/* Card Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[#E9EDFF]">
            <div>
              <span className="font-label-md text-xs uppercase tracking-wider text-[#006A67] font-bold">
                Speech Adventures
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#0F1B34] mt-0.5">
                Explore Aarav's World
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[#3D4948] font-body-md text-xs sm:text-sm bg-[#E9EDFF] px-3 py-1.5 rounded-[4px] border-[1.5px] border-[#1F2A44] self-start sm:self-auto shadow-none">
              <span className="material-symbols-outlined text-[20px] text-[#006A67]">sound_detection_loud_sound</span>
              <span>Speech Engine: Ready</span>
            </div>
          </div>

          {/* 4 Chunky Icon Tiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {/* Tile 1: Games */}
            <div className="flex flex-col justify-between p-4 bg-[#E9EDFF] rounded-[4px] border-[1.5px] border-[#1F2A44] shadow-none hover:translate-y-[-2px] transition-transform">
              <div>
                <div className="w-12 h-12 flex items-center justify-start mb-3">
                  <span className="material-symbols-outlined text-[36px] text-[#1F2A44]">sports_esports</span>
                </div>
                <h3 className="font-headline-md text-lg text-[#0F1B34]">Games</h3>
                <p className="font-body-md text-xs sm:text-sm text-[#3D4948] mt-1">
                  Sound Balloon Pop: practice phoneme bursts and speech accuracy.
                </p>
              </div>
              <div className="pt-4 mt-2">
                <button
                  onClick={() => onNavigate('playing-stage')}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-[4px] bg-[#B42801] hover:bg-[#8A1C00] text-white font-label-md text-xs sm:text-sm border-[1.5px] border-[#1F2A44] shadow-none cursor-pointer"
                >
                  <span>Sound Balloon Pop</span>
                  <span className="material-symbols-outlined text-[18px]">sports_esports</span>
                </button>
              </div>
            </div>

            {/* Tile 2: Practice Sheets */}
            <div className="flex flex-col justify-between p-4 bg-[#E9EDFF] rounded-[4px] border-[1.5px] border-[#1F2A44] shadow-none hover:translate-y-[-2px] transition-transform">
              <div>
                <div className="w-12 h-12 flex items-center justify-start mb-3">
                  <span className="material-symbols-outlined text-[36px] text-[#1F2A44]">menu_book</span>
                </div>
                <h3 className="font-headline-md text-lg text-[#0F1B34]">Practice sheets</h3>
                <p className="font-body-md text-xs sm:text-sm text-[#3D4948] mt-1">
                  Printable coloring boards and visual mouth position guides.
                </p>
              </div>
              <div className="pt-4 mt-2">
                <button
                  onClick={() => onNavigate('practice-sheets')}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-[4px] bg-[#13A4A0] hover:bg-[#006A67] text-white font-label-md text-xs sm:text-sm border-[1.5px] border-[#1F2A44] shadow-none cursor-pointer"
                >
                  <span>View (4)</span>
                  <span className="material-symbols-outlined text-[18px]">description</span>
                </button>
              </div>
            </div>

            {/* Tile 3: Rewards */}
            <div className="flex flex-col justify-between p-4 bg-[#E9EDFF] rounded-[4px] border-[1.5px] border-[#1F2A44] shadow-none hover:translate-y-[-2px] transition-transform">
              <div>
                <div className="w-12 h-12 flex items-center justify-start mb-3">
                  <span className="material-symbols-outlined text-[36px] text-[#1F2A44]">military_tech</span>
                </div>
                <h3 className="font-headline-md text-lg text-[#0F1B34]">Rewards</h3>
                <p className="font-body-md text-xs sm:text-sm text-[#3D4948] mt-1">
                  Golden badges, costume hats for Mozi, and voice tokens.
                </p>
              </div>
              <div className="pt-4 mt-2">
                <button
                  onClick={() => onNavigate('rewards')}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-[4px] bg-[#FFDF9D] hover:bg-[#F7BE29] text-[#251A00] font-label-md text-xs sm:text-sm border-[1.5px] border-[#1F2A44] shadow-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#1F2A44]">lock_open</span>
                  <span>3 Unlocked</span>
                </button>
              </div>
            </div>

            {/* Tile 4: My Progress */}
            <div className="flex flex-col justify-between p-4 bg-[#E9EDFF] rounded-[4px] border-[1.5px] border-[#1F2A44] shadow-none hover:translate-y-[-2px] transition-transform">
              <div>
                <div className="w-12 h-12 flex items-center justify-start mb-3">
                  <span className="material-symbols-outlined text-[36px] text-[#1F2A44]">trending_up</span>
                </div>
                <h3 className="font-headline-md text-lg text-[#0F1B34]">My progress</h3>
                <p className="font-body-md text-xs sm:text-sm text-[#3D4948] mt-1">
                  Weekly sound mastery, accuracy scores, and audio clips.
                </p>
              </div>
              <div className="pt-4 mt-2">
                <button
                  onClick={() => onNavigate('therapist-desk')}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-[4px] bg-[#006A67] hover:bg-[#00504E] text-white font-label-md text-xs sm:text-sm border-[1.5px] border-[#1F2A44] shadow-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">stars</span>
                  <span>Level 4</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Parent/Therapist Prompt Bar */}
      <aside className="w-full mb-6 p-4 bg-[#E1E7FF] rounded-[4px] border-[1.5px] border-[#1F2A44] flex flex-col md:flex-row items-center justify-between gap-4 shadow-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px] text-[#1F2A44]">family_restroom</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-sm sm:text-base text-[#0F1B34]">Speech Practice Helper</h4>
            <p className="font-body-md text-xs sm:text-sm text-[#3D4948]">
              Tip for today: Encourage Aarav to place tongue behind top teeth when practicing snake hisses in Sound Balloon Pop.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <button
            onClick={() => setHelperModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2 rounded-[4px] bg-[#FFFFFF] text-[#0F1B34] font-label-md text-xs sm:text-sm border-[1.5px] border-[#1F2A44] hover:bg-[#FAF8FF] transition-colors cursor-pointer shadow-none"
          >
            Listen to Example
          </button>
          <button
            onClick={() => onNavigate('practice-sheets')}
            className="flex-1 md:flex-none px-4 py-2 rounded-[4px] bg-[#006A67] text-white font-label-md text-xs sm:text-sm border-[1.5px] border-[#1F2A44] hover:bg-[#00504E] transition-colors cursor-pointer shadow-none"
          >
            Print Helper Sheet
          </button>
        </div>
      </aside>
    </div>
  );
};
