import { useEffect, useState, type FC, type HTMLAttributes } from 'react'
import {
  ElAvatarRectangle,
  ElAvatarRectBottomPlaceholder,
  ElAvatarRectBottomSmallPlaceholder,
  ElAvatarRectCommercialPlaceholder,
  ElAvatarRectCommercialSmallPlaceholder,
  ElAvatarRectResidentialPlaceholder,
  ElAvatarRectResidentialSmallPlaceholder,
} from './styles'

export interface AvatarRectangle extends HTMLAttributes<HTMLDivElement> {
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

  useEffect(() => {
    if (src) {
      setIsError(false)
    }
  }, [src])

  const hasImageError = !src || isError

  const PlaceholderComponent =
    variant == 'residential'
      ? size === 'medium'
        ? ElAvatarRectResidentialPlaceholder
        : ElAvatarRectResidentialSmallPlaceholder
      : size === 'medium'
        ? ElAvatarRectCommercialPlaceholder
        : ElAvatarRectCommercialSmallPlaceholder

  const CommercialBottomPlaceholder =
    size === 'medium' ? ElAvatarRectBottomPlaceholder : ElAvatarRectBottomSmallPlaceholder

  return hasImageError ? (
    <PlaceholderComponent {...props} aria-label="Image placeholder" />
  ) : (
    <ElAvatarRectangle {...props} data-size={size} data-variant={variant} data-placeholder={!hasImageError}>
      <img src={src} alt={alt} onError={handleError} />
      {variant === 'commercial' && <CommercialBottomPlaceholder aria-hidden="true" />}
    </ElAvatarRectangle>
  )
}
