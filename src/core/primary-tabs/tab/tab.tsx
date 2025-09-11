import { ElPrimaryTab, ElPrimaryTabLabel } from './styles'

import type { AnchorHTMLAttributes } from 'react'

export namespace PrimaryTab {
  export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Whether the tab item represents the current page/section.
     */
    'aria-current': 'page' | false
    /**
     * The URL to navigate to when this tab is activated.
     */
    href: string
  }
}

/**
 * A primary navigation tab. It always renders as a link because changing tabs is best modelled as navigation between
 * pages in the product. Will typically be used via `PrimaryTabs.Item`.
 *
 * The selected state is determined by the `aria-current` prop, which should be set to 'page' when this
 * tab represents the current page.
 */
export function PrimaryTab({ 'aria-current': ariaCurrent, children, ...rest }: PrimaryTab.Props) {
  return (
    <ElPrimaryTab {...rest} aria-current={ariaCurrent}>
      <ElPrimaryTabLabel>{children}</ElPrimaryTabLabel>
    </ElPrimaryTab>
  )
}
