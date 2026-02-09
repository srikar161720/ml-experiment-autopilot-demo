import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { COLORS } from "../lib/constants";
import { fontFamily } from "../lib/fonts";
import { TerminalWindow } from "../components/TerminalWindow";
import { StatCard } from "../components/StatCard";

export const ResultsScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.BG_PRIMARY, fontFamily }}>
            {/* Part 1: Report Scroll (15s) */}
            <Sequence from={0} durationInFrames={450} premountFor={30}>
                <ReportSubScene />
            </Sequence>

            {/* Part 2: MLflow UI (11s) */}
            <Sequence from={450} durationInFrames={330} premountFor={30}>
                <MLflowSubScene />
            </Sequence>

            {/* Part 3: Stats (7s) */}
            <Sequence from={780} durationInFrames={210} premountFor={30}>
                <StatsSubScene />
            </Sequence>
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
            <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.TEXT_PRIMARY, opacity: titleOpacity, marginBottom: 80 }}>
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
