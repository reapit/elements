import type { Meta, StoryObj } from '@storybook/react'

import { ElMenu, ElMenuItemContainer, ElMenuItemGroup, ElMenuItemGroupTitle, ElMenuRadioItem, Menu } from '.'

import { Avatar } from '../avatar'
import { Button } from '../button'
import { Icon } from '../icon'
import { FlexContainer } from '../layout'
import { ElNavMenuOptionDivider } from '../nav'
import { TextSM, TextXS } from '../typography'
import { Menu as MenuMolecules } from './menu.molecules'

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
          <ElMenuRadioItem role="option" aria-selected="true" data-selected="true">
            <Icon intent="primary" icon="check" aria-hidden="true" />
            Menu Item 1
          </ElMenuRadioItem>
          <ElMenuRadioItem role="option" aria-selected="false" data-selected="false">
            Menu Item 2
          </ElMenuRadioItem>
          <ElMenuRadioItem role="option" aria-selected="false" data-selected="false">
            Menu Item 3
          </ElMenuRadioItem>
        </ElMenuItemGroup>
        <ElNavMenuOptionDivider />
        <ElMenuItemGroup>
          <li>
            <ElMenuItemGroupTitle>Another Group Title</ElMenuItemGroupTitle>
          </li>
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

export const ReactShorthandRadioVersion: Story = {
  render: (props) => <Menu {...props} />,
  args: {
    groups: [
      {
        title: 'Radio title',
        type: 'radio',
        onChange: (selectedItems) => {
          console.log(selectedItems)
        },
        items: [
          {
            label: 'Menu Item 1',
            defaultChecked: true,
          },
          {
            label: 'Menu Item 2',
          },
          {
            label: 'Menu Item 3',
          },
        ],
      },
    ],
  },
}

export const ReactShorthandMixedVersion: Story = {
  render: (props) => <Menu {...props} />,
  args: {
    groups: [...ReactShorthandRadioVersion.args!.groups!, ...ReactShorthandWithProps.args!.groups!],
  },
}

const ContactMenuItemExample = () => (
  <li>
    <FlexContainer
      style={{
        cursor: 'pointer',
        padding: 'var(--spacing-2) var(--spacing-4) var(--spacing-2) var(--spacing-4)',
        gap: 'var(--spacing-3)',
      }}
    >
      <Avatar alt="A stock image randomly generated" src="https://picsum.photos/200" />
      <div>
        <FlexContainer
          style={{
            gap: 'var(--spacing-2)',
          }}
        >
          <TextSM>Full Name</TextSM>
          <TextXS hasGreyText>name@company.com.au</TextXS>
        </FlexContainer>
        <TextXS hasGreyText>Owner &bull; 1 properties</TextXS>
      </div>
    </FlexContainer>
  </li>
)

export const ReactShorthandWithComponents: Story = {
  render: (props) => (
    <MenuMolecules.List {...props}>
      <MenuMolecules.Group title="Group Title">
        <ContactMenuItemExample />
        <ContactMenuItemExample />
        <ContactMenuItemExample />
      </MenuMolecules.Group>
    </MenuMolecules.List>
  ),
}
