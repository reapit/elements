import { Breakpoint, useDrawerBreakpointDecorator } from '../__story__/useDrawerBreakpointDecorator'
import { DRAWER_CSS_CONTAINER_NAME } from '../constants'
import { DrawerBody } from './body'
import { DrawerFooter } from '../footer'
import { Pattern } from '../__story__/Pattern'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Drawer/Body',
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
 * When the drawer body is followed by a footer, the body will have no block start (top) padding because the
 * header will not be sticky and, therefore, we do not need the additional space. This behaviour explicitly
 * depends on the presence of the `ElDrawerFooter` class being used; it will not work for custom footers that
 * use their own classes.
 */
export const Footer: Story = {
  args: {
    ...Example.args,
    children: <Pattern height="100px" />,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: 'border-box',
          border: '1px solid #FA00FF',
          containerName: DRAWER_CSS_CONTAINER_NAME,
          containerType: 'inline-size',
        }}
      >
        <Story />
        <DrawerFooter>Footer</DrawerFooter>
      </div>
    ),
  ],
}

/**
 * The drawer body will grow to the height of its content. It is the drawer itself that handles the overflow and
 * subsequent scrolling of the content.
 */
export const LongContent: Story = {
  args: {
    children: <Pattern height="200px" />,
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
