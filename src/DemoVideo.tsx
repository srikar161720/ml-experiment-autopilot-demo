import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

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
            <TransitionSeries>
                {/* Scene 1: Title (10s + 1s buffer) */}
                <TransitionSeries.Sequence durationInFrames={330}>
                    <TitleScene />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Scene 2: Problem (20s + 3s buffer) */}
                <TransitionSeries.Sequence durationInFrames={690}>
                    <ProblemScene />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Scene 3: Solution (20s + 3s buffer) */}
                <TransitionSeries.Sequence durationInFrames={690}>
                    <SolutionScene />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Scene 4: Gemini (15s + 2s buffer) */}
                <TransitionSeries.Sequence durationInFrames={510}>
                    <GeminiScene />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Scene 5: CLI Demo (55s Fixed) */}
                <TransitionSeries.Sequence durationInFrames={1650}>
                    <CLIDemoScene />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Scene 6: Results (33s Fixed - Reduced stats) */}
                <TransitionSeries.Sequence durationInFrames={990}>
                    <ResultsScene />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Scene 7: Tech Stack (10s + 2s buffer) */}
                <TransitionSeries.Sequence durationInFrames={360}>
                    <TechStackScene />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Scene 8: Outro (10s + 3s buffer) */}
                <TransitionSeries.Sequence durationInFrames={390}>
                    <OutroScene />
                </TransitionSeries.Sequence>

            </TransitionSeries>
        </AbsoluteFill>
    );
};
