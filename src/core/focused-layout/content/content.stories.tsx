import preview from '#.storybook/preview'
import { Pattern } from '#src/core/drawer/__story__/Pattern'
import { FocusedLayout } from '../focused-layout'
import { FocusedLayoutContent } from './content'

const meta = preview.meta({
  title: 'Core/FocusedLayout/Content',
  component: FocusedLayoutContent,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <FocusedLayout>
        <Story />
      </FocusedLayout>
    ),
  ],
})

/**
 * The content area is where the main page content is placed. It has responsive padding
 * that adjusts based on the container width:
 * - XS: 20px padding
 * - SM: 24px vertical, 32px horizontal
 * - MD+: 32px vertical, 40px horizontal
 */
export const Example = meta.story({
  args: {
    children: <Pattern height="100px" />,
  },
})
