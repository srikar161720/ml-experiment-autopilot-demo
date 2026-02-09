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
            <div
                style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: COLORS.ACCENT,
                    borderRadius: "2px",
                    flexShrink: 0,
                }}
            />
            <div>{text}</div>
        </div>
    );
};
