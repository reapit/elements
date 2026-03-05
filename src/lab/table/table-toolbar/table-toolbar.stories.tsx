import { Meta } from '@storybook/react-vite'
import { TableToolbar } from './table-toolbar.js'
import { Button } from '#src/core/button/button'
import { DeprecatedMenu } from '#src/deprecated/menu'
import { DeprecatedMenuPopover, DeprecatedMenuTrigger } from '#src/deprecated/menu/menu-popover'
import { DeprecatedMenuItemGroup, DeprecatedMenuList } from '#src/deprecated/menu/menu.atoms'
import { ButtonGroup } from '#src/core/button-group/button-group'
import { Skeleton } from '#src/core/skeleton/skeleton'
import { DeprecatedMenuItem } from '#src/deprecated/menu/menu.molecules'
import { ChevronDownIcon } from '#src/icons/chevron-down'
import { MoreIcon } from '#src/icons/more'

const meta: Meta<typeof TableToolbar> = {
  title: 'Lab/TableToolbar',
  component: TableToolbar,
}

export default meta

/** A simple toolbar for tables.
 * When no items are selected, it displays the total item count and default actions.
 */

export const BasicUsage = {
  render: ({}) => (
    <TableToolbar
      description="125 Properties"
      actions={
        <DeprecatedMenu>
          <DeprecatedMenuTrigger>
            {({ getTriggerProps }) => (
              <Button variant="tertiary" size="small" {...getTriggerProps()} iconRight={<ChevronDownIcon size="sm" />}>
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
  ),
}

/**
 * In tables with batch actions, when one or more items have been selected,
 * the toolbar changes to display the number of selected items and the available actions
 */
export const WithBulkActions = {
  render: ({}) => (
    <TableToolbar
      description="5 of 125 selected"
      actions={
        <ButtonGroup>
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
          <Button size="small">Button 3</Button>
          <DeprecatedMenu>
            <DeprecatedMenuTrigger>
              {({ getTriggerProps }) => (
                <Button {...getTriggerProps()} size="small" iconRight={<MoreIcon size="sm" />} />
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
        </ButtonGroup>
      }
    />
  ),
}

/** Skeleton state for the table toolbar
 * To display until the data is retrieved and rendered in tabel
 */

export const ToolbarSkeleton = {
  render: ({}) => (
    <TableToolbar
      description={<Skeleton height="1rem" width="10rem" />}
      actions={
        <DeprecatedMenu>
          <DeprecatedMenuTrigger>
            {({ getTriggerProps }) => (
              <Button variant="tertiary" size="small" {...getTriggerProps()} iconRight={<ChevronDownIcon size="sm" />}>
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
  ),
}
