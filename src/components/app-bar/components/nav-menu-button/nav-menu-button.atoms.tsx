import { FC, forwardRef } from 'react'
import { ElNavMenuButtonContainer, ElNavMenuButtonToggler, ElNavMenuButtonMenuContainer } from './styles'
import { NavMenuButtonBaseProps, NavMenuButtonMenuProps } from './types'
import { ButtonProps } from '../../../button'

export const NavMenuButtonContainer = forwardRef<HTMLDivElement, NavMenuButtonBaseProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ElNavMenuButtonContainer ref={ref} {...rest}>
        {children}
      </ElNavMenuButtonContainer>
    )
  },
)

export const NavMenuButtonMenuContainer: FC<NavMenuButtonMenuProps> = ({ children, top }) => {
  return <ElNavMenuButtonMenuContainer style={{ top: top ? top : undefined }}>{children}</ElNavMenuButtonMenuContainer>
}

export const NavMenuButtonTogglerBase: FC<ButtonProps> = ({ children, ...rest }) => {
  return <ElNavMenuButtonToggler {...rest}>{children}</ElNavMenuButtonToggler>
}
