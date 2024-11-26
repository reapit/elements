import type { FC, HTMLAttributes } from 'react'
import {
  ElMainNavContainer,
  ElSearchContainer,
  ElTopBar,
  ElTopBarMenuButtonContainer,
  ElTopBarSecondaryNavContainer,
} from './styles'

const TopBar: FC<HTMLAttributes<HTMLDivElement>> & {
  MainNavigations: typeof ElMainNavContainer
  SecondaryNavigations: typeof ElTopBarSecondaryNavContainer
  SearchContainer: typeof ElSearchContainer
  MenuButtonContainer: typeof ElTopBarMenuButtonContainer
} = ({ children, ...props }) => {
  return (
    <nav>
      <ElTopBar {...props}>{children}</ElTopBar>
    </nav>
  )
}

TopBar.MainNavigations = ElMainNavContainer
TopBar.SecondaryNavigations = ElTopBarSecondaryNavContainer
TopBar.SearchContainer = ElSearchContainer
TopBar.MenuButtonContainer = ElTopBarMenuButtonContainer

export { TopBar }
