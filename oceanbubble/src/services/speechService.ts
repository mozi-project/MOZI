import { PronunciationResult, FeedbackLevel } from '../types';

// Web Speech API interface augmentation
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

// Levenshtein Distance similarity (0 to 100)
export function computeStringSimilarity(str1: string, str2: string): number {
  const s1 = str1.trim().toLowerCase();
  const s2 = str2.trim().toLowerCase();

  if (s1 === s2) return 100;
  if (s1.length === 0 || s2.length === 0) return 0;

  // Check if s1 contains s2 or vice versa
  if (s1.includes(s2) || s2.includes(s1)) {
    const longer = Math.max(s1.length, s2.length);
    const shorter = Math.min(s1.length, s2.length);
    return Math.round((shorter / longer) * 90);
  }

  const matrix: number[][] = [];
  for (let i = 0; i <= s1.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= s2.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  const distance = matrix[s1.length][s2.length];
  const maxLen = Math.max(s1.length, s2.length);
  const similarity = Math.max(0, Math.round((1 - distance / maxLen) * 100));
  return similarity;
}

export function evaluatePronunciation(transcript: string, targetWord: string, isSimulated = false): PronunciationResult {
  const cleanTranscript = transcript.trim().toLowerCase();
  const cleanTarget = targetWord.trim().toLowerCase();

  const isExact = cleanTranscript === cleanTarget;
  const isContained = cleanTranscript.includes(cleanTarget);
  const similarity = isExact ? 100 : isContained ? 85 : computeStringSimilarity(cleanTranscript, cleanTarget);

  let feedbackMessage: string;
  let feedbackLevel: FeedbackLevel;

  // Match if exact or >= 65% similarity
  const isMatch = isExact || similarity >= 65;

  if (isMatch) {
    feedbackMessage = "Amazing effort! You said the word!";
    feedbackLevel = 'excellent';
  } else {
    feedbackMessage = "Lovely try! Let's say it together.";
    feedbackLevel = 'encourage';
  }

  return {
    transcript,
    targetWord,
    similarity,
    isMatch,
    feedbackMessage,
    feedbackLevel,
    isSimulated
  };
}

export class SpeechRecorderService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private recognition: any = null;
  private isRecognizing: boolean = false;

  public isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    const win = window as unknown as IWindow;
    return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
  }

  public isMicrophoneSupported(): boolean {
    return typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
  }

  // Start recording child's speech using both Recognition (if available) and MediaRecorder (for playback)
  public async startListening(
    onResult: (result: PronunciationResult) => void,
    onError: (err: string) => void,
    targetWord: string
  ): Promise<void> {
    this.audioChunks = [];

    // 1. Setup MediaRecorder for child playback
    if (this.isMicrophoneSupported()) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(this.stream);
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.audioChunks.push(event.data);
          }
        };
        this.mediaRecorder.start();
      } catch (err: any) {
        console.warn('Microphone stream error:', err);
        // We will continue if recognition might work or delegate to error
      }
    }

    // 2. Setup SpeechRecognition
    const win = window as unknown as IWindow;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      try {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 3;

        this.recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          const evaluation = evaluatePronunciation(transcript, targetWord, false);
          onResult(evaluation);
        };

        this.recognition.onerror = (event: any) => {
          console.warn('SpeechRecognition error:', event.error);
          if (event.error === 'no-speech') {
            onError('We didn\'t hear a sound. Let\'s try saying it nice and clear!');
          } else if (event.error === 'not-allowed') {
            onError('Microphone access was blocked. You can still test with Demo Mode!');
          } else {
            onError(`Recognition notice: ${event.error}. You can use Demo Mode anytime!`);
          }
        };

        this.recognition.onend = () => {
          this.isRecognizing = false;
        };

        this.recognition.start();
        this.isRecognizing = true;
      } catch (e: any) {
        console.warn('Speech recognition init error:', e);
      }
    } else {
      // Graceful fallback when SpeechRecognition is absent (e.g. Firefox)
      // Provide simulated fallback attempt with media recorder audio playback
      setTimeout(() => {
        // Will be completed on stopListening
      }, 500);
    }
  }

  // Stop recording and retrieve child voice audio Blob
  public async stopListening(): Promise<string | undefined> {
    if (this.recognition && this.isRecognizing) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
      this.isRecognizing = false;
    }

    return new Promise((resolve) => {
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);

          // Stop all audio tracks
          if (this.stream) {
            this.stream.getTracks().forEach((track) => track.stop());
            this.stream = null;
          }
          resolve(audioUrl);
        };
        this.mediaRecorder.stop();
      } else {
        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
          this.stream = null;
        }
        resolve(undefined);
      }
    });
  }

  // Generate simulated demo result for presentations & offline testing
  public generateSimulatedResult(targetWord: string, scenario: 'match' | 'close' | 'retry'): PronunciationResult {
    let transcript = targetWord;
    if (scenario === 'close') {
      // Simulate close childish phonetic variation (e.g. "fiss" for "fish", "thun" for "sun")
      const variations: Record<string, string> = {
        fish: 'fiss',
        sun: 'thun',
        moon: 'moom',
        ball: 'bawl',
        cat: 'tat',
        ship: 'sip',
        star: 'tar',
        boat: 'pote',
        wave: 'way',
        clam: 'tam',
        crab: 'twab',
        whale: 'wayl'
      };
      transcript = variations[targetWord.toLowerCase()] || `${targetWord}y`;
    } else if (scenario === 'retry') {
      transcript = 'bloop';
    }

    return evaluatePronunciation(transcript, targetWord, true);
  }
}

export const speechRecorder = new SpeechRecorderService();
