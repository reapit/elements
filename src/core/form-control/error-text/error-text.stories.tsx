import { FormControlErrorText } from './error-text'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/FormControl/ErrorText',
  component: FormControlErrorText,
  argTypes: {
    children: {
      control: 'text',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: "'medium'" },
      },
    },
  },
} satisfies Meta<FormControlErrorText.Props>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Error text',
    id: 'my-error-text',
    size: 'medium',
  },
}

/** The error text will naturally wrap to additional lines when it does not have sufficient space. */
export const Wrapping: Story = {
  args: {
    ...Example.args,
    children: 'This is a long error message that won’t fit in a single row',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px', border: '1px solid #FA00FF' }}>
        <Story />
      </div>
    ),
  ],
}
