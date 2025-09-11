import { ElPageHeaderSubtitle, ElPageHeaderSubtitleText, ElPageHeaderSubtitleAdditionalInfo } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace PageHeaderSubtitle {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The main title text to display */
    children: ReactNode
    /** Optional information to display alongside the title. Typically a tag group, badge, or icon. */
    additionalInfo?: ReactNode
  }
}

/**
 * A subtitle component for page headers. Displays the main page's subtitle with optional, additional information.
 * Typically used via `PageHeader.Subtitle`.
 */
export function PageHeaderSubtitle({ additionalInfo, children, ...rest }: PageHeaderSubtitle.Props) {
  return (
    <ElPageHeaderSubtitle {...rest}>
      <ElPageHeaderSubtitleText>{children}</ElPageHeaderSubtitleText>
      <ElPageHeaderSubtitleAdditionalInfo>{additionalInfo}</ElPageHeaderSubtitleAdditionalInfo>
    </ElPageHeaderSubtitle>
  )
}
