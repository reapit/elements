export type SortDirection = 'ascending' | 'descending' | 'none'

/**
 * Parses an unknown value into a valid sort direction. Values that are not valid sort directions
 * will return the default of "none", meaning no sort direction is specified.
 */
export function parseSortDirection(value: unknown): SortDirection {
  switch (value) {
    case 'ascending':
    case 'descending':
      return value
    default:
      return 'none'
  }
}

/**
 * Given the current sort direction, if any, determines what the next sort direction will be if the
 * column sort is changed. The behaviour of column sort directions is described by the
 * following simple state machine:
 *
 * ```
 * No sort ──► Descending sort ◄─────┐
 *             └──────► Ascending sort
 * ```
 *
 * If the current sort direction is not valid, it will be treated as "none", which means the next
 * sort direction will be "descending".
 */
export function getNextSortDirection(value: unknown): SortDirection {
  const currentDirection = parseSortDirection(value)

  switch (currentDirection) {
    case 'ascending':
      return 'descending'
    case 'descending':
      return 'ascending'
    case 'none':
      return 'descending'
  }
}
