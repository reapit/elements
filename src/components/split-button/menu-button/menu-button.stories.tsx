import { SplitButtonMenuButton } from './menu-button'
import { SplitButtonContext } from '../context'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/SplitButton/MenuButton',
  component: SplitButtonMenuButton,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    'aria-disabled': {
      control: 'boolean',
    },
    'aria-expanded': {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <SplitButtonContext.Provider value={{ size: 'medium', variant: 'primary' }}>
        <Story />
      </SplitButtonContext.Provider>
    ),
  ],
} satisfies Meta<typeof SplitButtonMenuButton>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-disabled': false,
    'aria-expanded': false,
    'aria-label': 'More actions',
    disabled: false,
  },
}

/**
 * The MenuButton respects the SplitButton's variant: `primary` or `secondary`.
 */
export const Variants: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <SplitButtonContext.Provider value={{ size: 'medium', variant: 'primary' }}>
          <Story />
        </SplitButtonContext.Provider>
        <SplitButtonContext.Provider value={{ size: 'medium', variant: 'secondary' }}>
          <Story />
        </SplitButtonContext.Provider>
      </div>
    ),
  ],
}

/**
 * The MenuButton also respects the SplitButton's size: `small`, `medium`, and `large`.
 */
export const Sizes: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <SplitButtonContext.Provider value={{ size: 'small', variant: 'primary' }}>
          <Story />
        </SplitButtonContext.Provider>
        <SplitButtonContext.Provider value={{ size: 'medium', variant: 'primary' }}>
          <Story />
        </SplitButtonContext.Provider>
        <SplitButtonContext.Provider value={{ size: 'large', variant: 'primary' }}>
          <Story />
        </SplitButtonContext.Provider>
      </div>
    ),
  ],
}

/**
 * The MenuButton can be disabled using either the `disabled` or `aria-disabled` prop. When disabled, the button is
 * not interactive. When `aria-disabled` is set, the button remains focusable but is styled as disabled.
 *
 * Generally, disabling the menu button should be avoided, as it decreases the discoverability of the secondary
 * actions in the menu.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    disabled: true,
  },
}
