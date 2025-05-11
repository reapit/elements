import DrawerHeader from './header'
import { Tabs } from '../../tabs'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Drawer/Header',
  component: DrawerHeader,
  argTypes: {
    action: {
      control: 'radio',
      mapping: {
        Close: <DrawerHeader.CloseButton />,
        None: null,
      },
      options: ['Close', 'None'],
    },
    category: {
      control: 'text',
    },
    supplementaryInfo: {
      control: 'text',
    },
    tabs: {
      control: 'radio',
      mapping: {
        Tabs: (
          <Tabs
            name="tabs"
            options={[
              { id: '1', text: 'Tab 1', value: '1', isChecked: true },
              { id: '2', text: 'Tab 2', value: '2', isChecked: false },
            ]}
          />
        ),
        None: null,
      },
      options: ['Tabs', 'None'],
    },
    title: {
      control: 'text',
    },
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
} satisfies Meta<typeof DrawerHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    action: 'Close',
    category: '',
    supplementaryInfo: '',
    title: 'Drawer Title',
  },
}

/**
 * Detail drawer headers must have a close button; this will typically be the `<DrawerHeader.CloseButton />`. They can also
 * have tabs to help logically group the drawer's content.
 */
export const DetailDrawers: Story = {
  args: {
    action: 'Close',
    category: 'Category',
    supplementaryInfo: 'Supplementary Info',
    title: 'Drawer Title',
    tabs: 'Tabs',
  },
}

/**
 * Form drawer headers must not have a close button. Rather, the drawer can only be closed via the actions contained
 * in the drawer's footer. Further, form drawers must not have tabs.
 */
export const FormDrawers: Story = {
  args: {
    action: 'None',
    supplementaryInfo: 'Supplementary Info',
    title: 'Drawer Title',
  },
}
