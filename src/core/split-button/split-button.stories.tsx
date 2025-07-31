import { Menu } from '#src/core/menu'
import { SplitButton } from './split-button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/SplitButton',
  component: SplitButton,
  argTypes: {
    action: {
      control: 'radio',
      options: ['Default', 'Disabled', 'Disabled (aria-disabled)'],
      mapping: {
        Default: <SplitButton.Action>Button</SplitButton.Action>,
        Disabled: <SplitButton.Action disabled>Button</SplitButton.Action>,
        'Disabled (aria-disabled)': <SplitButton.Action aria-disabled="true">Button</SplitButton.Action>,
      },
    },
    menu: {
      control: 'radio',
      options: ['Default', 'Disabled', 'Disabled (aria-disabled)'],
      mapping: {
        Default: (
          <SplitButton.Menu aria-label="More actions">
            <Menu.Item>Action 1</Menu.Item>
            <Menu.Item>Action 2</Menu.Item>
          </SplitButton.Menu>
        ),
        Disabled: (
          <SplitButton.Menu aria-label="More actions" disabled>
            {/* NOTE: We don't bother defining any items because the menu is disabled. */}
            {null}
          </SplitButton.Menu>
        ),
        'Disabled (aria-disabled)': (
          <SplitButton.Menu aria-label="More actions" aria-disabled="true">
            {/* NOTE: We don't bother defining any items because the menu is disabled. */}
            {null}
          </SplitButton.Menu>
        ),
      },
    },
  },
} satisfies Meta<typeof SplitButton>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    action: 'Default',
    menu: 'Default',
    size: 'medium',
    variant: 'primary',
  },
}

/**
 * The `SplitButton` component supports the following button variants: `primary` and `secondary`.
 */
export const Variants: Story = {
  args: {
    ...Example.args,
    size: 'medium',
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <SplitButton {...args} />
      <SplitButton {...args} variant="secondary" />
    </>
  ),
}

/**
 * The `SplitButton` component supports the following button sizes: `small`, `medium`, and `large`.
 */
export const Sizes: Story = {
  args: {
    ...Example.args,
    size: 'medium',
    variant: 'primary',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <SplitButton {...args} size="small" />
      <SplitButton {...args} size="medium" />
      <SplitButton {...args} size="large" />
    </>
  ),
}

/**
 * While the individual buttons that comprise the `SplitButton` can be disabled, try to avoid disabling the menu
 * button, as doing so will decrease the discoverability of the secondary actions in the menu.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    action: 'Disabled',
    menu: 'Disabled',
    variant: 'secondary',
  },
  argTypes: {
    action: {
      control: false,
    },
    menu: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: 'repeat(3, min-content)',
          gap: 'var(--spacing-6)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <SplitButton {...args} />
      <SplitButton {...args} action={meta.argTypes.action.mapping.Default} />
      <SplitButton {...args} menu={meta.argTypes.menu.mapping.Default} />
    </>
  ),
}
