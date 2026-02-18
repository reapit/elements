import type { Meta, StoryObj } from '@storybook/react-vite'
import { TopBarNavDropdownButton } from '.'
import { Menu } from '#src/core/menu'
import { useId } from 'react'

const meta: Meta<typeof TopBarNavDropdownButton> = {
  title: 'Core/TopBar/NavDropdownButton',
  component: TopBarNavDropdownButton,
  argTypes: {
    children: {
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'More',
  },
}

/**
 * When there is not enough space to display the full label, it will not wrap to a new line; rather, it will overflow
 * its container. That said, author's should typically ensure nav items have enough space in the Top Bar. As the main
 * nav's space reduces, nav items should be progressively collapsed into a `TopBar.NavDropdownButton` and its menu.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '50px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * The following example demonstrates the use of `TopBar.NavDropdownButton` with the `Menu` component.
 */
export const WithAMenu: Story = {
  name: 'With a Menu',
  args: {
    ...Example.args,
  },
  argTypes: {
    'aria-expanded': {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200px' }}>
        <Story />
      </div>
    ),
  ],
  render: ({ children }) => {
    const triggerId = useId()
    const menuId = useId()
    return (
      <>
        <TopBarNavDropdownButton
          {...Menu.getTriggerProps({ id: triggerId, popoverTarget: menuId, popoverTargetAction: 'toggle' })}
        >
          {children}
        </TopBarNavDropdownButton>
        <Menu aria-labelledby={triggerId} id={menuId} placement="bottom-start">
          <Menu.Item>Menu Item 1</Menu.Item>
          <Menu.Item>Menu Item 2</Menu.Item>
          <Menu.Item>Menu Item 3</Menu.Item>
        </Menu>
      </>
    )
  },
}
