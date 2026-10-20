import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TargetWord, PronunciationResult, Sticker, AccessibilitySettings, GameProgress } from '../types';
import { TARGET_WORDS } from '../data/words';
import { STICKERS } from '../data/stickers';
import { soundService } from '../services/soundService';
import { speechRecorder, evaluatePronunciation } from '../services/speechService';

const STORAGE_KEY = 'mozi_bubble_ocean_progress';
const SETTINGS_KEY = 'mozi_bubble_ocean_settings';

interface FlyingPearl {
  id: number;
  startX: number;
  startY: number;
}

interface GameContextType {
  // Screens & Modals
  currentScreen: 'welcome' | 'game' | 'completion';
  setCurrentScreen: (screen: 'welcome' | 'game' | 'completion') => void;
  isHowToPlayOpen: boolean;
  setIsHowToPlayOpen: (open: boolean) => void;
  isStickerBookOpen: boolean;
  setIsStickerBookOpen: (open: boolean) => void;
  isEducatorPanelOpen: boolean;
  setIsEducatorPanelOpen: (open: boolean) => void;
  isResetConfirmOpen: boolean;
  setIsResetConfirmOpen: (open: boolean) => void;

  // Words & Gameplay
  currentWordIndex: number;
  currentWord: TargetWord;
  totalWordsInSession: number;
  completedWordIds: string[];
  roundsCompleted: number;
  bubblePopped: boolean;
  whaleExcited: boolean;
  flyingPearls: FlyingPearl[];

  // Progress & Rewards
  totalPearls: number;
  sessionPearlsEarned: number;
  stickers: Sticker[];
  newlyUnlockedSticker: Sticker | null;
  setNewlyUnlockedSticker: (s: Sticker | null) => void;

  // Audio & Speech Practice
  soundEnabled: boolean;
  demoMode: boolean;
  isRecording: boolean;
  recordingStatusText: string;
  recordingError: string | null;
  recordedAudioUrl: string | null;
  lastPronunciationResult: PronunciationResult | null;

  // Accessibility
  accessibility: AccessibilitySettings;
  updateAccessibility: (key: keyof AccessibilitySettings, val: boolean) => void;

