import { Meta } from '@storybook/react-vite'
// import { figmaDesignUrls } from '../../storybook/figma'
import { TableToolbar } from './table-toolbar.js'
import { DeprecatedButton } from '#src/deprecated/button/button'
import { DeprecatedIcon } from '#src/deprecated/icon/icon-component'
import { DeprecatedMenu } from '#src/deprecated/menu'
import { DeprecatedMenuPopover, DeprecatedMenuTrigger } from '#src/deprecated/menu/menu-popover'
import { DeprecatedMenuItemGroup, DeprecatedMenuList } from '#src/deprecated/menu/menu.atoms'
import { ButtonGroup } from '#src/core/button-group/button-group'
import { Skeleton } from '#src/core/skeleton/skeleton'
import { DeprecatedMenuItem } from '#src/deprecated/menu/menu.molecules'

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
              // To do: Once Button component is update with more props for no-padding, please make updates here
              <DeprecatedButton
                variant="tertiary"
                size="small"
                {...getTriggerProps()}
                iconRight={<DeprecatedIcon icon="chevronDown" fontSize="1rem" />}
              >
                Page size: 25
              </DeprecatedButton>
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
          <DeprecatedButton size="small">Button 1</DeprecatedButton>
          <DeprecatedButton size="small">Button 2</DeprecatedButton>
          <DeprecatedButton size="small">Button 3</DeprecatedButton>
          <DeprecatedMenu>
            <DeprecatedMenuTrigger>
              {({ getTriggerProps }) => (
                <DeprecatedButton
                  {...getTriggerProps()}
                  size="small"
                  iconRight={<DeprecatedIcon icon="more" fontSize="1rem" />}
                />
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
              // To do: Once Button component is update with more props for no-padding, please make updates here
              <DeprecatedButton
                variant="tertiary"
                size="small"
                {...getTriggerProps()}
                iconRight={<DeprecatedIcon icon="chevronDown" fontSize="1rem" />}
              >
                Page size: 25
              </DeprecatedButton>
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
