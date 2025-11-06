import {
  ElComboboxOption,
  ElComboboxOptionBadgeContainer,
  ElComboboxOptionCheckIconContainer,
  ElComboboxOptionLabel,
  ElComboboxOptionTextContainer,
  ElComboboxOptionSupplementaryInfoContainer,
} from './styles'
import { CheckIcon } from '#src/icons/check'
import { ComboboxOptionSupplementaryInfo } from './option-supplementary-info'
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
    /** Supplementary info lines. Pass one or more `Combobox.OptionSupplementaryInfo` */
    supplementaryInfo?: ReactNode
    /** Option value */
    value: string
  }
}

/**
 * A Combobox option. Use via `Combobox.Option`.
 */
export function ComboboxOption({ badge, children, supplementaryInfo, ...rest }: ComboboxOption.Props) {
  const badgeId = useId()
  const labelId = useId()
  const supplementaryInfoId = useId()

  // We only use the detail the option if the associated badge or supplementary info are present.
  const ariaDetails =
    [badge && badgeId, supplementaryInfo && supplementaryInfoId].filter((x) => !!x).join(' ') || undefined

  return (
    <ElComboboxOption {...rest} aria-labelledby={labelId} aria-details={ariaDetails} role="option" type="button">
      <ElComboboxOptionCheckIconContainer aria-hidden>
        <CheckIcon />
      </ElComboboxOptionCheckIconContainer>
      <ElComboboxOptionLabel>
        <ElComboboxOptionTextContainer id={labelId}>{children}</ElComboboxOptionTextContainer>
        {badge && <ElComboboxOptionBadgeContainer id={badgeId}>{badge}</ElComboboxOptionBadgeContainer>}
      </ElComboboxOptionLabel>
      {supplementaryInfo && (
        <ElComboboxOptionSupplementaryInfoContainer id={supplementaryInfoId}>
          {supplementaryInfo}
        </ElComboboxOptionSupplementaryInfoContainer>
      )}
    </ElComboboxOption>
  )
}

ComboboxOption.getOptionLabel = getOptionLabel
ComboboxOption.SupplementaryInfo = ComboboxOptionSupplementaryInfo
