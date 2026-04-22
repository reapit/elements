import preview from '#.storybook/preview'
import { EmptyData } from './empty-data'

const meta = preview.meta({
  title: 'Core/EmptyData',
  component: EmptyData,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Action only', 'Short description', 'Full description', 'Everything'],
      mapping: {
        'Action only': <EmptyData.ActionButton>Add item</EmptyData.ActionButton>,
        'Short description': <EmptyData.Description>No items found</EmptyData.Description>,
        'Full description': (
          <EmptyData.Description secondaryText="Secondary text">No items found</EmptyData.Description>
        ),
        Everything: (
          <>
            <EmptyData.Description secondaryText="Secondary text">No items found</EmptyData.Description>
            <EmptyData.ActionButton>Add item</EmptyData.ActionButton>
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
