import { cx } from '@linaria/core'
import { Avatar } from '../../avatar/avatar'
import { elTopBarAvatarButton } from './styles'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface AvatarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The accessible name of the button. */
  'aria-label'?: string
  /** The avatar's text. Typically the initials of the current user. */
  children: ReactNode
}

/**
 * A simple avatar button that should open a menu with items that relate to the current user. These menu items will
 * typically include the ability to manage their Reapit Connect user account, preferences, and logout of their
 * current session.
 *
 * Typically, `TopBar.AvatarMenu` will be used as it combines `TopBar.AvatarButton` and `Menu` together.
 */
export function TopBarAvatarButton({
  'aria-label': ariaLabel = 'Profile menu',
  children,
  className,
  ...rest
}: AvatarButtonProps) {
  return (
    <button {...rest} aria-label={ariaLabel} className={cx(elTopBarAvatarButton, className)}>
      <Avatar size="small" shape="circle" colour="purple">
        {children}
      </Avatar>
    </button>
  )
}
