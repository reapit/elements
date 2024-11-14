import { styled } from '@linaria/react'
import { ReactComponent as ResidentialPlaceholderIcon } from './icons/residential-placeholder-icon.svg'
import { ReactComponent as CommercialBottomPlaceholderIcon } from './icons/bottom-commercial-placeholder.svg'
import { ReactComponent as CommercialSmallBottomPlaceholderIcon } from './icons/bottom-commercial-placeholder-small.svg'

const baseCommercialImagesStyle = `
  width: 54px;
  height: var(--size-size-8, 40px);
  flex-shrink: 0;
`

const baseCommercialBottomPlaceholderStyle = `
  position: absolute;
  bottom: 0;
  right: 0;
`

export const ElAvatarRectBottomPlaceholder = styled(CommercialBottomPlaceholderIcon)`
  ${baseCommercialImagesStyle}
  ${baseCommercialBottomPlaceholderStyle}
`
export const ElAvatarRectBottomPlaceholderSmall = styled(CommercialSmallBottomPlaceholderIcon)`
  ${baseCommercialImagesStyle}
  ${baseCommercialBottomPlaceholderStyle}
`

export const ElAvatarRectCommercialPlaceholder = styled.div`
  ${baseCommercialImagesStyle}
  position: absolute;
  top: 0;
  left: 0;
  background: var(--fill-colour-fill-default-light, #e5e9ed);
`

export const ElAvatarRectangle = styled.span`
  display: flex;
  width: var(--size-size-12, 72px);
  height: 54px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }

  &[data-placeholder='true'][data-variant='residential'] {
    background: var(--fill-colour-fill-default-light, #e5e9ed);
  }

  &[data-variant='commercial'] {
    position: relative;

    img {
      ${baseCommercialImagesStyle}
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &[data-size='small'] {
    width: var(--size-size-11, 64px);
    height: var(--size-size-9, 48px);

    &[data-variant='commercial'] {
      img,
      ${ElAvatarRectCommercialPlaceholder}, ${ElAvatarRectBottomPlaceholder}, ${ElAvatarRectBottomPlaceholderSmall} {
        width: var(--size-size-9, 48px);
        height: 36px;
      }
    }
  }
`

export const ElAvatarRectangleResidentialPlaceholder = styled(ResidentialPlaceholderIcon)``
