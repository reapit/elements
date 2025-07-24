import type { Meta, StoryObj } from '@storybook/react-vite'
import { TopBarNavDropdownButton } from '.'
import { Menu } from '#src/deprecated/menu'

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
    'aria-expanded': false,
    children: 'More',
  },
}

/**
 * When the dropdown's menu is expanded, `aria-expanded` should be `true`. In this case, the button's chevron icon will
 * be rotated to visually communicate the "openness" of the menu. For accessible users, this is communicated via the
 * `aria-expanded` attribute itself.
 */
export const Expanded: Story = {
  args: {
    ...Example.args,
    'aria-expanded': true,
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
 * The following example demonstrates the use of `TopBar.NavDropdownButton` with the `Menu` component. The code
 * snippet does not work well with the `Menu.Trigger` component's render-prop, but it works as follows:
 *
 * ```tsx
 * <Menu.Trigger>
 *  {({ getTriggerProps }) => (
 *    <TopBar.NavDropdownButton {...getTriggerProps()}>
 *      More
 *    </TopBar.NavDropdownButton>
 *  )}
 * </Menu.Trigger>
 * ```
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
  render: ({ children }) => (
    <Menu>
      <Menu.Trigger>
        {({ getTriggerProps }) => <TopBarNavDropdownButton {...getTriggerProps()}>{children}</TopBarNavDropdownButton>}
      </Menu.Trigger>
      <Menu.Popover>
        <Menu.List>
          <Menu.Item label="Menu Item 1" />
          <Menu.Item label="Menu Item 2" />
          <Menu.Item label="Menu Item 3" />
        </Menu.List>
      </Menu.Popover>
    </Menu>
  ),
}
