import { Button } from '#src/core/button'
import { Breakpoint, useDrawerBreakpointDecorator } from './__story__/useDrawerBreakpointDecorator'
import { Drawer } from './drawer'
import { Pattern } from './__story__/Pattern'
import { PrimaryTabs } from '#src/core/primary-tabs/index'
import { SupplementaryInfo } from '../supplementary-info'
import { useArgs } from 'storybook/preview-api'
import { useDrawerContextDecorator } from './__story__/useDrawerContextDecorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Drawer',
  component: Drawer,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Simple', 'Tabbed', 'With Footer', 'Empty'],
      mapping: {
        Simple: <ExampleSimpleLayout />,
        Tabbed: <ExampleSimpleLayout withTabs />,
        'With Footer': <ExampleFooterLayout />,
        Empty: null,
      },
    },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

/**
 * At its simplest, you can open and close a drawer by controlling it's `isOpen` state. However, a drawer's open
 * state should typically be help in the URL to ensure the user is returned to the same UI state when refreshing
 * the page.
 */
export const Example: Story = {
  args: {
    children: 'Simple',
    closedBy: 'closerequest',
    isOpen: false,
  },
  render: function Example(args) {
    const [, setArgs] = useArgs()
    return (
      <>
        <button onClick={() => setArgs({ isOpen: true })}>Open Drawer</button>
        <Drawer onClose={() => setArgs({ isOpen: false })} {...args} />
      </>
    )
  },
}

/**
 * In future, we expect to enable the opening and closing of drawers using the new
 * [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API).
 *
 * React 18 does not have types for these attributes (though they are still forwarded to the DOM element) and they
 * do not yet have full browser support. As such, this example is demonstrative of our forward compatibility, not
 * indicative of how drawer's should be opened/closed right now.
 */
export const InvokerCommands: Story = {
  args: {
    children: 'Simple',
    closedBy: 'closerequest',
  },
  render: function Example(args) {
    return (
      <>
        {/* eslint-disable-next-line react/no-unknown-property -- NOTE: React 18 does not have types for these
         * attributes (though they are still forwarded to the DOM element) and they do not yet have full browser
         * support. As such, this example is demonstrative of our forward compatibility, not indicative of how
         * drawer's should be opened/closed right now.
         *
         * @ts-expect-error */}
        <button command="show-modal" commandfor="my-drawer">
          Open Drawer
        </button>
        <Drawer id="my-drawer" {...args} />
      </>
    )
  },
}

/**
 * There's two main layout variations for drawer's and two sizes. The first layout has no footer and is typically
 * used to display content that is not part of a form. The second layout has a footer, which will typically house
 * form actions like submit and cancel.
 *
 * The drawer also sizes itself based on the viewport size. This is faked in the story below by sizing the container
 * of the example drawer content to match the width the drawer will within the specified breakpoint ranges.
 */
export const Breakpoints: StoryObj = {
  decorators: [useDrawerBreakpointDecorator(), useDrawerContextDecorator()],
  render: () => (
    <>
      <Breakpoint breakpoint="XS-SM">
        <ExampleSimpleLayout />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <ExampleSimpleLayout withTabs />
      </Breakpoint>

      <Breakpoint breakpoint="XS-SM">
        <ExampleFooterLayout />
      </Breakpoint>
      <Breakpoint breakpoint="MD-2XL">
        <ExampleFooterLayout />
      </Breakpoint>
    </>
  ),
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
}

function ExampleSimpleLayout({ withTabs }: { withTabs?: boolean }) {
  const href = globalThis.top?.location.href!

  return (
    <>
      <Drawer.Header
        action={<Drawer.HeaderCloseButton />}
        overline="Optional text"
        supplementaryInfo={
          <SupplementaryInfo>
            <SupplementaryInfo.Item colour="secondary">Optional info 1</SupplementaryInfo.Item>
            <SupplementaryInfo.Item colour="secondary">Optional info 2</SupplementaryInfo.Item>
          </SupplementaryInfo>
        }
        tabs={
          withTabs ? (
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
          ) : null
        }
      >
        Drawer title
      </Drawer.Header>
      <Drawer.Body>
        <Pattern height="120cqh" />
      </Drawer.Body>
    </>
  )
}

function ExampleFooterLayout() {
  return (
    <>
      <Drawer.Header
        overline="Optional text"
        supplementaryInfo={
          <SupplementaryInfo>
            <SupplementaryInfo.Item>Optional info 1</SupplementaryInfo.Item>
            <SupplementaryInfo.Item>Optional info 2</SupplementaryInfo.Item>
          </SupplementaryInfo>
        }
      >
        Drawer title
      </Drawer.Header>
      <Drawer.Body>
        <Pattern />
      </Drawer.Body>
      <Drawer.Footer>
        <form style={{ display: 'contents' }}>
          <Button autoFocus formMethod="dialog" size="medium" variant="secondary">
            Cancel
          </Button>
        </form>
        <Button size="medium" variant="primary">
          Submit
        </Button>
      </Drawer.Footer>
    </>
  )
}
