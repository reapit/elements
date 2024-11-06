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
  target?: never
  rel?: never
  onClick: MouseEventHandler<HTMLButtonElement>
}

interface NavIconItemAsAnchorElementProps
  extends CommonNavIconItemProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-label'> {
  href?: string
  target?: string
  rel?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export type NavIconItemProps = NavIconItemAsButtonElementProps | NavIconItemAsAnchorElementProps

const isButtonElement = (props: NavIconItemProps): props is NavIconItemAsButtonElementProps => {
  return !props.href
}

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
