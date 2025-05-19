import type { Meta, StoryObj } from '@storybook/react'
import { ElNavDropdownButton, NavDropdownButton } from '.'
import { Icon } from '../icon'
import { FlexContainer } from '../layout'
import {
  ElMenu,
  ElMenuItemAnchor,
  ElMenuItemButton,
  ElMenuItemContent,
  ElMenuItemGroup,
  ElMenuItemGroupTitle,
  ElMenuItemLabel,
  ElMenuList,
  ElMenuPopover,
  Menu,
} from '../menu'

const meta: Meta<typeof NavDropdownButton> = {
  title: 'Components/Nav Dropdown Button',
  component: NavDropdownButton,
}

export default meta
type Story = StoryObj<typeof NavDropdownButton>

export const StylesOnlyUsage: Story = {
  render: () => {
    return (
      <ElMenu>
        <ElNavDropdownButton aria-haspopup="true" aria-expanded="true" role="button" type="button">
          More
          <Icon icon={'chevronUp'} intent="default" fontSize="1rem" />
        </ElNavDropdownButton>
        <ElMenuPopover>
          <ElMenuList>
            <ElMenuItemGroup role="group">
              <ElMenuItemGroupTitle>Group Title</ElMenuItemGroupTitle>
              <ElMenuItemButton role="menuitem">
                <ElMenuItemContent>
                  <ElMenuItemLabel>Menu Item</ElMenuItemLabel>
                </ElMenuItemContent>
              </ElMenuItemButton>
              <ElMenuItemButton role="menuitem">
                <ElMenuItemContent>
                  <ElMenuItemLabel>Menu Item</ElMenuItemLabel>
                </ElMenuItemContent>
              </ElMenuItemButton>
              <ElMenuItemAnchor href="/#" role="menuitem">
                <ElMenuItemContent>
                  <ElMenuItemLabel>Menu Item as anchor</ElMenuItemLabel>
                </ElMenuItemContent>
              </ElMenuItemAnchor>
            </ElMenuItemGroup>
          </ElMenuList>
        </ElMenuPopover>
      </ElMenu>
    )
  },
}

export const ReactUsage: Story = {
  render: (props) => {
    return (
      <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
        <Menu>
          <Menu.Trigger>
            {({ getTriggerProps, isOpen }) => (
              <NavDropdownButton
                {...getTriggerProps()}
                {...props}
                isOpen={isOpen}
                iconLeft={<Icon icon="more" fontSize="1rem" />}
              >
                {props.children}
              </NavDropdownButton>
            )}
          </Menu.Trigger>
          <Menu.Popover>
            <Menu.List>
              <Menu.Group label="Group Title">
                <Menu.Item label="Menu Item" onClick={console.log} />
                <Menu.Item label="Menu Item as anchor" href="/#" />
                <Menu.Item label="Menu Item (keep open)" closeMenu={false} />
              </Menu.Group>
            </Menu.List>
          </Menu.Popover>
        </Menu>
      </FlexContainer>
    )
  },
  args: {
    children: 'More',
  },
  argTypes: {
    isOpen: {
      table: {
        disable: true, // isOpen controlled by Menu
      },
    },
  },
}
