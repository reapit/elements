import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, type ComponentProps } from 'react'
import { Menu, useMenuContext } from '.'
import { DeprecatedButton } from '../../deprecated/button'
import { DeprecatedIcon } from '../../deprecated/icon'
import { FlexContainer, MainContainer } from '../../deprecated/layout'
import { elHScreen } from '../../styles/sizing'
import { Badge } from '../badge'

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
          {({ getTriggerProps }) => (
            <DeprecatedButton {...getTriggerProps()} iconLeft={<DeprecatedIcon icon="more" fontSize="1rem" />} />
          )}
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

export const WithCompleteFeatures: StoryObj = {
  render: () => {
    return (
      <Menu>
        <Menu.Trigger>
          {({ getTriggerProps }) => (
            <DeprecatedButton {...getTriggerProps()} iconLeft={<DeprecatedIcon icon="more" fontSize="1rem" />} />
          )}
        </Menu.Trigger>
        <Menu.Popover>
          <Menu.List maxWidth="--size-80" maxHeight="--size-80">
            <Menu.Group label="Long Group Title that doesn't fit in one line">
              <Menu.Item
                label="Menu Item"
                supplementaryInfo="Short description about the item"
                badge={<Badge colour="neutral">Badge</Badge>}
                onClick={console.log}
                leftIcon={<DeprecatedIcon icon="property" />}
                rightIcon={<DeprecatedIcon icon="exportIcon" />}
              />
              <Menu.Item
                label="Menu Item anchor with long example text"
                supplementaryInfo="Secondary info long description that won’t fit in one line"
                badge={<Badge colour="neutral">Badge</Badge>}
                href="/#"
                leftIcon={<DeprecatedIcon icon="property" />}
                rightIcon={<DeprecatedIcon icon="exportIcon" />}
              />
              <Menu.Item
                label="Menu Item active"
                supplementaryInfo="Short description about the item"
                badge={<Badge colour="neutral">Badge</Badge>}
                isActive
                onClick={console.log}
                leftIcon={<DeprecatedIcon icon="property" />}
                rightIcon={<DeprecatedIcon icon="exportIcon" />}
              />
              <Menu.Item
                label="Menu Item (disabled)"
                supplementaryInfo="Short description about the item"
                badge={<Badge colour="neutral">Badge with long text</Badge>}
                onClick={console.log}
                disabled
                leftIcon={<DeprecatedIcon icon="property" />}
                rightIcon={<DeprecatedIcon icon="exportIcon" />}
              />
            </Menu.Group>
            <Menu.Group maxHeight="--size-32" label="Group Title">
              <Menu.Item label="Menu Item 1" onClick={console.log} />
              <Menu.Item label="Menu Item 2" href="/#" />
              <Menu.Item label="Menu Item 3" href="/#" />
              <Menu.Item label="Menu Item 4" href="/#" />
              <Menu.Item label="Menu Item 5" href="/#" />
              <Menu.Item label="Menu Item 6" href="/#" />
              <Menu.Item label="Menu Item 7" href="/#" />
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
            {({ getTriggerProps }) => (
              <DeprecatedButton {...getTriggerProps()} iconLeft={<DeprecatedIcon icon="more" fontSize="1rem" />} />
            )}
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
              <DeprecatedButton
                {...getTriggerProps()}
                {...props}
                iconRight={<DeprecatedIcon icon="more" fontSize="1rem" />}
              >
                More
              </DeprecatedButton>
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

export const WithIframe: Story = {
  render: () => {
    const IFrameComponent = () => {
      return (
        <iframe
          src="https://www.example.com"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            marginTop: '1rem',
          }}
          title="Example IFrame"
        />
      )
    }

    // NOTE: make sure this component is rendered inside the Menu context
    const IframeHandler = () => {
      const { closeMenu } = useMenuContext()

      // close the menu when iframe is focused
      useEffect(() => {
        const controller = new AbortController()
        const handleWindowBlur = () => {
          if (document.activeElement?.tagName === 'IFRAME') {
            closeMenu()
          }
        }

        window.addEventListener('blur', handleWindowBlur, {
          signal: controller.signal,
        })
        return () => {
          controller.abort()
        }
      }, [closeMenu])
      return null
    }

    return (
      <MainContainer className={elHScreen}>
        <Menu>
          <Menu.Trigger>
            {({ getTriggerProps }) => (
              <DeprecatedButton {...getTriggerProps()} iconLeft={<DeprecatedIcon icon="more" fontSize="1rem" />} />
            )}
          </Menu.Trigger>
          <Menu.Popover>
            <IframeHandler />
            <Menu.List>
              <Menu.Group label="Group Title">
                <Menu.Item label="Menu Item" onClick={console.log} />
              </Menu.Group>
            </Menu.List>
          </Menu.Popover>
        </Menu>
        <IFrameComponent />
      </MainContainer>
    )
  },
}
