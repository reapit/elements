import { ElTopBarMenuDrawerProfileNav } from './styles'
import { TopBarMenuDrawerMenuList } from '../menu-list'

export namespace TopBarMenuDrawerProfileNav {
  export interface Props extends Omit<TopBarMenuDrawerMenuList.Props, 'aria-label'> {
    /**
     * Accessible label for the profile navigation menu list.
     *
     * @default "Profile navigation"
     */
    'aria-label'?: string
  }
}

/**
 * A wrapper around `TopBar.MenuList` for profile navigation items. Automatically hides when the profile avatar is
 * visible in the TopBar (at MD+ breakpoints).
 *
 * Use this component to display profile navigation menu items in the mobile drawer that correspond to items shown in
 * the TopBar's profile/avatar area on larger screens.
 */
export function TopBarMenuDrawerProfileNav({
  'aria-label': ariaLabel = 'Profile navigation',
  children,
  ...rest
}: TopBarMenuDrawerProfileNav.Props) {
  return (
    <ElTopBarMenuDrawerProfileNav aria-label={ariaLabel} {...rest}>
      {children}
    </ElTopBarMenuDrawerProfileNav>
  )
}

TopBarMenuDrawerProfileNav.displayName = 'TopBar.MenuProfileNav'
