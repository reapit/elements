import type { Meta, StoryObj } from '@storybook/react'
import {
  ElMenu,
  ElMenuItemAnchor,
  ElMenuItemButton,
  ElMenuItemGroup,
  ElMenuItemGroupTitle,
  ElMenuList,
  ElMenuPopover,
  Menu,
} from '.'
import { Button } from '../button'
import { Icon } from '../icon'
import type { ComponentProps } from 'react'
import { FlexContainer } from '../layout'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  argTypes: {
    'data-alignment': {
      control: false,
      description:
        'to control the alignment of Menu container, will default to left if not provided (please see `More Complex Usage Example` for interactive example)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Menu>

export const StylesOnlyUsage: StoryObj = {
  render: () => {
    return (
      <ElMenu data-alignment="left">
        <ElMenuPopover>
          <ElMenuList role="menu">
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

export const ReactUsage: Story = {
  render: () => {
    return (
      <Menu>
        <Menu.Trigger>
          {({ getTriggerProps }) => <Button {...getTriggerProps()} iconLeft={<Icon icon="more" fontSize="1rem" />} />}
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
  },
}

export const MoreComplexUsageExample: StoryObj<ComponentProps<typeof Menu>> = {
  render: (props) => {
    const NavDropdownButtonUsageExample = ({
      title,
      additionalGap,
      ...props
    }: ComponentProps<typeof Menu> & { title?: string; additionalGap?: number }) => {
      return (
        <Menu {...props}>
          <Menu.Trigger>
            {({ getTriggerProps }) => (
              <Button {...getTriggerProps()} {...props} iconRight={<Icon icon="more" fontSize="1rem" />}>
                More
              </Button>
            )}
          </Menu.Trigger>
          <Menu.Popover additionalGap={additionalGap}>
            <Menu.List>
              <Menu.Group label={title ?? 'Group Title'}>
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
          height: '170vh',
          overflow: 'hidden',
          padding: 5,
        }}
      >
        <FlexContainer isFlexJustifyBetween>
          <NavDropdownButtonUsageExample {...props} />
          <NavDropdownButtonUsageExample {...props} data-alignment="right" title="Custom y-offset" additionalGap={50} />
        </FlexContainer>
        <FlexContainer isFlexJustifyBetween>
          <NavDropdownButtonUsageExample {...props} />
          <NavDropdownButtonUsageExample {...props} data-alignment="right" />
        </FlexContainer>
        <FlexContainer isFlexJustifyBetween>
          <NavDropdownButtonUsageExample {...props} />
          <NavDropdownButtonUsageExample {...props} data-alignment="right" />
        </FlexContainer>
      </FlexContainer>
    )
  },
}
