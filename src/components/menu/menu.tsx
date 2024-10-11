import React, { useState } from 'react'
import { Menu } from './menu.molecules'
import { MenuItemGroupProps, MenuProps } from './types'
import { ElNavMenuOptionDivider } from '../nav'

const MenuRadioGroup: React.FC<MenuItemGroupProps<'radio'>> = ({ items, onChange, ...props }) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    items.find((item) => item.defaultChecked)?.label,
  )

  const handleOptionChange = (value) => {
    setSelectedValue(value)
    onChange(value)
  }
  return (
    <Menu.Group {...props}>
      {items.map(({ label, ...rest }, index) => {
        return (
          <Menu.RadioItem
            onClick={() => handleOptionChange(label)}
            checked={!!selectedValue?.includes(label)}
            key={index}
            {...rest}
          >
            {label}
          </Menu.RadioItem>
        )
      })}
    </Menu.Group>
  )
}

const MenuGroup: React.FC<MenuItemGroupProps<'default'>> = ({ items, ...props }) => {
  return (
    <Menu.Group {...props}>
      {items.map(({ children, ...rest }, index) => {
        return (
          <Menu.Item key={index} {...rest}>
            {children}
          </Menu.Item>
        )
      })}
    </Menu.Group>
  )
}

const MenuComposed: React.FC<MenuProps> = ({ groups, ...props }) => {
  return (
    <Menu.List {...props}>
      {groups.map((props, key) => (
        <div key={key}>
          {!!groups[key - 1] && <ElNavMenuOptionDivider />}
          {props.type === 'radio' ? <MenuRadioGroup {...props} /> : <MenuGroup {...props} />}
        </div>
      ))}
    </Menu.List>
  )
}

export { MenuComposed as Menu }
