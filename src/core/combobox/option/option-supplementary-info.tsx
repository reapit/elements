import {
  ElComboboxOptionBadgeContainer,
  ElComboboxOptionSupplementaryInfo,
  ElComboboxOptionSupplementaryInfoIconContainer,
  ElComboboxOptionTextContainer,
} from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace ComboboxOptionSupplementaryInfo {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {
    /** Badge displayed after the text */
    badge?: ReactNode
    /** Supplementary info text */
    children: string
    /** Icon displayed before the text */
    icon?: ReactNode
  }
}

/**
 * Supplementary information for a Combobox option. Use via `Combobox.OptionSupplementaryInfo`.
 */
export function ComboboxOptionSupplementaryInfo({
  badge,
  children,
  icon,
  ...rest
}: ComboboxOptionSupplementaryInfo.Props) {
  return (
    <ElComboboxOptionSupplementaryInfo {...rest}>
      {icon && <ElComboboxOptionSupplementaryInfoIconContainer>{icon}</ElComboboxOptionSupplementaryInfoIconContainer>}
      <ElComboboxOptionTextContainer>{children}</ElComboboxOptionTextContainer>
      {badge && <ElComboboxOptionBadgeContainer>{badge}</ElComboboxOptionBadgeContainer>}
    </ElComboboxOptionSupplementaryInfo>
  )
}

ComboboxOptionSupplementaryInfo.displayName = 'Combobox.OptionSupplementaryInfo'
