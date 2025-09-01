import { forwardRef, InputHTMLAttributes, useRef } from 'react'
import { ElRadioIcon, ElRadioSelectedIcon } from './radio.atoms'
import { ElRadio, ElRadioInput, ElRadioLabelText, ElRadioSupplementaryInfo } from './styles'
import mergeRefs from '#src/helpers/mergeRefs'

/**
 * Interface for the Radio component props.
 */
export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed next to the radio button. */
  label?: string
  /** Additional text displayed below the label for extra context. */
  supplementaryInfo?: string
  /** Marks the radio as required when used in a form. */
  isRequired?: boolean
  /** Highlights the radio with an error state. */
  hasError?: boolean
}

/**
 * Radio component: A styled and composed radio element.
 * This component combines the atomic radio components (ElRadio, ElRadioInput, etc.)
 * into a single, reusable radio component.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, supplementaryInfo, isRequired, hasError, className, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
      <ElRadio className={className} data-error={hasError}>
        {/* The actual radio input element. Forwards the ref and other input props. */}
        <ElRadioInput type="radio" ref={mergeRefs(inputRef, ref)} required={isRequired} {...rest} aria-hidden />
        {/* Icons for different radio states (unchecked, checked). */}
        {/* aria-hidden is used to prevent screen readers from announcing these decorative icons. */}
        <ElRadioIcon aria-hidden />
        <ElRadioSelectedIcon aria-hidden />
        {/* Label text for the radio. Styled using data attributes for variant and size. */}
        <ElRadioLabelText variant="strong" size="medium" isRequired={isRequired}>
          {label}
        </ElRadioLabelText>
        {/* Supplementary information displayed below the label. Styled using data attributes. */}
        <ElRadioSupplementaryInfo variant="soft" size="small">
          {supplementaryInfo}
        </ElRadioSupplementaryInfo>
      </ElRadio>
    )
  },
)
