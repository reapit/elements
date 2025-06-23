import { Breakpoint, useDrawerBreakpointDecorator } from '../__story__/useDrawerBreakpointDecorator'
import { DrawerHeader } from './header'

import type { Meta, StoryObj } from '@storybook/react-vite'

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
    children: {
      control: 'text',
    },
    overline: {
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
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
} satisfies Meta<typeof DrawerHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    action: 'Close',
    overline: 'Optional text',
    children: 'Drawer Title',
    supplementaryInfo: 'Supplementary Info',
  },
}

/**
 * Like the body and footer, the drawer header will adjust it's layout based on the inline-size of its parent
 * container. This story demonstrates the layout changes within containers that mimic the drawer's width within
 * different breakpoints.
 */
export const DynamicLayout: StoryObj = {
  decorators: [useDrawerBreakpointDecorator()],
  render: () => (
    <>
      <Breakpoint breakpoint="XS-SM">
        <DrawerHeader {...Example.args} action={<DrawerHeader.CloseButton />} />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <DrawerHeader {...Example.args} action={<DrawerHeader.CloseButton />} />
      </Breakpoint>
    </>
  ),
}
