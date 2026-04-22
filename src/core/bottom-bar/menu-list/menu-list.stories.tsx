import preview from '#.storybook/preview'
import { BottomBarContext } from '../context'
import { BottomBarMenuList } from './menu-list'
import { Menu } from '#src/core/menu'
import { Pattern } from '#src/core/drawer/__story__/Pattern'
import { StarIcon } from '#src/icons/star'

// Placeholder href for all menu items in this story.
const href = '#'

const meta = preview.meta({
  title: 'Core/BottomBar/MenuList',
  component: BottomBarMenuList,
  argTypes: {
    children: {
      control: 'radio',
      options: ['No selected item', 'Selected item'],
      mapping: {
        'No selected item': buildMenu('No selected item'),
        'Selected item': buildMenu('Selected item'),
      },
    },
  },
  decorators: [
    (Story) => (
      <BottomBarContext.Provider value={{ state: 'extended' }}>
        <div
          style={{
            boxSizing: 'content-box',
            border: '1px solid #FA00FF',
          }}
        >
          <Pattern height="120px" />
          <Story />
        </div>
      </BottomBarContext.Provider>
    ),
  ],
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
})

export const Example = meta.story({
  args: {
    children: 'No selected item',
  },
})

/**
 * If a menu item represents the current page, it should be marked as "selected". See the `BottomBar.Item`
 * documentation for details on how.
 */
export const SelectedItem = meta.story({
  args: {
    children: 'Selected item',
  },
})

function buildMenu(type: 'No selected item' | 'Selected item') {
  return [
    <BottomBarMenuList.Item
      key="1"
      aria-current={type === 'Selected item' ? 'page' : false}
      href={href}
      icon={<StarIcon />}
    >
      Menu item 1
    </BottomBarMenuList.Item>,
    <BottomBarMenuList.Item key="2" aria-current={false} href={href} icon={<StarIcon />}>
      Menu item 2
    </BottomBarMenuList.Item>,
    <BottomBarMenuList.Item key="3" aria-current={false} href={href} icon={<StarIcon />}>
      Menu item 3
    </BottomBarMenuList.Item>,
    <BottomBarMenuList.Item key="4" aria-current={false} href={href} icon={<StarIcon />}>
      Menu item 4
    </BottomBarMenuList.Item>,
    <BottomBarMenuList.MenuItem key="5">
      <Menu.Item>Menu item 5</Menu.Item>
      <Menu.Item>Menu item 6</Menu.Item>
      <Menu.Item>Menu item 7</Menu.Item>
    </BottomBarMenuList.MenuItem>,
  ]
}
