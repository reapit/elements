import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElAvatar, ElAvatarImage } from './__styles__'

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  type?: 'profile' | 'image'
  src?: string
  alt?: string
}

export const Avatar: FC<AvatarProps> = ({ children, src, alt, type, className, ...rest }) => {
  return type === 'image' ? (
    <ElAvatarImage role="img" title="An avatar image" className={cx(className)} {...rest}>
      {src ? <img src={src} alt={alt ? alt : `An image with source ${src}`} /> : children}
    </ElAvatarImage>
  ) : (
    <ElAvatar role="img" title="A profile image" className={cx(className)} {...rest}>
      {src ? <img src={src} alt={alt ? alt : `An image with source ${src}`} /> : children}
    </ElAvatar>
  )
}
