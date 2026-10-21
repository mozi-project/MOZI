export type Role = 'child' | 'therapist' | 'admin';

export type NavigationPath = 
  | 'child-home' 
  | 'games' 
  | 'playing-stage' 
  | 'rewards' 
  | 'practice-sheets' 
  | 'therapist-desk' 
  | 'admin-control';

export interface SoundQuest {
  id: string;
  title: string;
  description: string;
  type: 'balloons' | 'words' | 'song';
  completed: boolean;
  progress: number;
  total: number;
}

export interface RewardHat {
  id: string;
  name: string;
  description: string;
  price: number;
  unlocked: boolean;
  icon: string;
  color: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  dateUnlocked?: string;
}

export interface PhonemeSession {
  id: string;
  date: string;
  targetSound: string;
  accuracy: number;
  wordsAttempted: number;
  wordsCorrect: number;
  notes: string;
}
