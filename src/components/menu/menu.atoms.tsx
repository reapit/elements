import { FC, HTMLAttributes } from 'react'
import { ElMenuItemGroup, ElMenuItemGroupTitle } from './styles'

export const MenuItemGroupTitle: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return (
    <li>
      <ElMenuItemGroupTitle {...rest}>{children}</ElMenuItemGroupTitle>
    </li>
  )
}

export const MenuItemGroup: FC<
  HTMLAttributes<HTMLUListElement> & {
    title?: string
  }
> = ({ children, title, ...rest }) => {
  return (
    <ElMenuItemGroup {...rest}>
      {!!title && <MenuItemGroupTitle>{title}</MenuItemGroupTitle>}
      {children}
    </ElMenuItemGroup>
  )
}
