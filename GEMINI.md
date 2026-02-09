# GEMINI.md — ML Experiment Autopilot Demo Video

This file is the single source of truth for building the Devpost demo video for the **ML Experiment Autopilot** project using Remotion. Every section is written so that an AI coding agent (Gemini, Claude Code, Cursor, etc.) working inside this Remotion project can read this file and produce correct, complete output without additional context.

---

## 1. Project Context

### The Product Being Demoed

**ML Experiment Autopilot** ([github.com/srikar161720/ml-experiment-autopilot](https://github.com/srikar161720/ml-experiment-autopilot)) is a Python CLI tool that autonomously designs, executes, and iterates on machine learning experiments. It is submitted to the **Gemini 3 Hackathon** on Devpost ([gemini3.devpost.com](https://gemini3.devpost.com/)).

Key details about the product:

- **Language / Stack:** Python 3.9+, Typer CLI, Rich terminal UI, Jinja2 templates, MLflow tracking, Pydantic state models.
- **AI integration:** Google Gemini 3 API with Thought Signatures — temperature fixed at 1.0, multi-turn conversation for reasoning continuity across iterations.
- **Architecture layers:**
  - `src/cognitive/` — `GeminiClient`, `ExperimentDesigner`, `ResultsAnalyzer`, `HypothesisGenerator`, `ReportGenerator`
  - `src/orchestration/` — `ExperimentController` (main loop), `ExperimentState` (state machine)
  - `src/execution/` — `DataProfiler`, `CodeGenerator`, `ExperimentRunner` (subprocess), `VisualizationGenerator`
  - `templates/` — Jinja2 templates for sklearn, XGBoost, LightGBM experiments
- **Autonomous loop:** Data Profiling → Baseline → (Design → Generate Code → Execute → Analyze Results → Generate Hypotheses) × N → Final Report
- **Demo datasets:** California Housing regression, Titanic classification
- **Primary CLI command:**
  ```
  python -m src.main run --data <csv> --target <col> --task <regression|classification> --max-iterations <N> --verbose
  ```

### Submission Requirements

| Rule | Constraint |
|------|-----------|
| Max duration | 3 minutes. Only the first 3 minutes are evaluated. |
| Language | English, or include English subtitles. |
| Content | Must include footage showing the project functioning on the platform it was built for (i.e., the terminal / CLI). |

### What This Project Is

This is a **separate Remotion (React) project** that generates the demo video as an MP4. It is not part of the ML Autopilot Python repo. We use **Remotion** to programmatically compose animated scenes and embed pre-recorded terminal footage into a polished video.

---

## 2. Demo Video Overview

The video is 3 minutes 0 seconds (5,400 frames at 30 fps), using the full 3-minute limit. It consists of 8 scenes: animated title/explanation cards surrounding a **55-second embedded terminal recording** that is the centerpiece of the demo, plus a **15-second report scroll** clip and an **11-second MLflow UI** clip in the results scene. All clips have been manually pre-trimmed and require no additional trimming. The CLI arguments are visible in the terminal recording itself via the autopilot's built-in help screen.

**Tooling:**

- **Remotion** — React framework for programmatic video creation
- **`@remotion/media`** — Embedding `.mp4` terminal recordings via `<Video>`
- **`@remotion/google-fonts`** — Loading Inter font
- **`@remotion/transitions`** — Fade transitions between scenes (optional polish)
- **Remotion Agent Skills** — Installed to `.claude/skills/` for AI-assisted development
- **Render:** `npx remotion render MLAutopilotDemo out/demo.mp4`

---

## 3. Project File Tree

```
ml-autopilot-demo-video/
├── GEMINI.md                          # This file
├── package.json
├── tsconfig.json
├── remotion.config.ts
│
├── public/
│   ├── clips/
│   │   ├── regression-demo.mp4        # Hero recording: California Housing regression run (verbose, 3 iterations) [55 sec, pre-trimmed]
│   │   ├── report-scroll.mp4          # Scrolling through generated Markdown report [15 sec, pre-trimmed]
│   │   └── mlflow-ui.mp4              # MLflow UI walkthrough in browser [11 sec, pre-trimmed]
│   └── images/                        # Optional static images (logos, icons)
│
├── src/
│   ├── Root.tsx                        # RemotionRoot — registers the MLAutopilotDemo composition
│   ├── DemoVideo.tsx                   # Top-level component composing all scenes with <Sequence>
│   │
│   ├── scenes/
│   │   ├── TitleScene.tsx              # Scene 1: Project name + tagline
│   │   ├── ProblemScene.tsx            # Scene 2: Pain points of manual ML experimentation
│   │   ├── SolutionScene.tsx           # Scene 3: Architecture / autonomous loop diagram
│   │   ├── GeminiScene.tsx             # Scene 4: Thought Signatures explanation
│   │   ├── CLIDemoScene.tsx            # Scene 5: Embedded terminal recording (hero scene)
│   │   ├── ResultsScene.tsx            # Scene 6: Report scroll + MLflow UI clip + animated metrics
│   │   ├── TechStackScene.tsx          # Scene 7: Technology badges grid
│   │   └── OutroScene.tsx              # Scene 8: Closing card with GitHub URL
│   │
│   ├── components/
│   │   ├── AnimatedBullet.tsx          # Reusable bullet point with slide-in + fade
│   │   ├── StatCard.tsx                # Count-up metric card
│   │   ├── TechBadge.tsx              # Rounded pill badge for tech stack
│   │   └── TerminalWindow.tsx          # Terminal chrome wrapper (title bar, dots)
│   │
│   └── lib/
│       ├── constants.ts                # Colors, font sizes, timing presets, frame offsets
│       └── fonts.ts                    # Font loading (Inter via @remotion/google-fonts)
│
└── .claude/
    └── skills/                         # Remotion Agent Skills (auto-installed)
```

---

## 4. Style Guide & Design Tokens

### Composition Globals

| Parameter | Value |
|-----------|-------|
| Width | 1920 |
| Height | 1080 |
| FPS | 30 |
| Total frames | 5400 |
| Total duration | 3:00 |
| Composition ID | `MLAutopilotDemo` |

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `BG_PRIMARY` | `#0f0f23` | Default scene background |
| `BG_SECONDARY` | `#1a1a3e` | Gradient endpoint, card backgrounds |
| `ACCENT` | `#4fc3f7` | Primary accent — titles, borders, highlights |
| `ACCENT_GREEN` | `#39E508` | Success / positive indicators |
| `ACCENT_RED` | `#ef4444` | Negative / "before" indicators |
| `TEXT_PRIMARY` | `#ffffff` | Headings, primary text |
| `TEXT_SECONDARY` | `#cccccc` | Subtitles, body text |
| `TEXT_MUTED` | `#888888` | Tertiary labels, timestamps |
| `CARD_BG` | `#1e1e3a` | Card/box background |
| `CARD_BORDER` | `#4fc3f7` at 40% opacity | Card borders |
| `TERMINAL_BG` | `#1e1e1e` | Terminal window body |
| `TERMINAL_BAR` | `#262626` | Terminal title bar |

### Typography

Load **Inter** via `@remotion/google-fonts/Inter` with weights `400` and `700`, subset `latin`.

| Role | Size (px) | Weight | Color |
|------|-----------|--------|-------|
| Scene heading | 72 | 700 | `TEXT_PRIMARY` |
| Main title (Scene 1 only) | 88 | 700 | `ACCENT` |
| Subtitle | 36 | 400 | `TEXT_SECONDARY` |
| Body / bullet text | 32 | 400 | `TEXT_SECONDARY` |
| Stat number | 64 | 700 | `ACCENT` |
| Badge label | 24 | 700 | `TEXT_PRIMARY` |
| Muted label | 20 | 400 | `TEXT_MUTED` |

### Animation Presets

Define these in `src/lib/constants.ts`:

```ts
export const SPRING_SMOOTH = { damping: 200 };
export const SPRING_SNAPPY = { damping: 20, stiffness: 200 };
export const SPRING_BOUNCY = { damping: 8 };
```

### Critical Remotion Rules

1. **All animations MUST use `useCurrentFrame()` + `interpolate()` or `spring()`.** CSS transitions, CSS keyframe animations, and Tailwind animation classes are **forbidden** — they do not render correctly in Remotion.
2. Inside a `<Sequence>`, `useCurrentFrame()` returns the **local** frame starting from 0, not the global frame.
3. Always add `premountFor={30}` (1 second) to `<Sequence>` components so children can pre-load.
4. Use `extrapolateRight: 'clamp'` on interpolations to prevent values overshooting.
5. Use `<AbsoluteFill>` as the root container within each scene.

---

## 5. Scene Breakdown & Timeline

| # | Scene | Time | Frames | Duration | Key Technique |
|---|-------|------|--------|----------|---------------|
| 1 | Title | 0:00–0:10 | 0–300 | 300 | `spring()` entrance, `interpolate()` fade |
| 2 | Problem | 0:10–0:30 | 300–900 | 600 | Staggered `<Sequence>` bullets with slide+fade |
| 3 | Solution | 0:30–0:50 | 900–1500 | 600 | Animated architecture diagram, spring-in boxes |
| 4 | Gemini | 0:50–1:05 | 1500–1950 | 450 | Animated comparison cards, glowing thread |
| 5 | **CLI Demo** | **1:05–2:00** | **1950–3600** | **1650** | **`<Video>` embed, pre-trimmed clip (55 sec)** |
| 6 | Results | 2:00–2:40 | 3600–4800 | 1200 | Report scroll clip (15 sec) + MLflow clip (11 sec) + count-up stat cards (14 sec) |
| 7 | Tech Stack | 2:40–2:50 | 4800–5100 | 300 | Staggered badge grid fade-in |
| 8 | Outro | 2:50–3:00 | 5100–5400 | 300 | Spring entrance, fade-out in final 60 frames |

---

## 6. Scene-by-Scene Specifications

### Scene 1 — Title (frames 0–300)

- **Background:** Solid `BG_PRIMARY`.
- **Elements:**
  - Main title: `"ML Experiment Autopilot"` — `spring()` with `SPRING_SMOOTH` config, translating from `+60px` to `0` on Y axis. Font: 88px bold `ACCENT`.
  - Subtitle: `"Autonomous ML experimentation powered by Gemini 3"` — `interpolate()` opacity 0→1 over frames 45–90. Font: 36px `TEXT_SECONDARY`.
  - Track label: `"Gemini 3 Hackathon · The Marathon Agent Track"` — `interpolate()` opacity 0→1 over frames 75–120. Font: 20px `TEXT_MUTED`. Positioned near bottom.
- **Layout:** All centered vertically and horizontally using `AbsoluteFill` + flexbox column.

### Scene 2 — Problem (frames 300–900)

- **Background:** Solid `BG_PRIMARY`.
- **Heading:** `"The Problem with ML Experimentation"` — fades in over first 30 frames. 72px bold `TEXT_PRIMARY`.
- **Bullets** (appear staggered, each starting 90 frames after the previous):
  1. `"Traditional AutoML tools are Black boxes with no hypothesis testing"`
  2. `"Manual experiment design is slow and biased toward familiar approaches"`
  3. `"Trial-and-error wastes compute without learning from failures"`
  4. `"No reasoning continuity — each experiment starts from scratch"`
  5. `"Results analysis is ad-hoc, missing cross-iteration patterns"`
- **Animation per bullet:** Slide from left (`translateX: -40px → 0`) + fade (`opacity: 0 → 1`) over 45 frames using `interpolate()` with `Easing.out(Easing.quad)`. Use `<Sequence from={...}>` for each.
- **Bullet marker:** Small `ACCENT`-colored square or circle before each line.

### Scene 3 — Solution / Architecture (frames 900–1500)

- **Background:** Solid `BG_PRIMARY`.
- **Heading:** `"The Autonomous Loop"` — fade in, 72px bold `TEXT_PRIMARY`.
- **Diagram:** 6 boxes arranged in a circular or rounded-rectangle loop:
  1. `"📊 Data Profiler"` → `"🧠 Experiment Designer"` → `"⚙️ Code Generator"` → `"🏃 Experiment Runner"` → `"📈 Results Analyzer"` → `"💡 Hypothesis Generator"` → (arrow back to #2)
- **Box style:** `CARD_BG` background, `CARD_BORDER` border, rounded corners (12px), padding 16px 24px. Each box `spring()`-animates in (scale 0→1) staggered by 60 frames.
- **Center label:** `"ExperimentController"` in `ACCENT` with a subtle pulsing opacity (use `interpolate()` with a sine-like input range, **not CSS animation**) after all boxes appear.
- **Arrows:** Thin lines or `→` characters between boxes, fade in after each box pair is visible.

### Scene 4 — Gemini Integration (frames 1500–1950)

- **Background:** Solid `BG_PRIMARY`.
- **Heading:** `"Powered by Gemini 3 Thought Signatures"` — fade in, 72px bold `TEXT_PRIMARY`.
- **Visual:** 3 rounded boxes in a horizontal row labeled `"Iteration 1"`, `"Iteration 2"`, `"Iteration 3"`. Connected by a horizontal line/thread.
  - Boxes: `spring()` entrance staggered by 45 frames.
  - Thread: A line between them that "glows" from left to right using `interpolate()` on a gradient or width fill.
- **Comparison cards** (appear after thread animation, staggered by 30 frames):
  - Left card (dimmed, `ACCENT_RED` tinted border): `"Standard LLM"` / `"Each call starts fresh — no memory"`
  - Right card (bright, `ACCENT_GREEN` tinted border): `"Thought Signatures"` / `"Reasoning compounds across all iterations"`
- **Below:** Small text: `"Temperature fixed at 1.0 · Multi-turn conversation · Hypothesis-driven"` — fade in last. Font: 20px `TEXT_MUTED`.

### Scene 5 — CLI Demo (frames 1950–3600) ⭐ HERO SCENE

This is the most important scene. It satisfies the Devpost requirement to show the project running on its target platform. The CLI arguments are visible in the terminal recording itself — the autopilot's built-in help screen displays all available arguments before the run begins.

- **Background:** Solid `BG_PRIMARY`.
- **Heading:** `"Live Demo: California Housing Regression"` — fade in over 30 frames. 48px bold `TEXT_PRIMARY`. Positioned at top, 40px from top edge.
- **Terminal window:** A `TerminalWindow` component wrapper:
  - Title bar: `TERMINAL_BAR` background, 36px height, 3 dots (red/yellow/green circles, 12px diameter) on the left, window title `"python -m src.main run ..."` centered in `TEXT_MUTED`.
  - Body: `TERMINAL_BG` background, rounded bottom corners (12px).
  - Width: 88% of composition width, centered horizontally. Height: fill remaining space below heading with 40px padding.
- **Video embed:** `<Video>` from `@remotion/media`. The clip is pre-trimmed to exactly 55 seconds — no `trimBefore` or `trimAfter` needed:
  ```tsx
  <Video
    src={staticFile("clips/regression-demo.mp4")}
    muted
    style={{ width: "100%", height: "100%", objectFit: "contain" }}
  />
  ```

### Scene 6 — Results (frames 3600–4800)

Split into three parts using nested `<Sequence>` blocks.

**First part (frames 0–450 local, i.e., 3600–4050 global):**
- Heading: `"Generated Experiment Report"` — 48px bold `TEXT_PRIMARY`.
- Embed `<Video src={staticFile("clips/report-scroll.mp4")} />` — the clip is pre-trimmed to exactly 15 seconds, no `trimBefore` or `trimAfter` needed. Do **not** wrap the clip in any `TerminalWindow`-like chrome or window wrapper. Simply embed the video directly with 12px rounded corners on all 4 corners:
  ```tsx
  <Video
    src={staticFile("clips/report-scroll.mp4")}
    muted
    style={{
      width: "88%",
      height: "auto",
      objectFit: "contain",
      borderRadius: "12px",
    }}
  />
  ```

**Second part (frames 450–780 local, i.e., 4050–4380 global):**
- Heading: `"Track Every Experiment in MLflow"` — 48px bold `TEXT_PRIMARY`.
- Embed `<Video src={staticFile("clips/mlflow-ui.mp4")} />` — the clip is pre-trimmed to exactly 11 seconds, no `trimBefore` or `trimAfter` needed. Wrap in `TerminalWindow`-like chrome styled as a browser window (address bar showing `http://127.0.0.1:5000`).

**Third part (frames 780–1200 local, i.e., 4380–4800 global):**
- Heading: `"Experiment Results"` — 48px bold `TEXT_PRIMARY`.
- 3 `StatCard` components in a horizontal row:
  - `"Best RMSE"` → count up to `0.133` over 60 frames using `interpolate()` (display with 3 decimal places, e.g., `value.toFixed(3)`).
  - `"Improvement"` → count up to `82.1%` over 60 frames using `interpolate()` (display with 1 decimal place + `%`).
  - `"Experiments Run"` → count up to `3` over 30 frames using `interpolate()` + `Math.round()`.
- Stat cards: `CARD_BG` background, `CARD_BORDER`, number in 64px bold `ACCENT`, label in 20px `TEXT_MUTED`.

### Scene 7 — Tech Stack (frames 4800–5100)

- **Background:** Solid `BG_PRIMARY`.
- **Heading:** `"Built With"` — fade in, 72px bold `TEXT_PRIMARY`.
- **Badge grid:** 2 rows × 4 columns of `TechBadge` components. Stagger each badge fade-in by 8 frames:
  1. `"✨ Gemini 3 API"`
  2. `"🐍 Python 3.9+"`
  3. `"📊 Scikit-learn"`
  4. `"🚀 XGBoost / LightGBM"`
  5. `"📈 MLflow"`
  6. `"🎨 Rich (Terminal UI)"`
  7. `"📐 Pydantic"`
  8. `"📝 Jinja2 Templates"`
- **Badge style:** `CARD_BG` background, `CARD_BORDER`, rounded-full (pill shape, `borderRadius: 9999px`), padding `8px 20px`, font 24px bold `TEXT_PRIMARY`.

### Scene 8 — Outro (frames 5100–5400)

- **Background:** Linear gradient from `BG_PRIMARY` (top) to `BG_SECONDARY` (bottom). Implement with a `<div>` and inline `background: linear-gradient(...)` — this is static CSS, not an animation, so it is safe.
- **Elements (all centered):**
  - Title: `"ML Experiment Autopilot"` — `spring()` with `SPRING_SMOOTH`, 80px bold `ACCENT`.
  - GitHub URL: `"github.com/srikar161720/ml-experiment-autopilot"` — `interpolate()` fade-in starting at local frame 30. Font: 28px `TEXT_SECONDARY`.
  - Hackathon label: `"Gemini 3 Hackathon 2026 · The Marathon Agent Track"` — fade-in at local frame 60. Font: 22px `TEXT_MUTED`.
- **Exit animation:** In the final 60 frames (local frames 240–300), fade all elements to opacity 0 and scale to 0.98 using `interpolate()`.

---

## 7. Pre-Recorded Clip Requirements

All clips have been manually pre-trimmed and are ready to use as-is. No additional trimming is needed in Remotion. Use a dark terminal theme, font size 16–18pt, 1920×1080 screen resolution.

| Filename | Command / Action | Duration | Notes |
|----------|-----------------|----------|-------|
| `regression-demo.mp4` | `python -m src.main run --data data/sample/california_housing.csv --target MedHouseVal --task regression --max-iterations 3 --verbose` | 55 sec (pre-trimmed) | The hero clip. Captures all phases: profiling, baseline, iterations, summary. Uses the California Housing dataset. The CLI help screen with all arguments is visible at the start of the recording. |
| `report-scroll.mp4` | Open the generated Markdown report (from `outputs/reports/`) in VS Code or a browser and slowly scroll through it top-to-bottom | 15 sec (pre-trimmed) | Shows the report title, summary section, iteration details, and final recommendations. Already includes all necessary window elements in the clip itself. |
| `mlflow-ui.mp4` | Launch `mlflow ui --backend-store-uri file:./outputs/mlruns`, browse experiments in browser | 11 sec (pre-trimmed) | Shows experiment list, click into one run, show metrics. |

**Recording tips:**
- Use OBS Studio or QuickTime for screen capture.
- Set terminal to a dark theme (e.g., Dracula, Tokyo Night) — it should visually match the `TERMINAL_BG` color.
- Clear the terminal before recording. The first visible thing should be the command being typed or run.
- Rich-formatted output will render automatically since the CLI uses the Rich library.
- For the report scroll recording, use a dark-themed editor or Markdown preview. Scroll smoothly and slowly enough for text to be legible in the final video.

---

## 8. Remotion Technical Reference

Concise cheat-sheet for the APIs used in this project. For full details, see the skill files in `.claude/skills/`.

### Composition Registration (`src/Root.tsx`)

```tsx
import { Composition } from "remotion";
import { DemoVideo } from "./DemoVideo";

export const RemotionRoot = () => (
  <Composition
    id="MLAutopilotDemo"
    component={DemoVideo}
    durationInFrames={5400}
    fps={30}
    width={1920}
    height={1080}
  />
);
```

### Scene Sequencing (`src/DemoVideo.tsx`)

```tsx
import { AbsoluteFill, Sequence } from "remotion";

export const DemoVideo: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={300} premountFor={30}><TitleScene /></Sequence>
    <Sequence from={300} durationInFrames={600} premountFor={30}><ProblemScene /></Sequence>
    <Sequence from={900} durationInFrames={600} premountFor={30}><SolutionScene /></Sequence>
    <Sequence from={1500} durationInFrames={450} premountFor={30}><GeminiScene /></Sequence>
    <Sequence from={1950} durationInFrames={1650} premountFor={30}><CLIDemoScene /></Sequence>
    <Sequence from={3600} durationInFrames={1200} premountFor={30}><ResultsScene /></Sequence>
    <Sequence from={4800} durationInFrames={300} premountFor={30}><TechStackScene /></Sequence>
    <Sequence from={5100} durationInFrames={300} premountFor={30}><OutroScene /></Sequence>
  </AbsoluteFill>
);
```

### Animation Patterns

**Fade-in:**
```tsx
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
```

**Spring entrance:**
```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();
const progress = spring({ frame, fps, config: { damping: 200 } });
const translateY = interpolate(progress, [0, 1], [50, 0]);
```

**Staggered items:**
```tsx
{items.map((item, i) => (
  <Sequence key={i} from={i * 90} premountFor={30}>
    <AnimatedBullet text={item} />
  </Sequence>
))}
```

**Count-up number:**
```tsx
const frame = useCurrentFrame();
const value = interpolate(frame, [0, 60], [0, targetValue], { extrapolateRight: "clamp" });
return <span>{Math.round(value).toLocaleString()}</span>;
```

### Embedding Video

```tsx
import { Video } from "@remotion/media";
import { staticFile } from "remotion";

<Video
  src={staticFile("clips/regression-demo.mp4")}
  muted
  style={{ width: "100%", height: "100%", objectFit: "contain" }}
/>
```

### Font Loading (`src/lib/fonts.ts`)

```tsx
import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});
```

Use `fontFamily` in all component styles: `style={{ fontFamily }}`.

---

## 9. Build Phases & Progress Checklist

### Phase 0 — Pre-Production
- [x] Record `regression-demo.mp4` (California Housing regression, verbose, 3 iterations — includes help screen with CLI arguments) [55 sec, pre-trimmed]
- [x] Record `report-scroll.mp4` (generated Markdown report scroll-through) [15 sec, pre-trimmed]
- [x] Record `mlflow-ui.mp4` (MLflow UI walkthrough) [11 sec, pre-trimmed]
- [x] All clips manually pre-trimmed — no additional trimming needed in Remotion

### Phase 1 — Project Setup
- [ ] Scaffold project: `npx create-video@latest` (Blank template, TailwindCSS, Skills)
- [ ] Install extra packages: `npx remotion add @remotion/media @remotion/google-fonts`
- [ ] Optionally install: `npx remotion add @remotion/transitions` (for scene-to-scene fades)
- [ ] Copy `.mp4` clips into `public/clips/`
- [ ] Create `src/lib/constants.ts` with all design tokens from Section 4
- [ ] Create `src/lib/fonts.ts` with Inter font loading
- [ ] Verify Studio runs: `npm run dev`

### Phase 2 — Build Scenes (one at a time, verify each in Studio)
- [ ] Scene 1: `TitleScene.tsx`
- [ ] Scene 2: `ProblemScene.tsx` + `AnimatedBullet.tsx`
- [ ] Scene 3: `SolutionScene.tsx`
- [ ] Scene 4: `GeminiScene.tsx`
- [ ] Scene 5: `CLIDemoScene.tsx` + `TerminalWindow.tsx` ⭐
- [ ] Scene 6: `ResultsScene.tsx` + `StatCard.tsx`
- [ ] Scene 7: `TechStackScene.tsx` + `TechBadge.tsx`
- [ ] Scene 8: `OutroScene.tsx`

### Phase 3 — Compose & Integrate
- [ ] Create `src/DemoVideo.tsx` composing all scenes with `<Sequence>`
- [ ] Register composition in `src/Root.tsx`
- [ ] Scrub through full video in Studio — check timing, visual flow

### Phase 4 — Polish (optional)
- [ ] Add fade transitions between scenes using `@remotion/transitions`
- [ ] Add narration audio via `<Audio>` from `@remotion/media` (if recorded)
- [ ] Add captions via `@remotion/captions` with `createTikTokStyleCaptions()` (if narrating)
- [ ] Fine-tune spring configs, timing, text content
- [ ] Test full playback at 1× speed in Studio

### Phase 5 — Render & Export
- [ ] Render: `npx remotion render MLAutopilotDemo out/demo.mp4 --codec=h264`
- [ ] Verify output: duration ≤ 3:00, resolution 1920×1080, audio (if any) plays correctly
- [ ] Watch the full video end-to-end
- [ ] Upload to Devpost

---

## 10. Render & Export

### Preview
```bash
npm run dev
# Opens Remotion Studio at http://localhost:3000
```

### Render Final MP4
```bash
# Standard render
npx remotion render MLAutopilotDemo out/demo.mp4

# Higher quality (lower CRF = higher quality, larger file)
npx remotion render MLAutopilotDemo out/demo.mp4 --codec=h264 --crf=18
```

### Verify Checklist
- [ ] File plays in VLC / QuickTime without issues
- [ ] Duration is exactly 3:00 (5400 frames at 30 fps)
- [ ] Terminal footage is clearly legible (text is readable)
- [ ] No black frames or visual glitches at scene boundaries
- [ ] All text is in English