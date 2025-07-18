import { FC, HTMLAttributes } from 'react'
import { ElAvatar } from './styles'

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** The colour of the avatar. */
  colour?: 'default' | 'purple'
  /** The shape of the avatar. */
  shape?: 'circle' | 'square'
  /** The size of the avatar. */
  size?: 'medium' | 'small'
}

/**
 * A simple avatar component that can be used to represent a user or other entity.
 */
export const Avatar: FC<AvatarProps> = ({
  colour = 'default',
  children,
  shape = 'circle',
  size = 'medium',
  ...props
}) => {
  return (
    <ElAvatar role="presentation" data-shape={shape} data-size={size} data-colour={colour} {...props}>
      {children}
    </ElAvatar>
  )
}
