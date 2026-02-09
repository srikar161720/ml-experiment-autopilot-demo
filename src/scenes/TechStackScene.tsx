import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_SIZES } from "../lib/constants";
import { fontFamily } from "../lib/fonts";
import { TechBadge } from "../components/TechBadge";

const TECH_ITEMS = [
    "✨ Gemini 3 API",
    "🐍 Python 3.9+",
    "📊 Scikit-learn",
    "🚀 XGBoost / LightGBM",
    "📈 MLflow",
    "🎨 Rich (Terminal UI)",
    "📐 Pydantic",
    "📝 Jinja2 Templates",
];

export const TechStackScene: React.FC = () => {
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
            }}
        >
            <div
                style={{
                    fontSize: FONT_SIZES.SCENE_HEADING,
                    fontWeight: 700,
                    color: COLORS.TEXT_PRIMARY,
                    opacity: titleOpacity,
                    marginBottom: 80,
                }}
            >
                Built With
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, auto)",
                    gap: 40,
                    justifyContent: "center",
                }}
            >
                {TECH_ITEMS.map((item, i) => (
                    <Sequence key={i} from={i * 8} premountFor={30} layout="none">
                        <AnimatedBadge text={item} />
                    </Sequence>
                ))}
            </div>
        </AbsoluteFill>
    );
};

const AnimatedBadge: React.FC<{ text: string }> = ({ text }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });

    return <TechBadge text={text} opacity={opacity} />;
};
