import { Composition } from "remotion";
import { DemoVideo } from "./DemoVideo";
import { COMPOSITION_DURATION_IN_FRAMES, COMPOSITION_FPS, COMPOSITION_HEIGHT, COMPOSITION_WIDTH } from "./lib/constants";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MLAutopilotDemo"
        component={DemoVideo}
        durationInFrames={COMPOSITION_DURATION_IN_FRAMES}
        fps={COMPOSITION_FPS}
        width={COMPOSITION_WIDTH}
        height={COMPOSITION_HEIGHT}
      />
    </>
  );
};

