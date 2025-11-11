import { cx } from '@linaria/core'
import { elComboboxPopupPopover } from './styles'
import { Popover } from '#src/utils/index'

import type { BaseComboboxPopupProps } from './types'
import type { ReactNode } from 'react'

export namespace ComboboxPopupPopover {
  export interface Props extends BaseComboboxPopupProps {
    /** Popup content. */
    children: ReactNode
    /** Maximum width. By default, the popover is slightly wider than the anchor. */
    maxWidth?: string
  }
}

/**
 * Combobox popup displayed as a popover anchored to the combobox input.
 */
export function ComboboxPopupPopover({
  'aria-labelledby': ariaLabelledBy,
  children,
  className,
  id,
  maxWidth,
  ...rest
}: ComboboxPopupPopover.Props) {
  return (
    <Popover
      {...rest}
      aria-labelledby={ariaLabelledBy}
      anchorId={ariaLabelledBy}
      className={cx(elComboboxPopupPopover, className)}
      elevation="xl"
      id={id}
      maxWidth={maxWidth ?? defaultWidth}
      minWidth={defaultWidth}
      placement={placement}
      popover="auto"
      positionTryFallbacks="flip-block, flip-inline"
      role="dialog"
    >
      {children}
    </Popover>
  )
}

// NOTE: --combobox-popup-popover-padding is defined in styles.ts
const defaultWidth = 'calc(anchor-size(width) + 2 * var(--combobox-popup-popover-padding))'

const placement: Popover.Props['placement'] = {
  left: 'calc(anchor(left) - var(--combobox-popup-popover-padding))',
  top: 'calc(anchor(top) - var(--combobox-popup-popover-padding))',
}
