import preview from '#.storybook/preview'
import { useState } from 'react'
import { Steps, StepsVertical } from './index'
import { Button } from '../../core/button'
import { ButtonGroup } from '../../core/button-group'

const meta = preview.meta({
  title: 'Deprecated/Steps',
  component: Steps,
})

export default meta

export const BasicStepsUsage = meta.story({
  render: () => <Steps steps={['1', '2', '3', '4', '5']} />,
})

export const MiddleItemSelected = meta.story({
  render: () => <Steps steps={['1', '2', '3', '4', '5']} selectedStep="3" />,
  name: 'Middle item selected',
})

export const LastItemSelected = meta.story({
  render: () => <Steps steps={['A', 'B', 'C', 'D']} selectedStep="D" />,
  name: 'Last item selected',
})

export const ReactExample = meta.story({
  render: () => {
    const [selectedStep, setSelectedStep] = useState('1')

    return <Steps steps={['1', '2', '3', '4', '5']} selectedStep={selectedStep} onStepClick={setSelectedStep} />
  },
  name: 'React example',
})

export const StepsVerticalUsage = meta.story({
  render: () => {
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
        <ButtonGroup>
          <Button
            variant="primary"
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
        </ButtonGroup>
      </>
    )
  },
})
