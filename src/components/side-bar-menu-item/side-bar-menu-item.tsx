import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import {
  ElSideBarMenuItemAnchor,
  ElSideBarMenuItemButton,
  ElSideBarMenuItemText,
  ElSideBarMenuItemIcon,
} from './styles'

interface CommonSideBarMenuItemProps {
  children?: ReactNode
  /**
   * Whether the page represented by this link is currently active.
   *
   * @example
   * <SideBarMenuItem isActive>This is active page link</SideBarMenuItem>
   *
   * @default false
   */
  isActive?: boolean
  icon: ReactNode
}

interface SideBarAsButtonElementProps extends CommonSideBarMenuItemProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

interface SideBarAsAnchorElementProps extends CommonSideBarMenuItemProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  /** currently doesn't support disabled state */
  disabled?: never
}

export type SideBarMenuItemProps = SideBarAsButtonElementProps | SideBarAsAnchorElementProps

const SideBarMenuItem: React.FC<SideBarMenuItemProps> = ({ icon, isActive, children, ...props }) => {
  const ItemWrapper = isItemAsButtonElement(props) ? ElSideBarMenuItemButton : ElSideBarMenuItemAnchor
  return (
    <li>
      <ItemWrapper
        aria-current={isActive ? 'page' : undefined}
        {...(props as HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>)}
      >
        <ElSideBarMenuItemIcon>{icon}</ElSideBarMenuItemIcon>
        <ElSideBarMenuItemText>{children}</ElSideBarMenuItemText>
      </ItemWrapper>
    </li>
  )
}

function isItemAsButtonElement(props: Omit<SideBarMenuItemProps, 'icon'>): props is SideBarAsButtonElementProps {
  return !props.href
}

export { SideBarMenuItem }
