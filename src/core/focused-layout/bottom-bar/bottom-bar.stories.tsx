import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { Pattern } from '#src/core/drawer/__story__/Pattern'
import { FocusedLayout } from '../focused-layout'
import { FocusedLayoutBottomBar } from './bottom-bar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/FocusedLayout/BottomBar',
  component: FocusedLayoutBottomBar,
  argTypes: {
    children: {
      control: 'select',
      options: ['Simple', 'MultiStep', 'SingleAction'],
      mapping: {
        Simple: (
          <ButtonGroup>
            <Button size="medium" variant="secondary">
              Cancel
            </Button>
            <Button size="medium" variant="primary">
              Save
            </Button>
          </ButtonGroup>
        ),
        MultiStep: (
          <ButtonGroup>
            <Button size="medium" variant="secondary">
              Back
            </Button>
            <Button size="medium" variant="secondary">
              Skip
            </Button>
            <Button size="medium" variant="primary">
              Next
            </Button>
          </ButtonGroup>
        ),
        SingleAction: (
          <Button size="medium" variant="primary">
            Continue
          </Button>
        ),
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <FocusedLayout>
        <FocusedLayout.Content>
          <Pattern />
        </FocusedLayout.Content>
        <Story />
      </FocusedLayout>
    ),
  ],
} satisfies Meta<typeof FocusedLayoutBottomBar>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The bottom bar sticks to the bottom of the viewport and is always visible.
 * It typically contains primary action buttons.
 */
export const Example: Story = {
  args: {
    children: 'Simple',
  },
}
