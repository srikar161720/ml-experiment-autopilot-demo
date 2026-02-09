import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_SIZES } from "../lib/constants";
import { fontFamily } from "../lib/fonts";
import { AnimatedBullet } from "../components/AnimatedBullet";

const BULLETS = [
    "Traditional AutoML tools are Black boxes with no hypothesis testing",
    "Manual experiment design is slow and biased toward familiar approaches",
    "Trial-and-error wastes compute without learning from failures",
    "No reasoning continuity — each experiment starts from scratch",
    "Results analysis is ad-hoc, missing cross-iteration patterns",
];

export const ProblemScene: React.FC = () => {
    const frame = useCurrentFrame();

    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
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
                padding: "0 100px",
            }}
        >
            <div
                style={{
                    fontSize: FONT_SIZES.SCENE_HEADING,
                    fontWeight: 700,
                    color: COLORS.TEXT_PRIMARY,
                    opacity: titleOpacity,
                    marginBottom: 80,
                    textAlign: "center",
                }}
            >
                The Problem with ML Experimentation
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                {BULLETS.map((text, i) => (
                    <Sequence key={i} from={i * 90} premountFor={30} layout="none">
                        <AnimatedBullet text={text} />
                    </Sequence>
                ))}
            </div>
        </AbsoluteFill>
    );
};
