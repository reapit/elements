import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode } from 'react'
import { ElAnchorNavIconItem, ElButtonNavIconItem } from './styles'

interface CommonNavIconItemProps {
  /**
   * The JSX element to render as the icon
   */
  icon: ReactNode

  /**
   * Defines a string value that labels the current element
   */
  'aria-label': string

  /**
   * Whether the nav item is active
   * @default false
   **/
  isActive?: boolean
}

interface NavIconItemAsButtonElementProps
  extends CommonNavIconItemProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  href?: never
  onClick: MouseEventHandler<HTMLButtonElement>
}

interface NavIconItemAsAnchorElementProps
  extends CommonNavIconItemProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-label'> {
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export type NavIconItemProps = NavIconItemAsButtonElementProps | NavIconItemAsAnchorElementProps

const isButtonElement = (props: NavIconItemProps): props is NavIconItemAsButtonElementProps => {
  return !props.href
}

/**
 * The `NavIconItem` component is a small part of `AppBar` component
 * It's used to render a nav item with an icon
 *
 * To ensure it's aligned with the design, the children component should have a CSS color property with 'inherit' value
 */
export const NavIconItem: FC<NavIconItemProps> = (props) => {
  if (isButtonElement(props)) {
    const { isActive, icon, ...rest } = props ?? {}

    return (
      <ElButtonNavIconItem {...rest} aria-current={isActive ? 'true' : undefined}>
        {icon}
      </ElButtonNavIconItem>
    )
  } else {
    const { isActive, icon, ...rest } = props ?? {}

    return (
      <ElAnchorNavIconItem {...rest} aria-current={isActive ? 'page' : undefined}>
        {icon}
      </ElAnchorNavIconItem>
    )
  }
}
