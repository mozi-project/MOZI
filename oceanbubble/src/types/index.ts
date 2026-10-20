export interface TargetWord {
  id: string;
  word: string;
  displayWord: string;
  phonetics: string; // e.g. "f • ih • sh"
  hint: string; // "A friendly swimmer in the blue ocean!"
  category: 'Ocean Friends' | 'Sky & Nature' | 'Playful Things' | 'Animals';
  iconType: 'fish' | 'sun' | 'moon' | 'ball' | 'cat' | 'ship' | 'star' | 'boat' | 'wave' | 'clam' | 'crab' | 'whale';
  primaryColor: string;
  accentColor: string;
}

export type FeedbackLevel = 'excellent' | 'good' | 'encourage';

export interface PronunciationResult {
  transcript: string;
  targetWord: string;
  similarity: number; // 0 - 100
  isMatch: boolean;
  feedbackMessage: string;
  feedbackLevel: FeedbackLevel;
  audioBlobUrl?: string;
  isSimulated?: boolean;
}

export interface Sticker {
  id: string;
  name: string;
  title: string;
  requiredPearls: number;
  image?: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  soundName?: string;
}

export interface AccessibilitySettings {
  reducedMotion: boolean;
  highContrast: boolean;
  soundEffects: boolean;
  largeFonts: boolean;
}

export interface GameProgress {
  totalPearls: number;
  completedWordIds: string[];
  roundsCompleted: number;
  unlockedStickerIds: string[];
  highestStreak: number;
}
