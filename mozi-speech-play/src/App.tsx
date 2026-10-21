/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationPath, Role, SoundQuest, RewardHat } from './types/index.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { ChildHome } from './components/ChildHome.tsx';
import { PlayingStage } from './components/PlayingStage.tsx';
import { GamesHub } from './components/GamesHub.tsx';
import { Rewards } from './components/Rewards.tsx';
import { PracticeSheets } from './components/PracticeSheets.tsx';
import { TherapistDesk } from './components/TherapistDesk.tsx';
import { AdminControl } from './components/AdminControl.tsx';
import { soundManager } from './utils/audio.ts';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentPath, setCurrentPath] = useState<NavigationPath>('child-home');
  const [role, setRole] = useState<Role>('child');
  const [tokens, setTokens] = useState<number>(180);
  const [equippedHat, setEquippedHat] = useState<string>('none');

  const [hats, setHats] = useState<RewardHat[]>([
    {
      id: 'crown',
      name: 'Golden Speech Crown',
      description: 'Awarded to master speech explorers of /S/ and /Z/.',
      price: 50,
      unlocked: true,
      icon: '👑',
      color: '#FFDF9D'
    },
    {
      id: 'detective',
      name: 'Phoneme Detective Cap',
      description: 'Inspect tricky sounds and find sneaky lisps!',
      price: 30,
      unlocked: true,
      icon: '🕵️',
      color: '#E9EDFF'
    },
    {
      id: 'party',
      name: 'Celebration Party Hat',
      description: 'Pop balloons in style with colorful confetti cones.',
      price: 20,
      unlocked: true,
      icon: '🎉',
      color: '#FFDAD2'
    },
    {
      id: 'pirate',
      name: 'Ahoy Pirate Bandana',
      description: 'Sail the seas while practicing /S/ sound adventures.',
      price: 100,
      unlocked: false,
      icon: '🏴‍☠️',
      color: '#FAF8FF'
    },
    {
      id: 'space',
      name: 'Astro-Rabbit Space Bubble',
      description: 'A pressurized sonic dome for zero-gravity tongue drills.',
      price: 150,
      unlocked: false,
      icon: '🚀',
      color: '#E1E7FF'
    }
  ]);

  const [quests, setQuests] = useState<SoundQuest[]>([
    {
      id: 'balloons',
      title: 'Pop 5 balloons in Sound Balloon Pop',
      description: 'Practice /S/ bursts',
      type: 'balloons',
      completed: true,
      progress: 5,
      total: 5
    },
    {
      id: 'words',
      title: 'Say 3 words',
      description: '"Sun", "Soup", "Star"',
      type: 'words',
      completed: true,
      progress: 3,
      total: 3
    },
    {
      id: 'song',
      title: 'Sing 1 song',
      description: 'The Silly Snake Song',
      type: 'song',
      completed: false,
      progress: 0,
      total: 1
    }
  ]);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    if (newRole === 'therapist') {
      setCurrentPath('therapist-desk');
    } else if (newRole === 'admin') {
      setCurrentPath('admin-control');
    } else {
      setCurrentPath('child-home');
    }
  };

  const handleEarnTokens = (amount: number) => {
    setTokens((prev) => prev + amount);
  };

  const handleSpendTokens = (amount: number): boolean => {
    if (tokens >= amount) {
      setTokens((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const handleUnlockHat = (hatId: string) => {
    setHats((prev) =>
      prev.map((h) => (h.id === hatId ? { ...h, unlocked: true } : h))
    );
  };

  const handleBalloonPopped = () => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === 'balloons') {
          return { ...q, completed: true, progress: Math.min(q.total, q.progress + 1) };
        }
        return q;
      })
    );
  };

  const handleCompleteQuest = (questType: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.type === questType) {
          return { ...q, completed: true, progress: q.total };
        }
        return q;
      })
    );
    handleEarnTokens(50);
    soundManager.playRewardChime();
    confetti({ particleCount: 50, spread: 60 });
  };

  return (
    <div className="min-h-screen bg-[#FFF4DC] flex flex-col font-body-md text-[#0F1B34] antialiased">
      {/* Top Fixed Header Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        role={role}
        onRoleChange={handleRoleChange}
        tokenCount={tokens}
      />

      {/* Main Content Area */}
      <main className="w-full flex-1 pt-20 bg-[#FFF4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {currentPath === 'child-home' && (
            <ChildHome
              onNavigate={setCurrentPath}
              equippedHat={equippedHat}
              quests={quests}
              onCompleteQuest={handleCompleteQuest}
            />
          )}

          {currentPath === 'playing-stage' && (
            <PlayingStage
              onEarnTokens={handleEarnTokens}
              equippedHat={equippedHat}
              onBalloonPopped={handleBalloonPopped}
            />
          )}

          {currentPath === 'games' && (
            <GamesHub
              onNavigate={setCurrentPath}
              onEarnTokens={handleEarnTokens}
            />
          )}

          {currentPath === 'rewards' && (
            <Rewards
              tokens={tokens}
              onSpendTokens={handleSpendTokens}
              equippedHat={equippedHat}
              onEquipHat={setEquippedHat}
              hats={hats}
              onUnlockHat={handleUnlockHat}
            />
          )}

          {currentPath === 'practice-sheets' && <PracticeSheets />}

          {currentPath === 'therapist-desk' && <TherapistDesk />}

          {currentPath === 'admin-control' && <AdminControl />}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
