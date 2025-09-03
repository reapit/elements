import { ButtonGroup } from '#src/core/button-group'
import { Button } from '#src/core/button'
import { CompactSelectNative } from '#src/core/compact-select-native'
import { Skeleton } from '#src/core/skeleton'
import { TableToolbar } from './toolbar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Table/Toolbar',
  component: TableToolbar,
  argTypes: {
    leftContent: {
      control: 'radio',
      options: ['Item count', 'Selection count', 'Skeleton'],
      mapping: {
        'Item count': '251 properties',
        'Selection count': '10 of 251 selected',
        Skeleton: <Skeleton width="100px" />,
      },
    },
    rightContent: {
      control: 'radio',
      options: ['Page size', 'Batch actions'],
      mapping: {
        'Page size': (
          <CompactSelectNative aria-label="Page size" size="small">
            <option value="25">Page size: 25</option>
            <option value="50">Page size: 50</option>
            <option value="100">Page size: 100</option>
          </CompactSelectNative>
        ),
        'Batch actions': (
          <ButtonGroup>
            <Button size="small" variant="secondary">
              Action 1
            </Button>
            <Button size="small" variant="secondary">
              Action 2
            </Button>
            <Button size="small" variant="secondary">
              Action 3
            </Button>
          </ButtonGroup>
        ),
      },
    },
  },
  globals: {
    backgrounds: 'light',
  },
} satisfies Meta<typeof TableToolbar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * By default, the toolbar is used to display the number of items in the result set being displayed by
 * the table, as well as a page size control that can be used to change the number of items displayed
 * per page.
 *
 * Importantly, when the page size is changed by the user, their selection should become the default
 * page size used by all other tables in the product.
 */
export const Example: Story = {
  args: {
    leftContent: 'Item count',
    rightContent: 'Page size',
  },
}

/**
 * Correctly formatting the item count information requires some care because languages have different
 * patterns for expressing plural numbers (cardinal numbers). For example, English has two forms for
 * cardinal numbers: one for the singular "item" (1 dog, 1 fish, 1 property) and the other for zero
 * or any other number of "items" (0 contacts, 10 inspections, 100 fish).
 *
 * Browser's provide the [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)
 * API to help with this, especially when needing to support multiple languages/locales. This example shows
 * how this API can be used in a simplistic manner (i.e., English-only).
 */
export const PluralNouns: Story = {
  name: 'Plural nouns',
  parameters: { docs: { source: { type: 'code' } } },
  render: () => {
    const itemCount = 10
    const pluralRules = new Intl.PluralRules('en')
    const nounMap = {
      one: 'lemming',
      other: 'lemmings',
    }
    const noun = nounMap[pluralRules.select(itemCount)]
    return <TableToolbar leftContent={`${itemCount} ${noun}`} />
  },
}

/**
 * For tables that support bulk actions (actions performed on multiple items), when the user selects one
 * or more rows, the toolbar should be used to display the number of selected items as well as all the
 * bulk actions available.
 */
export const SelectionCount: Story = {
  args: {
    ...Example.args,
    leftContent: 'Selection count',
    rightContent: 'Batch actions',
  },
}

/**
 * In some rare cases, the toolbar may only need to display the item count.
 */
export const LeftContentOnly: Story = {
  name: 'Left content only',
  args: {
    ...Example.args,
    rightContent: null,
  },
}

/**
 * In other rare cases, the toolbar may only need to display some controls or actions.
 */
export const RightContentOnly: Story = {
  name: 'Right content only',
  args: {
    ...Example.args,
    leftContent: null,
  },
}

/**
 * When the table data is still loading when the toolbar is displayed, a skeleton can be used in place of
 * the item count. Generally, the page size control should be available even when data is loading so that
 * users can interact with it immediately.
 */
export const Loading: Story = {
  args: {
    ...Example.args,
    leftContent: 'Skeleton',
  },
}
