import DrawerCloseButton from './close-button'
import {
  ElDrawerHeader,
  ElDrawerHeaderAction,
  ElDrawerHeaderCategory,
  ElDrawerHeaderMainContent,
  ElDrawerHeaderSupplementaryInfo,
  ElDrawerHeaderTabs,
  ElDrawerHeaderTitle,
} from './styles'
import type { ComponentProps, ReactNode } from 'react'

interface DrawerHeaderProps extends Omit<ComponentProps<typeof ElDrawerHeader>, 'title'> {
  /** The close action for the drawer. Must not be used when the drawer contains a form and form footer. */
  action?: ReactNode
  category?: ReactNode
  supplementaryInfo?: ReactNode
  tabs?: ReactNode
  /** The title of the drawer. */
  title: ReactNode
}

/**
 * A header for drawers.
 */
export default function DrawerHeader({ action, category, supplementaryInfo, tabs, title, ...rest }: DrawerHeaderProps) {
  return (
    <ElDrawerHeader {...rest}>
      <ElDrawerHeaderMainContent>
        {action && <ElDrawerHeaderAction>{action}</ElDrawerHeaderAction>}
        {category && <ElDrawerHeaderCategory>{category}</ElDrawerHeaderCategory>}
        <ElDrawerHeaderTitle>{title}</ElDrawerHeaderTitle>
        {supplementaryInfo && <ElDrawerHeaderSupplementaryInfo>{supplementaryInfo}</ElDrawerHeaderSupplementaryInfo>}
      </ElDrawerHeaderMainContent>
      {tabs && <ElDrawerHeaderTabs>{tabs}</ElDrawerHeaderTabs>}
    </ElDrawerHeader>
  )
}

DrawerHeader.CloseButton = DrawerCloseButton
