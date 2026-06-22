import preview from '#.storybook/preview'
import { SecondaryTab } from './tab'

const meta = preview.meta({
  title: 'Navigation/SecondaryTabs/Tab',
  component: SecondaryTab,
})

export const Example = meta.story({
  args: {
    'aria-current': false,
    children: 'Secondary tab',
    href: '#',
  },
})

/**
 * When the tab represents the current page, `aria-current="page"` should be supplied to communicate to
 * visual and accessible users that the tab is currently "selected". This shows the blue bottom border.
 */
export const Selected = Example.extend({
  args: {
    'aria-current': 'page',
  },
})
