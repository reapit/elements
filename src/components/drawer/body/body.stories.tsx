import { Breakpoint, useDrawerBreakpointDecorator } from '../__story__/useDrawerBreakpointDecorator'
import { DrawerBody } from './body'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Drawer/Body',
  component: DrawerBody,
  argTypes: {
    children: {
      control: 'text',
    },
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
} satisfies Meta<typeof DrawerBody>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Drawer content',
  },
}

/**
 * The drawer body will grow to the height of its content. It is the drawer itself that handles the overflow and
 * subsequent scrolling of the content.
 */
export const LongContent: Story = {
  args: {
    children: (
      <div style={{ color: '#FA00FF' }}>
        ↓↓↓↓
        <div style={{ height: '500px' }} />
        ↑↑↑↑
      </div>
    ),
  },
}

/**
 * Like the header and footer, the drawer body will adjust it's layout based on the inline-size of its parent
 * container. This story demonstrates the layout changes within containers that mimic the drawer's width within
 * different breakpoints.
 */
export const DynamicLayout: StoryObj = {
  decorators: [useDrawerBreakpointDecorator()],
  render: () => (
    <>
      <Breakpoint breakpoint="XS-SM">
        <DrawerBody {...Example.args} />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <DrawerBody {...Example.args} />
      </Breakpoint>
    </>
  ),
}
