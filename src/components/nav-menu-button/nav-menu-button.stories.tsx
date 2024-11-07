import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { ElNavMenuButton, NavMenuButton } from '.'
import { Icon } from '../icon'
import { FlexContainer } from '../layout'
import {
  ElMenu,
  ElMenuItemAnchor,
  ElMenuItemButton,
  ElMenuItemGroup,
  ElMenuItemGroupTitle,
  ElMenuList,
  ElMenuPopover,
  Menu,
} from '../menu'

const meta: Meta<typeof NavMenuButton> = {
  title: 'Components/Nav Menu Button',
  component: NavMenuButton,
}

export default meta
type Story = StoryObj<typeof NavMenuButton>

export const StylesOnlyUsage: Story = {
  render: () => {
    return (
      <ElMenu data-alignment="left">
        <ElNavMenuButton aria-haspopup="true" aria-expanded="true" role="button" type="button">
          More
          <Icon icon={'chevronUp'} intent="default" fontSize="1rem" />
        </ElNavMenuButton>
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

export const ReactUsage: StoryObj<{ children: string; 'data-alignment': 'left' | 'right' }> = {
  render: (props) => {
    return (
      <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
        <Menu {...props}>
          <Menu.Trigger>
            {({ getTriggerProps, isOpen }) => (
              <NavMenuButton
                {...getTriggerProps()}
                {...props}
                isOpen={isOpen}
                iconLeft={<Icon icon="more" fontSize="1rem" />}
              >
                {props.children}
              </NavMenuButton>
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
      </FlexContainer>
    )
  },
  args: {
    children: 'More',
    'data-alignment': 'left',
  },
  argTypes: {
    'data-alignment': {
      control: { type: 'radio' },
      options: ['left', 'right'],
    },
  },
}

export const MoreComplexUsageExample: StoryObj<ComponentProps<typeof Menu>> = {
  render: (props) => {
    const NavMenuButtonUsageExample = (props: ComponentProps<typeof Menu>) => {
      return (
        <Menu {...props}>
          <Menu.Trigger>
            {({ getTriggerProps, isOpen }) => (
              <NavMenuButton
                {...getTriggerProps()}
                {...props}
                isOpen={isOpen}
                iconLeft={<Icon icon="more" fontSize="1rem" />}
              >
                More
              </NavMenuButton>
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
      <FlexContainer
        isFlexColumn
        isFlexJustifyBetween
        style={{
          height: '95vh',
          overflow: 'hidden',
          padding: 5,
        }}
      >
        <FlexContainer isFlexJustifyBetween>
          <NavMenuButtonUsageExample {...props} />
          <NavMenuButtonUsageExample {...props} data-alignment="right" />
        </FlexContainer>
        <FlexContainer isFlexJustifyBetween>
          <NavMenuButtonUsageExample {...props} />
          <NavMenuButtonUsageExample {...props} data-alignment="right" />
        </FlexContainer>
      </FlexContainer>
    )
  },
}
