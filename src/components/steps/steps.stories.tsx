import { useState } from 'react'
import { Steps, StepsVertical } from './index'
import { BodyText, Subtitle } from '../typography'
import { Button, ButtonGroup } from '../button'

export default {
  title: 'Steps',
  component: Steps,
}

export const BasicStepsUsage = {
  render: () => <Steps steps={['1', '2', '3', '4', '5']} />,
}

export const MiddleItemSelected = {
  render: () => <Steps steps={['1', '2', '3', '4', '5']} selectedStep="3" />,
  name: 'Middle item selected',
}

export const LastItemSelected = {
  render: () => <Steps steps={['A', 'B', 'C', 'D']} selectedStep="D" />,
  name: 'Last item selected',
}

export const ReactExample = {
  render: () => {
    const [selectedStep, setSelectedStep] = useState('1')

    return <Steps steps={['1', '2', '3', '4', '5']} selectedStep={selectedStep} onStepClick={setSelectedStep} />
  },

  name: 'React example',
}

export const StepsVerticalStory = {
  render: () => {
    const [selectedStep, setSelectedStep] = useState('1')

    const steps = [
      {
        item: '1',

        content: (
          <>
            <Subtitle>Step 1</Subtitle>
            <BodyText hasGreyText>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab dolorem, asperiores ipsam odio perferendis,
              explicabo veritatis voluptatibus iusto quo amet, similique ad! Excepturi impedit culpa repellat cupiditate
              quam. Aut, enim?
            </BodyText>
            <ButtonGroup alignment="right">
              <Button intent="primary" type="submit" onClick={() => setSelectedStep('2')}>
                Complete Step 1
              </Button>
            </ButtonGroup>
          </>
        ),
      },
      {
        item: '2',

        content: (
          <>
            <Subtitle>Step 2</Subtitle>
            <BodyText hasGreyText>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab dolorem, asperiores ipsam odio perferendis,
              explicabo veritatis voluptatibus iusto quo amet, similique ad! Excepturi impedit culpa repellat cupiditate
              quam. Aut, enim?
            </BodyText>
            <ButtonGroup alignment="right">
              <Button intent="primary" type="submit" onClick={() => setSelectedStep('3')}>
                Complete Step 2
              </Button>
            </ButtonGroup>
          </>
        ),
      },
      {
        item: '3',

        content: (
          <>
            <Subtitle>Step 3</Subtitle>
            <BodyText hasGreyText>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab dolorem, asperiores ipsam odio perferendis,
              explicabo veritatis voluptatibus iusto quo amet, similique ad! Excepturi impedit culpa repellat cupiditate
              quam. Aut, enim?
            </BodyText>
            <ButtonGroup alignment="right">
              <Button intent="primary" type="submit" onClick={() => setSelectedStep('4')}>
                Complete Step 3
              </Button>
            </ButtonGroup>
          </>
        ),
      },
      {
        item: '4',

        content: (
          <>
            <Subtitle>Step 4</Subtitle>
            <BodyText hasGreyText>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab dolorem, asperiores ipsam odio perferendis,
              explicabo veritatis voluptatibus iusto quo amet, similique ad! Excepturi impedit culpa repellat cupiditate
              quam. Aut, enim?
            </BodyText>
            <ButtonGroup alignment="right">
              <Button intent="primary" type="submit" onClick={() => setSelectedStep('5')}>
                Complete Step 4
              </Button>
            </ButtonGroup>
          </>
        ),
      },
      {
        item: '5',

        content: (
          <>
            <Subtitle>Step 5</Subtitle>
            <BodyText hasGreyText>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab dolorem, asperiores ipsam odio perferendis,
              explicabo veritatis voluptatibus iusto quo amet, similique ad! Excepturi impedit culpa repellat cupiditate
              quam. Aut, enim?
            </BodyText>
            <ButtonGroup alignment="right">
              <Button intent="primary" type="submit" onClick={() => setSelectedStep('1')}>
                Restart Steps
              </Button>
            </ButtonGroup>
          </>
        ),
      },
    ]

    return <StepsVertical steps={steps} selectedStep={selectedStep} onStepClick={setSelectedStep} />
  },
}
