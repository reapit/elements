import preview from '#.storybook/preview'
import { Breadcrumbs } from '../breadcrumbs'

const href = '#'

const meta = preview.meta({
  title: 'Navigation/Breadcrumbs/Item',
  component: Breadcrumbs.Item,
  argTypes: {
    children: {
      control: false,
    },
  },
})

export const Example = meta.story({
  args: {
    children: <Breadcrumbs.Link href={href}>Properties</Breadcrumbs.Link>,
  },
})

/**
 * When there are multiple sibling items, the separator will be displayed by all except the last item.
 */
export const Separator = meta.story({
  args: {
    children: <Breadcrumbs.Link href={href}>Residential</Breadcrumbs.Link>,
  },
  decorators: [
    (Story) => (
      <ul style={{ listStyle: 'none', display: 'inline-flex', margin: 0, padding: 0, width: 'fit-content' }}>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href={href}>Properties</Breadcrumbs.Link>
        </Breadcrumbs.Item>
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
    children: <Breadcrumbs.Link href={href}>Long breadcrumb link</Breadcrumbs.Link>,
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '100px' }}>
        <Story />
      </div>
    ),
  ],
})
