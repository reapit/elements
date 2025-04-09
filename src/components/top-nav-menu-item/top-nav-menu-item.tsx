import type { FC } from 'react'

import { TopNavMenuItemExpandable, TopNavMenuItemSimple } from './top-nav-menu-item.atoms'
import type { TopNavMenuItemExpandableProps, TopNavMenuItemSimpleProps } from './top-nav-menu-item.atoms'

const isExpandableVariant = (props: TopNavMenuItemProps): props is TopNavMenuItemExpandableProps => {
  return 'children' in props
}

export type TopNavMenuItemProps = TopNavMenuItemSimpleProps | TopNavMenuItemExpandableProps

export const TopNavMenuItem: FC<TopNavMenuItemProps> = (props) => {
  if (isExpandableVariant(props)) {
    return <TopNavMenuItemExpandable {...props} />
  } else {
    return <TopNavMenuItemSimple {...props} />
  }
}
