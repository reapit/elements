import React, { type HTMLAttributes } from 'react'
import { Icon } from '../icon'
import { ElNavMenuButton } from './styles'

export interface NavMenuButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isOpen: boolean
}

export const NavMenuButton: React.FC<NavMenuButtonProps> = ({ children, isOpen, ...props }) => {
  return (
    <ElNavMenuButton type="button" {...props}>
      {children}
      <Icon intent="default" icon={isOpen ? 'chevronUp' : 'chevronDown'} fontSize="1rem" />
    </ElNavMenuButton>
  )
}
