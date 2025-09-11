import { forwardRef, InputHTMLAttributes, useRef } from 'react'
import mergeRefs from '#src/helpers/mergeRefs'
import { RadioIcon } from '#src/icons/radio'
import { RadioSelectedIcon } from '#src/icons/radio-selected'
import {
  ElExperimentalRadio,
  ElExperimentalRadioInput,
  ElExperimentalRadioLabelText,
  ElExperimentalRadioSupplementaryInfo,
  elExperimentalRadioSvgIcon,
  elExperimentalRadioSelectedSvgIcon,
} from './styles'

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
      <ElExperimentalRadio className={className} data-error={hasError}>
        {/* The actual radio input element. Forwards the ref and other input props. */}
        <ElExperimentalRadioInput
          type="radio"
          ref={mergeRefs(inputRef, ref)}
          required={isRequired}
          {...rest}
          aria-hidden
        />
        {/* Icons for different radio states (unchecked, checked). */}
        {/* aria-hidden is used to prevent screen readers from announcing these decorative icons. */}
        <RadioIcon aria-hidden className={elExperimentalRadioSvgIcon} />
        <RadioSelectedIcon aria-hidden className={elExperimentalRadioSelectedSvgIcon} />
        {/* Label text for the radio. Styled using data attributes for variant and size. */}
        <ElExperimentalRadioLabelText variant="strong" size="medium" isRequired={isRequired}>
          {label}
        </ElExperimentalRadioLabelText>
        {/* Supplementary information displayed below the label. Styled using data attributes. */}
        <ElExperimentalRadioSupplementaryInfo variant="soft" size="small">
          {supplementaryInfo}
        </ElExperimentalRadioSupplementaryInfo>
      </ElExperimentalRadio>
    )
  },
)
