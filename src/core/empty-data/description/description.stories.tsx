import preview from '#.storybook/preview'
import { EmptyDataDescription } from './description'

const meta = preview.meta({
  title: 'Core/EmptyData/Description',
  component: EmptyDataDescription,
  argTypes: {
    children: {
      control: 'text',
    },
    secondaryText: {
      control: 'text',
    },
  },
})

/**
 *
 */
export const Example = meta.story({
  args: {
    children: 'No things found',
    secondaryText: 'Secondary text',
  },
})
