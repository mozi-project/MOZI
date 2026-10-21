import React from 'react';
import { MoziBunny } from './Characters.tsx';
import { RewardHat, Badge } from '../types/index.ts';
import { soundManager } from '../utils/audio.ts';
import confetti from 'canvas-confetti';

interface RewardsProps {
  tokens: number;
  onSpendTokens: (amount: number) => boolean;
  equippedHat: string;
  onEquipHat: (hatId: string) => void;
  hats: RewardHat[];
  onUnlockHat: (hatId: string) => void;
}

export const Rewards: React.FC<RewardsProps> = ({
  tokens,
  onSpendTokens,
  equippedHat,
  onEquipHat,
  hats,
  onUnlockHat
}) => {
  const badges: Badge[] = [
    {
      id: 'b1',
      title: 'Master of /S/',
      description: 'Said 50 words with crisp tongue placement',
      icon: 'military_tech',
      unlocked: true,
      dateUnlocked: 'Yesterday'
    },
    {
      id: 'b2',
      title: '4-Day Streak Hero',
      description: 'Completed sound quests 4 consecutive days',
      icon: 'local_fire_department',
      unlocked: true,
      dateUnlocked: 'Today'
    },
    {
      id: 'b3',
      title: 'Bubble Popper Pro',
      description: 'Popped 25 balloons in Sound Balloon Pop',
      icon: 'bubble_chart',
      unlocked: true,
      dateUnlocked: 'Today'
    },
    {
      id: 'b4',
      title: 'Silly Song Singer',
      description: 'Sang the complete snake rhyme without stopping',
      icon: 'music_note',
      unlocked: false
    },
    {
      id: 'b5',
      title: 'Z-Buzz Champion',
      description: 'Mastered 20 voiced /Z/ buzzing phonemes',
      icon: 'emoji_events',
      unlocked: false
    }
  ];

  const handleEquipOrUnlock = (hat: RewardHat) => {
    if (hat.unlocked) {
      onEquipHat(hat.id);
      soundManager.playRewardChime();
    } else {
      if (tokens >= hat.price) {
        const success = onSpendTokens(hat.price);
        if (success) {
          onUnlockHat(hat.id);
          onEquipHat(hat.id);
          soundManager.playRewardChime();
          confetti({ particleCount: 50, spread: 60 });
        }
      } else {
        soundManager.speak(`Need ${hat.price - tokens} more tokens! Keep popping balloons to earn more!`);
      }
    }
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header */}
      <div className="bg-[#FFFFFF] p-6 rounded-[4px] border-[1.5px] border-[#1F2A44] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-[#FFDF9D]"></span>
            <span className="font-label-md text-xs uppercase tracking-wider text-[#785900] font-bold">
              Reward Vault
            </span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#0F1B34] mt-1">
            Mozi's Dressing Room &amp; Badges
          </h2>
          <p className="font-body-md text-sm text-[#3D4948]">
            Dress up Mozi with fun hats and check out the badges you earned from speech practice!
          </p>
        </div>

        {/* Tokens Bank Display */}
        <div className="px-5 py-3 rounded-[6px] bg-[#FFDF9D] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFC531] border-[1.5px] border-[#1F2A44] flex items-center justify-center text-2xl">
            🪙
          </div>
          <div>
            <div className="text-xs font-bold text-[#785900] uppercase tracking-wide">Voice Tokens</div>
            <div className="font-display text-2xl text-[#251A00] leading-none">{tokens}</div>
          </div>
        </div>
      </div>

      {/* Main Dressing Room: Mozi Avatar Stage + Wardrobe Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Mozi Display */}
        <div className="lg:col-span-5 bg-[#FAF8FF] p-6 rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44] flex flex-col items-center justify-center text-center">
          <span className="font-label-md text-xs uppercase tracking-wider text-[#006A67] font-bold mb-2">
            Live Preview
          </span>
          <h3 className="font-headline-md text-xl text-[#0F1B34] mb-4">
            Mozi the Speech Explorer
          </h3>

          <div className="w-64 h-64 bg-[#E9EDFF] rounded-full border-[3px] border-[#1F2A44] flex items-center justify-center p-4 relative mb-4">
            <MoziBunny equippedHat={equippedHat} className="w-56 h-56" />
          </div>

          <p className="text-xs text-[#3D4948]">
            Currently wearing: <strong className="text-[#0F1B34] capitalize">{equippedHat === 'none' ? 'No Hat' : equippedHat}</strong>
          </p>
          {equippedHat !== 'none' && (
            <button
              onClick={() => onEquipHat('none')}
              className="mt-2 text-xs font-bold text-[#B42801] underline cursor-pointer"
            >
              Take off hat
            </button>
          )}
        </div>

        {/* Right: Wardrobe Items Grid */}
        <div className="lg:col-span-7 bg-[#FFFFFF] p-6 rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44]">
          <h3 className="font-headline-md text-xl text-[#0F1B34] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FF5D35]">checkroom</span>
            Costume Hats
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hats.map((hat) => {
              const isEquipped = equippedHat === hat.id;
              const canAfford = tokens >= hat.price;

              return (
                <div
                  key={hat.id}
                  className={`p-4 rounded-[6px] border-[2px] border-[#1F2A44] flex flex-col justify-between transition-all ${
                    isEquipped
                      ? 'bg-[#FFDF9D] shadow-[0_4px_0_#1F2A44]'
                      : 'bg-[#FFF4DC] hover:bg-[#F2F3FF]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl p-2 bg-white rounded-[4px] border border-[#1F2A44]">
                      {hat.icon}
                    </span>
                    <div>
                      <h4 className="font-headline-sm text-base text-[#0F1B34]">{hat.name}</h4>
                      <p className="font-body-md text-xs text-[#3D4948] mt-0.5">{hat.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1F2A44]/20 flex items-center justify-between">
                    {!hat.unlocked && (
                      <span className="font-label-md text-xs text-[#785900] font-black flex items-center gap-1">
                        🪙 {hat.price} Tokens
                      </span>
                    )}

                    <button
                      onClick={() => handleEquipOrUnlock(hat)}
                      className={`px-3 py-1.5 rounded-[4px] border-[1.5px] border-[#1F2A44] font-label-md text-xs font-bold transition-transform cursor-pointer ${
                        isEquipped
                          ? 'bg-[#006A67] text-white cursor-default'
                          : hat.unlocked
                            ? 'bg-[#FFFFFF] text-[#0F1B34] hover:bg-[#FAF8FF] active:scale-95'
                            : canAfford
                              ? 'bg-[#FF5D35] text-white hover:bg-[#B42801] active:scale-95'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isEquipped ? '✓ Equipped' : hat.unlocked ? 'Wear Hat' : `Unlock (${hat.price} 🪙)`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-[#FFFFFF] p-6 rounded-[6px] border-[2px] border-[#1F2A44] shadow-[0_4px_0_#1F2A44]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline-md text-xl text-[#0F1B34] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FFC531]">military_tech</span>
            Speech Explorer Badges
          </h3>
          <span className="font-label-md text-xs text-[#006A67] font-bold bg-[#E9EDFF] px-2.5 py-1 rounded-[4px] border border-[#1F2A44]">
            3 of 5 Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-[6px] border-[2px] border-[#1F2A44] flex flex-col items-center text-center transition-all ${
                b.unlocked
                  ? 'bg-[#FFF4DC] shadow-[0_3px_0_#1F2A44]'
                  : 'bg-[#F2F3FF] opacity-60'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full border-[2px] border-[#1F2A44] flex items-center justify-center mb-3 ${
                  b.unlocked ? 'bg-[#FFDF9D] text-[#785900]' : 'bg-gray-200 text-gray-400'
                }`}
              >
                <span className="material-symbols-outlined text-[32px]">
                  {b.unlocked ? b.icon : 'lock'}
                </span>
              </div>
              <h4 className="font-headline-sm text-sm text-[#0F1B34] leading-snug">{b.title}</h4>
              <p className="font-body-md text-xs text-[#3D4948] mt-1 leading-tight">{b.description}</p>
              {b.unlocked && (
                <span className="mt-2 text-[10px] font-bold text-[#006A67] uppercase">
                  Unlocked {b.dateUnlocked}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
