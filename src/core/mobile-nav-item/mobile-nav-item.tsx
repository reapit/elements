import type { FC } from 'react'

import { MobileNavItemExpandable, MobileNavItemSimple } from './mobile-nav-item.atoms'
import type { MobileNavItemExpandableProps, MobileNavItemSimpleProps } from './mobile-nav-item.atoms'

export namespace MobileNavItem {
  export type Props = MobileNavItemSimpleProps | MobileNavItemExpandableProps
}

const isExpandableVariant = (props: MobileNavItem.Props): props is MobileNavItemExpandableProps => {
  return 'children' in props
}

export const MobileNavItem: FC<MobileNavItem.Props> = (props) => {
  if (isExpandableVariant(props)) {
    return <MobileNavItemExpandable {...props} />
  } else {
    return <MobileNavItemSimple {...props} />
  }
}
