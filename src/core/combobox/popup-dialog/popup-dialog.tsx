import { AnchorPositioning } from '#src/utils/anchor-positioning'
import { elComboboxPopupDialog, ElComboboxPopupDialogHeader, ElComboboxPopupDialogListboxContainer } from './styles'
import { closeComboboxPopup } from './close-popup'
import { ComboboxPopupDialogContext, useComboboxPopupDialogContext } from './context'
import { cx } from '@linaria/core'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'
import { openComboboxPopup } from './open-popup'
import { useCloseComboboxPopupOnClick } from './use-close-on-click'
import { useMatchMedia } from '#src/utils/match-media'

import type { CloseOnSelection } from './use-close-on-click'
import type { DialogHTMLAttributes, ReactNode } from 'react'
import { ComboboxPopupDialogCloseButton } from './close-button'

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

// Safari workaround: Safari lacks closedby attribute support, so we handle backdrop clicks manually.
const isClosedBySupported = 'closedBy' in HTMLDialogElement.prototype

// NOTE: --combobox-popup-padding is defined in styles.ts
const defaultWidth = 'calc(anchor-size(width) + 2 * var(--combobox-popup-padding))'
const defaultLeft = 'calc(anchor(left) - var(--combobox-popup-padding))'
const defaultTop = 'calc(anchor(top) - var(--combobox-popup-padding))'

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
  maxWidth,
  onClick,
  search,
  style,
  variant = 'auto',
  ...rest
}: ComboboxPopupDialog.Props) {
  const isSMOrAbove = useMatchMedia(isWidthAtOrAbove('SM'))
  const needsAnchorPositioning = variant === 'popover' || (variant === 'auto' && isSMOrAbove)
  const needsCloseButton = variant === 'drawer' || (variant === 'auto' && !isSMOrAbove)

  const handleClick = useCloseComboboxPopupOnClick((event) => {
    onClick?.(event)
    const dialog = event.currentTarget
    // Workaround Safari's lack of support for the closedby attribute
    if (!isClosedBySupported && event.target === dialog) {
      // Click was on the backdrop, not on dialog content
      dialog.close()
    }
  })

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
      data-variant={variant}
      id={id}
      onClick={handleClick}
      style={{ ...style, maxHeight }}
    >
      <ComboboxPopupDialogContext.Provider value={{ variant }}>
        {needsAnchorPositioning && (
          <AnchorPositioning
            anchorElementId={ariaLabelledBy}
            left={defaultLeft}
            maxWidth={maxWidth ?? defaultWidth}
            minWidth={defaultWidth}
            positionedElementId={id}
            positionTryFallbacks="flip-block, flip-inline"
            top={defaultTop}
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
