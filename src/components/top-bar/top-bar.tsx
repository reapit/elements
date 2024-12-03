import { ElTopBarLogo } from './styles'

const TopBar: {
  Logo: typeof ElTopBarLogo
} = {
  Logo: ElTopBarLogo,
}

import type { FC, HTMLAttributes } from 'react'
import {
  ElTopBarSearch,
  ElTopBar,
  ElTopBarMobileNav,
  ElTopBarSecondaryNav,
  ElTopBarProfile,
  ElTopBarMainNav,
} from './styles'

const TopBar: FC<HTMLAttributes<HTMLDivElement>> & {
  MainNav: typeof ElTopBarMainNav
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

TopBar.MainNav = ElTopBarMainNav
TopBar.SecondaryNav = ElTopBarSecondaryNav
TopBar.Search = ElTopBarSearch
TopBar.MobileNav = ElTopBarMobileNav
TopBar.Profile = ElTopBarProfile

export { TopBar }
