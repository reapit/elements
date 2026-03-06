import { ComboboxButton } from './button'
import { ElCombobox } from '../styles'
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
    children: null,
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
      <ElCombobox>
        <select disabled hidden />
        <Story />
      </ElCombobox>
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
      <ElCombobox data-show-validity="true">
        <select required hidden />
        <Story />
      </ElCombobox>
    ),
  ],
}

/**
 * The combobox button also reflects an invalid state when `aria-invalid="true"` and
 * `data-show-validity="true"` are set on the parent combobox container — for example, via custom
 * logic that does not use the browser's constraint validation API. This behaviour is manually shown
 * here.
 */
export const AriaInvalid: Story = {
  name: 'Aria Invalid',
  args: {
    ...Placeholder.args,
  },
  decorators: [
    (Story) => (
      <ElCombobox data-show-validity="true">
        <button aria-invalid hidden />
        <Story />
      </ElCombobox>
    ),
  ],
}

/**
 * By default, combobox buttons will fill their parent's width. This can be constrained by providing
 * a `maxWidth` to the combobox.
 */
export const MaxWidth: Story = {
  name: 'Max-width',
  args: {
    ...Placeholder.args,
    action: null,
    placeholder: 'Search...',
    children: 'Search...',
    leadingIcon: <SearchIcon />,
  },
  decorators: [
    (Story) => (
      // This CSS variable is set by ElCombobox when Combobox is constrained by its maxWidth prop.
      <div style={{ '--combobox-max-width': 'var(--size-40)' } as CSSProperties}>
        <Story />
      </div>
    ),
  ],
}

/**
 * When the label text is too long, it will be truncated.
 */
export const Truncation: Story = {
  args: {
    ...Example.args,
    children: 'Long label text that will not fit within the available space',
  },
  decorators: MaxWidth.decorators,
}
