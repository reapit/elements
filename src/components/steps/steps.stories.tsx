import { useState } from 'react'
import { Steps, StepsVertical } from './index'
import { Button, DeprecatedButtonGroup } from '../button'
// import { BodyText, Subtitle } from '../typography'
// import { Button, DeprecatedButtonGroup } from '../button'

export default {
  title: 'Steps',
  component: Steps,
}

export const BasicStepsUsage = {
  render: ({}) => <Steps steps={['1', '2', '3', '4', '5']} />,
}

export const MiddleItemSelected = {
  render: ({}) => <Steps steps={['1', '2', '3', '4', '5']} selectedStep="3" />,
  name: 'Middle item selected',
}

export const LastItemSelected = {
  render: ({}) => <Steps steps={['A', 'B', 'C', 'D']} selectedStep="D" />,
  name: 'Last item selected',
}

export const ReactExample = {
  render: ({}) => {
    const [selectedStep, setSelectedStep] = useState('1')

    return <Steps steps={['1', '2', '3', '4', '5']} selectedStep={selectedStep} onStepClick={setSelectedStep} />
  },
  name: 'React example',
}

export const StepsVerticalUsage = {
  render: ({}) => {
    const [selectedStep, setSelectedStep] = useState('1')

    const steps = [
      {
        item: '1',
        content: 'Any React Node Content Step 1',
      },
      {
        item: '2',
        content: 'Any React Node Content Step 2',
      },
      {
        item: '3',
        content: 'Any React Node Content Step 3',
      },
      {
        item: '4',
        content: 'Any React Node Content Step 4',
      },
      {
        item: '5',
        content: 'Any React Node Content Step 5',
      },
    ]

    return (
      <>
        <StepsVertical steps={steps} selectedStep={selectedStep} onStepClick={setSelectedStep} />
        <DeprecatedButtonGroup>
          <Button
            intent="primary"
            onClick={() =>
              setSelectedStep((currentStep) => {
                const numericStep = Number(currentStep)
                const nextStep = numericStep + 1
                return nextStep > 5 ? '1' : String(nextStep)
              })
            }
          >
            Next
          </Button>
        </DeprecatedButtonGroup>
      </>
    )
  },
}
