import { ComboboxCard } from './card'
import { ElCombobox } from '../styles'
import { Text } from '#src/core/text'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Combobox/Card',
  component: ComboboxCard,
  argTypes: {
    'aria-controls': {
      control: 'text',
    },
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof ComboboxCard>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-controls': 'listbox-id',
    children: (
      <div style={{ display: 'flex', flexFlow: 'column', gap: 'var(--spacing-1)' }}>
        <Text font="text-base/medium">Apple</Text>
        <Text colour="secondary" font="text-xs/regular">
          Crunchy and juicy
        </Text>
        <Text colour="secondary" font="text-xs/regular">
          52 available
        </Text>
      </div>
    ),
  },
}

/**
 * The parent combobox provides styles to the combobox card via CSS variables. When
 * the parent combobox is disabled, it sets these CSS variables to values that visually communicate this
 * state via the combobox card. This behaviour is manually shown here.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    'aria-controls': 'disabled-example',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <ElCombobox>
        <select disabled hidden />
        <Story />
      </ElCombobox>
    ),
  ],
}

/**
 * Likewise, when the parent combobox has an invalid state, it sets CSS variables to values that help
 * visually communicate its validity via the combobox card. This behaviour is manually shown here.
 */
export const Invalid: Story = {
  args: {
    ...Example.args,
    'aria-controls': 'invalid-example',
  },
  decorators: [
    (Story) => (
      <ElCombobox data-show-validity="true">
        <select required hidden />
        <Story />
      </ElCombobox>
    ),
  ],
}
