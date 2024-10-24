import { FC, HTMLAttributes } from 'react'
import { ElMenuItem, ElMenuItemGroup, ElMenuItemGroupTitle } from './styles'

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

export const MenuItem: FC<
  HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean
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
> = ({ children, disabled, closeMenu = true, ...rest }) => {
  return (
    <ElMenuItem role="menuitem" data-close-menu={closeMenu} aria-disabled={disabled} {...rest}>
      {children}
    </ElMenuItem>
  )
}
