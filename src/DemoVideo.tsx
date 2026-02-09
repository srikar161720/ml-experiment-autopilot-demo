import { AbsoluteFill, Sequence } from "remotion";
import { TitleScene } from "./scenes/TitleScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { GeminiScene } from "./scenes/GeminiScene";
import { CLIDemoScene } from "./scenes/CLIDemoScene";
import { ResultsScene } from "./scenes/ResultsScene";
import { TechStackScene } from "./scenes/TechStackScene";
import { OutroScene } from "./scenes/OutroScene";

export const DemoVideo: React.FC = () => {
    return (
        <AbsoluteFill>
            <Sequence from={0} durationInFrames={300} premountFor={30}>
                <TitleScene />
            </Sequence>
            <Sequence from={300} durationInFrames={600} premountFor={30}>
                <ProblemScene />
            </Sequence>
            <Sequence from={900} durationInFrames={600} premountFor={30}>
                <SolutionScene />
            </Sequence>
            <Sequence from={1500} durationInFrames={450} premountFor={30}>
                <GeminiScene />
            </Sequence>
            <Sequence from={1950} durationInFrames={1650} premountFor={30}>
                <CLIDemoScene />
            </Sequence>
            <Sequence from={3600} durationInFrames={1200} premountFor={30}>
                <ResultsScene />
            </Sequence>
            <Sequence from={4800} durationInFrames={300} premountFor={30}>
                <TechStackScene />
            </Sequence>
            <Sequence from={5100} durationInFrames={300} premountFor={30}>
                <OutroScene />
            </Sequence>
        </AbsoluteFill>
    );
};
