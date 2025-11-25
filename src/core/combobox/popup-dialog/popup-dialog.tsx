import { AnchorPositioning } from '#src/utils/anchor-positioning'
import { clearSearchInputOnClose, closeOnBackdropClick, maybeCloseOnSelection } from './event-handlers'
import { closeComboboxPopup } from './close-popup'
import { ComboboxPopupDialogCloseButton } from './close-button'
import { ComboboxPopupDialogContext, useComboboxPopupDialogContext } from './context'
import { cx } from '@linaria/core'
import { elComboboxPopupDialog, ElComboboxPopupDialogHeader, ElComboboxPopupDialogListboxContainer } from './styles'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'
import { openComboboxPopup } from './open-popup'
import { useMatchMedia } from '#src/utils/match-media'

import type { CloseOnSelection } from './event-handlers'
import type { DialogHTMLAttributes, MouseEventHandler, ReactEventHandler, ReactNode } from 'react'

export namespace ComboboxPopupDialog {
  export interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
    /** ID of the element that labels the popup. */
    'aria-labelledby': string
    /** Popup content. */
    children: ReactNode
    /**
     * Whether the popup should close when an option is selected. Default is 'auto'
     * which will close on selection for single-select comboboxes, but not for
     * multi-select comboboxes.
     */
    closeOnSelection?: CloseOnSelection
    /** ID of the popup element. */
    id: string
    /** Maximum height. By default, the popover will grow to fit its content. */
    maxHeight?: string
    /** Maximum width. By default, the popover is slightly wider than the anchor. */
    maxWidth?: string
    /** Minimum width. By default, the popover is slightly wider than the anchor. */
    minWidth?: string
    /**
     * Whether to preserve (keep) the search input value when the popup closes.
     * When false (default), the search input, if present, will be cleared on close.
     * @default false
     */
    preserveSearchOnClose?: boolean
    /** Optional search input component for filtering options (typically Combobox.SearchInput). */
    search?: ReactNode
    /**
     * Variant type:
     * - **auto**: The default. Displays as a drawer on XS breakpoint, popover on SM and above
     * - **popover**: Displays as a popover anchored to the combobox button
     * - **drawer**: Displays as a drawer (full-screen modal on mobile)
     */
    variant?: 'popover' | 'drawer' | 'auto'
  }
}

// NOTE: --combobox-popup-padding is defined in styles.ts
export const defaultPopupWidth = 'calc(anchor-size(width) + 2 * var(--combobox-popup-padding))'
export const defaultPopupInsetLeft = 'calc(anchor(left) - var(--combobox-popup-padding))'
export const defaultPopupInsetTop = 'calc(anchor(top) - var(--combobox-popup-padding))'

/**
 * Combobox popup dialog that can be displayed as a popover, drawer, or auto.
 * Uses a native HTML dialog element shown as a modal.
 *
 * - **auto**: The default. Displays as a drawer on XS breakpoint, popover on SM and above
 * - **popover**: Displays as a popover anchored to the combobox button
 * - **drawer**: Displays as a drawer (full-screen modal on mobile)
 *
 * Use via `Combobox.Popup` so that the `aria-labelledby` and `id` props are automatically
 * wired up via the `Combobox.Context`.
 */
export function ComboboxPopupDialog({
  'aria-labelledby': ariaLabelledBy,
  children,
  className,
  closeOnSelection = 'auto',
  id,
  maxHeight,
  maxWidth = defaultPopupWidth,
  minWidth = defaultPopupWidth,
  onClose,
  onClick,
  preserveSearchOnClose = false,
  search,
  style,
  variant = 'auto',
  ...rest
}: ComboboxPopupDialog.Props) {
  const isSMOrAbove = useMatchMedia(isWidthAtOrAbove('SM'))
  const needsAnchorPositioning = variant === 'popover' || (variant === 'auto' && isSMOrAbove)
  const needsCloseButton = variant === 'drawer' || (variant === 'auto' && !isSMOrAbove)

  const handleClose: ReactEventHandler<HTMLDialogElement> = (event) => {
    onClose?.(event)
    if (search) {
      clearSearchInputOnClose(event)
    }
  }

  const handleClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    onClick?.(event)
    maybeCloseOnSelection(event)
    closeOnBackdropClick(event)
  }

  return (
    <dialog
      {...rest}
      aria-labelledby={ariaLabelledBy}
      className={cx(elComboboxPopupDialog, className)}
      /* eslint-disable-next-line react/no-unknown-property -- closedby is not yet in React types
       * but is supported in all modern browsers, except Safari. We handle light dismiss for Safari via
       * the click handler */
      closedby="any"
      data-close-on-selection={closeOnSelection}
      data-preserve-search-on-close={preserveSearchOnClose}
      data-variant={variant}
      id={id}
      onClose={handleClose}
      onClick={handleClick}
      style={{ ...style, maxHeight }}
    >
      <ComboboxPopupDialogContext.Provider value={{ variant }}>
        {needsAnchorPositioning && (
          <AnchorPositioning
            anchorElementId={ariaLabelledBy}
            left={defaultPopupInsetLeft}
            maxWidth={maxWidth}
            minWidth={minWidth}
            positionedElementId={id}
            positionTryFallbacks="flip-block, flip-inline"
            top={defaultPopupInsetTop}
          />
        )}
        {/* Render header when search or close button are needed */}
        {(search || needsCloseButton) && (
          <ElComboboxPopupDialogHeader>
            {search}
            {needsCloseButton && <ComboboxPopupDialogCloseButton />}
          </ElComboboxPopupDialogHeader>
        )}
        <ElComboboxPopupDialogListboxContainer>{children}</ElComboboxPopupDialogListboxContainer>
      </ComboboxPopupDialogContext.Provider>
    </dialog>
  )
}

ComboboxPopupDialog.Context = ComboboxPopupDialogContext
ComboboxPopupDialog.useContext = useComboboxPopupDialogContext
ComboboxPopupDialog.open = openComboboxPopup
ComboboxPopupDialog.close = closeComboboxPopup
