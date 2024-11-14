import { cx } from '@linaria/core'
import type { IconNames } from '../icon'
import { ElAvatar } from './styles'
import { FC, HTMLAttributes } from 'react'
import { ElDeprecatedAvatar, ElDeprecatedAvatarImage } from './__styles__'

/** @deprecated will be replaced by new v5 AvatarRectangleProps */
export interface DeprecatedAvatarProps extends HTMLAttributes<HTMLSpanElement> {
  type?: 'profile' | 'image'
  src?: string | IconNames
  alt?: string
}

/** @deprecated will be replaced by new v5 AvatarRectangle */
export const DeprecatedAvatar: FC<DeprecatedAvatarProps> = ({ children, src, alt, type, className, ...rest }) => {
  return type === 'image' ? (
    <ElDeprecatedAvatarImage role="img" title="An avatar image" className={cx(className)} {...rest}>
      {src ? <img src={src} alt={alt ? alt : `An image with source ${src}`} /> : children}
    </ElDeprecatedAvatarImage>
  ) : (
    <ElDeprecatedAvatar role="img" title="A profile image" className={cx(className)} {...rest}>
      {src ? <img src={src} alt={alt ? alt : `An image with source ${src}`} /> : children}
    </ElDeprecatedAvatar>
  )
}

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  shape?: 'circle' | 'square'
  size?: 'medium' | 'small'
  intent?: 'default' | 'primary'
}

export const Avatar: FC<AvatarProps> = ({ shape, size, intent, children, ...props }) => {
  return (
    <ElAvatar role="presentation" data-shape={shape} data-size={size} data-intent={intent} {...props}>
      {children}
    </ElAvatar>
  )
}
