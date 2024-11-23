import type { FC } from 'react'
import { ButtonGroup } from '../button-group'
import { Icon } from '../icon'
import { Menu } from '../menu'
import { NavDropdownButton } from '../nav-dropdown-button'
import { NavIconItem, NavIconItemProps } from '../nav-icon-item'
import type { NavItemProps } from '../nav-item'
import { NavItem } from '../nav-item'
import ContainerQuery from './container-query'
import MenuIcon from './icons/menu-icon.svg?react'
import { elMainNavContainer, ElTopBarMenuButtonContainer } from './styles'

interface MainNavigationsProps {
  mainNavigationsProps: NavItemProps[]
}

const MenuItemCollapseCondition = '(width < 1440px)'

export const MainNavigations: FC<MainNavigationsProps> = ({ mainNavigationsProps }) => {
  return (
    <ButtonGroup className={elMainNavContainer}>
      {mainNavigationsProps.slice(0, 4).map((navItemProps) => {
        return <NavItem key={navItemProps['children'] as string} {...navItemProps} />
      })}
      <ContainerQuery conditions={MenuItemCollapseCondition}>
        {mainNavigationsProps.slice(4).map((navItemProps) => {
          return <NavItem key={navItemProps['children'] as string} {...navItemProps} />
        })}
      </ContainerQuery>
      <ContainerQuery not conditions={MenuItemCollapseCondition}>
        <Menu>
          <Menu.Trigger>
            {({ getTriggerProps, isOpen }) => (
              <NavDropdownButton {...getTriggerProps()} isOpen={isOpen} iconLeft={<Icon icon="more" fontSize="1rem" />}>
                More
              </NavDropdownButton>
            )}
          </Menu.Trigger>
          <Menu.Popover yOffset={12}>
            <Menu.List>
              {mainNavigationsProps.slice(4).map((navItemProps) => {
                return <Menu.Item key={navItemProps['children'] as string} {...navItemProps} />
              })}
            </Menu.List>
          </Menu.Popover>
        </Menu>
      </ContainerQuery>
    </ButtonGroup>
  )
}

interface TopBarSecondaryNavigationsProps {
  secondaryNavigationsProps: NavIconItemProps[]
}

export const SecondaryNavigations: FC<TopBarSecondaryNavigationsProps> = ({ secondaryNavigationsProps }) => {
  return (
    <>
      <ButtonGroup>
        {secondaryNavigationsProps?.map((secondaryNavItemProps) => {
          return <NavIconItem key={secondaryNavItemProps['aria-label']} {...secondaryNavItemProps} />
        })}
      </ButtonGroup>

      <ElTopBarMenuButtonContainer>
        <NavIconItem aria-label="Open Navigation Menu" icon={<MenuIcon />} />
      </ElTopBarMenuButtonContainer>
    </>
  )
}
