import { CheckboxInput } from '#src/core/checkbox-input'
import { ElCheckbox, ElCheckboxLabelText, ElCheckboxSupplementaryInfo } from './styles'
import { forwardRef, useEffect, useId } from 'react'

import type { ReactNode } from 'react'

// NOTE: we omit...
// - aria-labelledby, because we label the checkbox internally using the label prop
// - size, because we don't support it for checkboxes
type AttributesToOmit = 'aria-labelledby' | 'size'

export namespace Checkbox {
  export interface Props extends Omit<CheckboxInput.Props, AttributesToOmit> {
    /** Checkbox label. */
    label: ReactNode
    /** Supplementary information for the checkbox. Acts as an accessible description for the input. */
    supplementaryInfo?: ReactNode
    /**
     * Determines if the checkbox is in an indeterminate state or not. When controlled, care must be
     * taken to ensure changes to the checkbox's state result in changes to the value provided to this prop.
     * As such, should only be used when the checkbox's checked state is also controlled.
     */
    isIndeterminate?: boolean
  }
}

/**
 * A simple checkbox with label and optional supplementary info. Acts as a common foundation for
 * `CheckboxControl` and `CheckboxGroupControl.Option`. Will rarely be used directly.
 */
export const Checkbox = forwardRef<HTMLInputElement, Checkbox.Props>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      className,
      id,
      isIndeterminate = false,
      label,
      required,
      supplementaryInfo,
      ...rest
    },
    ref,
  ) => {
    const descriptionId = useId()
    const inputId = id ?? useId()
    const labelId = useId()

    useEffect(
      function syncIsIndeterminateWithInput() {
        const checkbox = document.getElementById(inputId)
        if (checkbox instanceof HTMLInputElement) {
          checkbox.indeterminate = isIndeterminate
        }
      },
      [inputId, isIndeterminate],
    )

    return (
      <ElCheckbox className={className}>
        <CheckboxInput
          {...rest}
          aria-describedby={ariaDescribedBy ?? descriptionId}
          aria-labelledby={labelId}
          id={inputId}
          ref={ref}
          required={required}
        />
        <ElCheckboxLabelText id={labelId}>{label}</ElCheckboxLabelText>
        {supplementaryInfo && (
          <ElCheckboxSupplementaryInfo id={descriptionId}>{supplementaryInfo}</ElCheckboxSupplementaryInfo>
        )}
      </ElCheckbox>
    )
  },
)
