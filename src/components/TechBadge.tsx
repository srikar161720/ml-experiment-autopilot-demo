import { COLORS, FONT_SIZES } from "../lib/constants";
import { fontFamily } from "../lib/fonts";

interface TechBadgeProps {
    text: string;
    opacity?: number;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ text, opacity = 1 }) => {
    return (
        <div
            style={{
                backgroundColor: COLORS.CARD_BG,
                border: `2px solid ${COLORS.CARD_BORDER}`,
                borderRadius: 9999,
                padding: "8px 20px",
                fontFamily,
                fontSize: FONT_SIZES.BADGE_LABEL,
                fontWeight: 700,
                color: COLORS.TEXT_PRIMARY,
                opacity,
                whiteSpace: "nowrap",
            }}
        >
            {text}
        </div>
    );
};
