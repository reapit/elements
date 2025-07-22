import { Button } from '#src/core/button'
import { Dialog } from './dialog'
import { Pattern } from '#src/core/drawer/__story__/Pattern'
import { useArgs } from 'storybook/preview-api'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Dialog',
  component: Dialog,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Simple', 'Simple w/ Scrolling', 'Footer', 'Footer w/ Scrolling', 'Empty'],
      mapping: {
        Simple: <ExampleSimpleLayout height="100px" />,
        'Simple w/ Scrolling': <ExampleSimpleLayout height="100svh" />,
        Footer: <ExampleFooterLayout height="100px" />,
        'Footer w/ Scrolling': <ExampleFooterLayout height="100svh" />,
        Empty: null,
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

/**
 * At its simplest, you can open and close a dialog by controlling it's `isOpen` state. In some cases, a dialog's
 * open state will be best kept in the URL, like drawers, to ensure the user is returned to the same UI state when
 * refreshing the page, however, most of the time you'll want to display a dialog in response to a user action,
 * which will simply require some local component state.
 */
export const Example: Story = {
  args: {
    children: 'Simple',
    closedBy: 'closerequest',
    isOpen: false,
    size: 'small',
  },
  render: function Example(args) {
    const [, setArgs] = useArgs()
    return (
      <>
        <button onClick={() => setArgs({ isOpen: true })}>Open Dialog</button>
        <Dialog onClose={() => setArgs({ isOpen: false })} {...args} />
      </>
    )
  },
}

/**
 * In future, we expect to enable the opening and closing of dialogs using the new
 * [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API).
 *
 * React 18 does not have types for these attributes (though they are still forwarded to the DOM element) and they
 * do not yet have full browser support. As such, this example is demonstrative of our forward compatibility, not
 * indicative of how dialog's should be opened/closed right now.
 */
export const InvokerCommands: Story = {
  args: {
    ...Example.args,
  },
  render: function Example(args) {
    return (
      <>
        {/* eslint-disable-next-line react/no-unknown-property -- NOTE: React 18 does not have types for these
         * attributes (though they are still forwarded to the DOM element) and they do not yet have full browser
         * support. As such, this example is demonstrative of our forward compatibility, not indicative of how
         * dialog's should be opened/closed right now.
         *
         * @ts-expect-error */}
        <button command="show-modal" commandfor="my-dialog">
          Open Dialog
        </button>
        <Dialog id="my-dialog" {...args} />
      </>
    )
  },
}

interface ExampleLayoutProps {
  height: string
}

function ExampleSimpleLayout({ height }: ExampleLayoutProps) {
  return (
    <>
      <Dialog.Header action={<Dialog.HeaderCloseButton />}>Dialog title</Dialog.Header>
      <Dialog.Body>
        <Pattern height={height} />
      </Dialog.Body>
    </>
  )
}

function ExampleFooterLayout({ height }: ExampleLayoutProps) {
  return (
    <>
      <Dialog.Header>Dialog title</Dialog.Header>
      <Dialog.Body>
        <Pattern height={height} />
      </Dialog.Body>
      <Dialog.Footer>
        <form style={{ display: 'contents' }}>
          <Button autoFocus formMethod="dialog" size="medium" variant="secondary">
            Cancel
          </Button>
        </form>
        <Button size="medium" variant="primary">
          Submit
        </Button>
      </Dialog.Footer>
    </>
  )
}
