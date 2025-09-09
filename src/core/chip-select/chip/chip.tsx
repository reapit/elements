import {
  ElChipSelectChip,
  ElChipSelectChipIconContainer,
  ElChipSelectChipInput,
  ElChipSelectChipLabelText,
} from './styles'
import { forwardRef, useCallback } from 'react'
import { maybeDeselectOtherOptions } from './maybe-deselect-other-options'

import type { ChangeEventHandler, InputHTMLAttributes, ReactNode } from 'react'

// We omit a few attributes from the base input element:
// - size, because we use this for our own sizing
// - type, because chip select options are always checkboxes
type AttributesToOmit = 'size' | 'type'

export interface ChipSelectChipProps extends Omit<InputHTMLAttributes<HTMLInputElement>, AttributesToOmit> {
  /** The accessible name of the chip. Should be considered mandatory when no visual label is provided. */
  'aria-label'?: string
  /** The visual label of the chip. */
  children?: ReactNode
  /**
   * The icon of the chip. All chips in the same chip select should either have an icon or not.
   * If there is no visual label provided via `children`, the icon should be considered mandatory.
   */
  icon?: ReactNode
  /**
   * Whether the chip is exclusive. That is, when it's selected, all other related chips will be
   * deselected. Exclusive and non-exclusive chips should not be mixed in the same chip select.
   */
  isExclusive?: boolean
  /** The maximum width of the chip. If not provided, the chip will be as wide as its content. */
  maxWidth?: `--size-${string}`
  /** Name of the form control. Submitted with the form as part of a name/value pair. */
  name?: string
  /** Callback called when the chip's checked state changes. */
  onChange?: ChangeEventHandler<HTMLInputElement>
  /** Whether the label of the chip should be truncated if it is too long */
  overflow?: 'truncate'
  /** The size of the chip. All chips in the same chip select should have the same size. */
  size: 'small' | 'medium' | 'large'
  /** The value of the form control. */
  value: InputHTMLAttributes<HTMLInputElement>['value']
}

/**
 * An option for a `ChipSelect`. It is a styled native checkbox input, so it's checked state can be
 * controlled (or uncontrolled) like any other native input. Typically used via `ChipSelect.Option`.
 */
export const ChipSelectChip = forwardRef<HTMLInputElement, ChipSelectChipProps>(
  (
    { 'aria-label': ariaLabel, children, icon, isExclusive = false, maxWidth, onChange, overflow, size, ...rest },
    ref,
  ) => {
    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (event) => {
        // We only need to deselect other options if the one whose checked state is changing
        // has been checked. If it has been unchecked, there's nothing to do.
        if (event.currentTarget.checked) {
          maybeDeselectOtherOptions(event.currentTarget)
        }
        onChange?.(event)
      },
      [onChange],
    )

    return (
      <ElChipSelectChip
        aria-label={ariaLabel}
        data-size={size}
        style={{ maxWidth: maxWidth ? `var(${maxWidth})` : undefined }}
      >
        <ElChipSelectChipInput
          {...rest}
          // NOTE: this attribute is tightly coupled to the `isExclusiveOption` helper.
          data-exclusive={isExclusive}
          onChange={handleChange}
          ref={ref}
          type="checkbox"
        />
        {icon && <ElChipSelectChipIconContainer aria-hidden>{icon}</ElChipSelectChipIconContainer>}
        {children && <ElChipSelectChipLabelText data-overflow={overflow}>{children}</ElChipSelectChipLabelText>}
      </ElChipSelectChip>
    )
  },
)

ChipSelectChip.displayName = 'ChipSelectOption'
