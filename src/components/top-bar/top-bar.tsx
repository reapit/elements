import type { FC, HTMLAttributes } from 'react'
import {
  ElTopBarMainNav,
  ElTopBarSearchContainer,
  ElTopBar,
  ElTopBarMenuButtonContainer,
  ElTopBarSecondaryNav,
} from './styles'

const TopBar: FC<HTMLAttributes<HTMLDivElement>> & {
  MainNavigations: typeof ElTopBarMainNav
  SecondaryNavigations: typeof ElTopBarSecondaryNav
  SearchContainer: typeof ElTopBarSearchContainer
  MenuButtonContainer: typeof ElTopBarMenuButtonContainer
} = ({ children, ...props }) => {
  return (
    <nav>
      <ElTopBar {...props}>{children}</ElTopBar>
    </nav>
  )
}

TopBar.MainNavigations = ElTopBarMainNav
TopBar.SecondaryNavigations = ElTopBarSecondaryNav
TopBar.SearchContainer = ElTopBarSearchContainer
TopBar.MenuButtonContainer = ElTopBarMenuButtonContainer

export { TopBar }
