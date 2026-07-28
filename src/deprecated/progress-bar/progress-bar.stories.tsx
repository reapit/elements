import preview from "#.storybook/preview";

import { elProgressBarLabelRight, elProgressBarLabelLeft } from "./__styles__";
import {
  ProgressBarPercentage,
  ProgressBarSteps,
  ProgressBarContainer,
  ProgressBarInner,
  ProgressBarItem,
  ProgressBarLabel,
} from "./progress-bar";

const meta = preview.meta({
  title: "Deprecated/ProgressBar",
  component: ProgressBarSteps,
});

export default meta;

export const BasicExampleProgressBarPercentage = meta.story({
  render: () => (
    <ProgressBarContainer>
      <ProgressBarInner
        style={{
          width: "50%",
          transitionDuration: "1s",
        }}
      >
        <ProgressBarItem />
      </ProgressBarInner>
      <ProgressBarLabel className={elProgressBarLabelRight}>50%</ProgressBarLabel>
    </ProgressBarContainer>
  ),

  name: "Basic Example - ProgressBarPercentage",
});

export const BasicExampleProgressBarSteps = meta.story({
  render: () => (
    <ProgressBarContainer>
      <ProgressBarInner
        style={{
          width: "50%",
          transitionDuration: "1s",
        }}
      >
        <ProgressBarItem />
      </ProgressBarInner>
      <ProgressBarLabel className={elProgressBarLabelLeft}>5/10 Completed</ProgressBarLabel>
    </ProgressBarContainer>
  ),

  name: "Basic Example - ProgressBarSteps",
});

export const ReactExampleProgressBarPercentage = meta.story({
  render: () => <ProgressBarPercentage duration={20} />,
  name: "React Example - ProgressBarPercentage",
});

export const ReactExampleProgressBarSteps = meta.story({
  render: () => <ProgressBarSteps currentStep={7} numberSteps={7} />,
  name: "React Example - ProgressBarSteps",
});
