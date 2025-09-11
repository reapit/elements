import { SearchIcon } from '#src/icons/search'
import { TopBarNavIconItemBase } from '../nav-icon-item'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

export namespace TopBarNavSearchIconItem {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** A click handler that launches the product's search experience. */
    onClick: MouseEventHandler<HTMLButtonElement>
  }
}

/**
 * A `NavIconItem` button used to launch the search experience for a product on mobile devices. It is designed
 * for use on mobile devices. For tablet devices and wider, `TopBar.NavSearchButton` should be used instead.
 */
export function TopBarNavSearchIconItem({ 'aria-label': ariaLabel, ...rest }: TopBarNavSearchIconItem.Props) {
  return <TopBarNavIconItemBase {...rest} aria-label={ariaLabel ?? 'Search'} as="button" icon={<SearchIcon />} />
}
