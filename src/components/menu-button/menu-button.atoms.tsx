import { FC } from 'react'
import { ElMenuButtonContainer, ElMenuButtonToggler, ElMenuButtonMenuContainer } from './styles'
import { MenuButtonBaseProps, MenuButtonMenuProps } from './types'
import { ButtonProps } from '../button'

export const MenuButtonContainer: FC<MenuButtonBaseProps> = ({ children, ...rest }) => {
  return <ElMenuButtonContainer {...rest}>{children}</ElMenuButtonContainer>
}

export const MenuButtonMenuContainer: FC<MenuButtonMenuProps> = ({ children, top }) => {
  return <ElMenuButtonMenuContainer style={{ top: top ? top : undefined }}>{children}</ElMenuButtonMenuContainer>
}

export const MenuButtonTogglerBase: FC<ButtonProps> = ({ children, ...rest }) => {
  return <ElMenuButtonToggler {...rest}>{children}</ElMenuButtonToggler>
}
