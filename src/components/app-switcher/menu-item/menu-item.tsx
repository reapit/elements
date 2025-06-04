import {
  ElAppSwitcherMenuItemAnchor,
  ElAppSwitcherMenuItemAvatar,
  ElAppSwitcherMenuItemLabel,
  ElAppSwitcherMenuItemSupplementaryInfo,
} from './styles'
import { useId } from 'react'

import type { ProductConfig } from '../config'
import type { HTMLAttributes, ReactNode } from 'react'

// The attributes we want to omit from the HTMLAnchorElement props:
// - `aria-labelledby`: we want exclusive control over what text is used to label the menu item.
// - `aria-describedby`: we want exclusive control over what text is used to describe the menu item.
type AttributesToOmit = 'aria-labelledby' | 'aria-describedby'

export interface AppSwitcherMenuItemProps
  extends ProductConfig,
    Omit<HTMLAttributes<HTMLAnchorElement>, AttributesToOmit> {
  avatar: ReactNode
  url: string
}

/**
 * A basic menu item for the App Switcher. Displays a product's logo, name, and supplementary info. Typically,
 * consumers will use the higher-level `AppSwitcher.ProductMenuItem` component instead, as it provides a more
 * convenient "on-rails" interface that ties a specific product ID to the approved logo, name and
 * supplementary info.
 *
 * The product's URL is always opened in a new tab.
 */
export function AppSwitcherMenuItem({
  avatar: logo,
  appName,
  supplementaryInfo,
  url,
  ...rest
}: AppSwitcherMenuItemProps) {
  const labelId = useId()
  const descriptionId = useId()

  return (
    <ElAppSwitcherMenuItemAnchor
      {...rest}
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <ElAppSwitcherMenuItemAvatar aria-hidden>{logo}</ElAppSwitcherMenuItemAvatar>
      <ElAppSwitcherMenuItemLabel id={labelId}>{appName}</ElAppSwitcherMenuItemLabel>
      <ElAppSwitcherMenuItemSupplementaryInfo id={descriptionId}>
        {supplementaryInfo}
      </ElAppSwitcherMenuItemSupplementaryInfo>
    </ElAppSwitcherMenuItemAnchor>
  )
}
