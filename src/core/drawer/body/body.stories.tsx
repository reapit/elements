import preview from '#.storybook/preview'
import { Breakpoint, useDrawerBreakpointDecorator } from '../__story__/useDrawerBreakpointDecorator'
import { DRAWER_CSS_CONTAINER_NAME } from '../constants'
import { Drawer } from '../drawer'
import { Pattern } from '../__story__/Pattern'

const meta = preview.meta({
  title: 'Core/Drawer/Body',
  component: Drawer.Body,
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
})

export const Example = meta.story({
  args: {
    children: 'Drawer content',
  },
})

/**
 * When the drawer body is followed by a footer, the body will have no block start (top) padding because the
 * header will not be sticky and, therefore, we do not need the additional space. This behaviour explicitly
 * depends on the presence of the `ElDrawerFooter` class being used; it will not work for custom footers that
 * use their own classes.
 */
export const Footer = Example.extend({
  args: {
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
        <Drawer.Footer>Footer</Drawer.Footer>
      </div>
    ),
  ],
})

/**
 * The drawer body will grow to the height of its content. It is the drawer itself that handles the overflow and
 * subsequent scrolling of the content.
 */
export const LongContent = meta.story({
  args: {
    children: <Pattern height="200px" />,
  },
})

/**
 * Like the header and footer, the drawer body will adjust it's layout based on the inline-size of its parent
 * container. This story demonstrates the layout changes within containers that mimic the drawer's width within
 * different breakpoints.
 */
export const DynamicLayout = meta.story({
  decorators: [useDrawerBreakpointDecorator()],
  render: () => (
    <>
      <Breakpoint breakpoint="XS-SM">
        <Drawer.Body {...Example.input.args} />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <Drawer.Body {...Example.input.args} />
      </Breakpoint>
    </>
  ),
})
