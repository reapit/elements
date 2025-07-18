import { Breakpoint, useDrawerBreakpointDecorator } from '../__story__/useDrawerBreakpointDecorator'
import { DrawerHeader } from './header'
import { PrimaryTabs } from '#src/core/primary-tabs/index'
import { useDrawerContextDecorator } from '../__story__/useDrawerContextDecorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

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
 * [PrimaryTabs](?path=/docs/components-primarytabs--docs). While the number of tabs should generally be kept low,
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
        <DrawerHeader {...args} action={<DrawerHeader.CloseButton />} />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <DrawerHeader {...args} action={<DrawerHeader.CloseButton />} />
      </Breakpoint>
    </>
  ),
}
