import { Meta } from '@storybook/react-vite'
import { TableContainer } from './table-container'
import { TableToolbar } from '../table-toolbar'
import { DeprecatedMenu, DeprecatedMenuItem, DeprecatedMenuItemGroup, DeprecatedMenuList } from '#src/deprecated/menu'
import { DeprecatedMenuPopover, DeprecatedMenuTrigger } from '#src/deprecated/menu/menu-popover'
import { Button } from '#src/core/button'
import { ChevronDownIcon } from '#src/icons/chevron-down'

const meta: Meta<typeof TableContainer> = {
  title: 'Lab/TableContainer',
  component: TableContainer,
}

export default meta

export const BasicUsage = {
  render: ({}) => (
    <TableContainer>
      <TableToolbar
        description="125 Properties"
        actions={
          <DeprecatedMenu>
            <DeprecatedMenuTrigger>
              {({ getTriggerProps }) => (
                <Button
                  variant="tertiary"
                  size="small"
                  {...getTriggerProps()}
                  iconRight={<ChevronDownIcon size="sm" />}
                >
                  Page size: 25
                </Button>
              )}
            </DeprecatedMenuTrigger>
            <DeprecatedMenuPopover>
              <DeprecatedMenuList>
                <DeprecatedMenuItemGroup>
                  <DeprecatedMenuItem label="25" />
                  <DeprecatedMenuItem label="50" />
                  <DeprecatedMenuItem label="100" />
                </DeprecatedMenuItemGroup>
              </DeprecatedMenuList>
            </DeprecatedMenuPopover>
          </DeprecatedMenu>
        }
      />
    </TableContainer>
  ),
}
