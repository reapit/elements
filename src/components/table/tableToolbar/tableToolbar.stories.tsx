import { Meta } from '@storybook/react'
// import { figmaDesignUrls } from '../../storybook/figma'
import { Skeleton, TableToolbar } from './tableToolbar.js'
import { Button } from '#src/components/button/button'
import { Icon } from '#src/components/icon/icon-component'
import { Menu } from '#src/components/menu/menu'
import { MenuPopover, MenuTrigger } from '#src/components/menu/menu-popover'
import { MenuItem, MenuItemGroup, MenuList } from '#src/components/menu/menu.atoms'
import { ButtonGroup } from '#src/components/button-group/button-group'

const meta: Meta<typeof TableToolbar> = {
  title: 'Components/TableToolbar',
  component: TableToolbar,
}

export default meta

export const StylesOnlyUsage = {
  render: ({}) => (
    <TableToolbar
      description="125 Properties"
      actions={
        // <Button variant="tertiary" iconRight={<Icon icon="chevronDown" fontSize="1rem" />}>
        //   Page size: 25
        // </Button>
        <Menu>
          <MenuTrigger>
            {({ getTriggerProps }) => (
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
  ),
  parameters: {
    docs: {
      canvas: {
        className: 'greyBackground',
      },
    },
  },
}

export const WithBulkActions = {
  render: ({}) => (
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
    />
  ),
}

export const SkeletonDummy = {
  render: ({}) => (
    <TableToolbar
      description={<Skeleton height="34px" width="200px" />}
      actions={
        <ButtonGroup>
          <Skeleton height="34px" width="90px" />
          <Skeleton height="34px" width="90px" />
        </ButtonGroup>
      }
    />
  ),
}
