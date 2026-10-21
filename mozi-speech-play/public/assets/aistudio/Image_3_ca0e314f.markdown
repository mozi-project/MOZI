---
name: Mozi Speech Studio
colors:
  surface: '#faf8ff'
  surface-dim: '#cfd9fb'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e7ff'
  surface-container-highest: '#d9e2ff'
  on-surface: '#0f1b34'
  on-surface-variant: '#3d4948'
  inverse-surface: '#25304a'
  inverse-on-surface: '#eef0ff'
  outline: '#6d7a78'
  outline-variant: '#bcc9c8'
  surface-tint: '#006a67'
  primary: '#006a67'
  on-primary: '#ffffff'
  primary-container: '#13a4a0'
  on-primary-container: '#003231'
  inverse-primary: '#60d9d4'
  secondary: '#b42801'
  on-secondary: '#ffffff'
  secondary-container: '#ff5d35'
  on-secondary-container: '#5a0f00'
  tertiary: '#785900'
  on-tertiary: '#ffffff'
  tertiary-container: '#ba8c00'
  on-tertiary-container: '#3a2900'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#7ff5f0'
  primary-fixed-dim: '#60d9d4'
  on-primary-fixed: '#00201f'
  on-primary-fixed-variant: '#00504e'
  secondary-fixed: '#ffdad2'
  secondary-fixed-dim: '#ffb4a2'
  on-secondary-fixed: '#3c0700'
  on-secondary-fixed-variant: '#8a1c00'
  tertiary-fixed: '#ffdf9d'
  tertiary-fixed-dim: '#f7be29'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5b4300'
  background: '#faf8ff'
  on-background: '#0f1b34'
  surface-variant: '#d9e2ff'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
  body-xl:
    fontFamily: Quicksand
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Quicksand
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '800'
    lineHeight: 24px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3rem
---

## Brand & Style

This design system crafts an engaging, storybook-inspired environment for early speech practice and articulation exploration. Blending mid-century printmaker charm with the tactile delight of physical picture books, the aesthetic prioritizes reassurance, playfulness, and immediate physical legibility.

### Core Principles
- **Editorial Picture-Book Tactility**: Interfaces function like screen-printed cardstock. Flat fills, heavyweight ink strokes, and solid offset shadows eliminate clinical sterility.
- **Cognitive Clarity**: Speech learners require unmistakable affordances. Every interactive target possesses exaggerated visual weight, physical press feedback, and deliberate spacing.
- **Warm Reassurance**: Grounded in creamy paper tones rather than stark device whites, reducing visual fatigue for young learners and parents during focused vocal drills.

## Colors

The palette draws directly from vintage spot-color screenprints on rich, uncoated stock. No gradients, glows, or translucency are permitted.

### Palette Architecture
- **Primary Canvas (`#FFF4DC`)**: Warm bookish cream serving as the universal viewport background.
- **Ink Navy (`#1F2A44`)**: The foundational structural color used for high-contrast outlines (3px–4px), text, icons, and solid drop shadows.
- **Primary Teal (`#13A4A0`)**: The core anchor for actionable elements, target words, and correct vocal feedback states.
- **Tomato Punch (`#F2542D`)**: High-energy secondary accent for recording toggles, active prompts, and vibrant highlights.
- **Sunny Yellow (`#FFC531`)**: Tertiary reward color for streaks, stars, and celebratory badges.
- **Leaf Green (`#6CC24A`)**: Semantic success indicator for mastered phonemes and completed practice sets.
- **Surface Canvas (`#FFFFFF`)**: Pure cardstock surface layered atop the cream canvas to frame phoneme cards and visual prompts.

## Typography

Typography prioritizes open counters, rounded terminals, and instant character distinction to support early readers and children in speech therapy.

### Hierarchy & Usage
- **Display & Headlines (`Plus Jakarta Sans`)**: Weight 800 (ExtraBold) or 700 (Bold). Delivers punchy, friendly authority for phoneme prompts, celebration cheers, and lesson milestones.
- **Body & Prompts (`Quicksand`)**: Set at a minimum of 20px (`body-lg`) on child-facing interfaces to preserve legibility at arm's length on tablets or phone stands. The rounded, geometric qualities mirror primary printing workbooks.
- **Labels (`Plus Jakarta Sans`)**: High-contrast, bold caps or title casing used strictly for interactive pill buttons and status tokens.

