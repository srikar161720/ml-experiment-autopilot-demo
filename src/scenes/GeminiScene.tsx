import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_SIZES, SPRING_SMOOTH } from "../lib/constants";
import { fontFamily } from "../lib/fonts";

export const GeminiScene: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
    });

    const footerOpacity = interpolate(frame, [150, 180], [0, 1], {
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
                Powered by Gemini 3 Thought Signatures
            </div>

            <div style={{ marginTop: 100, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                {/* Thread and Iterations */}
                <div style={{ position: "relative", width: 800, height: 100, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Thread />
                    {["Iteration 1", "Iteration 2", "Iteration 3"].map((text, i) => (
                        <Sequence key={i} from={i * 45} premountFor={30} layout="none">
                            <IterationBox text={text} />
                        </Sequence>
                    ))}
                </div>

                {/* Comparison Cards */}
                <div style={{ display: "flex", gap: 40, marginTop: 80 }}>
                    <Sequence from={135} premountFor={30} layout="none">
                        <ComparisonCard
                            title="Standard LLM"
                            desc="Each call starts fresh — no memory"
                            borderColor={COLORS.ACCENT_RED}
                            dimmed
                        />
                    </Sequence>
                    <Sequence from={165} premountFor={30} layout="none">
                        <ComparisonCard
                            title="Thought Signatures"
                            desc="Reasoning compounds across all iterations"
                            borderColor={COLORS.ACCENT_GREEN}
                        />
                    </Sequence>
                </div>
            </div>

            <div
                style={{
                    fontSize: FONT_SIZES.MUTED_LABEL,
                    color: COLORS.TEXT_MUTED,
                    opacity: footerOpacity,
                    position: "absolute",
                    bottom: 60,
                }}
            >
                Temperature fixed at 1.0 · Multi-turn conversation · Hypothesis-driven
            </div>
        </AbsoluteFill>
    );
};

const Thread: React.FC = () => {
    const frame = useCurrentFrame();
    const width = interpolate(frame, [0, 100], [0, 100], {
        extrapolateRight: "clamp",
    });

    return (
        <div
            style={{
                position: "absolute",
                left: 0,
                top: "50%",
                height: 4,
                width: "100%",
                backgroundColor: COLORS.BG_SECONDARY,
                zIndex: 0,
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: `${width}%`,
                    background: `linear-gradient(90deg, ${COLORS.BG_SECONDARY} 0%, ${COLORS.ACCENT} 100%)`,
                    boxShadow: `0 0 10px ${COLORS.ACCENT}`,
                }}
            />
        </div>
    )
}

const IterationBox: React.FC<{ text: string }> = ({ text }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const scale = spring({ frame, fps, config: SPRING_SMOOTH });

    return (
        <div
            style={{
                backgroundColor: COLORS.CARD_BG,
                border: `2px solid ${COLORS.CARD_BORDER}`,
                borderRadius: 999,
                padding: "12px 24px",
                transform: `scale(${scale})`,
                zIndex: 1,
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.TEXT_PRIMARY,
            }}
        >
            {text}
        </div>
    );
};

const ComparisonCard: React.FC<{ title: string; desc: string; borderColor: string; dimmed?: boolean }> = ({ title, desc, borderColor, dimmed }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const progress = spring({ frame, fps, config: SPRING_SMOOTH });
    const translateY = interpolate(progress, [0, 1], [50, 0]);
    const opacity = interpolate(progress, [0, 1], [0, 1]);

    return (
        <div
            style={{
                width: 400,
                backgroundColor: COLORS.CARD_BG,
                border: `2px solid ${borderColor}`,
                borderRadius: 12,
                padding: 30,
                opacity: dimmed ? 0.5 * opacity : opacity,
                transform: `translateY(${translateY}px)`,
                display: "flex",
                flexDirection: "column",
                gap: 10,
            }}
        >
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>{title}</div>
            <div style={{ fontSize: 20, color: COLORS.TEXT_SECONDARY }}>{desc}</div>
        </div>
    );
};
