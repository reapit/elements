import { Meta } from '@storybook/react'
// import { figmaDesignUrls } from '../../storybook/figma'
import { TableContainer } from './tableContainer'
import { TableToolbar } from '../tableToolbar'
import { Menu, MenuItem, MenuItemGroup, MenuList } from '../../menu'
import { MenuPopover, MenuTrigger } from '#src/components/menu/menu-popover'
import { Button } from '../../button'
import { Icon } from '../../icon'

const meta: Meta<typeof TableContainer> = {
  title: 'Components/TableContainer',
  component: TableContainer,
}

export default meta

export const BasicUsage = {
  render: ({}) => (
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
    </TableContainer>
  ),
}
