import React from 'react'
import { Menu } from './menu.molecules'
import { MenuProps } from './types'
import { ElNavMenuOptionDivider } from '../nav'

const MenuComposed: React.FC<MenuProps> = ({ groups, ...props }) => {
  return (
    <Menu.List {...props}>
      {groups.map(({ items, ...props }, key) => (
        <div key={key}>
          {!!groups[key - 1] && <ElNavMenuOptionDivider />}
          <Menu.Group {...props}>
            {items.map(({ children, ...props }, index) => {
              return (
                <Menu.Item key={index} {...props}>
                  {children}
                </Menu.Item>
              )
            })}
          </Menu.Group>
        </div>
      ))}
    </Menu.List>
  )
}

export { MenuComposed as Menu }
