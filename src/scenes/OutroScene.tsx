import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SPRING_SMOOTH } from "../lib/constants";
import { fontFamily } from "../lib/fonts";

export const OutroScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrance animations
    const titleProgress = spring({
        frame,
        fps,
        config: SPRING_SMOOTH,
    });

    const titleTranslateY = interpolate(titleProgress, [0, 1], [50, 0]);

    const githubOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateRight: "clamp",
    });

    const labelOpacity = interpolate(frame, [60, 90], [0, 1], {
        extrapolateRight: "clamp",
    });

    // Exit animation (last 60 frames: 240-300)
    const exitProgress = interpolate(frame, [240, 300], [0, 1], {
        extrapolateRight: "clamp",
    });

    const containerOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
    const containerScale = interpolate(exitProgress, [0, 1], [1, 0.98]);

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(180deg, ${COLORS.BG_PRIMARY} 0%, ${COLORS.BG_SECONDARY} 100%)`,
                fontFamily,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                opacity: containerOpacity,
                transform: `scale(${containerScale})`,
            }}
        >
            <div
                style={{
                    fontSize: 140, // Increased from 80
                    fontWeight: 700,
                    color: COLORS.ACCENT,
                    transform: `translateY(${titleTranslateY}px)`,
                    textAlign: "center",
                    marginBottom: 40,
                    whiteSpace: "nowrap",
                }}
            >
                ML Experiment Autopilot
            </div>

            <div
                style={{
                    fontSize: 48, // Increased from 28
                    fontWeight: 400,
                    color: COLORS.TEXT_SECONDARY,
                    opacity: githubOpacity,
                    marginBottom: 80,
                    whiteSpace: "nowrap",
                }}
            >
                github.com/srikar161720/ml-experiment-autopilot
            </div>

            <div
                style={{
                    fontSize: 22,
                    fontWeight: 400,
                    color: COLORS.TEXT_MUTED,
                    opacity: labelOpacity,
                    position: "absolute",
                    bottom: 60,
                }}
            >
                Gemini 3 Hackathon 2026 · The Marathon Agent Track
            </div>
        </AbsoluteFill>
    );
};
