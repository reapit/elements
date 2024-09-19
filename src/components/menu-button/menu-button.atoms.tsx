import { FC } from 'react'
import { ElMenuButtonContainer, ElMenuButtonToggler } from './styles'
import { MenuButtonBaseProps } from './types'
import { ButtonProps } from '../button'

export const MenuButtonContainer: FC<MenuButtonBaseProps> = ({ children, ...rest }) => {
  return <ElMenuButtonContainer {...rest}>{children}</ElMenuButtonContainer>
}

export const MenuButtonTogglerBase: FC<ButtonProps> = ({ children, ...rest }) => {
  return <ElMenuButtonToggler {...rest}>{children}</ElMenuButtonToggler>
}
