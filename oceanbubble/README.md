# 🐋 MOZI: Bubble Ocean - Speech-Practice Game for Children

> **"Little Words, Big Waves!"**  
> An interactive, responsive, gamified speech-practice prototype designed for young children as part of an AI-powered speech therapy platform.

---

## 🌟 Quick Start Guide

### Option 1: Instant Local Server (Recommended for Evaluation)
Open your terminal in this directory and run:
```bash
node server.js
```
Then visit: **[http://localhost:3000](http://localhost:3000)**

*(Alternatively, run `npm start` or `npm run dev`)*

### Option 2: Direct Offline Launch
Double-click `index.html` in your file explorer. It runs with complete offline assets and libraries!

---

## 🎨 Visual Design & Theme
- **Soft Pastel Underwater Palette**: Aqua blue (`#06b6d4`), turquoise (`#2dd4bf`), sky blue (`#38bdf8`), lavender (`#c084fc`), coral pink (`#f472b6`), and pearlescent gold (`#facc15`).
- **Animated Companions**:
  - **Mozi the Whale**: Interactive hero mascot with animated tail fin, swimming motion, blowhole water spouts, and joyful celebration dances.
  - **Sparky the Pink Dolphin**: Joyful cheerleader companion wearing a purple bow (`assets/fish.jpg`).
- **Underwater Palace Backdrop**: Inspired by magical coral reefs and ocean castles (`assets/seabg.jpg`).
- **Shimmering Pop-able Bubble**: Giant iridescent bubble with floating pearls (`assets/bubble.jpg`).

---

## 🕹️ Interactive Features & Gameplay Loop

### 1. Welcome Screen
- Mozi animated swimming whale with water spout.
- Big touch-friendly **PLAY GAME** button with squishy 3D styling.
- **How to Play** illustrated guide.
- **Sea Creature Sticker Album** preview.
- Sound effects toggle (🔊 / 🔇) and **Demo Mode** trigger for presentations.
- Live pearl counter with `localStorage` persistence.

### 2. Speech Practice Flow
Each round presents a beginner-friendly target sound word:
- Words: **"fish"**, **"sun"**, **"moon"**, **"ball"**, **"cat"**, **"ship"**, **"star"**, **"boat"**, **"wave"**, **"clam"**, **"crab"**, **"whale"**.
1. **Listen to Word**: Browser SpeechSynthesis (`speechSynthesis.speak`) models clear, cheerful, child-friendly articulation.
2. **Microphone Recording ("Your turn!")**: Large pulsing button records speech via `SpeechRecognition` / `webkitSpeechRecognition` with waveform visualization.
3. **Child Voice Replay**: HTML5 `MediaRecorder` lets children listen back to their recorded voice.
4. **Gentle Feedback States**:
   - 🌟 *"Amazing effort! You tried the word!"*
   - ✨ *"Great practice! Ready for another bubble?"*
   - 💖 *"Lovely try! Let's listen and practise once more."*

### 3. Bubble Pop & Pearl Economy
- After attempting the word, children tap the giant glowing iridescent bubble.
- **Pop Burst**: Particle starburst & confetti with authentic procedural bubble pop audio!
- **Flying Pearls**: 5 shimmering pearls fly across the screen into the header counter.
- **Happy Whale Dance**: Mozi flips his tail, spouts water with heart emojis, and cheers.
- Collect pearls to unlock 8 cute ocean creatures in the **Sticker Album**.

### 4. College Presentation / Panel Demonstration Mode
- **Discreet Demo Mode Toggle**: Allows panel evaluators to test the complete loop without physical microphone permissions or hardware setup:
  - **Exact Match (100%)**: Triggers major celebration fanfare.
  - **Child Phonetic Variation (~75%)**: Simulates common early phoneme substitutions (e.g., "fiss" for "fish", "thun" for "sun").
  - **Soft Retry**: Gentle prompt to listen and try again.
- **Educator & Evaluation Panel Modal**: Explains Speech & Language Therapy (SLT) pedagogy, audio-verbal modeling, technical architecture, and clinical ethical boundaries.

---

## ♿ Accessibility & Child Usability
- **High Contrast Mode**: Toggle for children with visual sensitivities.
- **Reduced Motion Mode**: Respects sensory needs by softening animations.
- **Keyboard Navigation**: Spacebar and Enter to activate recording or pop bubbles.
- **Sound Toggle**: Audio effects are optional; visual feedback ensures full playability without sound.
- **Zero-Dependency Sound**: All sound effects (pops, chimes, cheers) are generated via Web Audio API oscillators for 100% offline reliability.

---

## 📁 Project Structure
```
oceanbubble/
├── index.html            # Main game entry (standalone, offline-ready)
├── app.jsx               # React 18 component application
├── server.js             # Zero-dependency local static HTTP server
├── package.json          # Node scripts configuration
├── assets/               # Visual reference assets
│   ├── seabg.jpg         # Underwater background
│   ├── bubble.jpg        # Iridescent bubble
│   ├── fish.jpg          # Sparky the pink dolphin
│   └── ui.jpg            # UI layout reference
├── vendor/               # Bundled offline libraries (React, ReactDOM, Tailwind, Babel, Confetti)
└── src/                  # Modular TypeScript source code structure
    ├── types/
    ├── data/
    ├── services/
    └── context/
```

*Developed with love for early speech development.* 🐋✨
