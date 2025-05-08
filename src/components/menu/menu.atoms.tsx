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
  /** MenuItemAsAnchor currently doesn't support disabled state */
  disabled?: boolean
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
    <ElMenuItemGroup role="group" {...rest}>
      {!!label && <ElMenuItemGroupTitle>{label}</ElMenuItemGroupTitle>}
      {children}
    </ElMenuItemGroup>
  )
}

export const MenuItemContainer: FC<MenuItemContainerProps> = ({
  children,
  disabled,
  isActive,
  closeMenu = true,
  ...rest
}) => {
  if (!isItemAsButtonElement(rest)) {
    return (
      <ElMenuItemAnchor
        role="menuitem"
        data-close-menu={closeMenu}
        {...(rest as MenuItemAsAnchorElementProps)}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        {children}
      </ElMenuItemAnchor>
    )
  }

  return (
    <ElMenuItemButton
      role="menuitem"
      data-close-menu={closeMenu}
      aria-disabled={disabled}
      {...rest}
      aria-current={isActive ? 'true' : undefined}
    >
      {children}
    </ElMenuItemButton>
  )
}

export const MenuList: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
  <ElMenuList role="menu" {...rest}>
    {children}
  </ElMenuList>
)

function isItemAsButtonElement(props: MenuItemContainerProps): props is MenuItemAsButtonElementProps {
  return !props.href
}
