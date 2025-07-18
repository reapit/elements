import { AddIcon } from '#src/icons/add'
import { SplitButtonAction } from './action'
import { SplitButtonAnchorAction } from './anchor-action'
import { SplitButtonContext } from '../context'
import { StarIcon } from '#src/icons/star'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/SplitButton/Action',
  component: SplitButtonAction,
  subcomponents: {
    AnchorAction: SplitButtonAnchorAction,
  },
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
  },
  decorators: [
    (Story) => (
      <SplitButtonContext.Provider value={{ size: 'medium', variant: 'primary' }}>
        <Story />
      </SplitButtonContext.Provider>
    ),
  ],
} satisfies Meta<typeof SplitButtonAction>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-disabled': false,
    children: 'Button',
    disabled: false,
    iconLeft: 'None',
    isBusy: false,
    isDestructive: false,
  },
}

/**
 * Actions the SplitButton's chosen variant: `primary` or `secondary`. Typically, there should
 * only be one primary action in the UI at any given time.
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
 * Actions also respect the SplitButton's size: `small`, `medium`, and `large`. Medium and large buttons are
 * preferred on small screens, especially touch-based devices, as they provide a larger target area for users.
 */
export const Sizes: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <SplitButtonContext.Provider value={{ size: 'small', variant: 'secondary' }}>
          <Story />
        </SplitButtonContext.Provider>
        <SplitButtonContext.Provider value={{ size: 'medium', variant: 'secondary' }}>
          <Story />
        </SplitButtonContext.Provider>
        <SplitButtonContext.Provider value={{ size: 'large', variant: 'secondary' }}>
          <Story />
        </SplitButtonContext.Provider>
      </div>
    ),
  ],
}

/**
 * Icons can be placed on the left side of the `SplitButton.Action`.
 */
export const Icons: Story = {
  args: {
    ...Example.args,
    iconLeft: 'Star',
  },
}

/**
 * Actions can be disabled using `aria-disabled` or `disabled`, just like a regular `Button`. In both
 * cases, click events will be ignored, however, `aria-disabled` allows the button to still be focusable, which,
 * for example, allows tooltips to still be displayed. A disabled button is also `aria-disabled`, regardless of the
 * value of `aria-disabled`.
 *
 * Importantly, [AnchorActions](?path=/docs/components-splitbutton-action--anchors)'s, just like
 * [AnchorButton](?path=/docs/components-button--anchors)'s do not support the disabled prop; so they can only be
 * disabled using `aria-disabled="true"`.
 */
export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
}

/**
 * Actions can be busy using `isBusy`. In this case, the button will be disabled and the loading spinner
 * will be displayed.
 */
export const Busy: Story = {
  args: {
    children: 'Button',
    isBusy: true,
  },
}

/**
 * Destructive actions are used to indicate the action performed by the button is destructive or irreversible, like
 * delete or remove.
 */
export const Destructive: Story = {
  args: {
    children: 'Button',
    isDestructive: true,
  },
}

/**
 * `SplitButton.AnchorAction` is identical to `SplitButton.Action`, except it renders as an `<a>` element, which
 * allows consumers to navigate users to other pages using an element with the correct semantics.
 *
 * Importantly, anchor elements do not support the `disabled` prop; to disable an anchor-based button, use
 * `aria-disabled="true"` instead.
 */
export const Anchors: StoryObj<Meta<typeof SplitButtonAnchorAction>> = {
  args: {
    'aria-disabled': false,
    children: 'Anchor button',
    iconLeft: 'Add',
    isBusy: false,
    isDestructive: false,
    href: globalThis.top?.location.href!,
  },
  render: (args) => <SplitButtonAnchorAction {...args} />,
}
