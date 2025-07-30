import { Badge } from '#src/core/badge'
import { MenuGroup } from './group'
import { AnchorMenuItem, MenuItem } from '../item'
import { StarIcon } from '#src/icons/star'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/Menu/Group',
  component: MenuGroup,
  argTypes: {
    children: {
      control: 'select',
      options: ['Simple', 'Fancy'],
      mapping: {
        Simple: (
          <>
            <AnchorMenuItem href={href}>Item 1</AnchorMenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </>
        ),
        Fancy: (
          <>
            <AnchorMenuItem
              badge={
                <Badge colour="success" variant="reversed">
                  Badge
                </Badge>
              }
              href={href}
              iconLeft={<StarIcon />}
              supplementaryInfo="Supplementary info"
            >
              Item 1
            </AnchorMenuItem>
            <MenuItem
              iconLeft={<StarIcon />}
              badge={
                <Badge colour="success" variant="reversed">
                  Badge
                </Badge>
              }
              supplementaryInfo="Supplementary info"
            >
              Item 2
            </MenuItem>
            <MenuItem
              iconLeft={<StarIcon />}
              badge={
                <Badge colour="success" variant="reversed">
                  Badge
                </Badge>
              }
              supplementaryInfo="Supplementary info"
            >
              Item 3
            </MenuItem>
          </>
        ),
      },
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof MenuGroup>

export default meta

type Story = StoryObj<typeof meta>

/**
 * A basic menu group with interactive menu items. Use `MenuItem` for menu items that perform
 * actions when clicked.
 */
export const Example: Story = {
  args: {
    children: 'Simple',
    label: 'Actions',
  },
}

/**
 * Menu groups can be created without a label.
 */
export const NoLabel: Story = {
  args: {
    ...Example.args,
    label: null,
  },
}

/**
 * Menu groups should generally have short and concise labels, but the text will flow to multiple lines
 * if it cannot fit in the available space.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    label: "This is a long group title that won't fit on one line",
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '277px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * The menu group label will remain sticky positioned if the parent container scrolls.
 */
export const StickyPositioning: Story = {
  args: {
    ...Example.args,
    children: 'Fancy',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', maxHeight: '100px', overflow: 'auto' }}>
        <Story />
      </div>
    ),
  ],
}
