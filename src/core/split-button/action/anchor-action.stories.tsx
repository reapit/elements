import preview from '#.storybook/preview'
import { SplitButtonAnchorAction } from './anchor-action'

const meta = preview.meta({
  title: 'Core/SplitButton/Action',
  component: SplitButtonAnchorAction,
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
    iconLeft: 'Add',
    isBusy: false,
    isDestructive: false,
    href: '#',
  },
})
