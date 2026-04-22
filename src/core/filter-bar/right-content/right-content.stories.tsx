import preview from '#.storybook/preview'
import { Button } from '#src/core/button'
import { FilterBarRightContent } from './right-content'

const meta = preview.meta({
  title: 'Core/FilterBar/RightContent',
  component: FilterBarRightContent,
  argTypes: {
    children: {
      control: 'radio',
      defaultValue: 'Few Filters',
      // TODO: Update to demo Chip Select and Switch when available.
      options: ['Button'],
      mapping: {
        Button: (
          <Button size="small" variant="secondary">
            Button
          </Button>
        ),
      },
    },
  },
})

export const Example = meta.story({
  args: {
    children: 'Button',
  },
})
