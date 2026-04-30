import preview from '#.storybook/preview'
import { EmptyState } from './empty-state'

const meta = preview.meta({
  title: 'Core/EmptyState',
  component: EmptyState,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Action only', 'Short description', 'Full description', 'Everything'],
      mapping: {
        'Action only': <EmptyState.ActionButton>Add item</EmptyState.ActionButton>,
        'Short description': <EmptyState.Description>No items found</EmptyState.Description>,
        'Full description': (
          <EmptyState.Description secondaryText="Secondary text">No items found</EmptyState.Description>
        ),
        Everything: (
          <>
            <EmptyState.Description secondaryText="Secondary text">No items found</EmptyState.Description>
            <EmptyState.ActionButton>Add item</EmptyState.ActionButton>
          </>
        ),
      },
    },
    height: {
      control: 'text',
      table: {
        type: {
          summary: '--size-*',
        },
      },
    },
  },
})

export const Example = meta.story({
  args: {
    children: 'Everything',
  },
})

/**
 * The element's width will fill the space provided by its parent container.
 */
export const FluidWidth = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '400px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * By default, the height of the element will be determined by it's content. In some cases, this
 * may be smaller than desired, so a fixed height (using one of the `--size-*` tokens) can be applied.
 */
export const FixedHeight = Example.extend({
  args: {
    height: '--size-80',
  },
})
