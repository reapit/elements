import type { FC, ReactNode } from 'react'

import { BottomBarItem } from '../bottom-bar-item'
import { Icon } from '../icon'
import { Menu, MenuItemProps } from '../menu'
import { ElBottomBarMoreMenu } from './styles'

export interface BottomBarMoreMenuProps {
  children: ReactNode
}

export const BottomBarMoreMenu: FC<BottomBarMoreMenuProps> = ({ children }) => {
  return (
    <ElBottomBarMoreMenu data-alignment="right">
      <Menu.Trigger>
        {({ getTriggerProps }) => (
          <BottomBarItem {...getTriggerProps()} icon={<Icon icon="more" />}>
            More
          </BottomBarItem>
        )}
      </Menu.Trigger>
      <Menu.Popover yOffset={-15}>
        <Menu.List>{children}</Menu.List>
      </Menu.Popover>
    </ElBottomBarMoreMenu>
  )
}

export type BottomBarMoreMenuItemProps = MenuItemProps
export const BottomBarMoreMenuItem: FC<BottomBarMoreMenuItemProps> = (args) => {
  return <Menu.Item {...args} />
}
