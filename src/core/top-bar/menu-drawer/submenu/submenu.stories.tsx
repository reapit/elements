import preview from '#.storybook/preview'
import { TopBarMenuDrawerSubmenu } from './submenu'

const meta = preview.meta({
  title: 'Core/TopBar/MenuDrawer/Submenu',
  component: TopBarMenuDrawerSubmenu,
  argTypes: {
    children: {
      control: false,
    },
  },
})

export const Example = meta.story({
  args: {
    children: (
      <>
        <TopBarMenuDrawerSubmenu.Item href="#" aria-current={false}>
          Item 1
        </TopBarMenuDrawerSubmenu.Item>
        <TopBarMenuDrawerSubmenu.Item href="#" aria-current="page">
          Item 2
        </TopBarMenuDrawerSubmenu.Item>
        <TopBarMenuDrawerSubmenu.ItemButton onClick={() => alert('Item 3 clicked!')}>
          Item 3
        </TopBarMenuDrawerSubmenu.ItemButton>
      </>
    ),
  },
})
