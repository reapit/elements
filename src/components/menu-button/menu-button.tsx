import { cx } from '@linaria/core'
import React, { useEffect, useState } from 'react'
import { Menu } from '../menu'
import { MenuButtonContainer, MenuButtonTogglerBase } from './menu-button.atoms'
import { elHasBorder, elHasIntent } from './styles'
import { MenuButtonContainerBaseProps, type MenuButtonProps, MenuTogglerButtonProps } from './types'

export const MenuButtonToggler: React.FC<MenuTogglerButtonProps> = ({
  label,
  isExpanded,
  onClick,
  intent,
  icon,
  hasBorder,
  ...props
}) => {
  return (
    <MenuButtonTogglerBase
      className={cx(intent && elHasIntent, hasBorder && elHasBorder)}
      intent={intent}
      type="button"
      onClick={onClick}
      buttonIcon={{
        position: 'right',
        icon: icon ? icon : isExpanded ? 'chevronUp' : 'chevronDown',
      }}
      {...props}
    >
      {label}
    </MenuButtonTogglerBase>
  )
}

export const MenuButton: React.FC<MenuButtonProps & MenuButtonContainerBaseProps> = ({
  label,
  menuGroups,
  intent,
  icon,
  hasBorder,
  top,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const isMenuButtonToggler = target.closest('#menu-button-toggler')
    const isMenuButtonMenu = target.closest('#menu-button-menu')

    if (!isMenuButtonToggler && !isMenuButtonMenu) {
      setIsExpanded(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const toggleIsExpanded = () => setIsExpanded((prev) => !prev)

  return (
    <MenuButtonContainer {...props}>
      <MenuButtonToggler
        id="menu-button-toggler"
        icon={icon}
        intent={intent}
        isExpanded={isExpanded}
        label={label}
        hasBorder={hasBorder}
        onClick={toggleIsExpanded}
      />
      {isExpanded && (
        <Menu
          id="menu-button-menu"
          top={top}
          intent={intent}
          data-testid="menu"
          groups={menuGroups.map((group) => {
            return {
              ...group,
              items: group.items.map((item) => {
                return {
                  ...item,
                  onClick: () => {
                    setIsExpanded(false)
                    if (item.onClick) {
                      item.onClick()
                    }
                  },
                }
              }),
            }
          })}
        />
      )}
    </MenuButtonContainer>
  )
}
