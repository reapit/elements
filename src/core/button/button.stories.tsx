import { AddIcon } from '#src/icons/add'
import { AnchorButton } from './anchor-button'
import { Button } from './button'
import { ChevronDownIcon } from '#src/icons/chevron-down'
import { StarIcon } from '#src/icons/star'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Button',
  component: Button,
  subcomponents: { AnchorButton },
  argTypes: {
    'aria-disabled': {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    iconLeft: {
      control: 'radio',
      options: ['None', 'Star', 'Add'],
      mapping: {
        None: undefined,
        Star: <StarIcon />,
        Add: <AddIcon />,
      },
    },
    iconRight: {
      control: 'radio',
      options: ['None', 'Star', 'ChevronDown'],
      mapping: {
        None: undefined,
        Star: <StarIcon />,
        ChevronDown: <ChevronDownIcon />,
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-disabled': false,
    children: 'Button',
    disabled: false,
    hasNoPadding: false,
    iconLeft: 'None',
    iconRight: 'None',
    isBusy: false,
    isDestructive: false,
    size: 'medium',
    useLinkStyle: false,
    variant: 'primary',
  },
}

/**
 * Buttons support three variants: `primary`, `secondary`, and `tertiary`. Typically, there should only be one primary
 * action in the UI at any given time.
 */
export const Variants: Story = {
  args: {
    ...Example.args,
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
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="tertiary" />
    </>
  ),
}

/**
 * Buttons support three sizes: `small`, `medium`, and `large`. Medium and large buttons are preferred on small
 * screens, especially touch-based devices, as they provide a larger target area for users.
 */
export const Sizes: Story = {
  args: {
    ...Example.args,
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
      <Button {...args} size="small" />
      <Button {...args} size="medium" />
      <Button {...args} size="large" />
    </>
  ),
}

/**
 * Icons can be placed on the left or right side of the button, regardless of the button's variant or size.
 */
export const Icons: Story = {
  args: {
    ...Example.args,
    iconLeft: 'Star',
    iconRight: 'Star',
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
      <Button {...args} iconRight={null} />
      <Button {...args} iconLeft={null} />
      <Button {...args} />
    </>
  ),
}

/**
 * Icon buttons can be achieved by providing a single icon, but no visual label. Consumers should ensure an accessible
 * label is provided via `aria-label` or `aria-labelledby` so the button is accessible. By convention, the `iconLeft`
 * prop should be used, but the same result can be achieved by using `iconRight`.
 */
export const IconOnly: Story = {
  name: 'Icon-only',
  args: {
    ...Example.args,
    'aria-label': 'Button',
    children: null,
    iconLeft: 'Star',
    iconRight: 'None',
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
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="tertiary" />
    </>
  ),
}

/**
 * Buttons can be disabled using `aria-disabled` or `disabled`. In both cases, click events will be ignored, however,
 * `aria-disabled` allows the button to still be focusable, which, for example, allows tooltips to still be displayed.
 * A `disabled` button is also `aria-disabled`, regardless of the value of `aria-disabled`.
 *
 * Importantly, [AnchorButton](?path=/docs/core-button--anchors)'s do not support the `disabled` prop; so they
 * can only be disabled using `aria-disabled="true"`.
 */
export const Disabled: Story = {
  args: {
    ...Icons.args,
    disabled: true,
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
      <Button {...args} size="small" />
      <Button {...args} size="medium" />
      <Button {...args} size="large" />
    </>
  ),
}

/**
 * Buttons that have been clicked and are performing some asynchronous action should be marked as busy using `isBusy`.
 * Busy buttons are `aria-disabled`, show a spinner instead of the button's other icons, and look the same regardless
 * of the button's variant.
 *
 * We explicitly DO NOT use mark busy buttons as disabled because that can lead to timing issues with form submissions
 * (disabled form elements are not part of the submitted form data). Thus, busy buttons are only ever ARIA disabled.
 */
export const Busy: Story = {
  args: {
    ...Icons.args,
    isBusy: true,
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
      <Button {...args} size="small" />
      <Button {...args} size="medium" />
      <Button {...args} size="large" />
    </>
  ),
}

/**
 * Destructive buttons are used to indicate the action performed by the button is destructive or irreversible, like
 * delete or remove.
 */
export const Destructive: Story = {
  args: {
    ...Icons.args,
    isDestructive: true,
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
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="tertiary" />
    </>
  ),
}

/**
 * Tertiary buttons can use the `hasNoPadding` prop to remove their padding. This prop is ignored for other button
 * variants.
 */
export const NoPadding: Story = {
  args: {
    ...Icons.args,
    hasNoPadding: true,
    variant: 'tertiary',
  },
}

/**
 * Tertiary buttons can also use the `useLinkStyle` prop to have the button appear more like a link. This prop is
 * ignored for other button variants.
 */
export const LinkStyle: Story = {
  args: {
    ...Icons.args,
    useLinkStyle: true,
    variant: 'tertiary',
  },
}

/**
 * `AnchorButton` is identical to `Button`, except it renders as an `<a>` element, which allows consumers to navigate
 * users to other pages using an element with the correct semantics.
 *
 * Importantly, anchor elements do not support the `disabled` prop; to disable an anchor-based button, use
 * `aria-disabled="true"` instead.
 */
export const Anchors: StoryObj<Meta<typeof AnchorButton>> = {
  args: {
    'aria-disabled': false,
    children: 'Anchor button',
    hasNoPadding: false,
    iconLeft: 'Star',
    iconRight: 'Star',
    isBusy: false,
    isDestructive: false,
    href: globalThis.top?.location.href!,
    size: 'medium',
    useLinkStyle: false,
    variant: 'primary',
  },
  render: (args) => <AnchorButton {...args} />,
}
