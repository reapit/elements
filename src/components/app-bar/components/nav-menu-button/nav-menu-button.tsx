import React from 'react'
import { Icon } from '../../../icon'
import { Menu as MenuComposed } from '../../../menu'
import { Menu } from '../../../menu/menu.molecules'
import { NavMenuButtonContainer, NavMenuButtonMenuContainer, NavMenuButtonTogglerBase } from './nav-menu-button.atoms'
import { NavMenuButtonContainerBaseProps, type NavMenuButtonProps, NavMenuTogglerButtonProps } from './types'

export const NavMenuButtonToggler: React.FC<NavMenuTogglerButtonProps> = ({ label, isExpanded, icon, ...props }) => {
  return (
    <NavMenuButtonTogglerBase type="button" {...props}>
      {label}
      <Icon intent="default" icon={icon ? icon : isExpanded ? 'chevronUp' : 'chevronDown'} fontSize="1rem" />
    </NavMenuButtonTogglerBase>
  )
}

export const NavMenuButton: React.FC<NavMenuButtonProps & NavMenuButtonContainerBaseProps> = ({
  label,
  menuGroups,
  icon,
  top,
  alignment = 'left',
  ...props
}) => {
  const ref = React.useRef(null)
  return (
    <NavMenuButtonContainer ref={ref} {...props} data-alignment={alignment}>
      <Menu>
        <Menu.Trigger>
          {({ getTriggerProps, isOpen }) => (
            <NavMenuButtonToggler {...getTriggerProps()} icon={icon} isExpanded={isOpen} label={label} />
          )}
        </Menu.Trigger>

        <NavMenuButtonMenuContainer top={top}>
          <Menu.Popover ref={ref}>
            <MenuComposed data-testid="menu" groups={menuGroups} />
          </Menu.Popover>
        </NavMenuButtonMenuContainer>
      </Menu>
    </NavMenuButtonContainer>
  )
}
