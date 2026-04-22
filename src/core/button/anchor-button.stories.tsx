import preview from '#.storybook/preview'
import { AnchorButton } from './anchor-button'

const meta = preview.meta({
  title: 'Core/Button',
  component: AnchorButton,
})

/**
 * `AnchorButton` is identical to `Button`, except it renders as an `<a>` element, which allows consumers to navigate
 * users to other pages using an element with the correct semantics.
 *
 * Importantly, anchor elements do not support the `disabled` prop; to disable an anchor-based button, use
 * `aria-disabled="true"` instead.
 */
export const Anchors = meta.story({
  args: {
    'aria-disabled': false,
    children: 'Anchor button',
    hasNoPadding: false,
    iconLeft: 'Star',
    iconRight: 'Star',
    isBusy: false,
    isDestructive: false,
    href: '#',
    size: 'medium',
    useLinkStyle: false,
    variant: 'primary',
  },
})
