import preview from '#.storybook/preview'
import { AddIcon } from '#src/icons/add'
import { SplitButton } from '../split-button'
import type { SplitButtonAnchorAction } from './anchor-action'
import { SplitButtonContext } from '../context'
import { StarIcon } from '#src/icons/star'

const meta = preview.meta({
  title: 'Buttons/SplitButton/Action',
  component: SplitButton.Action,
  subcomponents: {
    AnchorAction: SplitButton.AnchorAction,
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
      <SplitButtonContext.Provider value={{ busy: undefined, size: 'medium', variant: 'primary' }}>
        <Story />
      </SplitButtonContext.Provider>
    ),
  ],
})

export const Example = meta.story({
  args: {
    'aria-disabled': false,
    children: 'Button',
    disabled: false,
    iconLeft: 'None',
    isBusy: false,
    isDestructive: false,
  },
})

/**
 * Actions the SplitButton's chosen variant: `primary` or `secondary`. Typically, there should
 * only be one primary action in the UI at any given time.
 */
export const Variants = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <SplitButtonContext.Provider value={{ busy: undefined, size: 'medium', variant: 'primary' }}>
          <Story />
        </SplitButtonContext.Provider>
        <SplitButtonContext.Provider value={{ busy: undefined, size: 'medium', variant: 'secondary' }}>
          <Story />
        </SplitButtonContext.Provider>
      </div>
    ),
  ],
})

/**
 * Actions also respect the SplitButton's size: `small`, `medium`, and `large`. Medium and large buttons are
 * preferred on small screens, especially touch-based devices, as they provide a larger target area for users.
 */
export const Sizes = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <SplitButtonContext.Provider value={{ busy: undefined, size: 'small', variant: 'secondary' }}>
          <Story />
        </SplitButtonContext.Provider>
        <SplitButtonContext.Provider value={{ busy: undefined, size: 'medium', variant: 'secondary' }}>
          <Story />
        </SplitButtonContext.Provider>
        <SplitButtonContext.Provider value={{ busy: undefined, size: 'large', variant: 'secondary' }}>
          <Story />
        </SplitButtonContext.Provider>
      </div>
    ),
  ],
})

/**
 * Icons can be placed on the left side of the `SplitButton.Action`.
 */
export const Icons = Example.extend({
  args: {
    iconLeft: 'Star',
  },
})

/**
 * Actions can be disabled using `aria-disabled` or `disabled`, just like a regular `Button`. In both
 * cases, click events will be ignored, however, `aria-disabled` allows the button to still be focusable, which,
 * for example, allows tooltips to still be displayed. A disabled button is also `aria-disabled`, regardless of the
 * value of `aria-disabled`.
 *
 * Importantly, [AnchorActions](?path=/docs/core-splitbutton-action--anchors)'s, just like
 * [AnchorButton](?path=/docs/core-button--anchors)'s do not support the disabled prop; so they can only be
 * disabled using `aria-disabled="true"`.
 */
export const Disabled = meta.story({
  args: {
    children: 'Button',
    disabled: true,
  },
})

/**
 * Actions can be busy using `isBusy`. In this case, the button will be ARIA disabled and the loading spinner
 * will be displayed.
 */
export const Busy = meta.story({
  args: {
    children: 'Button',
    isBusy: true,
  },
})

/**
 * Destructive actions are used to indicate the action performed by the button is destructive or irreversible, like
 * delete or remove.
 */
export const Destructive = meta.story({
  args: {
    children: 'Button',
    isDestructive: true,
  },
})

/**
 * `SplitButton.AnchorAction` is identical to `SplitButton.Action`, except it renders as an `<a>` element, which
 * allows consumers to navigate users to other pages using an element with the correct semantics.
 *
 * Importantly, anchor elements do not support the `disabled` prop; to disable an anchor-based button, use
 * `aria-disabled="true"` instead.
 */
export const Anchors = meta.story({
  args: {
    'aria-disabled': false,
    children: 'Anchor button',
    href: '#',
    iconLeft: 'Add',
    isBusy: false,
    isDestructive: false,
  },
  argTypes: {
    disabled: {
      table: { disable: true },
    },
  },
  render: (args) => <SplitButton.AnchorAction {...(args as unknown as SplitButtonAnchorAction.Props)} />,
})
