import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode } from 'react'
import {
  ElAnchorBottomBarItemContainer,
  ElBottomBarItemIcon,
  ElBottomBarItemLabel,
  ElButtonBottomBarItemContainer,
} from './styles'

interface CommonBottomBarItemProps {
  /**
   * The JSX element to render as the icon
   *
   * NOTE: the CSS color property is set to 'inherit' to ensure the icon is aligned with the design
   */
  icon: ReactNode

  /**
   * Render a label for the bottom bar item
   *
   * NOTE: the CSS color property is set to 'inherit' to ensure the label is aligned with the design
   */
  children: ReactNode

  /**
   * Whether the nav item is active
   *
   * @default false
   **/
  isActive?: boolean
}

interface BottomBarItemAsButtonElementProps
  extends CommonBottomBarItemProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never
  onClick: MouseEventHandler<HTMLButtonElement>
}

interface BottomBarItemAsAnchorElementProps
  extends CommonBottomBarItemProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export type BottomBarItemProps = BottomBarItemAsButtonElementProps | BottomBarItemAsAnchorElementProps

const isButtonElement = (props: BottomBarItemProps): props is BottomBarItemAsButtonElementProps => {
  return !props?.href
}

/**
 * The `BottomBarItem` component is a small part of `BottomBar` component
 *
 * To ensure it's aligned with the design, the children component should have a CSS color property with 'inherit' value
 */
export const BottomBarItem: FC<BottomBarItemProps> = (props) => {
  if (isButtonElement(props)) {
    const { isActive, icon, children, ...rest } = props ?? {}

    return (
      <ElButtonBottomBarItemContainer {...rest} aria-current={isActive ? 'true' : undefined}>
        <ElBottomBarItemIcon role="presentation">{icon}</ElBottomBarItemIcon>
        <ElBottomBarItemLabel>{children}</ElBottomBarItemLabel>
      </ElButtonBottomBarItemContainer>
    )
  } else {
    const { isActive, icon, children, ...rest } = props ?? {}

    return (
      <ElAnchorBottomBarItemContainer {...rest} aria-current={isActive ? 'page' : undefined}>
        <ElBottomBarItemIcon role="presentation">{icon}</ElBottomBarItemIcon>
        <ElBottomBarItemLabel>{children}</ElBottomBarItemLabel>
      </ElAnchorBottomBarItemContainer>
    )
  }
}
