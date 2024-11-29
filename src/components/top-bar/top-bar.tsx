import type { FC, HTMLAttributes } from 'react'
import { ElTopBarSearch, ElTopBar, ElTopBarMobileNav, ElTopBarSecondaryNav, ElTopBarProfile } from './styles'
import { TopBarMainNav } from './top-bar.atoms'

const TopBar: FC<HTMLAttributes<HTMLDivElement>> & {
  MainNav: typeof TopBarMainNav
  SecondaryNav: typeof ElTopBarSecondaryNav
  Search: typeof ElTopBarSearch
  MobileNav: typeof ElTopBarMobileNav
  Profile: typeof ElTopBarProfile
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
TopBar.Profile = ElTopBarProfile

export { TopBar }
