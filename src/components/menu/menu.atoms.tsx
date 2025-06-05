import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react'
import {
  ElMenuItemAnchor,
  ElMenuItemButton,
  ElMenuItemGroup,
  ElMenuItemGroupList,
  ElMenuItemGroupTitle,
  ElMenuList,
} from './styles'
import type { sizeType } from '../../types/core'

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

export interface MenuListProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: sizeType
  maxHeight?: sizeType
}

/**
 * The `MenuItemGroup` component is a wrapper for `MenuItem` which has optional label
 * can be used for grouping multiple type of list item e.g RadioItem (in future).
 */
export const MenuItemGroup: FC<
  HTMLAttributes<HTMLDivElement> & {
    label?: string
    maxHeight?: sizeType
  }
> = ({ children, label, maxHeight, ...rest }) => {
  return (
    <ElMenuItemGroup {...rest} role="group">
      {!!label && <ElMenuItemGroupTitle>{label}</ElMenuItemGroupTitle>}
      <ElMenuItemGroupList style={{ ...rest?.style, maxHeight: `var(${maxHeight})` }}>{children}</ElMenuItemGroupList>
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

export const MenuList: FC<MenuListProps> = ({ children, maxWidth, maxHeight, ...rest }) => (
  <ElMenuList
    {...rest}
    style={{ ...rest?.style, maxWidth: `var(${maxWidth})`, maxHeight: `var(${maxHeight})` }}
    data-has-max-width={!!maxWidth}
    role="menu"
  >
    {children}
  </ElMenuList>
)

function isItemAsButtonElement(props: MenuItemContainerProps): props is MenuItemAsButtonElementProps {
  return !props.href
}
