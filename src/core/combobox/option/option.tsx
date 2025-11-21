import {
  ElComboboxOption,
  ElComboboxOptionAdditionalInfoContainer,
  ElComboboxOptionBadgeContainer,
  ElComboboxOptionCheckIconContainer,
  ElComboboxOptionLabel,
  ElComboboxOptionTextContainer,
} from './styles'
import { CheckIcon } from '#src/icons/check'
import { ComboboxOptionAdditionalInfo } from './option-additional-info'
import { getOptionLabel } from './get-option-label'
import { useId } from 'react'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

// Omit `role` because it must always be "option"
type AttributesToOmit = 'role'

export namespace ComboboxOption {
  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
    /** Badge displayed after the label */
    badge?: ReactNode
    /** Option label text */
    children?: ReactNode
    /** Additional info lines. Pass one or more `Combobox.OptionAdditionalInfo` */
    additionalInfo?: ReactNode
    /** Option size. Influences the option's label text. */
    size?: 'medium' | 'large'
    /** Option value */
    value: string
  }
}

/**
 * A Combobox option. Use via `Combobox.Option`.
 */
export function ComboboxOption({ badge, children, additionalInfo, size = 'medium', ...rest }: ComboboxOption.Props) {
  const badgeId = useId()
  const labelId = useId()
  const additionalInfoId = useId()

  // We only use the detail the option if the associated badge or additional info are present.
  const ariaDetails = [badge && badgeId, additionalInfo && additionalInfoId].filter((x) => !!x).join(' ') || undefined

  return (
    <ElComboboxOption
      {...rest}
      aria-labelledby={labelId}
      aria-details={ariaDetails}
      data-size={size}
      role="option"
      type="button"
    >
      <ElComboboxOptionCheckIconContainer aria-hidden>
        <CheckIcon />
      </ElComboboxOptionCheckIconContainer>
      <ElComboboxOptionLabel>
        <ElComboboxOptionTextContainer id={labelId}>{children}</ElComboboxOptionTextContainer>
        {badge && <ElComboboxOptionBadgeContainer id={badgeId}>{badge}</ElComboboxOptionBadgeContainer>}
      </ElComboboxOptionLabel>
      {additionalInfo && (
        <ElComboboxOptionAdditionalInfoContainer id={additionalInfoId}>
          {additionalInfo}
        </ElComboboxOptionAdditionalInfoContainer>
      )}
    </ElComboboxOption>
  )
}

ComboboxOption.getOptionLabel = getOptionLabel
ComboboxOption.AdditionalInfo = ComboboxOptionAdditionalInfo
