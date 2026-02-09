import { interpolate, useCurrentFrame, Easing } from "remotion";
import { COLORS, FONT_SIZES } from "../lib/constants";
import { fontFamily } from "../lib/fonts";

interface AnimatedBulletProps {
    text: string;
}

export const AnimatedBullet: React.FC<AnimatedBulletProps> = ({ text }) => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [0, 45], [0, 1], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
    });

    const translateX = interpolate(frame, [0, 45], [-40, 0], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
    });

    return (
        <div
            style={{
                fontFamily,
                fontSize: FONT_SIZES.BODY_TEXT,
                color: COLORS.TEXT_SECONDARY,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "20px",
                opacity,
                transform: `translateX(${translateX}px)`,
                marginBottom: "24px",
                width: "100%",
                maxWidth: "1400px",
            }}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={COLORS.ACCENT}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    width: "30px",
                    height: "30px",
                    flexShrink: 0,
                }}
            >
                <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
            <div>{text}</div>
        </div>
    );
};
