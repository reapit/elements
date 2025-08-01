import React, { forwardRef, InputHTMLAttributes, useEffect, useRef } from 'react'
import { ElCheckboxIcon, ElCheckboxSelectedIcon, ElCheckboxIndeterminateIcon } from './checkbox.atoms'
import { ElCheckbox, ElCheckboxInput, ElCheckboxLabelText, ElCheckboxSupplementaryInfo } from './styles'
import mergeRefs from '#src/helpers/mergeRefs'

/**
 * Interface for the Checkbox component props.
 *
 * Optional label text to display next to the checkbox.
 * Provides a user-friendly description of the checkbox's purpose.
 *
 * Optional supplementary information to display below the label.
 * Offers additional context or details related to the checkbox.
 *
 * Optional required to make input element required.
 *
 * Optional isIndeterminate to make input element as an indeterminate state.
 */
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  supplementaryInfo?: string
  required?: boolean
  isIndeterminate?: boolean
}

/**
 * Checkbox component: A styled and composed checkbox element.
 * This component combines the atomic checkbox components (ElCheckbox, ElCheckboxInput, etc.)
 * into a single, reusable checkbox component.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, supplementaryInfo, required, isIndeterminate = false, className, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!isIndeterminate // Use prop value
      }
    }, [isIndeterminate]) // Run effect when isIndeterminate changes

    return (
      <ElCheckbox className={className}>
        {/* The actual checkbox input element. Forwards the ref and other input props. */}
        <ElCheckboxInput type="checkbox" ref={mergeRefs(inputRef, ref)} {...rest} aria-hidden />
        {/* Icons for different checkbox states (unchecked, checked, indeterminate). */}
        {/* aria-hidden is used to prevent screen readers from announcing these decorative icons. */}
        <ElCheckboxIcon aria-hidden />
        <ElCheckboxSelectedIcon aria-hidden />
        {isIndeterminate && <ElCheckboxIndeterminateIcon aria-hidden />}
        {/* Label text for the checkbox. Styled using data attributes for variant and size. */}
        <ElCheckboxLabelText variant="strong" size="medium" isRequired={required}>
          {label}
        </ElCheckboxLabelText>
        {/* Supplementary information displayed below the label. Styled using data attributes. */}
        <ElCheckboxSupplementaryInfo variant="soft" size="small">
          {supplementaryInfo}
        </ElCheckboxSupplementaryInfo>
      </ElCheckbox>
    )
  },
)
