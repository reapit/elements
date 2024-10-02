import type { Meta, StoryObj } from '@storybook/react'

import { ElMenu, ElMenuItemContainer, ElMenuItemGroup, ElMenuItemGroupTitle, Menu } from '.'

import { Menu as MenuMolecules } from './menu.molecules'
import { Button } from '../button'
import { ElNavMenuOptionDivider } from '../nav'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
}

export default meta
type Story = StoryObj<typeof Menu>

export const StylesOnlyUsage: StoryObj = {
  render: () => {
    return (
      <ElMenu>
        <ElMenuItemGroup>
          <li>
            <ElMenuItemGroupTitle>Group Title</ElMenuItemGroupTitle>
          </li>
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
        <ElNavMenuOptionDivider />
        <ElMenuItemGroup>
          <li>
            <ElMenuItemGroupTitle>Another Group Title</ElMenuItemGroupTitle>
          </li>
          <ElMenuItemContainer>
            <a href="/#">This is a Link</a>
          </ElMenuItemContainer>
        </ElMenuItemGroup>
      </ElMenu>
    )
  },
}

export const ReactShorthandWithProps: Story = {
  render: (props) => <Menu {...props} />,
  args: {
    groups: [
      {
        title: 'group title',
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
            onClick: () => 0,
          },
        ],
      },
    ],
  },
}

export const ReactShorthandWithComponents: Story = {
  render: (props) => (
    <MenuMolecules.List {...props}>
      <MenuMolecules.Group title="Group Title">
        <MenuMolecules.Item>
          <a href="/1">This is a Link</a>
        </MenuMolecules.Item>
        <MenuMolecules.Item>
          <Button type="button" onClick={() => 1}>
            This is a Button
          </Button>
        </MenuMolecules.Item>
      </MenuMolecules.Group>
    </MenuMolecules.List>
  ),
}
