import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { MenuContainer, MenuItemButton, MenuItemGroup, MenuItemLink } from './menu.atoms'
import { MenuItemProps, MenuProps } from './types'
import { TextSM } from '../typography'
import { ElNavMenuOptionDivider } from '../nav'

export const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = ({ href, onClick, intent, children, ...rest }) => {
  if (href) {
    return (
      <MenuItemLink {...(rest as HTMLAttributes<HTMLAnchorElement>)} href={href}>
        <TextSM hasNoMargin intent={intent}>
          {children}
        </TextSM>
      </MenuItemLink>
    )
  }

  return (
    <MenuItemButton onClick={onClick} {...(rest as HTMLAttributes<HTMLButtonElement>)}>
      <TextSM hasNoMargin intent={intent}>
        {children}
      </TextSM>
    </MenuItemButton>
  )
}

export const Menu: React.FC<MenuProps> = ({ groups, intent, children, ...props }) => {
  return (
    <MenuContainer {...props}>
      {groups?.length
        ? groups!.map(({ items, ...props }, key) => (
            <div key={key}>
              {!!groups[key - 1] && <ElNavMenuOptionDivider />}
              <MenuItemGroup {...props}>
                {items.map(({ children, ...props }) => {
                  return (
                    <MenuItem key={children as string} {...props} intent={intent}>
                      {children}
                    </MenuItem>
                  )
                })}
              </MenuItemGroup>
            </div>
          ))
        : children}
    </MenuContainer>
  )
}
