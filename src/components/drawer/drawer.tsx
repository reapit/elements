import { DrawerContextProvider } from './context'
import { DrawerBody } from './body'
import { DrawerFooter } from './footer'
import { DrawerHeader } from './header'
import { ElDrawer } from './styles'
import useCancelCloseRequests from './use-cancel-close-requests'
import useToggleDrawerVisibilityEffect from './use-toggle-drawer-visibility-effect'
import useWithStopPropagation from './use-with-stop-propagation'

import type { DialogHTMLAttributes, ReactNode } from 'react'

// NOTE: we omit the `open` attribute because we do not want React consumers to use it directly as it
// results in a non-modal experience. Instead, our React `Drawer` component provides an `isOpen` prop
// that ensures a modal experience is achieved.
interface DrawerProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'open'> {
  /** The drawer content */
  children: ReactNode
  /**
   * Specifies the types of user actions that can be used to close the drawer. This property distinguishes
   * two methods by which a drawer can be closed:
   *
   *  (1) A platform-specific user action, such as pressing the `Esc` key on desktop platforms, or a "back" or
   *    "dismiss" gesture on mobile platforms.
   *
   *  (2) A developer-specified mechanism such as the drawer close button and a `<form>` submission.
   *
   * Possible values are:
   *
   *  - `closerequest`: The drawer can be dismissed with a platform-specific user action or a
   *    developer-specified mechanism. This is what detail drawers should use.
   *
   *  - `none`: The drawer cannot be closed by the user (e.g. via the close button). This is what form drawers
   *    should use.
   *
   * **Note:** The `closedby` attribute for the HTML `<dialog>` element is experimental. We currently approximate
   * its behaviour internally, but we are not using the attribute itself.
   *
   * **Note 2:** The HTML `<dialog>` element distinguishes a third method, `any`, for closing a dialog element, but Drawer does not
   * currently support it. See [MDN's closedBy attribute docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby)
   * for more information.
   */
  closedBy?: 'closerequest' | 'none'
  /** Indicates whether the Drawer is open or not */
  isOpen?: boolean
}

/**
 * The Drawer slides over the screen to get the user's attention. It lets users see more details or do tasks
 * without leaving the page. The layout changes based on the options, with content grouped into clear sections.
 *
 * The Drawer is built with the [\<dialog\> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
 * and is always shown using the dialog's [showModal]() method. This ensures focus will be is set on the first
 * nested focusable element of the drawer. Further, all content beneath a drawer is made
 * [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert) and focus is trapped within
 * the drawer. See the [accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility)
 * section of MDN's `<dialog>` documentation.
 */
export default function Drawer({
  children,
  closedBy = 'closerequest',
  isOpen = false,
  onCancel: onCancelProp,
  onClose: onCloseProp,
  ...rest
}: DrawerProps) {
  const ref = useToggleDrawerVisibilityEffect(isOpen)

  const onCancel = useCancelCloseRequests(closedBy, onCancelProp)

  // NOTE: React's `onClose` event handler for <dialog> elements propagates, but we don't want it to.
  // The [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility) explicitly
  // state that dialogs should be closed one-at-a-time and it's possible we will have nested drawers (and thus,
  // nested dialogs).
  const onClose = useWithStopPropagation(onCloseProp)

  const onKeyUp = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    event.key === 'Escape' && closedBy === 'none' && event.stopPropagation() && event.preventDefault()
  }

  return (
    <ElDrawer {...rest} onKeyUp={onKeyUp} ref={ref} onCancel={onCancel} onClose={onClose}>
      <DrawerContextProvider dialogElementRef={ref}>
        {/*
         * Note: We only mount children when the drawer is open. This is because drawer content will often fetch
         * its own data and we do not want those network requests occurring when the drawer is mounted but closed.
         */}
        {isOpen && children}
      </DrawerContextProvider>
    </ElDrawer>
  )
}

Drawer.Body = DrawerBody
Drawer.Footer = DrawerFooter
Drawer.Header = DrawerHeader
