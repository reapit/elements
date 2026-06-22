import preview from '#.storybook/preview'
import { Menu } from '#src/core/menu'
import { TopBar } from '../top-bar'

const meta = preview.meta({
  component: TopBar.AvatarButton,
  title: 'Navigation/TopBar/AvatarButton',
})

export const Example = meta.story({
  args: {
    children: 'KD',
  },
})

/**
 * The following example demonstrates the use of `TopBar.AvatarButton` with the `Menu` component.
 */
export const WithMenu = Example.extend({
  name: 'With a Menu',

  argTypes: {
    'aria-expanded': {
      control: false,
    },
  },

  parameters: {
    layout: 'centered',
  },

  render: ({ children }) => (
    <>
      <TopBar.AvatarButton
        {...Menu.getTriggerProps({ id: 'trigger', popoverTarget: 'menu', popoverTargetAction: 'toggle' })}
      >
        {children}
      </TopBar.AvatarButton>
      <Menu aria-labelledby="trigger" id="menu" placement="bottom-end">
        <Menu.Item>Menu Item 1</Menu.Item>
        <Menu.Item>Menu Item 2</Menu.Item>
        <Menu.Item>Menu Item 3</Menu.Item>
      </Menu>
    </>
  ),
})
