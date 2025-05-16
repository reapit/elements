import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react'
import { ElMenuItemAnchor, ElMenuItemButton, ElMenuItemGroup, ElMenuItemGroupTitle, ElMenuList } from './styles'

interface CommonMenuItemProps {
  children?: ReactNode
  /**
   * Whether the menu is closed when clicking this item
   *
   * @example
   * <MenuItem closeMenu={false}>This won't close the menu</MenuItem>
   *
   * @default true
   */
  closeMenu?: boolean
  /**
   * Whether the Menu item is active
   *
   * @default false
   **/
  isActive?: boolean
}

interface MenuItemAsButtonElementProps extends CommonMenuItemProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

interface MenuItemAsAnchorElementProps extends CommonMenuItemProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  /** MenuItemAsAnchor currently doesn't support disabled state, use MenuItemButton instead */
  disabled?: never
}

export type MenuItemContainerProps = MenuItemAsButtonElementProps | MenuItemAsAnchorElementProps

/**
 * The `MenuItemGroup` component is a wrapper for `MenuItem` which has optional label
 * can be used for grouping multiple type of list item e.g RadioItem (in future).
 */
export const MenuItemGroup: FC<
  HTMLAttributes<HTMLDivElement> & {
    label?: string
  }
> = ({ children, label, ...rest }) => {
  return (
    <ElMenuItemGroup {...rest} role="group">
      {!!label && <ElMenuItemGroupTitle>{label}</ElMenuItemGroupTitle>}
      {children}
    </ElMenuItemGroup>
  )
}

export const MenuItemContainer: FC<MenuItemContainerProps> = ({
  children,
  isActive,
  disabled,
  closeMenu = true,
  ...rest
}) => {
  if (!isItemAsButtonElement(rest)) {
    return (
      <ElMenuItemAnchor
        {...(rest as MenuItemAsAnchorElementProps)}
        role="menuitem"
        data-close-menu={closeMenu || !!disabled}
        aria-current={isActive ? 'page' : undefined}
        datat-test={disabled}
      >
        {children}
      </ElMenuItemAnchor>
    )
  }

  return (
    <ElMenuItemButton
      {...rest}
      role="menuitem"
      data-close-menu={closeMenu}
      disabled={disabled}
      aria-disabled={disabled}
      aria-current={isActive ? 'true' : undefined}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </ElMenuItemButton>
  )
}

export const MenuList: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
  <ElMenuList {...rest} role="menu">
    {children}
  </ElMenuList>
)

function isItemAsButtonElement(props: MenuItemContainerProps): props is MenuItemAsButtonElementProps {
  return !props.href
}
