import { useEffect, useState, type FC, type HTMLAttributes } from 'react'
import {
  ElAvatarRectangle,
  ElAvatarRectBottomImage,
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

/**
 * A versatile component designed to render property image.
 */
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

  const CommercialBottomImage = size === 'medium' ? ElAvatarRectBottomImage : ElAvatarRectBottomSmallPlaceholder

  return hasImageError ? (
    <PlaceholderComponent {...(props as HTMLAttributes<HTMLOrSVGElement>)} aria-label="Image placeholder" />
  ) : (
    <ElAvatarRectangle {...props} data-size={size} data-variant={variant} data-placeholder={!hasImageError}>
      <img src={src} alt={alt} onError={handleError} />
      {/* commercial image have additional bottom image placeholder,
          see https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=383-10175&t=KuONuvNexPnMttGy-4 */}
      {variant === 'commercial' && <CommercialBottomImage aria-hidden="true" />}
    </ElAvatarRectangle>
  )
}
