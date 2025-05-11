import { Breakpoint, useDrawerBreakpointDecorator } from '../__story__/useDrawerBreakpointDecorator'
import { composeStory } from '@storybook/react'
import { DrawerHeader } from './header'
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
        Tabs: 'TODO',
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
      default: 'light',
    },
  },
} satisfies Meta<typeof DrawerHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    action: 'Close',
    category: 'Category',
    supplementaryInfo: 'Supplementary Info',
    title: 'Drawer Title',
  },
}

const ExampleStory = composeStory(Example, meta)

/**
 * Like the body and footer, the drawer header will adjust it's padding based on the inline-size of its parent
 * container. This story demonstrates the unique padding within containers that mimic the drawer's width within
 * different breakpoints.
 */
export const DynamicPadding: StoryObj = {
  decorators: [useDrawerBreakpointDecorator()],
  render: () => (
    <>
      <Breakpoint breakpoint="XS-SM">
        <ExampleStory />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <ExampleStory />
      </Breakpoint>
    </>
  ),
}
