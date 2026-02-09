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

                    return (
                        <Sequence key={i} from={i * 60} premountFor={30}>
                            <Box
                                text={step}
                                x={x}
                                y={y}
                                delay={0} // Sequence handles the delay
                            />
                        </Sequence>
                    );
                })}
            </div>
        </AbsoluteFill>
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
