import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_SIZES, SPRING_BOUNCY } from "../lib/constants";
import { fontFamily } from "../lib/fonts";

const STEPS = [
    "📊 Data Profiler",
    "🧠 Experiment Designer",
    "⚙️ Code Generator",
    "🏃 Experiment Runner",
    "📈 Results Analyzer",
    "💡 Hypothesis Generator",
];

const BOX_WIDTH = 280;
const BOX_HEIGHT = 100;
const RADIUS_X = 500;
const RADIUS_Y = 250;

export const SolutionScene: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
    });

    const centerLabelOpacity = interpolate(frame, [STEPS.length * 60, STEPS.length * 60 + 30], [0, 1], {
        extrapolateRight: "clamp",
    });

    // Pulsing effect for center label
    const pulse = Math.sin(frame / 10) * 0.1 + 0.9; // Oscillates between 0.8 and 1.0

    return (
        <AbsoluteFill
            style={{
                backgroundColor: COLORS.BG_PRIMARY,
                fontFamily,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    fontSize: FONT_SIZES.SCENE_HEADING,
                    fontWeight: 700,
                    color: COLORS.TEXT_PRIMARY,
                    opacity: titleOpacity,
                    position: "absolute",
                    top: 80,
                }}
            >
                The Autonomous Loop
            </div>

            <div style={{ position: "relative", width: "100%", height: "100%", marginTop: 100 }}>
                {/* Center Label */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) scale(${pulse})`,
                        fontSize: 48,
                        fontWeight: 700,
                        color: COLORS.ACCENT,
                        opacity: centerLabelOpacity,
                        textAlign: "center",
                        textShadow: `0 0 20px ${COLORS.ACCENT}40`,
                    }}
                >
                    ExperimentController
                </div>

                {STEPS.map((step, i) => {
                    const angle = (i * (360 / STEPS.length) - 90) * (Math.PI / 180);
                    const x = Math.cos(angle) * RADIUS_X;
                    const y = Math.sin(angle) * RADIUS_Y;

                    const nextIndex = (i + 1) % STEPS.length;
                    const nextAngle = (nextIndex * (360 / STEPS.length) - 90) * (Math.PI / 180);
                    const nextX = Math.cos(nextAngle) * RADIUS_X;
                    const nextY = Math.sin(nextAngle) * RADIUS_Y;

                    return (
                        <React.Fragment key={i}>
                            <Sequence from={i * 60} premountFor={30}>
                                <Box
                                    text={step}
                                    x={x}
                                    y={y}
                                    delay={0}
                                />
                            </Sequence>

                            {/* Path to next box */}
                            <Sequence from={i * 60 + 30} premountFor={30} layout="none">
                                <CurvedPath
                                    startX={x}
                                    startY={y}
                                    endX={nextX}
                                    endY={nextY}
                                    index={i}
                                    totalSteps={STEPS.length}
                                />
                            </Sequence>
                        </React.Fragment>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

const CurvedPath: React.FC<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    index: number;
    totalSteps: number;
}> = ({ startX, startY, endX, endY, index, totalSteps }) => {
    const frame = useCurrentFrame();

    // Calculate control point for a nice curve outward
    // We use the midpoint angle between start and end
    const angleStart = (index * (360 / totalSteps) - 90) * (Math.PI / 180);
    const angleEnd = ((index + 1) * (360 / totalSteps) - 90) * (Math.PI / 180);

    // Handle wrap-around for the last element's angle calculation if needed, 
    // but simple average works fine for layout here.
    // Actually, for the last item connecting to first, we need to be careful with simple average 
    // if we want strict radial outward, but for simplicity:
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    // Push the control point outward from center (0,0) based on midpoint vector
    // A simple way is to scale the midpoint vector
    const factor = 1.5;
    const cx = midX * factor;
    const cy = midY * factor;

    // Center coordinates in the container are (width/2, height/2), but our x/y are relative to center
    // Only SVG needs absolute coordinates if it's strictly positioned, 
    // but we can position the SVG absolutely at center and use relative coords.

    // Let's assume SVG is centered at 50% 50%
    const pathData = `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`;

    const progress = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <svg
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                overflow: "visible",
                zIndex: 0, // Behind boxes
                width: 1, // Minimize layout impact
                height: 1,
            }}
        >
            <path
                d={pathData}
                fill="none"
                stroke={COLORS.ACCENT}
                strokeWidth={4}
                strokeDasharray={1000}
                strokeDashoffset={1000 * (1 - progress)}
                strokeLinecap="round"
                style={{
                    opacity: 0.6,
                    filter: `drop-shadow(0 0 8px ${COLORS.ACCENT})`
                }}
            />
            {/* Arrowhead at the end */}
            <path
                d="M -10 -5 L 0 0 L -10 5"
                fill="none"
                stroke={COLORS.ACCENT}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    opacity: progress >= 0.9 ? 1 : 0,
                    transform: `translate(${endX}px, ${endY}px) rotate(${Math.atan2(endY - cy, endX - cx) * 180 / Math.PI}deg)`,
                    transition: "opacity 0.2s"
                }}
            />
        </svg>
    );
};

const Box: React.FC<{ text: string; x: number; y: number; delay: number }> = ({ text, x, y, delay }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        frame: frame - delay,
        fps,
        config: SPRING_BOUNCY,
        delay: 0,
    });

    const scale = interpolate(progress, [0, 1], [0, 1]);
    const opacity = interpolate(progress, [0, 0.5], [0, 1]);

    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: BOX_WIDTH,
                height: BOX_HEIGHT,
                marginLeft: -BOX_WIDTH / 2,
                marginTop: -BOX_HEIGHT / 2,
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                opacity,
                backgroundColor: COLORS.CARD_BG,
                border: `2px solid ${COLORS.CARD_BORDER}`,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 24px",
                zIndex: 1,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                fontSize: 24,
                fontWeight: 600,
                color: COLORS.TEXT_PRIMARY,
                textAlign: "center",
            }}
        >
            {text}
        </div>
    );
};
