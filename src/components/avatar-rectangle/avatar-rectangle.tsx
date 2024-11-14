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
}

export const AvatarRectangle: FC<AvatarRectangle> = ({ size, variant, children, ...props }) => {
  return (
    <ElAvatarRectangle {...props} data-size={size} data-variant={variant} data-placeholder={Boolean(children) == false}>
      {children ? (
        children
      ) : variant === 'commercial' ? (
        <ElAvatarRectCommercialPlaceholder />
      ) : (
        <ElAvatarRectangleResidentialPlaceholder />
      )}
      {variant === 'commercial' &&
        (size === 'small' ? <ElAvatarRectBottomPlaceholderSmall /> : <ElAvatarRectBottomPlaceholder />)}
    </ElAvatarRectangle>
  )
}
