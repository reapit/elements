import type { FC, HTMLAttributes } from 'react'
import {
  ElAvatarRectangle,
  ElAvatarRectCommercialPlaceholder,
  ElAvatarRectangleResidentialPlaceholder,
  ElAvatarRectBottomPlaceholder,
  ElAvatarRectBottomPlaceholderSmall,
} from './styles'

export interface AvatarRectangle extends HTMLAttributes<HTMLSpanElement> {
  variant: 'residential' | 'commercial'
  size: 'medium' | 'small'
  src?: string
  alt?: string
}

export const AvatarRectangle: FC<AvatarRectangle> = ({ size, variant, src, alt, ...props }) => {
  return (
    <ElAvatarRectangle
      role="img"
      {...props}
      data-size={size}
      data-variant={variant}
      data-placeholder={Boolean(src) == false}
    >
      {src ? (
        <img src={src} alt={alt} />
      ) : variant === 'commercial' ? (
        <ElAvatarRectCommercialPlaceholder />
      ) : (
        <ElAvatarRectangleResidentialPlaceholder />
      )}
      {variant === 'commercial' &&
        (size === 'small' ? (
          <ElAvatarRectBottomPlaceholderSmall aria-hidden="true" />
        ) : (
          <ElAvatarRectBottomPlaceholder aria-hidden="true" />
        ))}
    </ElAvatarRectangle>
  )
}
