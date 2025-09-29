import { FormControlLabel } from './label'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/FormControl/Label',
  component: FormControlLabel,
  argTypes: {
    as: {
      control: false,
    },
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
} satisfies Meta<FormControlLabel.Props>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    as: 'label',
    children: 'Label',
    htmlFor: 'my-form-control',
    size: 'medium',
  },
}

/** The label text will naturally wrap to additional lines when it does not have sufficient space. */
export const Wrapping: Story = {
  args: {
    ...Example.args,
    children: 'This is a long label that won’t fit in a single row',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px', border: '1px solid #FA00FF' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * The label can render as a `<legend>` element. This is useful when the parent `FormControl` is rendering
 * as a `<fieldset>`.
 */
export const Legend: Story = {
  args: {
    as: 'legend',
    children: 'Label',
    size: 'medium',
  },
}
