import type { FC, HTMLAttributes } from 'react'
import { ElTopBarSearch, ElTopBar, ElTopBarMobileNav, ElTopBarSecondaryNav } from './styles'
import { TopBarMainNav } from './top-bar.atoms'

const TopBar: FC<HTMLAttributes<HTMLDivElement>> & {
  MainNav: typeof TopBarMainNav
  SecondaryNav: typeof ElTopBarSecondaryNav
  Search: typeof ElTopBarSearch
  MobileNav: typeof ElTopBarMobileNav
} = ({ children, ...props }) => {
  return (
    <nav>
      <ElTopBar {...props}>{children}</ElTopBar>
    </nav>
  )
}

TopBar.MainNav = TopBarMainNav
TopBar.SecondaryNav = ElTopBarSecondaryNav
TopBar.Search = ElTopBarSearch
TopBar.MobileNav = ElTopBarMobileNav

export { TopBar }
