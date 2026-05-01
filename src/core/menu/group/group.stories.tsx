import preview from '#.storybook/preview'
import { Badge } from '#src/core/badge'
import { Menu } from '../menu'
import { StarIcon } from '#src/icons/star'

const href = '#'

const meta = preview.meta({
  title: 'Core/Menu/Group',
  component: Menu.Group,
  argTypes: {
    children: {
      control: 'select',
      options: ['Simple', 'Fancy'],
      mapping: {
        Simple: (
          <>
            <Menu.AnchorItem href={href}>Item 1</Menu.AnchorItem>
            <Menu.Item>Item 2</Menu.Item>
            <Menu.Item>Item 3</Menu.Item>
          </>
        ),
        Fancy: (
          <>
            <Menu.AnchorItem
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
            </Menu.AnchorItem>
            <Menu.Item
              iconLeft={<StarIcon />}
              badge={
                <Badge colour="success" variant="reversed">
                  Badge
                </Badge>
              }
              supplementaryInfo="Supplementary info"
            >
              Item 2
            </Menu.Item>
            <Menu.Item
              iconLeft={<StarIcon />}
              badge={
                <Badge colour="success" variant="reversed">
                  Badge
                </Badge>
              }
              supplementaryInfo="Supplementary info"
            >
              Item 3
            </Menu.Item>
          </>
        ),
      },
    },
    label: {
      control: 'text',
    },
  },
})

/**
 * A basic menu group with interactive menu items. Use `Menu.Item` for menu items that perform
 * actions when clicked.
 */
export const Example = meta.story({
  args: {
    children: 'Simple',
    label: 'Actions',
  },
})

/**
 * Menu groups can be created without a label.
 */
export const NoLabel = Example.extend({
  args: {
    label: null,
  },
})

/**
 * Menu groups should generally have short and concise labels, but the text will flow to multiple lines
 * if it cannot fit in the available space.
 */
export const Overflow = Example.extend({
  args: {
    label: "This is a long group title that won't fit on one line",
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '277px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * The menu group label will remain sticky positioned if the parent container scrolls.
 */
export const StickyPositioning = Example.extend({
  args: {
    children: 'Fancy',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', maxHeight: '100px', overflow: 'auto' }}>
        <Story />
      </div>
    ),
  ],
})
