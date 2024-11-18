import { useState, type FC, type HTMLAttributes } from 'react'
import {
  ElAvatarRectangleWrapper,
  ElAvatarRectCommercialPlaceholder,
  ElAvatarRectResidentialPlaceholder,
  ElAvatarRectBottomPlaceholder,
  ElAvatarRectBottomPlaceholderSmall,
} from './styles'

export interface AvatarRectangle extends HTMLAttributes<HTMLSpanElement> {
  variant: 'residential' | 'commercial'
  size: 'medium' | 'small'
  src?: string
  alt?: string
}

export const AvatarRectangle: FC<AvatarRectangle> = ({
  size = 'medium',
  variant = 'residential',
  src,
  alt,
  ...props
}) => {
  const [isError, setIsError] = useState(false)

  const handleError = () => {
    setIsError(true)
  }

  const imageValid = !!src && !isError

  return (
    <ElAvatarRectangleWrapper {...props} data-size={size} data-variant={variant} data-placeholder={!imageValid}>
      {imageValid ? (
        <img src={src} alt={alt} onError={handleError} />
      ) : variant === 'commercial' ? (
        <ElAvatarRectCommercialPlaceholder />
      ) : (
        <ElAvatarRectResidentialPlaceholder />
      )}
      {variant === 'commercial' &&
        (size === 'small' ? (
          <ElAvatarRectBottomPlaceholderSmall aria-hidden="true" />
        ) : (
          <ElAvatarRectBottomPlaceholder aria-hidden="true" />
        ))}
    </ElAvatarRectangleWrapper>
  )
}
