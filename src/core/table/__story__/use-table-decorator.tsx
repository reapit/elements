import { buildTableWrapper } from './table-wrapper'

import type { ChildPlacement } from './table-wrapper'
import type { Decorator } from '@storybook/react-vite'

type StoryPlacement = ChildPlacement

/** Simple story decorator that renders the story in a valid table DOM hierarchy */
export function useTableDecorator(placement: StoryPlacement): Decorator {
  const TableWrapper = buildTableWrapper(placement)
  return (Story) => {
    return (
      <TableWrapper>
        <Story />
      </TableWrapper>
    )
  }
}
