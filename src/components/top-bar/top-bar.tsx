import type { FC, HTMLAttributes } from 'react'
import { ElTopBarMainNav, ElTopBarSearch, ElTopBar, ElTopBarMobileNav, ElTopBarSecondaryNav } from './styles'

const TopBar: FC<HTMLAttributes<HTMLDivElement>> & {
  MainNav: typeof ElTopBarMainNav
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

TopBar.MainNav = ElTopBarMainNav
TopBar.SecondaryNav = ElTopBarSecondaryNav
TopBar.Search = ElTopBarSearch
TopBar.MobileNav = ElTopBarMobileNav

export { TopBar }
