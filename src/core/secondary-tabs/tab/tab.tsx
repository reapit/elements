import { ElSecondaryTab, ElSecondaryTabLabel } from './styles'

import type { AnchorHTMLAttributes } from 'react'

interface SecondaryTabProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Whether the tab item represents the current page/section.
   */
  'aria-current': 'page' | false
  /**
   * The URL to navigate to when this tab is activated.
   */
  href: string
}

/**
 * A secondary navigation tab. It always renders as a link because changing tabs is best modelled as navigation between
 * pages in the product. Will typically be used via `SecondaryTabs.Item`.
 *
 * The selected state is determined by the `aria-current` prop, which should be set to 'page' when this
 * tab represents the current page.
 */
export function SecondaryTab({ 'aria-current': ariaCurrent, children, ...rest }: SecondaryTabProps) {
  return (
    <ElSecondaryTab {...rest} aria-current={ariaCurrent}>
      <ElSecondaryTabLabel>{children}</ElSecondaryTabLabel>
    </ElSecondaryTab>
  )
}
