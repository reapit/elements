import { LabelText } from './label-text'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/LabelText',
  component: LabelText,
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
    variant: {
      control: 'radio',
      options: ['soft', 'strong'],
    },
  },
} satisfies Meta<typeof LabelText>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: "I'm a label for a form input or something else",
    isRequired: false,
    size: 'small',
    variant: 'soft',
  },
}
