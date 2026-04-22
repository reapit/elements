import preview from '#.storybook/preview'
import { AnchorMenuItem } from './anchor-item'

const meta = preview.meta({
  title: 'Core/Menu/Item',
  component: AnchorMenuItem,
})

/**
 * `Menu.AnchorItem` is identical to `Menu.Item`, except it renders as an `<a>` element for navigation.
 *
 * Importantly, anchor elements do not support the `disabled` prop; to disable an anchor-based menu item,
 * use `aria-disabled="true"` instead.
 */
export const Anchors = meta.story({
  args: {
    'aria-current': false,
    'aria-disabled': false,
    badge: 'New',
    children: 'Agentbox',
    href: '#',
    iconLeft: 'Property',
    iconRight: 'Export',
    supplementaryInfo: 'Property sales and more',
  },
  argTypes: {
    'aria-current': {
      control: 'radio',
      options: ['page', false],
    },
  },
})
