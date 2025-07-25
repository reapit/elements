import { Button } from '#src/core/button/index'
import { Breakpoint, useDrawerBreakpointDecorator } from '../__story__/useDrawerBreakpointDecorator'
import { DRAWER_CSS_CONTAINER_NAME } from '../constants'
import { DrawerFooter } from './footer'
import { Pattern } from '../__story__/Pattern'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Drawer/Footer',
  component: DrawerFooter,
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      // NOTE: The footer requires a parent container with `containerType: 'inline-size'` to allow its container
      // queries to work. Typically, this would be the Drawer itself, but we're not rendering that here.
      <div style={{ containerName: DRAWER_CSS_CONTAINER_NAME, containerType: 'inline-size' }}>
        <Story />
      </div>
    ),
  ],
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
} satisfies Meta<typeof DrawerFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: (
      <>
        {/* Note: We use `display: contents` to allow the grid layout of the footer to affect the Cancel button.
         * There are other ways to achieve this, but this is one of the simplest. We may chose, in future, to
         * provide a Drawer-specific Cancel button similar to the header's Close button.*/}
        <form style={{ display: 'contents' }}>
          <Button formMethod="dialog" size="medium" type="submit" variant="secondary">
            Cancel
          </Button>
        </form>
        <Button size="medium" variant="primary">
          Add
        </Button>
      </>
    ),
  },
}

/**
 * The drawer footer is always sticky positioned to the bottom of its parent container when its parent overflows.
 */
export const StickyPositioning: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: 'border-box',
          border: '1px solid #FA00FF',
          containerName: DRAWER_CSS_CONTAINER_NAME,
          containerType: 'inline-size',
          maxHeight: '200px',
          overflow: 'auto',
        }}
      >
        <Pattern />
        <Story />
      </div>
    ),
  ],
}

/**
 * Like the header and body, the drawer footer will adjust it's layout based on the inline-size of its parent
 * container. This story demonstrates the layout changes within containers that mimic the drawer's width within
 * different breakpoints.
 */
export const DynamicLayout: StoryObj = {
  decorators: [useDrawerBreakpointDecorator()],
  render: () => (
    <>
      <Breakpoint breakpoint="XS-SM">
        <DrawerFooter {...Example.args} />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <DrawerFooter {...Example.args} />
      </Breakpoint>
    </>
  ),
}
