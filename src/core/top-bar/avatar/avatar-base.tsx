import { Avatar } from '#src/core/avatar'
import { cx } from '@linaria/core'
import { elTopBarAvatarBase } from './styles'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export namespace TopBarAvatarBase {
  interface CommonProps {
    /** The avatar's text. Typically the initials of the current user. */
    children: ReactNode
  }

  export interface AsAnchorProps extends CommonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
    /** The accessible name of the avatar. */
    'aria-label': string
    as: 'a'
  }

  export interface AsButtonProps extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** The accessible name of the avatar button. */
    'aria-label': string
    as: 'button'
  }

  export type Props = AsAnchorProps | AsButtonProps
}

/**
 * A simple polymorphic avatar component that can render as a button or link. It is used internally by the
 * `TopBar.AvatarButton` and `TopBar.AvatarAnchor` components and should not be used directly by consumers.
 */
export function TopBarAvatarBase({
  as: Element,
  children,
  className,
  'aria-label': ariaLabel,
  ...rest
}: TopBarAvatarBase.Props) {
  return (
    <Element
      // NOTE: We use a type assertion here to avoid having to narrow the type of `rest`
      // to the specific `Element` type.
      {...(rest as HTMLAttributes<HTMLElement>)}
      aria-label={ariaLabel}
      className={cx(elTopBarAvatarBase, className)}
    >
      <Avatar size="small" shape="circle" colour="primary">
        {children}
      </Avatar>
    </Element>
  )
}
