import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { COLORS, FONT_SIZES } from "../lib/constants";
import { fontFamily } from "../lib/fonts";
import { TerminalWindow } from "../components/TerminalWindow";
import { StatCard } from "../components/StatCard";

import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

export const ResultsScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.BG_PRIMARY, fontFamily }}>
            <TransitionSeries>
                {/* Part 1: Report Scroll (15s) */}
                <TransitionSeries.Sequence durationInFrames={450}>
                    <ReportSubScene />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Part 2: MLflow UI (11s) */}
                <TransitionSeries.Sequence durationInFrames={330}>
                    <MLflowSubScene />
                </TransitionSeries.Sequence>

                {/* Part 3: Stats (7s + 30f compensation for transition overlap) */}
                <TransitionSeries.Sequence durationInFrames={240}>
                    <StatsSubScene />
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};

const ReportSubScene: React.FC = () => {
    const frame = useCurrentFrame();
    const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.TEXT_PRIMARY, opacity: titleOpacity, marginBottom: 40 }}>
                Generated Experiment Report
            </div>
            <Video
                src={staticFile("clips/report-scroll.mp4")}
                muted
                style={{
                    height: "80%",
                    width: "auto",
                    objectFit: "contain",
                    borderRadius: "12px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                }}
            />
        </AbsoluteFill>
    );
};

const MLflowSubScene: React.FC = () => {
    const frame = useCurrentFrame();
    const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.TEXT_PRIMARY, opacity: titleOpacity, marginBottom: 40 }}>
                Track Every Experiment in MLflow
            </div>
            <TerminalWindow
                title="http://127.0.0.1:5000"
                style={{
                    height: "80%",
                    width: "fit-content", // Shrink to fit video
                    backgroundColor: "#ffffff"
                }} // Browser style, remove fixed width
            >
                <Video
                    src={staticFile("clips/mlflow-ui.mp4")}
                    muted
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
            </TerminalWindow>
        </AbsoluteFill>
    );
};

const StatsSubScene: React.FC = () => {
    const frame = useCurrentFrame();
    const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={{ fontSize: FONT_SIZES.SCENE_HEADING, fontWeight: 700, color: COLORS.TEXT_PRIMARY, opacity: titleOpacity, marginBottom: 80 }}>
                Experiment Results
            </div>
            <div style={{ display: "flex", gap: 60 }}>
                <StatCard label="Best RMSE" value={0.133} decimals={3} />
                <StatCard label="Improvement" value={82.1} decimals={1} suffix="%" />
                <StatCard label="Experiments Run" value={3} decimals={0} />
            </div>
        </AbsoluteFill>
    );
};
