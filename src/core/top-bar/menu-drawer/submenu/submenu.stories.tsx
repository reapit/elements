import preview from '#.storybook/preview'
import { TopBarMenuDrawer } from '../menu-drawer'

const meta = preview.meta({
  title: 'Navigation/TopBar/MenuDrawer/Submenu',
  component: TopBarMenuDrawer.Submenu,
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
        <TopBarMenuDrawer.Submenu.Item href="#" aria-current={false}>
          Item 1
        </TopBarMenuDrawer.Submenu.Item>
        <TopBarMenuDrawer.Submenu.Item href="#" aria-current="page">
          Item 2
        </TopBarMenuDrawer.Submenu.Item>
        <TopBarMenuDrawer.Submenu.ItemButton onClick={() => alert('Item 3 clicked!')}>
          Item 3
        </TopBarMenuDrawer.Submenu.ItemButton>
      </>
    ),
  },
})
