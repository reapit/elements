import { render } from '@testing-library/react'
import { TableContainer } from '../index'
import { TableToolbar } from '../../tableToolbar'
import { Menu } from '#src/components/menu/menu'
import { MenuPopover, MenuTrigger } from '#src/components/menu/menu-popover'
import { Button } from '#src/components/button/button'
import { Icon } from '#src/components/icon/icon-component'
import { MenuItem, MenuItemGroup, MenuList } from '#src/components/menu/menu.atoms'

describe('Table Container', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <TableContainer>
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
        />
      </TableContainer>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
