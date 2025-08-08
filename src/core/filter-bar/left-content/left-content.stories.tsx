import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { FilterBarLeftContent } from './left-content'
import { FilterIcon } from '#src/icons/filter'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/FilterBar/LeftContent',
  component: FilterBarLeftContent,
  argTypes: {
    children: {
      control: 'radio',
      defaultValue: 'Few Filters',
      options: ['Search', 'Button', 'Both'],
      mapping: {
        // TODO: Update to use new core input when available.
        Search: <input type="search" placeholder="Search" />,
        Button: (
          <Button iconLeft={<FilterIcon />} size="small" variant="secondary">
            Filters
          </Button>
        ),
        Both: (
          <>
            <input type="search" placeholder="Search" />
            <ButtonGroup>
              <Button iconLeft={<FilterIcon />} size="small" variant="secondary">
                Filters
              </Button>
              <Button size="small" variant="secondary">
                Something else
              </Button>
            </ButtonGroup>
          </>
        ),
      },
    },
  },
} satisfies Meta<typeof FilterBarLeftContent>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Button',
  },
}
