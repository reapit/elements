import { cx } from '@linaria/core'
import { FC, HTMLAttributes } from 'react'
import { ElDeprecatedAvatar, ElDeprecatedAvatarImage } from './__styles__'

/** @deprecated will be replaced by new v5 AvatarRectangleProps */
export interface DeprecatedAvatarProps extends HTMLAttributes<HTMLSpanElement> {
  type?: 'profile' | 'image'
  src?: string
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
