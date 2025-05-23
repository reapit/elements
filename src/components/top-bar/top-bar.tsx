import type { FC, HTMLAttributes } from 'react'
import {
  ElTopBarSearch,
  ElTopBar,
  ElTopBarMobileNav,
  ElTopBarSecondaryNav,
  ElTopBarProfile,
  ElTopBarMainNav,
  ElTopBarLogo,
  ElTopBarAppSwitcher,
} from './styles'

const TopBar: FC<HTMLAttributes<HTMLDivElement>> & {
  AppSwitcher: typeof ElTopBarAppSwitcher
  Logo: typeof ElTopBarLogo
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

TopBar.AppSwitcher = ElTopBarAppSwitcher
TopBar.Logo = ElTopBarLogo
TopBar.MainNav = ElTopBarMainNav
TopBar.SecondaryNav = ElTopBarSecondaryNav
TopBar.Search = ElTopBarSearch
TopBar.MobileNav = ElTopBarMobileNav
TopBar.Profile = ElTopBarProfile

export { TopBar }
