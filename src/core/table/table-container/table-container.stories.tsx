import { Meta } from '@storybook/react-vite'
// import { figmaDesignUrls } from '../../storybook/figma'
import { TableContainer } from './table-container'
import { TableToolbar } from '../table-toolbar'
import { Menu, MenuItem, MenuItemGroup, MenuList } from '../../menu'
import { MenuPopover, MenuTrigger } from '#src/core/menu/menu-popover'
import { DeprecatedButton } from '../../../deprecated/button'
import { DeprecatedIcon } from '../../../deprecated/icon'

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
    </TableContainer>
  ),
}