## Layout & Spacing

Layouts rely on generous breathing room and robust hit boundaries to accommodate motor-skill variances in developing children.

### Spatial Rhythm
- **Rhythm Model**: Built upon an 8px baseline matrix, expanding outward to spacious touch targets (minimum 56px interactive height).
- **Grid Layout**: A responsive 8-column layout on tablet/desktop displays and a 4-column layout on mobile devices.
- **Section Dividers**: Instead of hairline rules, modules and sections terminate in bold 3px ink strokes, wavy screenprint lines, or gentle scallop cuts that reinforce the bookbound motif.

## Elevation & Depth

Depth in this design system rejects photographic softness, blur radii, and diffuse lighting models in favor of hard-edged, physical pop-out book construction.

### The Physical Ink Elevation Model
- **Level 0 (Flat Ground)**: Baseline `#FFF4DC` canvas. No shadow.
- **Level 1 (Card & Content Blocks)**: Surface `#FFFFFF` bordered with `3px solid #1F2A44` and a firm directional offset shadow: `box-shadow: 0 4px 0 #1F2A44`.
- **Level 2 (Tactile Buttons & Chips)**: Interactive solid-color fills bordered with `3px solid #1F2A44` and an amplified tactile shadow: `box-shadow: 0 5px 0 #1F2A44`.
- **Level 3 (Modals & Spotlight Overlays)**: Prominent prompt sheets and celebratory reward dialogs: `box-shadow: 0 8px 0 #1F2A44` with a `4px solid #1F2A44` perimeter border.
- **Active State (Mechanical Press)**: On `:active` or button tap, the component translates vertically by `3px` to `4px`, collapsing the drop shadow to `0 1px 0 #1F2A44` to mimic a mechanical stamp.

## Shapes

The geometric framework balances child-safe softness with structured, deliberate contours.

### Corner Radii Guidelines
- **Core Standard (`roundedness: 2`)**: Base radius `0.5rem` (8px) for minor badges and inline chips.
- **Cards & Prompts (`rounded-lg` / `rounded-xl`)**: Cards scale up to `1.5rem` (24px) corner radii, complementing the heavyweight 3px ink stroke.
- **Action Buttons & Vocal Pills**: Utilize complete semicircular rounded caps (full pill / 9999px) for friendly handability.

## Components

### Buttons
- **Primary Action (Record / Listen)**: Pill-shaped (`rounded-full`), minimum 60px height. Background `#13A4A0` (Teal) or `#F2542D` (Tomato Red), text `#FFFFFF`, border `3px solid #1F2A44`, shadow `0 5px 0 #1F2A44`. Active state uses `transform: translateY(4px)` and `box-shadow: 0 1px 0 #1F2A44`.
- **Secondary Action**: Pill-shaped, background `#FFF4DC` with text `#1F2A44`, border `3px solid #1F2A44`, shadow `0 4px 0 #1F2A44`.

### Cards & Speech Prompt Tiles
- **Phoneme / Picture Card**: `#FFFFFF` background, `24px` border-radius, `3px solid #1F2A44` outer stroke, `box-shadow: 0 6px 0 #1F2A44`. Padding `1.5rem`.
- **Active Focus Card**: Highlighted with a `#FFC531` (Sunny Yellow) backplate or header strip, signaling the child's turn to vocalize.

### Chips & Filters
- **Sound Filters (e.g., "S-Blends", "R-Sounds")**: Pill-shaped badges, `2px solid #1F2A44`, background `#FFF4DC`, text `#1F2A44`. When selected, background shifts to `#13A4A0` with text `#FFFFFF` and a tight solid shadow `0 2px 0 #1F2A44`.

### Input & Target Fields
- **Child-Friendly Inputs**: Generous padding (`space-md`), `16px` border-radius, `3px solid #1F2A44`, background `#FFFFFF`. Focus indicators replace traditional glows with a thick inset border or a high-contrast `#13A4A0` background transition.

### Audio Waveform & Speech Visualizer
- **Voice Response Track**: Rendered with solid vertical bars in alternating `#13A4A0` and `#F2542D`, each capped with rounded pill tips and enclosed in a bordered `#FFFFFF` sound box.