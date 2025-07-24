import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react'
import {
  ElDeprecatedMenuItemAnchor,
  ElDeprecatedMenuItemButton,
  ElDeprecatedMenuItemGroup,
  ElDeprecatedMenuItemGroupList,
  ElDeprecatedMenuItemGroupTitle,
  ElDeprecatedMenuList,
} from './styles'
import type { sizeType } from '../../types/core'

/** @deprecated */
interface CommonDeprecatedMenuItemProps {
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

/** @deprecated */
interface DeprecatedMenuItemAsButtonElementProps
  extends CommonDeprecatedMenuItemProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

/** @deprecated */
interface DeprecatedMenuItemAsAnchorElementProps
  extends CommonDeprecatedMenuItemProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  /** MenuItemAsAnchor currently doesn't support disabled state, use MenuItemButton instead */
  disabled?: never
}

/** @deprecated */
export type DeprecatedMenuItemContainerProps =
  | DeprecatedMenuItemAsButtonElementProps
  | DeprecatedMenuItemAsAnchorElementProps

/** @deprecated */
export interface DeprecatedMenuListProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: sizeType
  maxHeight?: sizeType
}

/**
 * The `MenuItemGroup` component is a wrapper for `MenuItem` which has optional label
 * can be used for grouping multiple type of list item e.g RadioItem (in future).
 *
 * @deprecated
 */
export const DeprecatedMenuItemGroup: FC<
  HTMLAttributes<HTMLDivElement> & {
    label?: string
    maxHeight?: sizeType
  }
> = ({ children, label, maxHeight, ...rest }) => {
  return (
    <ElDeprecatedMenuItemGroup {...rest} role="group">
      {!!label && <ElDeprecatedMenuItemGroupTitle>{label}</ElDeprecatedMenuItemGroupTitle>}
      <ElDeprecatedMenuItemGroupList style={{ ...rest?.style, maxHeight: `var(${maxHeight})` }}>
        {children}
      </ElDeprecatedMenuItemGroupList>
    </ElDeprecatedMenuItemGroup>
  )
}

/** @deprecated */
export const DeprecatedMenuItemContainer: FC<DeprecatedMenuItemContainerProps> = ({
  children,
  isActive,
  disabled,
  closeMenu = true,
  ...rest
}) => {
  if (!isItemAsButtonElement(rest)) {
    return (
      <ElDeprecatedMenuItemAnchor
        {...(rest as DeprecatedMenuItemAsAnchorElementProps)}
        role="menuitem"
        data-close-menu={closeMenu || !!disabled}
        aria-current={isActive ? 'page' : undefined}
      >
        {children}
      </ElDeprecatedMenuItemAnchor>
    )
  }

  return (
    <ElDeprecatedMenuItemButton
      {...rest}
      role="menuitem"
      data-close-menu={closeMenu}
      disabled={disabled}
      aria-disabled={disabled}
      aria-current={isActive ? 'true' : undefined}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </ElDeprecatedMenuItemButton>
  )
}

/** @deprecated */
export const DeprecatedMenuList: FC<DeprecatedMenuListProps> = ({ children, maxWidth, maxHeight, ...rest }) => (
  <ElDeprecatedMenuList
    {...rest}
    style={{ ...rest?.style, maxWidth: `var(${maxWidth})`, maxHeight: `var(${maxHeight})` }}
    data-has-max-width={!!maxWidth}
    role="menu"
  >
    {children}
  </ElDeprecatedMenuList>
)

function isItemAsButtonElement(
  props: DeprecatedMenuItemContainerProps,
): props is DeprecatedMenuItemAsButtonElementProps {
  return !props.href
}
