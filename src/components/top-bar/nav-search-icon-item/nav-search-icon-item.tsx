import { Icon } from '../../icon'
import { NavIconItem } from '../../nav-icon-item'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

export interface NavSearchIconItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * A click handler that launches the product's search experience.
   */
  onClick: MouseEventHandler<HTMLButtonElement>
}

/**
 * A `NavIconItem` button used to launch the search experience for a product on mobile devices. It is designed
 * for use on mobile devices. For tablet devices and wider, `TopBar.NavSearchButton` should be used instead.
 */
export function NavSearchIconItem({ 'aria-label': ariaLabel, onClick, ...rest }: NavSearchIconItemProps) {
  return (
    <NavIconItem
      {...rest}
      aria-label={ariaLabel ?? 'Search'}
      icon={<Icon icon="search" />}
      onClick={onClick}
      type="button"
    />
  )
}
