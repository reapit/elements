import { Breakpoint, useDrawerBreakpointDecorator } from '../__story__/useDrawerBreakpointDecorator'
import { DrawerHeader } from './header'
import { DrawerFooter } from '../footer'
import { Pattern } from '../__story__/Pattern'
import { PrimaryTabs } from '#src/core/primary-tabs/index'
import { useDrawerContextDecorator } from '../__story__/useDrawerContextDecorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/Drawer/Header',
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
        Tabs: (
          <PrimaryTabs overflow="scroll">
            <PrimaryTabs.Item aria-current="page" href={href}>
              Tab item
            </PrimaryTabs.Item>
            <PrimaryTabs.Item aria-current={false} href={href}>
              Tab item
            </PrimaryTabs.Item>
            <PrimaryTabs.Item aria-current={false} href={href}>
              Tab item
            </PrimaryTabs.Item>
            <PrimaryTabs.Item aria-current={false} href={href}>
              Tab item
            </PrimaryTabs.Item>
            <PrimaryTabs.Item aria-current={false} href={href}>
              Tab item
            </PrimaryTabs.Item>
            <PrimaryTabs.Item aria-current={false} href={href}>
              Tab item
            </PrimaryTabs.Item>
            <PrimaryTabs.Item aria-current={false} href={href}>
              Tab item
            </PrimaryTabs.Item>
          </PrimaryTabs>
        ),
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
  decorators: [useDrawerContextDecorator()],
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
 * Tabs can also be used within the Drawer's header. Typically, these will be
 * [PrimaryTabs](?path=/docs/core-primarytabs--docs). While the number of tabs should generally be kept low,
 * if there are too many to fit within the drawer's header, `overflow="scroll"` can be used with the `PrimaryTabs`
 * component to allow them to scroll.
 */
export const Tabs: Story = {
  args: {
    ...Example.args,
    tabs: 'Tabs',
  },
}

/**
 * By default, the drawer header will be sticky when the drawer content scrolls. This ensures the context displayed by
 * the drawer's header is always visible when viewing the content.
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
          containerName: 'drawer',
          containerType: 'inline-size',
          maxHeight: '200px',
          overflow: 'auto',
        }}
      >
        <Story />
        <Pattern />
      </div>
    ),
  ],
}

/**
 * However, when the drawer has a footer, the header will not be sticky and it will have no bottom border. This
 * behaviour explicitly depends on the presence of the "official" drawer footer's class being a
 * [subsequent sibling](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator) to the header.
 */
export const StaticPositioning: Story = {
  args: {
    ...Example.args,
    action: 'None',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: 'border-box',
          border: '1px solid #FA00FF',
          containerName: 'drawer',
          containerType: 'inline-size',
          maxHeight: '200px',
          overflow: 'auto',
        }}
      >
        <Story />
        <Pattern />
        <DrawerFooter>Footer</DrawerFooter>
      </div>
    ),
  ],
}

/**
 * Like the body and footer, the drawer header will adjust it's layout based on the inline-size of its parent
 * container. This story demonstrates the layout changes within containers that mimic the drawer's width within
 * different breakpoints.
 */
export const DynamicLayout: Story = {
  args: {
    ...Example.args,
    tabs: 'Tabs',
  },
  decorators: [useDrawerBreakpointDecorator()],
  render: (args) => (
    <>
      <Breakpoint breakpoint="XS-SM">
        <DrawerHeader {...args} action={<DrawerHeader.CloseButton />} tabs={null} />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <DrawerHeader {...args} action={<DrawerHeader.CloseButton />} />
      </Breakpoint>
    </>
  ),
}
