import {
  ProgressBarPercentage,
  ProgressBarSteps,
  ProgressBarContainer,
  ProgressBarInner,
  ProgressBarItem,
  ProgressBarLabel,
} from './progress-bar'
import { elProgressBarLabelRight, elProgressBarLabelLeft } from './__styles__'

export default {
  title: 'ProgressBar',
}

export const BasicExampleProgressBarPercentage = {
  render: () => (
    <ProgressBarContainer>
      <ProgressBarInner
        style={{
          width: '50%',
          transitionDuration: '1s',
        }}
      >
        <ProgressBarItem />
      </ProgressBarInner>
      <ProgressBarLabel className={elProgressBarLabelRight}>50%</ProgressBarLabel>
    </ProgressBarContainer>
  ),

  name: 'Basic Example - ProgressBarPercentage',
}

export const BasicExampleProgressBarSteps = {
  render: () => (
    <ProgressBarContainer>
      <ProgressBarInner
        style={{
          width: '50%',
          transitionDuration: '1s',
        }}
      >
        <ProgressBarItem />
      </ProgressBarInner>
      <ProgressBarLabel className={elProgressBarLabelLeft}>5/10 Completed</ProgressBarLabel>
    </ProgressBarContainer>
  ),

  name: 'Basic Example - ProgressBarSteps',
}

export const ReactExampleProgressBarPercentage = {
  render: () => <ProgressBarPercentage duration={20} />,
  name: 'React Example - ProgressBarPercentage',
}

export const ReactExampleProgressBarSteps = {
  render: () => <ProgressBarSteps currentStep={7} numberSteps={7} />,
  name: 'React Example - ProgressBarSteps',
}
