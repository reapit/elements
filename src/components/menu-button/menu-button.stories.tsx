import { css } from '@linaria/core'
import { TextSM } from '../typography'
import type { Meta, StoryObj } from '@storybook/react'
import { ElMenuButtonContainer, ElMenuButtonToggler, MenuButton } from '.'
import { ElMenu, ElMenuItemButton, ElMenuItemContainer, ElMenuItemGroup, ElMenuItemLink } from '../menu'
import { Icon } from '../icon'

const meta: Meta<typeof MenuButton> = {
  title: 'Components/Menu Button',
  component: MenuButton,
  argTypes: {
    label: {
      type: 'string',
    },
    intent: {
      type: 'string',
    },
    top: {
      type: 'number',
      description: 'i.e Y-offset of the `Menu` component',
    },
    hasBorder: {
      type: 'boolean',
    },
    alignment: {
      control: 'inline-radio',
    },
  },
}

export default meta
type Story = StoryObj<typeof MenuButton>

export const StylesOnlyUsage: Story = {
  render: () => {
    return (
      <ElMenuButtonContainer>
        <ElMenuButtonToggler type="button">
          More
          <Icon icon={'chevronUp'} intent="default" fontSize="1rem" />
        </ElMenuButtonToggler>
        <ElMenu>
          <ElMenuItemGroup>
            <ElMenuItemContainer>
              <ElMenuItemLink href="/#">
                <TextSM hasNoMargin>This is a Link</TextSM>
              </ElMenuItemLink>
            </ElMenuItemContainer>
            <ElMenuItemContainer>
              <ElMenuItemLink href="/#">
                <TextSM hasNoMargin>This is a Link</TextSM>
              </ElMenuItemLink>
            </ElMenuItemContainer>
            <ElMenuItemContainer>
              <ElMenuItemButton onClick={() => 'example'}>
                <TextSM hasNoMargin>This is a Button</TextSM>
              </ElMenuItemButton>
            </ElMenuItemContainer>
          </ElMenuItemGroup>
        </ElMenu>
      </ElMenuButtonContainer>
    )
  },
}

export const ReactShorthand: StoryObj<typeof MenuButton> = {
  render: (props) => <MenuButton {...props} />,
  args: {
    label: 'More',
    intent: undefined,
    hasBorder: false,
    menuGroups: [
      {
        items: [
          {
            children: 'This is a Link',
            href: '/',
          },
          {
            children: 'This is a Button',
            onClick: () => 'example',
          },
        ],
      },
    ],
  },
  argTypes: {
    onClick: { action: 'onClick' },
  },
}

export const MultipleGroupExample: StoryObj<typeof MenuButton> = {
  render: (props) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            gap: 25,
          }}
        >
          <MenuButton {...props} menuGroups={[props.menuGroups[0], props.menuGroups[0]]} />
        </div>
        <MenuButton id="rightSideMenuButton" {...props} alignment="right" />
      </div>
    )
  },
  args: {
    label: 'More',
    intent: undefined,
    menuGroups: [
      {
        title: 'Group title',
        items: [
          {
            children: 'This is really long text for a line of Link',
            href: '/',
          },
          {
            children: 'This is a Button',
            onClick: () => 'example',
          },
        ],
      },
    ],
  },
}

export const WithIntent: Story = {
  args: {
    ...ReactShorthand.args,
    intent: 'primary',
  },
  argTypes: ReactShorthand.argTypes,
  render: (props) => <MenuButton {...props} />,
}
