import preview from '#.storybook/preview'
import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { SearchInput } from '#src/core/search-input'
import { FilterBar } from '../filter-bar'
import { FilterIcon } from '#src/icons/filter'

const meta = preview.meta({
  title: 'Core/FilterBar/LeftContent',
  component: FilterBar.LeftContent,
  argTypes: {
    children: {
      control: 'radio',
      defaultValue: 'Button',
      options: ['Search', 'Button', 'Both'],
      mapping: {
        Search: <SearchInput aria-label="Search" placeholder="Search" size="small" />,
        Button: (
          <Button iconLeft={<FilterIcon />} size="small" variant="secondary">
            Filters
          </Button>
        ),
        Both: (
          <>
            <SearchInput aria-label="Search" placeholder="Search" size="small" />
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
