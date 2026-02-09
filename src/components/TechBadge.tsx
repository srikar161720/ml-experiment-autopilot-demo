import { COLORS, FONT_SIZES } from "../lib/constants";
import { fontFamily } from "../lib/fonts";

interface TechBadgeProps {
    text: string;
    opacity?: number;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ text, opacity = 1 }) => {
    // Split text into emoji and label (assumes "Emoji Label..." format)
    const [emoji, ...rest] = text.split(" ");
    const label = rest.join(" ");

    return (
        <div
            style={{
                backgroundColor: COLORS.CARD_BG,
                border: `2px solid ${COLORS.CARD_BORDER}`,
                borderRadius: 40, // Squircle-ish
                width: 300,
                height: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontFamily,
                color: COLORS.TEXT_PRIMARY,
                opacity,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
        >
            <div style={{ fontSize: 80, marginBottom: 16 }}>{emoji}</div>
            <div
                style={{
                    fontSize: FONT_SIZES.BADGE_LABEL,
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: 1.2,
                }}
            >
                {label}
            </div>
        </div>
    );
};
