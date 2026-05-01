import preview from '#.storybook/preview'
import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { FilterBar } from '../filter-bar'
import { FilterIcon } from '#src/icons/filter'

const meta = preview.meta({
  title: 'Core/FilterBar/LeftContent',
  component: FilterBar.LeftContent,
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
})

export const Example = meta.story({
  args: {
    children: 'Button',
  },
})
