import { cx } from '@linaria/core'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Menu, MenuItemProps } from '../menu'
import { MenuButtonContainer, MenuButtonMenuContainer, MenuButtonTogglerBase } from './menu-button.atoms'
import { elHasBorder, elHasIntent, elHasRightAlignedMenu } from './styles'
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

export const handleOutsideClick = (setIsExpanded: Dispatch<SetStateAction<boolean>>) => (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const isMenuButtonToggler = target.closest('#menu-button-toggler')
  const isMenuButtonMenu = target.closest('#menu-button-menu')

  if (!isMenuButtonToggler && !isMenuButtonMenu) {
    setIsExpanded(false)
  }
}

export const handleItemClick = (setIsExpanded: Dispatch<SetStateAction<boolean>>, item: MenuItemProps) => () => {
  setIsExpanded(false)
  if (item.onClick) {
    item.onClick()
  }
}

export const MenuButton: React.FC<MenuButtonProps & MenuButtonContainerBaseProps> = ({
  label,
  menuGroups,
  intent,
  icon,
  hasBorder,
  top,
  alignment = 'left',
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick(setIsExpanded))
    return () => {
      document.removeEventListener('click', handleOutsideClick(setIsExpanded))
    }
  }, [])

  const toggleIsExpanded = () => setIsExpanded((prev) => !prev)

  return (
    <MenuButtonContainer {...props} className={cx(props.className, alignment === 'right' && elHasRightAlignedMenu)}>
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
        <MenuButtonMenuContainer top={top}>
          <Menu
            id="menu-button-menu"
            intent={intent}
            data-testid="menu"
            groups={menuGroups.map((group) => {
              return {
                ...group,
                items: group.items.map((item) => {
                  return {
                    ...item,
                    onClick: handleItemClick(setIsExpanded, item),
                  }
                }),
              }
            })}
          />
        </MenuButtonMenuContainer>
      )}
    </MenuButtonContainer>
  )
}