  // Actions
  startGame: () => void;
  nextWord: () => void;
  popBubble: (x?: number, y?: number) => void;
  speakCurrentWord: () => void;
  startSpeechPractice: () => Promise<void>;
  stopSpeechPractice: () => Promise<void>;
  replayRecordedVoice: () => void;
  triggerSimulatedDemo: (scenario: 'match' | 'close' | 'retry') => void;
  toggleSound: () => void;
  toggleDemoMode: () => void;
  resetAllProgress: () => void;
  claimSticker: (id: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'game' | 'completion'>('welcome');
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isStickerBookOpen, setIsStickerBookOpen] = useState(false);
  const [isEducatorPanelOpen, setIsEducatorPanelOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Load progress
  const [totalPearls, setTotalPearls] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: GameProgress = JSON.parse(saved);
        return parsed.totalPearls || 0;
      }
    } catch {
      // fallback
    }
    return 0;
  });

  const [completedWordIds, setCompletedWordIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: GameProgress = JSON.parse(saved);
        return parsed.completedWordIds || [];
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [roundsCompleted, setRoundsCompleted] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: GameProgress = JSON.parse(saved);
        return parsed.roundsCompleted || 0;
      }
    } catch {
      // fallback
    }
    return 0;
  });

  const [unlockedStickerIds, setUnlockedStickerIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: GameProgress = JSON.parse(saved);
        return parsed.unlockedStickerIds || ['sticker-mozi'];
      }
    } catch {
      // fallback
    }
    return ['sticker-mozi'];
  });

  // Settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        return JSON.parse(saved).soundEffects ?? true;
      }
    } catch {
      // fallback
    }
    return true;
  });

  const [demoMode, setDemoMode] = useState<boolean>(false);
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    reducedMotion: false,
    highContrast: false,
    soundEffects: true,
    largeFonts: false
  });

  // Gameplay state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [sessionPearlsEarned, setSessionPearlsEarned] = useState(0);
  const [bubblePopped, setBubblePopped] = useState(false);
  const [whaleExcited, setWhaleExcited] = useState(false);
  const [flyingPearls, setFlyingPearls] = useState<FlyingPearl[]>([]);
  const [newlyUnlockedSticker, setNewlyUnlockedSticker] = useState<Sticker | null>(null);

  // Recording & feedback
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatusText, setRecordingStatusText] = useState('Tap microphone to start');
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [lastPronunciationResult, setLastPronunciationResult] = useState<PronunciationResult | null>(null);

  const totalWordsInSession = TARGET_WORDS.length;
  const currentWord = TARGET_WORDS[currentWordIndex] || TARGET_WORDS[0];

  // Sync sound service
  useEffect(() => {
    soundService.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  // Save progress to localStorage
  useEffect(() => {
    try {
      const progress: GameProgress = {
        totalPearls,
        completedWordIds,
        roundsCompleted,
        unlockedStickerIds,
        highestStreak: completedWordIds.length
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }, [totalPearls, completedWordIds, roundsCompleted, unlockedStickerIds]);

  // Check sticker unlocks when pearls increase
  useEffect(() => {
    STICKERS.forEach((stk) => {
      if (!unlockedStickerIds.includes(stk.id) && totalPearls >= stk.requiredPearls) {
        setUnlockedStickerIds((prev) => [...prev, stk.id]);
        setNewlyUnlockedSticker(stk);
        soundService.playCelebration();
      }
    });
  }, [totalPearls, unlockedStickerIds]);

  const stickers = STICKERS.map((s) => ({
    ...s,
    unlocked: unlockedStickerIds.includes(s.id)
  }));

  const updateAccessibility = (key: keyof AccessibilitySettings, val: boolean) => {
    setAccessibility((prev) => {
      const updated = { ...prev, [key]: val };
      if (key === 'soundEffects') {
        setSoundEnabled(val);
      }
      return updated;
    });
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundService.setSoundEnabled(next);
      if (next) soundService.playClick();
      return next;
    });
  };

  const toggleDemoMode = () => {
    setDemoMode((prev) => {
      const next = !prev;
      soundService.playClick();
      return next;
    });
  };

  const startGame = () => {
    soundService.playClick();
    setCurrentWordIndex(0);
    setBubblePopped(false);
    setWhaleExcited(false);
    setLastPronunciationResult(null);
    setRecordedAudioUrl(null);
    setRecordingError(null);
    setSessionPearlsEarned(0);
    setCurrentScreen('game');

    // Speak initial word after a brief welcome pause
    setTimeout(() => {
      soundService.speakWord(TARGET_WORDS[0].word);
    }, 700);
  };

  const speakCurrentWord = () => {
    soundService.playClick();
    soundService.speakWord(currentWord.word);
  };

  const startSpeechPractice = async () => {
    setRecordingError(null);
    setIsRecording(true);
    setRecordingStatusText('Listening to your lovely voice...');
    soundService.playMicStart();

    if (demoMode) {
      // In demo mode, automatically show match after a cute listening duration
      setTimeout(() => {
        triggerSimulatedDemo('match');
      }, 1600);
      return;
    }

    try {
      await speechRecorder.startListening(
        (result: PronunciationResult) => {
          setIsRecording(false);
          setLastPronunciationResult(result);
          if (result.isMatch) {
            setRecordingStatusText('Great speaking! The bubble popped!');
            soundService.playCelebration();
            popBubble();
          } else {
            setRecordingStatusText("Lovely try! Let's say it together.");
            soundService.playGentleEncouragement();
          }
        },
        (errMsg: string) => {
          setIsRecording(false);
          setRecordingError(errMsg);
          setRecordingStatusText("Lovely try! Let's say it together.");
          const fallbackRes = evaluatePronunciation('', currentWord.word, false);
          setLastPronunciationResult(fallbackRes);
          soundService.playGentleEncouragement();
        },
        currentWord.word
      );
    } catch {
      setIsRecording(false);
      setRecordingError('Speech recognition is unavailable. Try Demo Mode!');
      setRecordingStatusText('Speech recognition is unavailable. Try Demo Mode!');
    }
  };

  const stopSpeechPractice = async () => {
    setIsRecording(false);
    soundService.playMicStop();

    const audioUrl = await speechRecorder.stopListening();
    if (audioUrl) {
      setRecordedAudioUrl(audioUrl);
    }
  };

  const replayRecordedVoice = () => {
    if (!recordedAudioUrl) return;
    soundService.playClick();
    const audio = new Audio(recordedAudioUrl);
    audio.play().catch((e) => console.warn('Audio playback error:', e));
  };

  const triggerSimulatedDemo = (scenario: 'match' | 'close' | 'retry') => {
    setIsRecording(false);
    const demoResult = speechRecorder.generateSimulatedResult(currentWord.word, scenario);
    setLastPronunciationResult(demoResult);
    if (demoResult.isMatch) {
      setRecordingStatusText('Great speaking! The bubble popped!');
      soundService.playCelebration();
      popBubble();
    } else {
      setRecordingStatusText("Lovely try! Let's say it together.");
      soundService.playGentleEncouragement();
    }
  };

  const popBubble = (clickX = window.innerWidth / 2, clickY = window.innerHeight / 2) => {
    if (bubblePopped) return;

    soundService.playPop();
    setBubblePopped(true);
    setWhaleExcited(true);

    // Generate flying pearls
    const newPearls: FlyingPearl[] = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      startX: clickX + (Math.random() - 0.5) * 60,
      startY: clickY + (Math.random() - 0.5) * 60
    }));
    setFlyingPearls(newPearls);

    // Play pearl chimes in sequence
    setTimeout(() => soundService.playPearl(), 250);
    setTimeout(() => soundService.playPearl(), 450);

    // Add pearls to count
    const pearlsEarned = 10;
    setTotalPearls((p) => p + pearlsEarned);
    setSessionPearlsEarned((p) => p + pearlsEarned);

    if (!completedWordIds.includes(currentWord.id)) {
      setCompletedWordIds((prev) => [...prev, currentWord.id]);
    }

    // Reset whale excitement after 3.5s
    setTimeout(() => {
      setWhaleExcited(false);
    }, 3500);

    // Clear flying pearls after animation
    setTimeout(() => {
      setFlyingPearls([]);
    }, 1200);
  };

  const nextWord = () => {
    soundService.playClick();
    if (currentWordIndex + 1 < totalWordsInSession) {
      setCurrentWordIndex((i) => i + 1);
      setBubblePopped(false);
      setWhaleExcited(false);
      setLastPronunciationResult(null);
      setRecordedAudioUrl(null);
      setRecordingError(null);
      setRecordingStatusText('Tap microphone to start');

      const nextTarget = TARGET_WORDS[currentWordIndex + 1];
      setTimeout(() => {
        soundService.speakWord(nextTarget.word);
      }, 500);
    } else {
      // Completed all words in session!
      setRoundsCompleted((r) => r + 1);
      setCurrentScreen('completion');
      soundService.playCelebration();
    }
  };

  const resetAllProgress = () => {
    soundService.playClick();
    setTotalPearls(0);
    setCompletedWordIds([]);
    setRoundsCompleted(0);
    setUnlockedStickerIds(['sticker-mozi']);
    setSessionPearlsEarned(0);
    setCurrentWordIndex(0);
    setBubblePopped(false);
    setWhaleExcited(false);
    setLastPronunciationResult(null);
    setRecordedAudioUrl(null);
    localStorage.removeItem(STORAGE_KEY);
    setIsResetConfirmOpen(false);
    setCurrentScreen('welcome');
  };

  const claimSticker = (id: string) => {
    if (!unlockedStickerIds.includes(id)) {
      setUnlockedStickerIds((prev) => [...prev, id]);
      soundService.playCelebration();
    }
  };

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        isHowToPlayOpen,
        setIsHowToPlayOpen,
        isStickerBookOpen,
        setIsStickerBookOpen,
        isEducatorPanelOpen,
        setIsEducatorPanelOpen,
        isResetConfirmOpen,
        setIsResetConfirmOpen,
        currentWordIndex,
        currentWord,
        totalWordsInSession,
        completedWordIds,
        roundsCompleted,
        bubblePopped,
        whaleExcited,
        flyingPearls,
        totalPearls,
        sessionPearlsEarned,
        stickers,
        newlyUnlockedSticker,
        setNewlyUnlockedSticker,
        soundEnabled,
        demoMode,
        isRecording,
        recordingStatusText,
        recordingError,
        recordedAudioUrl,
        lastPronunciationResult,
        accessibility,
        updateAccessibility,
        startGame,
        nextWord,
        popBubble,
        speakCurrentWord,
        startSpeechPractice,
        stopSpeechPractice,
        replayRecordedVoice,
        triggerSimulatedDemo,
        toggleSound,
        toggleDemoMode,
        resetAllProgress,
        claimSticker
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
