import preview from '#.storybook/preview'
import { BreadcrumbItem } from './item'
import { BreadcrumbLink } from '../link'

const href = '#'

const meta = preview.meta({
  title: 'Core/Breadcrumbs/Item',
  component: BreadcrumbItem,
  argTypes: {
    children: {
      control: false,
    },
  },
})

export const Example = meta.story({
  args: {
    children: <BreadcrumbLink href={href}>Properties</BreadcrumbLink>,
  },
})

/**
 * When there are multiple sibling items, the separator will be displayed by all except the last item.
 */
export const Separator = meta.story({
  args: {
    children: <BreadcrumbLink href={href}>Residential</BreadcrumbLink>,
  },
  decorators: [
    (Story) => (
      <ul style={{ listStyle: 'none', display: 'inline-flex', margin: 0, padding: 0, width: 'fit-content' }}>
        <BreadcrumbItem>
          <BreadcrumbLink href={href}>Properties</BreadcrumbLink>
        </BreadcrumbItem>
        <Story />
      </ul>
    ),
  ],
})

/**
 * Overflow should be avoided as much as possible. When space becomes limited, an item's text will truncate
 * with ellipses. Though not demonstrated here, the breadcrumb separators remain fully visible.
 */
export const Overflow = meta.story({
  args: {
    children: <BreadcrumbLink href={href}>Long breadcrumb link</BreadcrumbLink>,
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '100px' }}>
        <Story />
      </div>
    ),
  ],
})
