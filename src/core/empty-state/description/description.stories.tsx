import preview from '#.storybook/preview'
import { EmptyState } from '../empty-state'

const meta = preview.meta({
  title: 'Core/EmptyState/Description',
  component: EmptyState.Description,
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
