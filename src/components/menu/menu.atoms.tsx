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
}

interface MenuItemAsButtonElementProps extends CommonMenuItemProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

interface MenuItemAsAnchorElementProps extends CommonMenuItemProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  /** MenuItemAsAnchor currently doesn't support disabled state */
  disabled?: never
}

export type MenuItemProps = MenuItemAsButtonElementProps | MenuItemAsAnchorElementProps

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

export const MenuItem: FC<MenuItemProps> = ({ children, disabled, closeMenu = true, ...rest }) => {
  if (!isItemAsButtonElement(rest)) {
    return (
      <ElMenuItemAnchor role="menuitem" data-close-menu={closeMenu} {...(rest as MenuItemAsAnchorElementProps)}>
        {children}
      </ElMenuItemAnchor>
    )
  }

  return (
    <ElMenuItemButton role="menuitem" data-close-menu={closeMenu} aria-disabled={disabled} {...rest}>
      {children}
    </ElMenuItemButton>
  )
}

export const MenuList: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
  <ElMenuList role="menu" {...rest}>
    {children}
  </ElMenuList>
)

function isItemAsButtonElement(props: MenuItemProps): props is MenuItemAsButtonElementProps {
  return !props.href
}
