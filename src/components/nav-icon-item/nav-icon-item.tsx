import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode } from 'react'
import { ElAnchorNavIconItem, ElButtonNavIconItem } from './styles'

interface CommonNavIconItemProps {
  /**
   * The JSX element to render as the icon
   */
  icon: ReactNode

  /**
   * Whether the nav item is active
   * @default false
   **/
  isActive?: boolean
}

interface NavIconItemAsButtonElementProps extends CommonNavIconItemProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never
  target?: never
  ref?: never
  onClick: MouseEventHandler<HTMLButtonElement>
}

interface NavIconItemAsAnchorElementProps extends CommonNavIconItemProps, AnchorHTMLAttributes<HTMLAnchorElement> {
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
  if (!isButtonElement(props)) {
    const { isActive, onClick, icon, ...rest } = props ?? {}

    return (
      <ElAnchorNavIconItem
        {...rest}
        role="button"
        data-state={isActive ? 'active' : undefined}
        onClick={(e) => {
          e.preventDefault()
          onClick?.(e)
        }}
      >
        {icon}
      </ElAnchorNavIconItem>
    )
  } else {
    const { isActive, icon, ...rest } = props ?? {}

    return (
      <ElButtonNavIconItem {...rest} role="button" data-state={isActive ? 'active' : undefined}>
        {icon}
      </ElButtonNavIconItem>
    )
  }
}
