import { useDrawerContext } from '../context'
import { DrawerHeaderCloseButton } from './close-button'
import {
  ElDrawerHeader,
  ElDrawerHeaderAction,
  ElDrawerHeaderContentContainer,
  ElDrawerHeaderOverline,
  ElDrawerHeaderSupplementaryInfo,
  ElDrawerHeaderTabsContainer,
  ElDrawerHeaderTitle,
} from './styles'
import type { HTMLAttributes, ReactNode } from 'react'

interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional close action for the drawer. Should not be used when the drawer contains a form. */
  action?: ReactNode
  /** Optional text to display above the title. */
  overline?: ReactNode
  /** Optional supplementary information. Typically a `SupplementaryInfo` component. */
  supplementaryInfo?: ReactNode
  /** Optional tabs. Typically a `Tabs` component. Note that tabs should not be used when the drawer has a footer. */
  tabs?: ReactNode
  /** The title of the drawer. */
  children: ReactNode
}

/**
 * A header for drawers. Contains the drawer's title, as well as an optional action (close button), category,
 * supplementary info and/or tabs.
 */
export function DrawerHeader({ action, overline, children, supplementaryInfo, tabs, ...rest }: DrawerHeaderProps) {
  const { titleId } = useDrawerContext() ?? {}
  return (
    <ElDrawerHeader {...rest}>
      <ElDrawerHeaderContentContainer>
        {action && <ElDrawerHeaderAction>{action}</ElDrawerHeaderAction>}
        {overline && <ElDrawerHeaderOverline>{overline}</ElDrawerHeaderOverline>}
        <ElDrawerHeaderTitle id={titleId}>{children}</ElDrawerHeaderTitle>
        {supplementaryInfo && <ElDrawerHeaderSupplementaryInfo>{supplementaryInfo}</ElDrawerHeaderSupplementaryInfo>}
      </ElDrawerHeaderContentContainer>
      {tabs && <ElDrawerHeaderTabsContainer>{tabs}</ElDrawerHeaderTabsContainer>}
    </ElDrawerHeader>
  )
}

DrawerHeader.CloseButton = DrawerHeaderCloseButton
