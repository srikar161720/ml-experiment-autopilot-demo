import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_SIZES, SPRING_SMOOTH } from "../lib/constants";
import { fontFamily } from "../lib/fonts";

export const TitleScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animations
    const titleProgress = spring({
        frame,
        fps,
        config: SPRING_SMOOTH,
    });

    const titleTranslateY = interpolate(titleProgress, [0, 1], [60, 0]);

    const subtitleOpacity = interpolate(frame, [45, 90], [0, 1], {
        extrapolateRight: "clamp",
    });

    const trackLabelOpacity = interpolate(frame, [75, 120], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: COLORS.BG_PRIMARY,
                fontFamily,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            {/* Main Title */}
            <div
                style={{
                    fontSize: FONT_SIZES.MAIN_TITLE,
                    fontWeight: 700,
                    color: COLORS.ACCENT,
                    transform: `translateY(${titleTranslateY}px)`,
                    textAlign: "center",
                    marginBottom: 20,
                }}
            >
                ML Experiment Autopilot
            </div>

            {/* Subtitle */}
            <div
                style={{
                    fontSize: FONT_SIZES.SUBTITLE,
                    fontWeight: 400,
                    color: COLORS.TEXT_SECONDARY,
                    opacity: subtitleOpacity,
                    textAlign: "center",
                    marginBottom: 60,
                }}
            >
                Autonomous ML experimentation powered by Gemini 3
            </div>

            {/* Track Label */}
            <div
                style={{
                    fontSize: FONT_SIZES.MUTED_LABEL,
                    fontWeight: 400,
                    color: COLORS.TEXT_MUTED,
                    opacity: trackLabelOpacity,
                    position: "absolute",
                    bottom: 60,
                }}
            >
                Gemini 3 Hackathon · The Marathon Agent Track
            </div>
        </AbsoluteFill>
    );
};
