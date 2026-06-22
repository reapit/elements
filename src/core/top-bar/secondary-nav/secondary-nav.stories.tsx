import preview from '#.storybook/preview'
import { StarIcon } from '#src/icons/star'
import { HelpIcon } from '#src/icons/help'
import { Menu } from '#src/core/menu'
import { TopBar } from '../top-bar'

const href = '#'

const meta = preview.meta({
  title: 'Navigation/TopBar/SecondaryNav',
  component: TopBar.SecondaryNav,
  argTypes: {
    children: {
      control: 'radio',
      options: ['No selected item', 'Selected item', 'With menu'],
      mapping: {
        'No selected item': buildNav('No selected item'),
        'Selected item': buildNav('Selected item'),
        'With menu': buildNav('With menu'),
      },
    },
  },
})

export const Example = meta.story({
  args: {
    children: 'No selected item',
  },
})

/**
 * If a nav item represents the current page, it should be marked as "selected". See the `TopBar.NavIconItem`
 * documentation for details on how.
 */
export const SelectedItem = meta.story({
  args: {
    children: 'Selected item',
  },
})

/**
 * The secondary nav can contain a mix of icon items and icon menu items.
 */
export const WithMenu = meta.story({
  args: {
    children: 'With menu',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '300px' }}>
        <Story />
      </div>
    ),
  ],
})

function buildNav(type: 'No selected item' | 'Selected item' | 'With menu') {
  return [
    <TopBar.SecondaryNav.Item
      key="1"
      href={href}
      icon={<StarIcon />}
      aria-label="Nav icon item 1"
      aria-current={type === 'Selected item' ? 'page' : false}
    />,
    <TopBar.SecondaryNav.Item
      key="2"
      href={href}
      icon={<StarIcon />}
      aria-label="Nav icon item 2"
      aria-current={false}
    />,
    type === 'With menu' && (
      <TopBar.SecondaryNav.MenuItem key="3" icon={<HelpIcon />} aria-label="Help menu">
        <Menu.Item>Menu item 1</Menu.Item>
        <Menu.Item>Menu item 2</Menu.Item>
        <Menu.Item>Menu item 3</Menu.Item>
      </TopBar.SecondaryNav.MenuItem>
    ),
  ]
}
