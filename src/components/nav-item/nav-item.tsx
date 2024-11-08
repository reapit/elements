import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react'
import { ElNavItemAnchor, ElNavItemButton, ElNavItemLabelContainer } from './styles'

interface CommonNavItemProps {
  /**
   * Whether the nav item is active
   *
   * @default false
   **/
  isActive?: boolean
}

interface NavItemAsButtonElementProps extends CommonNavItemProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never
  disabled?: boolean
}

interface NavItemAsAnchorElementProps extends CommonNavItemProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  /** NavItemAsAnchor currently doesn't support disabled state */
  disabled?: never
  href?: string
}

export type NavItemProps = NavItemAsButtonElementProps | NavItemAsAnchorElementProps

export const NavItem: FC<NavItemProps> = ({ children, disabled, isActive, ...props }) => {
  if (isItemAsButtonElement(props)) {
    return (
      <ElNavItemButton {...props} aria-current={isActive ? 'true' : undefined}>
        <ElNavItemLabelContainer aria-disabled={disabled}>{children}</ElNavItemLabelContainer>
      </ElNavItemButton>
    )
  }

  return (
    <ElNavItemAnchor {...(props as NavItemAsAnchorElementProps)} aria-current={isActive ? 'true' : undefined}>
      <ElNavItemLabelContainer>{children}</ElNavItemLabelContainer>
    </ElNavItemAnchor>
  )
}

function isItemAsButtonElement(props: NavItemProps): props is NavItemAsButtonElementProps {
  return !props.href
}
