import { Avatar } from '../../avatar/avatar'
import { ElTopBarAvatarButton } from './styles'

import type { ComponentProps, ReactNode } from 'react'

export interface AvatarButtonProps extends ComponentProps<typeof ElTopBarAvatarButton> {
  /** The accessible name of the button. */
  'aria-label'?: string
  /** The avatar's text. Typically the initials of the current user. */
  children: ReactNode
}

/**
 * A simple avatar button that should open a menu with items that relate to the current user. These menu items will
 * typically include the ability to manage their Reapit Connect user account, preferences, and logout of their
 * current session.
 */
export function TopBarAvatarButton({ 'aria-label': ariaLabel = 'Profile menu', children, ...rest }: AvatarButtonProps) {
  return (
    <ElTopBarAvatarButton {...rest} aria-label={ariaLabel}>
      <Avatar size="small" shape="circle" colour="purple">
        {children}
      </Avatar>
    </ElTopBarAvatarButton>
  )
}
