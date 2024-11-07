import React, { type HTMLAttributes } from 'react'
import { Icon } from '../icon'
import { ElNavDropdownButton } from './styles'

export interface NavDropdownButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isOpen: boolean
}

export const NavDropdownButton: React.FC<NavDropdownButtonProps> = ({ children, isOpen, ...props }) => {
  return (
    <ElNavDropdownButton type="button" {...props}>
      {children}
      <Icon intent="default" icon={isOpen ? 'chevronUp' : 'chevronDown'} fontSize="1rem" />
    </ElNavDropdownButton>
  )
}
