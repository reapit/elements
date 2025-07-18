import type { FC } from 'react'

import { MobileNavItemExpandable, MobileNavItemSimple } from './mobile-nav-item.atoms'
import type { MobileNavItemExpandableProps, MobileNavItemSimpleProps } from './mobile-nav-item.atoms'

const isExpandableVariant = (props: MobileNavItemProps): props is MobileNavItemExpandableProps => {
  return 'children' in props
}

export type MobileNavItemProps = MobileNavItemSimpleProps | MobileNavItemExpandableProps

export const MobileNavItem: FC<MobileNavItemProps> = (props) => {
  if (isExpandableVariant(props)) {
    return <MobileNavItemExpandable {...props} />
  } else {
    return <MobileNavItemSimple {...props} />
  }
}
