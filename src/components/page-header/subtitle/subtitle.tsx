import { ElPageHeaderSubtitle, ElPageHeaderSubtitleText, ElPageHeaderSubtitleAdditionalInfo } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

interface PageHeaderSubtitleProps extends HTMLAttributes<HTMLDivElement> {
  /** The main title text to display */
  children: ReactNode
  /** Optional information to display alongside the title. Typically a tag group, badge, or icon. */
  additionalInfo?: ReactNode
}

/**
 * A title component for page headers. Displays the main page title with optional, additional information and actions.
 * Typically used via `PageHeader.Subtitle`.
 */
export function PageHeaderSubtitle({ additionalInfo, children, ...rest }: PageHeaderSubtitleProps) {
  return (
    <ElPageHeaderSubtitle {...rest}>
      <ElPageHeaderSubtitleText>{children}</ElPageHeaderSubtitleText>
      <ElPageHeaderSubtitleAdditionalInfo>{additionalInfo}</ElPageHeaderSubtitleAdditionalInfo>
    </ElPageHeaderSubtitle>
  )
}
