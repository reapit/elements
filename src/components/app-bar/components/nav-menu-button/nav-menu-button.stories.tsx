import type { Meta, StoryObj } from '@storybook/react'
import { ElNavMenuButtonContainer, ElNavMenuButtonMenuContainer, ElNavMenuButtonToggler, NavMenuButton } from '.'
import { ElMenu, ElMenuItemContainer, ElMenuItemGroup } from '../../../menu'
import { Icon } from '../../../icon'
import { Button } from '../../../button'

const meta: Meta<typeof NavMenuButton> = {
  title: 'Components/App Bar/Nav Menu Button',
  component: NavMenuButton,
  argTypes: {
    label: {
      type: 'string',
    },
    top: {
      type: 'number',
      description: 'i.e Y-offset of the `Menu` component',
    },

    alignment: {
      control: 'inline-radio',
    },
  },
}

export default meta
type Story = StoryObj<typeof NavMenuButton>

export const StylesOnlyUsage: Story = {
  render: () => {
    return (
      <ElNavMenuButtonContainer>
        <ElNavMenuButtonToggler type="button">
          More
          <Icon icon={'chevronUp'} intent="default" fontSize="1rem" />
        </ElNavMenuButtonToggler>
        <ElNavMenuButtonMenuContainer>
          <ElMenu>
            <ElMenuItemGroup>
              <ElMenuItemContainer>
                <a href="/#">This is a Link</a>
              </ElMenuItemContainer>
              <ElMenuItemContainer>
                <a href="/#">This is a Link</a>
              </ElMenuItemContainer>
              <ElMenuItemContainer>
                <Button type="button" onClick={() => 1}>
                  This is a Button
                </Button>
              </ElMenuItemContainer>
            </ElMenuItemGroup>
          </ElMenu>
        </ElNavMenuButtonMenuContainer>
      </ElNavMenuButtonContainer>
    )
  },
}

export const ReactShorthand: StoryObj<typeof NavMenuButton> = {
  render: (props) => {
    if (props.alignment === 'right') {
      return (
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <NavMenuButton {...props} />
        </div>
      )
    }
    return <NavMenuButton {...props} />
  },
  args: {
    label: 'More',
    alignment: 'left',
    menuGroups: [
      {
        items: [
          {
            children: <a href="/1">This is a Link</a>,
          },
          {
            children: (
              <Button type="button" onClick={() => 1}>
                This is a Button
              </Button>
            ),
          },
        ],
      },
    ],
  },
  argTypes: {
    onClick: { action: 'onClick' },
  },
}

export const MoreComplexUsageExample: StoryObj<typeof NavMenuButton> = {
  render: (props) => {
    if (props.alignment === 'right') {
      return (
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <NavMenuButton {...props} />
        </div>
      )
    }
    return <NavMenuButton {...props} />
  },
  args: {
    label: 'More',
    alignment: 'left',
    menuGroups: [
      {
        title: 'Group title',
        items: [
          {
            children: <a href="/">This is very long line of text for a Link</a>,
          },
          {
            children: (
              <Button type="button" onClick={() => 1}>
                This is a Button
              </Button>
            ),
          },
        ],
      },
    ],
  },
}
