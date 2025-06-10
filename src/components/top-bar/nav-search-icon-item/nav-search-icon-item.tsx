import { Icon } from '../../icon'
import { TopBarNavIconItem } from '../nav-icon-item'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

export interface TopBarNavSearchIconItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * A click handler that launches the product's search experience.
   */
  onClick: MouseEventHandler<HTMLButtonElement>
}

/**
 * A `NavIconItem` button used to launch the search experience for a product on mobile devices. It is designed
 * for use on mobile devices. For tablet devices and wider, `TopBar.NavSearchButton` should be used instead.
 */
export function TopBarNavSearchIconItem({ 'aria-label': ariaLabel, onClick, ...rest }: TopBarNavSearchIconItemProps) {
  return (
    <TopBarNavIconItem
      {...rest}
      aria-label={ariaLabel ?? 'Search'}
      as="button"
      icon={<Icon icon="search" />}
      onClick={onClick}
      type="button"
    />
  )
}
