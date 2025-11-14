import { ComboboxButton } from './button'
import { SearchIcon } from '#src/icons/search'

import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Combobox/Button',
  component: ComboboxButton,
  argTypes: {
    'aria-controls': {
      control: false,
    },
    action: {
      control: 'select',
      options: ['Toggle', 'Clear'],
      mapping: {
        Toggle: <ComboboxButton.OpenPopupButton aria-controls="my-combobox" />,
        Clear: <ComboboxButton.ClearButton aria-controls="my-combobox-button" />,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ComboboxButton>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The combobox button will often be styled as a button with a dropdown icon to mimic a classic select
 * control. Typically, when a value has been selected, a trailing clear button will be available in
 * place of the dropdown icon.
 */
export const Example: Story = {
  args: {
    action: 'Clear',
    'aria-controls': 'my-combobox',
    'aria-expanded': false,
    children: 'John Smith',
    id: 'my-combobox-button',
    maxWidth: undefined,
    placeholder: 'Select an option',
    showValidity: false,
    size: 'medium',
  },
}

/**
 * When the button's label matches the specified placeholder text, its text will be styled like
 * placeholder text to indicate no selection has been made. If no label text is provided, the placeholder
 * text will be displayed.
 */
export const Placeholder: Story = {
  args: {
    ...Example.args,
    action: 'Toggle',
    children: 'Select an option',
    placeholder: 'Select an option',
  },
}

/**
 * When options can be filtered or searched for, the combobox button will often be styled like a
 * search input.
 */
export const Search: Story = {
  args: {
    ...Placeholder.args,
    action: null,
    placeholder: 'Search...',
    children: 'Search...',
    leadingIcon: <SearchIcon />,
  },
}

/**
 * The parent combobox provides styles to the combobox button via CSS variables. When
 * the parent combobox is disabled, it sets these CSS variables to values that visually communicate this
 * state via the combobox's button. This behaviour is manually shown here.
 */
export const Disabled: Story = {
  args: {
    ...Placeholder.args,
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div
        // These styles are applied by ElCombobox when the Combobox is disabled.
        style={
          {
            '--combobox-background': 'var(--comp-input-colour-fill-disabled-background)',
            '--combobox-border-colour': 'var(--comp-input-colour-border-disabled)',
            '--combobox-icon-colour': 'var(--comp-input-colour-icon-disabled)',
            '--combobox-placeholder-colour': 'var(--comp-input-colour-text-disabled-placeholder)',
            '--combobox-text-colour': 'var(--comp-input-colour-text-disabled-input)',
          } as CSSProperties
        }
      >
        <Story />
      </div>
    ),
  ],
}

/**
 * Likewise, when the parent combobox has an invalid state, it sets CSS variables to values that help
 * visually communicate its validity via the combobox button. This behaviour is manually shown here.
 */
export const Invalid: Story = {
  args: {
    ...Placeholder.args,
  },
  decorators: [
    (Story) => (
      <div
        // These styles are applied by ElCombobox when the Combobox is invalid
        // and is configured to show its validity.
        style={
          {
            '--combobox-background': 'var(--comp-input-colour-fill-error-background)',
            '--combobox-border-colour': 'var(--comp-input-colour-border-error)',
            '--combobox-icon-colour': 'var(--comp-input-colour-icon-error)',
            '--combobox-placeholder-colour': 'var(--comp-input-colour-text-error-placeholder)',
            '--combobox-text-colour': 'var(--comp-input-colour-text-error-input)',
          } as CSSProperties
        }
      >
        <Story />
      </div>
    ),
  ],
}
