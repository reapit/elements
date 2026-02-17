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
            <ButtonGroup.Item variant="secondary">Button 1</ButtonGroup.Item>
            <ButtonGroup.Item variant="secondary">Button 2</ButtonGroup.Item>
            <ButtonGroup.Item variant="secondary">Button 3</ButtonGroup.Item>
          </>
        ),
        'Primary action': (
          <>
            <ButtonGroup.Item variant="secondary">Button 1</ButtonGroup.Item>
            <ButtonGroup.Item variant="secondary">Button 2</ButtonGroup.Item>
            <ButtonGroup.Item variant="primary">Button 3</ButtonGroup.Item>
          </>
        ),
        'Mixed buttons': (
          <>
            <ButtonGroup.Item variant="tertiary">Button 1</ButtonGroup.Item>
            <ButtonGroup.Item variant="secondary">Button 2</ButtonGroup.Item>
            <ButtonGroup.Item variant="primary">Button 3</ButtonGroup.Item>
          </>
        ),
      },
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof ButtonGroup>

/**
 * Quite often, all buttons within the button group will be the same variant, but this is not strictly
 * required. What is strictly required is that button groups have at least one button, and all buttons
 * within the group share the same size.
 */
export const Example: Story = {
  args: {
    children: 'Secondary',
    size: 'medium',
  },
}

/**
 * It is common for one button to be a primary action. This is often the case with button groups used in
 * forms and dialogs.
 */
export const Primary = {
  args: {
    children: 'Primary action',
    size: 'medium',
  },
}

/**
 * Of course, where appropriate, any valid button variant can be used within a button group.
 */
export const Mixed = {
  args: {
    children: 'Mixed buttons',
    size: 'medium',
  },
}

/**
 * The size of all buttons in the group can be controlled using the `size` prop.
 */
export const Size: Story = {
  args: {
    children: 'Secondary',
    size: 'small',
  },
}
