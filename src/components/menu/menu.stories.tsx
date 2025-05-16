import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Menu } from '.'
import { Button } from '../button'
import { Icon } from '../icon'
import { FlexContainer } from '../layout'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: StoryObj = {
  render: () => {
    return (
      <Menu>
        <Menu.Trigger>
          {({ getTriggerProps }) => <Button {...getTriggerProps()} iconLeft={<Icon icon="more" fontSize="1rem" />} />}
        </Menu.Trigger>
        <Menu.Popover>
          <Menu.List>
            <Menu.Group label="Group Title">
              <Menu.Item label="Menu Item" onClick={console.log} />
              <Menu.Item label="Menu Item as anchor" href="/#" />
              <Menu.Item label="Menu Item (keep open)" closeMenu={false} isActive />
              <Menu.Item label="Menu Item (disabled)" onClick={console.log} disabled />
            </Menu.Group>
          </Menu.List>
        </Menu.Popover>
      </Menu>
    )
  },
}

export const WithCustomAlignment: Story = {
  render: () => {
    return (
      <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
        <Menu data-alignment="right">
          <Menu.Trigger>
            {({ getTriggerProps }) => <Button {...getTriggerProps()} iconLeft={<Icon icon="more" fontSize="1rem" />} />}
          </Menu.Trigger>
          <Menu.Popover yOffset={10}>
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
}

export const MoreComplexUsageExample: Story = {
  render: (props) => {
    const NavDropdownButtonUsageExample = ({
      title,
      yOffset,
      ...props
    }: ComponentProps<typeof Menu> & { title?: string; yOffset?: number }) => {
      return (
        <Menu {...props}>
          <Menu.Trigger>
            {({ getTriggerProps }) => (
              <Button {...getTriggerProps()} {...props} iconRight={<Icon icon="more" fontSize="1rem" />}>
                More
              </Button>
            )}
          </Menu.Trigger>
          <Menu.Popover yOffset={yOffset}>
            <Menu.List>
              <Menu.Group label={title ?? 'Group Title'}>
                <Menu.Item label="Menu Item" onClick={console.log} />
                <Menu.Item label="Menu Item as anchor" href="/#" />
                <Menu.Item label="Menu Item (keep open)" closeMenu={false} />
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
          height: '150vh',
          overflow: 'hidden',
          padding: 5,
        }}
      >
        <FlexContainer isFlexJustifyBetween>
          <NavDropdownButtonUsageExample {...props} />
          <NavDropdownButtonUsageExample {...props} data-alignment="right" title="Custom y-offset" yOffset={50} />
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
