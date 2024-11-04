import type { Meta, StoryObj } from '@storybook/react'
import { elNavMenuContainer, ElNavMenuButtonToggler, NavMenuButtonToggler } from '.'
import { Icon } from '../../../icon'
import {
  ElMenu,
  ElMenuItemAnchor,
  ElMenuItemButton,
  ElMenuItemGroup,
  ElMenuItemGroupTitle,
  ElMenuList,
  ElMenuPopover,
  Menu,
} from '../../../menu'

const meta: Meta<typeof NavMenuButtonToggler> = {
  title: 'Components/App Bar/Menu Button Toggler',
  component: NavMenuButtonToggler,
}

export default meta
type Story = StoryObj<typeof NavMenuButtonToggler>

export const StylesOnlyUsage: Story = {
  render: () => {
    return (
      <ElMenu>
        <ElNavMenuButtonToggler aria-haspopup="true" aria-expanded="true" role="button" type="button">
          More
          <Icon icon={'chevronUp'} intent="default" fontSize="1rem" />
        </ElNavMenuButtonToggler>
        <ElMenuPopover>
          <ElMenuList>
            <ElMenuItemGroup role="group">
              <ElMenuItemGroupTitle>Group Title</ElMenuItemGroupTitle>
              <ElMenuItemButton role="menuitem">Menu Item</ElMenuItemButton>
              <ElMenuItemButton role="menuitem">Menu Item</ElMenuItemButton>
              <ElMenuItemAnchor href="/#" role="menuitem">
                Menu Item as anchor
              </ElMenuItemAnchor>
            </ElMenuItemGroup>
          </ElMenuList>
        </ElMenuPopover>
      </ElMenu>
    )
  },
}

export const MoreComplexUsageExample: StoryObj<typeof NavMenuButtonToggler> = {
  render: (props) => {
    const NavMenuButton = () => {
      return (
        <Menu className={elNavMenuContainer}>
          <Menu.Trigger>
            {({ getTriggerProps, isOpen }) => (
              <NavMenuButtonToggler
                {...getTriggerProps()}
                {...props}
                isExpanded={isOpen}
                iconLeft={<Icon icon="more" fontSize="1rem" />}
              />
            )}
          </Menu.Trigger>
          <Menu.Popover>
            <Menu.List>
              <Menu.Group label="Group Title">
                <Menu.Item onClick={console.log}>Menu Item</Menu.Item>
                <Menu.Item href="/#">Menu Item as anchor</Menu.Item>
                <Menu.Item closeMenu={false}>Menu Item (keep open)</Menu.Item>
              </Menu.Group>
            </Menu.List>
          </Menu.Popover>
        </Menu>
      )
    }
    return (
      <div
        style={{
          height: '95vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          // alignItems: props.alignment === 'left' ? 'flex-start' : 'flex-end',
          overflow: 'hidden',
          padding: 5,
        }}
      >
        <NavMenuButton {...props} />

        <NavMenuButton {...props} />
      </div>
    )
  },
  args: {
    label: 'More',
    // alignment: 'left',
  },
}
