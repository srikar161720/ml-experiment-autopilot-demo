import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_SIZES } from "../lib/constants";
import { fontFamily } from "../lib/fonts";

interface StatCardProps {
    label: string;
    value: number;
    suffix?: string;
    decimals?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, suffix = "", decimals = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = interpolate(frame, [0, 60], [0, 1], {
        extrapolateRight: "clamp",
    });

    const currentValue = progress * value;

    return (
        <div
            style={{
                backgroundColor: COLORS.CARD_BG,
                border: `2px solid ${COLORS.CARD_BORDER}`,
                borderRadius: 12,
                padding: "24px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 300,
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                fontFamily,
            }}
        >
            <div
                style={{
                    fontSize: FONT_SIZES.STAT_NUMBER,
                    fontWeight: 700,
                    color: COLORS.ACCENT,
                    marginBottom: 8,
                }}
            >
                {currentValue.toFixed(decimals)}
                {suffix}
            </div>
            <div
                style={{
                    fontSize: FONT_SIZES.MUTED_LABEL,
                    fontWeight: 400,
                    color: COLORS.TEXT_MUTED,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                }}
            >
                {label}
            </div>
        </div>
    );
};
