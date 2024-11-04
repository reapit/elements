import React from 'react'
import { Icon } from '../../../icon'
import { ElNavMenuButtonToggler } from './styles'
import { NavMenuTogglerButtonProps } from './types'

export const NavMenuButtonToggler: React.FC<NavMenuTogglerButtonProps> = ({ label, isExpanded, icon, ...props }) => {
  return (
    <ElNavMenuButtonToggler type="button" {...props}>
      {label}
      <Icon intent="default" icon={icon ? icon : isExpanded ? 'chevronUp' : 'chevronDown'} fontSize="1rem" />
    </ElNavMenuButtonToggler>
  )
}
