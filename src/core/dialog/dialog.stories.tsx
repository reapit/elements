import preview from '#.storybook/preview'
import { Button } from '#src/core/button'
import { Dialog } from './dialog'
import { Pattern } from '#src/core/drawer/__story__/Pattern'
import { useArgs } from 'storybook/preview-api'
import { useState } from 'react'

const meta = preview.meta({
  title: 'Containers and layout/Dialog',
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
})

/**
 * At its simplest, you can open and close a dialog by controlling it's `isOpen` state. In some cases, a dialog's
 * open state will be best kept in the URL, like drawers, to ensure the user is returned to the same UI state when
 * refreshing the page, however, most of the time you'll want to display a dialog in response to a user action,
 * which will simply require some local component state.
 */
export const Example = meta.story({
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
})

/**
 * The `closedBy` prop specifies the types of user actions that can be used to close the dialog. It
 * distinguishes three methods:
 *
 * - A _light dismiss user action_, in which the dialog is closed when the user clicks or taps
 * outside it. This is equivalent to the "light dismiss" behavior of "auto" state popovers.
 * - A _platform-specific user action_, such as pressing the `Esc` key on desktop platforms, or a "back"
 * or "dismiss" gesture on mobile platforms.
 * - A developer-specified mechanism such as a `<button>` with a `click` handler that invokes
 * `HTMLDialogElement.close()` or a `<form>` submission.
 *
 * Possible values are:
 *
 * - `any`, the dialog can be dismissed using any of the three methods.
 * - `closerequest`, the dialog can be dismissed with a platform-specific user action or a
 * developer-specified mechanism.
 * - `none`, the dialog can only be dismissed with a developer-specified mechanism.
 *
 * **note:** Safari does not currently support `closedBy`. `Dialog` attempts to polyfill its behaviour,
 * but it's not perfect. Namely, "back" or "dismiss" gestures on mobile platforms are not supported.
 *
 * In this example, the dialog is using `closedBy="any"`, meaning any of the three methods can be used
 * to dismiss it.
 */
export const ClosedBy = Example.extend({
  args: {
    closedBy: 'any',
  },
  render: function ClosedBy(args) {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Dialog</button>
        <Dialog onClose={() => setIsOpen(false)} {...args} isOpen={isOpen} />
      </>
    )
  },
})

/**
 * In future, we expect to enable the opening and closing of dialogs using the new
 * [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API).
 *
 * React 18 does not have types for these attributes (though they are still forwarded to the DOM element) and they
 * do not yet have full browser support. As such, this example is demonstrative of our forward compatibility, not
 * indicative of how dialog's should be opened/closed right now.
 */
export const InvokerCommands = Example.extend({
  render: function Example(args) {
    return (
      <>
        {/* oxlint-disable-next-line react/no-unknown-property -- NOTE: React 18 does not have types for these
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
})

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
