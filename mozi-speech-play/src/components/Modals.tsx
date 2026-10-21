import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio.ts';

interface SingSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const SingSongModal: React.FC<SingSongModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);

  const lines = [
    { text: "Sasa the Snake goes sss-sss-sss! 🐍", soundWord: "sss" },
    { text: "Slithering gently in the sunny grass! 🌿", soundWord: "sunny" },
    { text: "Sun so warm and soup so sweet! 🥣", soundWord: "soup" },
    { text: "Star in the sky, what a super treat! ⭐", soundWord: "star" }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentLine((prev) => {
          const next = prev + 1;
          if (next >= lines.length) {
            setIsPlaying(false);
            soundManager.playRewardChime();
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
            onComplete();
            return 0;
          }
          soundManager.speak(lines[next].text);
          return next;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, lines, onComplete]);

  if (!isOpen) return null;

  const handleStartSinging = () => {
    setIsPlaying(true);
    setCurrentLine(0);
    soundManager.speak(lines[0].text);
    soundManager.playSnakeHiss();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2A44]/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#FAF8FF] border-[3px] border-[#1F2A44] rounded-[8px] p-6 shadow-[0_8px_0_#1F2A44] animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-[2px] border-[#1F2A44]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-[#B42801]">music_note</span>
            <h3 className="font-headline-md text-headline-md text-[#0F1B34]">The Silly Snake Song</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#FFF4DC] flex items-center justify-center font-bold text-[#1F2A44] hover:bg-[#FFDAD6]"
          >
            ✕
          </button>
        </div>

        {/* Character Sing Stage */}
        <div className="my-5 p-4 bg-[#E9EDFF] border-[2px] border-[#1F2A44] rounded-[6px] text-center">
          <div className="flex justify-center items-center gap-4 mb-3">
            <div className={`w-16 h-16 rounded-full bg-[#13A4A0] border-[2px] border-[#1F2A44] flex items-center justify-center text-3xl transition-transform ${isPlaying ? 'scale-110 rotate-6' : ''}`}>
              🐍
            </div>
            <div className={`w-16 h-16 rounded-full bg-[#FFDF9D] border-[2px] border-[#1F2A44] flex items-center justify-center text-3xl transition-transform ${isPlaying ? 'scale-110 -rotate-6' : ''}`}>
              🐰
            </div>
          </div>

          <p className="font-label-md text-primary mb-2 font-bold uppercase tracking-wider">
            {isPlaying ? `Singing Line ${currentLine + 1} of 4` : 'Press Sing to Practice /S/'}
          </p>

          <div className="space-y-2">
            {lines.map((line, idx) => (
              <div 
                key={idx}
                className={`p-2.5 rounded-[4px] border-[1.5px] border-[#1F2A44] font-headline-sm transition-all ${
                  isPlaying && currentLine === idx 
                    ? 'bg-[#FFDF9D] text-[#0F1B34] scale-102 shadow-[0_3px_0_#1F2A44]' 
                    : 'bg-[#FFFFFF] text-[#3D4948] opacity-75'
                }`}
              >
                {line.text}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={() => {
              soundManager.playSnakeHiss();
              soundManager.speak("Ssssss! Let's sing together!");
            }}
            className="px-4 py-2.5 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#FFF4DC] text-[#0F1B34] font-label-md hover:bg-[#FFDF9D] flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">volume_up</span>
            Hear Sasa
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleStartSinging}
              disabled={isPlaying}
              className={`px-6 py-2.5 rounded-[4px] border-[2px] border-[#1F2A44] text-[#FFFFFF] font-headline-sm flex items-center gap-2 shadow-[0_4px_0_#1F2A44] active:translate-y-1 active:shadow-[0_1px_0_#1F2A44] ${
                isPlaying ? 'bg-[#3D4948] cursor-not-allowed' : 'bg-[#FF5D35] hover:bg-[#B42801]'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">play_circle</span>
              {isPlaying ? 'Singing...' : 'Start Singing'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WordPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const WordPracticeModal: React.FC<WordPracticeModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [practicedWords, setPracticedWords] = useState<Record<string, boolean>>({
    Sun: true,
    Soup: true,
    Star: false
  });
  const [recordingWord, setRecordingWord] = useState<string | null>(null);

  if (!isOpen) return null;

  const words = [
    { word: 'Sun', emoji: '☀️', phonetic: '/sʌn/', hint: 'Keep tongue behind top teeth' },
    { word: 'Soup', emoji: '🥣', phonetic: '/suːp/', hint: 'Round lips after hissing /s/' },
    { word: 'Star', emoji: '⭐', phonetic: '/stɑːr/', hint: 'Blend /s/ and /t/ smoothly' }
  ];

  const handlePractice = (word: string) => {
    setRecordingWord(word);
    soundManager.playSnakeHiss();
    soundManager.speak(word);

    setTimeout(() => {
      setRecordingWord(null);
      setPracticedWords(prev => {
        const updated = { ...prev, [word]: true };
        const allDone = Object.values(updated).every(Boolean);
        if (allDone) {
          soundManager.playRewardChime();
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
          onComplete();
        }
        return updated;
      });
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2A44]/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-[#FAF8FF] border-[3px] border-[#1F2A44] rounded-[8px] p-6 shadow-[0_8px_0_#1F2A44]">
        <div className="flex items-center justify-between pb-4 border-b-[2px] border-[#1F2A44]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-[#006A67]">record_voice_over</span>
            <h3 className="font-headline-md text-headline-md text-[#0F1B34]">Say 3 Words Quest</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#FFF4DC] flex items-center justify-center font-bold text-[#1F2A44] hover:bg-[#FFDAD6]"
          >
            ✕
          </button>
        </div>

        <p className="font-body-md text-[#3D4948] my-3">
          Listen to the clean snake hiss sound, then practice saying the word aloud!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          {words.map((w) => {
            const isDone = practicedWords[w.word];
            const isRecording = recordingWord === w.word;
            return (
              <div 
                key={w.word}
                className={`p-4 rounded-[6px] border-[2px] border-[#1F2A44] flex flex-col items-center text-center transition-all ${
                  isRecording 
                    ? 'bg-[#FFDF9D] scale-105 shadow-[0_4px_0_#1F2A44]' 
                    : isDone 
                      ? 'bg-[#FFFFFF] shadow-[0_3px_0_#1F2A44]' 
                      : 'bg-[#FFF4DC]'
                }`}
              >
                <div className="text-4xl mb-2">{w.emoji}</div>
                <div className="font-display text-2xl text-[#0F1B34]">{w.word}</div>
                <div className="font-label-md text-sm text-[#006A67] font-mono">{w.phonetic}</div>
                <div className="text-xs text-[#3D4948] mt-1 mb-3">{w.hint}</div>

                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => soundManager.speak(w.word)}
                    className="w-full py-1.5 px-2 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#E9EDFF] hover:bg-[#D9E2FF] text-[#0F1B34] text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    Hear
                  </button>

                  <button
                    onClick={() => handlePractice(w.word)}
                    className={`w-full py-2 px-2 rounded-[4px] border-[1.5px] border-[#1F2A44] text-xs font-bold flex items-center justify-center gap-1 transition-transform ${
                      isDone 
                        ? 'bg-[#13A4A0] text-white' 
                        : 'bg-[#FF5D35] text-white hover:bg-[#B42801]'
                    }`}
                  >
                    {isRecording ? (
                      <span>Listening...</span>
                    ) : isDone ? (
                      <>
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Mastered!
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[16px]">mic</span>
                        Say it!
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#006A67] text-white font-label-md hover:bg-[#00504E]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

interface SpeechHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrint: () => void;
}

export const SpeechHelperModal: React.FC<SpeechHelperModalProps> = ({ isOpen, onClose, onOpenPrint }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const handlePlayExample = () => {
    setIsPlayingAudio(true);
    soundManager.playSnakeHiss();
    soundManager.speak("Tongue behind top teeth. Sssss! Sun! Star! Soup!");
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2A44]/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#FAF8FF] border-[3px] border-[#1F2A44] rounded-[8px] p-6 shadow-[0_8px_0_#1F2A44]">
        <div className="flex items-center justify-between pb-4 border-b-[2px] border-[#1F2A44]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-[#006A67]">family_restroom</span>
            <h3 className="font-headline-md text-headline-md text-[#0F1B34]">Speech Practice Helper</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-[4px] border-[1.5px] border-[#1F2A44] bg-[#FFF4DC] flex items-center justify-center font-bold text-[#1F2A44] hover:bg-[#FFDAD6]"
          >
            ✕
          </button>
        </div>

        {/* Visual Tongue Placement Guide */}
        <div className="my-4 p-4 bg-[#FFF4DC] border-[2px] border-[#1F2A44] rounded-[6px]">
          <h4 className="font-headline-sm text-[#006A67] flex items-center gap-1.5 mb-2">
            <span className="material-symbols-outlined text-[22px]">lightbulb</span>
            Target Technique: The Mountain Tongue /S/
          </h4>
          <p className="font-body-md text-[#3D4948] mb-3">
            To make a crisp, clear /S/ sound without a lisp:
          </p>

          <div className="space-y-2 text-sm text-[#0F1B34]">
            <div className="flex items-start gap-2 bg-[#FFFFFF] p-2.5 rounded-[4px] border-[1.5px] border-[#1F2A44]">
              <span className="w-5 h-5 rounded-full bg-[#13A4A0] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
              <span><strong>Smile with teeth lightly touching:</strong> Make a friendly smile so lips are retracted.</span>
            </div>
            <div className="flex items-start gap-2 bg-[#FFFFFF] p-2.5 rounded-[4px] border-[1.5px] border-[#1F2A44]">
              <span className="w-5 h-5 rounded-full bg-[#13A4A0] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
              <span><strong>Tongue stays behind top teeth:</strong> Place tongue tip right behind upper alveolar ridge—do not let it poke through!</span>
            </div>
            <div className="flex items-start gap-2 bg-[#FFFFFF] p-2.5 rounded-[4px] border-[1.5px] border-[#1F2A44]">
              <span className="w-5 h-5 rounded-full bg-[#13A4A0] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
              <span><strong>Blow gentle cool air:</strong> Pretend to be Sasa the Snake whispering a secret hiss: <em>"Sssss!"</em></span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handlePlayExample}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-[4px] border-[2px] border-[#1F2A44] font-label-md flex items-center justify-center gap-2 shadow-[0_3px_0_#1F2A44] ${
              isPlayingAudio ? 'bg-[#FFDF9D] text-[#0F1B34]' : 'bg-[#FFFFFF] text-[#0F1B34] hover:bg-[#F2F3FF]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px] text-[#006A67]">
              {isPlayingAudio ? 'volume_up' : 'play_arrow'}
            </span>
            {isPlayingAudio ? 'Playing Example...' : 'Listen to Example'}
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenPrint();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-[4px] border-[2px] border-[#1F2A44] bg-[#006A67] text-white font-label-md hover:bg-[#00504E] flex items-center justify-center gap-2 shadow-[0_3px_0_#1F2A44]"
          >
            <span className="material-symbols-outlined text-[20px]">print</span>
            Print Helper Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
