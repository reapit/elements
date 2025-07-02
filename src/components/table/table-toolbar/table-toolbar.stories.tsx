import { Meta } from '@storybook/react-vite'
// import { figmaDesignUrls } from '../../storybook/figma'
import { TableToolbar } from './table-toolbar.js'
import { DeprecatedButton } from '#src/components/deprecated-button/button'
import { DeprecatedIcon } from '#src/components/deprecated-icon/icon-component'
import { Menu } from '#src/components/menu/menu'
import { MenuPopover, MenuTrigger } from '#src/components/menu/menu-popover'
import { MenuItemGroup, MenuList } from '#src/components/menu/menu.atoms'
import { ButtonGroup } from '#src/components/button-group/button-group'
import { Skeleton } from '#src/components/skeleton/skeleton'
import { MenuItem } from '../../menu/menu.molecules.js'

const meta: Meta<typeof TableToolbar> = {
  title: 'Components/TableToolbar',
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
        <Menu>
          <MenuTrigger>
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
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemGroup>
                <MenuItem label="25" />
                <MenuItem label="50" />
                <MenuItem label="100" />
              </MenuItemGroup>
            </MenuList>
          </MenuPopover>
        </Menu>
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
          <Menu>
            <MenuTrigger>
              {({ getTriggerProps }) => (
                <DeprecatedButton
                  {...getTriggerProps()}
                  size="small"
                  iconRight={<DeprecatedIcon icon="more" fontSize="1rem" />}
                />
              )}
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItemGroup>
                  <MenuItem label="25" />
                  <MenuItem label="50" />
                  <MenuItem label="100" />
                </MenuItemGroup>
              </MenuList>
            </MenuPopover>
          </Menu>
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
        <Menu>
          <MenuTrigger>
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
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemGroup>
                <MenuItem label="25" />
                <MenuItem label="50" />
                <MenuItem label="100" />
              </MenuItemGroup>
            </MenuList>
          </MenuPopover>
        </Menu>
      }
    />
  ),
}
