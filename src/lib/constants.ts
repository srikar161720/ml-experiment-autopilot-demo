import { SpringConfig } from "remotion";

export const COMPOSITION_WIDTH = 1920;
export const COMPOSITION_HEIGHT = 1080;
export const COMPOSITION_FPS = 30;
export const COMPOSITION_DURATION_IN_FRAMES = 5400; // 3 minutes

export const COLORS = {
  BG_PRIMARY: "#0f0f23",
  BG_SECONDARY: "#1a1a3e",
  ACCENT: "#4fc3f7",
  ACCENT_GREEN: "#39E508",
  ACCENT_RED: "#ef4444",
  TEXT_PRIMARY: "#ffffff",
  TEXT_SECONDARY: "#cccccc",
  TEXT_MUTED: "#888888",
  CARD_BG: "#1e1e3a",
  CARD_BORDER: "rgba(79, 195, 247, 0.4)", // #4fc3f7 at 40% opacity
  TERMINAL_BG: "#1d1d1d",
  TERMINAL_BAR: "#282828",
};

export const FONT_SIZES = {
  SCENE_HEADING: 100,
  MAIN_TITLE: 176,
  SUBTITLE: 72,
  BODY_TEXT: 40,
  STAT_NUMBER: 64,
  BADGE_LABEL: 28,
  MUTED_LABEL: 20,
};

export const SPRING_SMOOTH: SpringConfig = {
  damping: 200,
  mass: 1,
  stiffness: 100,
  overshootClamping: false,
};

export const SPRING_SNAPPY: SpringConfig = {
  damping: 20,
  stiffness: 200,
  mass: 1,
  overshootClamping: false,
};

export const SPRING_BOUNCY: SpringConfig = {
  damping: 8,
  mass: 1,
  stiffness: 100,
  overshootClamping: false,
};
