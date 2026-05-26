import preview from '#.storybook/preview'
import { Divider } from './divider'

const meta = preview.meta({
  title: 'Core/Divider',
  component: Divider,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', placeItems: 'center', placeContent: 'center', height: '100px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * By default, dividers will use a solid horizontal line.
 */
export const Example = meta.story({
  args: {
    'aria-orientation': 'horizontal',
    variant: 'solid',
  },
})

/**
 * The `variant` prop can be used to change the style of the divider.
 * Only `solid` and `dashed` are currently supported.
 */
export const Variant = Example.extend({
  args: {
    variant: 'dashed',
  },
})

/**
 * The `aria-orientation` prop can be used to change the orientation of the divider.
 * Only `horizontal` and `vertical` are currently supported.
 */
export const Orientation = Example.extend({
  args: {
    'aria-orientation': 'vertical',
  },
})
