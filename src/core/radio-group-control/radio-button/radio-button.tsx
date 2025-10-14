import { RadioInput } from '#src/core/radio-input'
import { ElRadioButton, ElRadioButtonLabelText, ElRadioButtonSupplementaryInfo } from './styles'
import { forwardRef, useId } from 'react'

import type { ReactNode } from 'react'

// NOTE: we omit...
// - aria-labelledby, because we label the radio button internally using the label prop
// - size, because we don't support it for radio buttons
type AttributesToOmit = 'aria-labelledby' | 'size'

export namespace RadioButton {
  export interface Props extends Omit<RadioInput.Props, AttributesToOmit> {
    /** Radio button label. */
    label: ReactNode
    /** Supplementary information for the radio button. Acts as an accessible description for the input. */
    supplementaryInfo?: ReactNode
  }
}

/**
 * A simple radio button with label and optional supplementary info. Typically used via
 * `RadioGroupControl.Option`.
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButton.Props>(
  ({ 'aria-describedby': ariaDescribedBy, className, id, label, required, supplementaryInfo, ...rest }, ref) => {
    const descriptionId = useId()
    const inputId = id ?? useId()
    const labelId = useId()

    return (
      <ElRadioButton className={className}>
        <RadioInput
          {...rest}
          aria-describedby={ariaDescribedBy ?? descriptionId}
          aria-labelledby={labelId}
          id={inputId}
          ref={ref}
          required={required}
        />
        <ElRadioButtonLabelText id={labelId}>{label}</ElRadioButtonLabelText>
        {supplementaryInfo && (
          <ElRadioButtonSupplementaryInfo id={descriptionId}>{supplementaryInfo}</ElRadioButtonSupplementaryInfo>
        )}
      </ElRadioButton>
    )
  },
)
