import {
  ElComboboxCardDefaultContent,
  ElComboboxCardDefaultContentAdditionalInfo,
  ElComboboxCardDefaultContentLabel,
} from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace ComboboxCardDefaultContent {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {
    /**
     * Optional supplementary information items to display below the label.
     * Typically one or more `SupplementaryInfo.Item` components.
     */
    additionalInfo?: ReactNode
    /** The main label text. */
    children: ReactNode
  }
}

/**
 * Default content layout for combobox cards. Displays a label and optional supplementary information below.
 * Designed to be used within `ComboboxCard`.
 */
export function ComboboxCardDefaultContent({ additionalInfo, children, ...rest }: ComboboxCardDefaultContent.Props) {
  return (
    <ElComboboxCardDefaultContent {...rest}>
      <ElComboboxCardDefaultContentLabel>{children}</ElComboboxCardDefaultContentLabel>
      <ElComboboxCardDefaultContentAdditionalInfo>{additionalInfo}</ElComboboxCardDefaultContentAdditionalInfo>
    </ElComboboxCardDefaultContent>
  )
}
