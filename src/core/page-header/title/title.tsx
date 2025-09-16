import {
  ElPageHeaderTitle,
  ElPageHeaderTitleContent,
  ElPageHeaderTitleText,
  ElPageHeaderTitleActions,
  ElPageHeaderTitleAdditionalInfo,
} from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace PageHeaderTitle {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The main title text to display */
    children: ReactNode
    /** Optional action buttons or elements (e.g., buttons, more menu) */
    actions?: ReactNode
    /** Optional information to display alongside the title. Typically a tag group, badge, or icon. */
    additionalInfo?: ReactNode
  }
}

/**
 * A title component for page headers. Displays the main page title with optional, additional information and actions.
 * Typically used via `PageHeader.Title`.
 */
export function PageHeaderTitle({ actions, additionalInfo, children, ...rest }: PageHeaderTitle.Props) {
  return (
    <ElPageHeaderTitle {...rest}>
      <ElPageHeaderTitleContent>
        <ElPageHeaderTitleText>{children}</ElPageHeaderTitleText>
        <ElPageHeaderTitleAdditionalInfo>{additionalInfo}</ElPageHeaderTitleAdditionalInfo>
      </ElPageHeaderTitleContent>
      <ElPageHeaderTitleActions>{actions}</ElPageHeaderTitleActions>
    </ElPageHeaderTitle>
  )
}

PageHeaderTitle.displayName = 'PageHeader.Title'
