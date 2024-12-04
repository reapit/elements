import { render } from '@testing-library/react'
import { TableToolbar } from '../index'
import { Menu } from '#src/components/menu/menu'
import { MenuPopover, MenuTrigger } from '#src/components/menu/menu-popover'
import { Button } from '#src/components/button/button'
import { Icon } from '#src/components/icon/icon-component'
import { MenuItem, MenuItemGroup, MenuList } from '#src/components/menu/menu.atoms'
import { ButtonGroup } from '#src/components/button-group/button-group'

describe('Table Toolbar', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <TableToolbar
        description="125 Properties"
        actions={
          <Menu>
            <MenuTrigger>
              {({ getTriggerProps }) => (
                // To do: Once Button component is update with more props for no-padding, please make updates here
                <Button
                  variant="tertiary"
                  size="small"
                  {...getTriggerProps()}
                  iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
                >
                  Page size: 25
                </Button>
              )}
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItemGroup>
                  <MenuItem>25</MenuItem>
                  <MenuItem>50</MenuItem>
                  <MenuItem>100</MenuItem>
                </MenuItemGroup>
              </MenuList>
            </MenuPopover>
          </Menu>
        }
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with bulk actions', () => {
    const { asFragment } = render(
      <TableToolbar
        description="5 of 125 selected"
        actions={
          <ButtonGroup>
            <Button size="small">Button 1</Button>
            <Button size="small">Button 2</Button>
            <Button size="small">Button 3</Button>
            <Menu>
              <MenuTrigger>
                {({ getTriggerProps }) => (
                  <Button {...getTriggerProps()} size="small" iconRight={<Icon icon="more" fontSize="1rem" />} />
                )}
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItemGroup>
                    <MenuItem>25</MenuItem>
                    <MenuItem>50</MenuItem>
                    <MenuItem>100</MenuItem>
                  </MenuItemGroup>
                </MenuList>
              </MenuPopover>
            </Menu>
          </ButtonGroup>
        }
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
