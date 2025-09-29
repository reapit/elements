import { FormControlHelpText } from './help-text'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/FormControl/HelpText',
  component: FormControlHelpText,
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
} satisfies Meta<typeof FormControlHelpText>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Help text',
    id: 'my-help-text',
    size: 'medium',
  },
}

/** The help text will naturally wrap to additional lines when it does not have sufficient space. */
export const Wrapping: Story = {
  args: {
    ...Example.args,
    children: 'This is long help text that won’t fit in a single row',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px', border: '1px solid #FA00FF' }}>
        <Story />
      </div>
    ),
  ],
}
