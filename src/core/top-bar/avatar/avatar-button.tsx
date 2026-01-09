import { TopBarAvatarBase } from './avatar-base'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

export namespace TopBarAvatarButton {
  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** The accessible name of the button. */
    'aria-label'?: string
    /** The avatar's text. Typically the initials of the current user. */
    children: ReactNode
  }
}

/** @deprecated Use TopBarAvatarButton.Props instead */
export type AvatarButtonProps = TopBarAvatarButton.Props

/**
 * A simple avatar button that should open a menu with items that relate to the current user. These menu items will
 * typically include the ability to manage their Reapit Connect user account, preferences, and logout of their
 * current session.
 *
 * Typically, `TopBar.AvatarMenu` will be used as it combines `TopBar.AvatarButton` and `Menu` together.
 */
export function TopBarAvatarButton({ 'aria-label': ariaLabel = 'Profile menu', ...rest }: TopBarAvatarButton.Props) {
  return <TopBarAvatarBase {...rest} aria-label={ariaLabel} as="button" />
}
