import preview from '#.storybook/preview'
import { EmptyStateDescription } from './description'

const meta = preview.meta({
  title: 'Core/EmptyState/Description',
  component: EmptyStateDescription,
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
