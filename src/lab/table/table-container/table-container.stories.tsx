import { Meta } from '@storybook/react-vite'
// import { figmaDesignUrls } from '../../storybook/figma'
import { TableContainer } from './table-container'
import { TableToolbar } from '../table-toolbar'
import { DeprecatedMenu, DeprecatedMenuItem, DeprecatedMenuItemGroup, DeprecatedMenuList } from '#src/deprecated/menu'
import { DeprecatedMenuPopover, DeprecatedMenuTrigger } from '#src/deprecated/menu/menu-popover'
import { DeprecatedButton } from '#src/deprecated/button'
import { DeprecatedIcon } from '#src/deprecated/icon'

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
    </TableContainer>
  ),
}
