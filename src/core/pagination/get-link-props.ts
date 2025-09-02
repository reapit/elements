import { getARIALabel } from './get-aria-label'
import { isTerminalPage } from './is-terminal-page'

interface GetLinkPropsResult {
  'aria-disabled': boolean
  'aria-label': string
  variant: 'next-page' | 'previous-page'
}

/**
 * Returns ARIA attributes for both `Pagination.Link` and `Pagination.LinkButton` components.
 * The supplied `variant` is also passed through in the result.
 */
export function getLinkProps(
  variant: 'next-page' | 'previous-page',
  pageNumber: number,
  pageCount: number,
): GetLinkPropsResult {
  return {
    'aria-disabled': isTerminalPage(variant, pageNumber, pageCount),
    'aria-label': getARIALabel(variant, pageNumber, pageCount),
    variant,
  }
}
