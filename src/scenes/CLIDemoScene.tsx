import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { COLORS } from "../lib/constants";
import { fontFamily } from "../lib/fonts";
import { TerminalWindow } from "../components/TerminalWindow";

export const CLIDemoScene: React.FC = () => {
    const frame = useCurrentFrame();

    // Fade in title
    const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: COLORS.BG_PRIMARY,
                fontFamily,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 40,
            }}
        >
            <div
                style={{
                    fontSize: 48,
                    fontWeight: 700,
                    color: COLORS.TEXT_PRIMARY,
                    opacity: titleOpacity,
                    marginBottom: 40,
                }}
            >
                Live Demo: California Housing Regression
            </div>

            <TerminalWindow
                title="python -m src.main run --data data/sample/california_housing.csv --target MedHouseVal --task regression --max-iterations 3 --verbose"
                style={{
                    width: 1500, // Explicit width for 16:9 at ~80% height (1500 * 9/16 = 843px + 36 = ~880px)
                    marginBottom: 40,
                }}
            >
                <Video
                    src={staticFile("clips/regression-demo.mp4")}
                    muted
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        backgroundColor: COLORS.TERMINAL_BG, // Match terminal bg
                    }}
                />
            </TerminalWindow>
        </AbsoluteFill>
    );
};
