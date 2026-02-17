import { ElTopBarMenuDrawerSecondaryNav } from './styles'
import { TopBarMenuDrawerMenuList } from '../menu-list'

export namespace TopBarMenuDrawerSecondaryNav {
  export interface Props extends Omit<TopBarMenuDrawerMenuList.Props, 'aria-label'> {
    /**
     * Accessible label for the secondary navigation menu list.
     *
     * @default "Secondary navigation"
     */
    'aria-label'?: string
  }
}

/**
 * A wrapper around `TopBar.MenuList` for secondary navigation items. Automatically hides when the secondary navigation
 * is visible in the TopBar (at LG+ breakpoints).
 *
 * Use this component to display secondary navigation menu items in the mobile drawer that correspond to items shown in
 * the TopBar's secondary navigation area on larger screens.
 */
export function TopBarMenuDrawerSecondaryNav({
  'aria-label': ariaLabel = 'Secondary navigation',
  children,
  ...rest
}: TopBarMenuDrawerSecondaryNav.Props) {
  return (
    <ElTopBarMenuDrawerSecondaryNav aria-label={ariaLabel} {...rest}>
      {children}
    </ElTopBarMenuDrawerSecondaryNav>
  )
}

TopBarMenuDrawerSecondaryNav.displayName = 'TopBar.MenuSecondaryNav'
