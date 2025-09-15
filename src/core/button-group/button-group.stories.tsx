import { Button } from '#src/core/button'
import { ButtonGroup } from './button-group'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Secondary', 'Primary action', 'Mixed buttons'],
      mapping: {
        Secondary: (
          <>
            <Button size="medium" variant="secondary">
              Button 1
            </Button>
            <Button size="medium" variant="secondary">
              Button 2
            </Button>
            <Button size="medium" variant="secondary">
              Button 3
            </Button>
          </>
        ),
        'Primary action': (
          <>
            <Button size="medium" variant="secondary">
              Button 1
            </Button>
            <Button size="medium" variant="secondary">
              Button 2
            </Button>
            <Button size="medium" variant="primary">
              Button 3
            </Button>
          </>
        ),
        'Mixed buttons': (
          <>
            <Button size="medium" variant="tertiary">
              Button 1
            </Button>
            <Button size="medium" variant="secondary">
              Button 2
            </Button>
            <Button size="medium" variant="primary">
              Button 3
            </Button>
          </>
        ),
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof ButtonGroup>

/**
 * Quite often, all buttons within the button group will be the same variant, but this is not strictly
 * required. What is strictly required is that button groups have at least one button, and all buttons
 * with the group share the same size.
 */
export const Example: Story = {
  args: {
    children: 'Secondary',
  },
}

/**
 * It is common for one button to be a primary action. This is often the case with button groups used in
 * forms and dialogs.
 */
export const Primary = {
  args: {
    children: 'Primary action',
  },
}

/**
 * Of course, where appropriate, any valid button variant can be used within a button group.
 */
export const Mixed = {
  args: {
    children: 'Mixed buttons',
  },
}
