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
   */
  icon: ReactNode

  /**
   * Defines a string value that labels the current element
   * While it's improve the accessibility, this will also used as a label part
   */
  'aria-label': string

  /**
   * Whether the nav item is active
   * @default false
   **/
  isActive?: boolean
}

interface BottomBarItemAsButtonElementProps
  extends CommonBottomBarItemProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  href?: never
  onClick: MouseEventHandler<HTMLButtonElement>
}

interface BottomBarItemAsAnchorElementProps
  extends CommonBottomBarItemProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-label'> {
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
    const { isActive, icon, 'aria-label': ariaLabel, ...rest } = props ?? {}

    return (
      <ElButtonBottomBarItemContainer {...rest} aria-current={isActive ? 'true' : undefined}>
        <ElBottomBarItemIcon>{icon}</ElBottomBarItemIcon>
        <ElBottomBarItemLabel>{ariaLabel}</ElBottomBarItemLabel>
      </ElButtonBottomBarItemContainer>
    )
  } else {
    const { isActive, icon, 'aria-label': ariaLabel, ...rest } = props ?? {}

    return (
      <ElAnchorBottomBarItemContainer {...rest} aria-current={isActive ? 'page' : undefined}>
        <ElBottomBarItemIcon>{icon}</ElBottomBarItemIcon>
        <ElBottomBarItemLabel>{ariaLabel}</ElBottomBarItemLabel>
      </ElAnchorBottomBarItemContainer>
    )
  }
}
