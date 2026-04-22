import preview from '#.storybook/preview'
import { Menu } from '#src/core/menu'
import { TopBarAvatarButton } from './avatar-button'

const meta = preview.meta({
  component: TopBarAvatarButton,
  title: 'Core/TopBar/AvatarButton',
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
      <TopBarAvatarButton
        {...Menu.getTriggerProps({ id: 'trigger', popoverTarget: 'menu', popoverTargetAction: 'toggle' })}
      >
        {children}
      </TopBarAvatarButton>
      <Menu aria-labelledby="trigger" id="menu" placement="bottom-end">
        <Menu.Item>Menu Item 1</Menu.Item>
        <Menu.Item>Menu Item 2</Menu.Item>
        <Menu.Item>Menu Item 3</Menu.Item>
      </Menu>
    </>
  ),
})
