import { styled } from '@linaria/react'
import ResidentialPlaceholderIcon from './icons/residential-placeholder.svg?react'
import ResidentialSmallPlaceholderIcon from './icons/residential-placeholder-small.svg?react'
import CommercialPlaceholderIcon from './icons/commercial-placeholder.svg?react'
import CommercialSmallPlaceholderIcon from './icons/commercial-placeholder-small.svg?react'
import CommercialBottomImage from './icons/bottom-commercial-image.svg?react'
import CommercialSmallBottomImage from './icons/bottom-commercial-image-small.svg?react'

const baseAvatarRectMediumSize = `
  width: var(--size-18);
  height: 54px;
`

const baseAvatarRectSmallSize = `
  width: var(--size-12);
  height: var(--size-10);
`

// The commercial consists of two sections: the commercial image and the bottom placeholder.
const baseCommercialMediumImagesSize = `
  width: 54px;
  height: var(--size-10);
`

const baseCommercialBottomSmallPlaceholderSize = `
  width: 40px;
  height: 32px;
`

const baseCommercialBottomImagePosition = `
  position: absolute;
  bottom: 0;
  right: 0;
`

export const ElAvatarRectBottomImage = styled(CommercialBottomImage)`
  ${baseCommercialMediumImagesSize}
  ${baseCommercialBottomImagePosition}
`
export const ElAvatarRectBottomSmallPlaceholder = styled(CommercialSmallBottomImage)`
  ${baseCommercialMediumImagesSize}
  ${baseCommercialBottomImagePosition}
`

export const ElAvatarRectangle = styled.div`
  ${baseAvatarRectMediumSize}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }

  &[data-variant='commercial'] {
    position: relative;

    img {
      ${baseCommercialMediumImagesSize}
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &[data-size='small'] {
    ${baseAvatarRectSmallSize}

    &[data-variant='commercial'] {
      img,
      ${ElAvatarRectBottomImage}, ${ElAvatarRectBottomSmallPlaceholder} {
        ${baseCommercialBottomSmallPlaceholderSize}
      }
    }
  }
`

export const ElAvatarRectResidentialPlaceholder = styled(ResidentialPlaceholderIcon)`
  ${baseAvatarRectMediumSize}
`

export const ElAvatarRectResidentialSmallPlaceholder = styled(ResidentialSmallPlaceholderIcon)`
  ${baseAvatarRectSmallSize}
`

export const ElAvatarRectCommercialPlaceholder = styled(CommercialPlaceholderIcon)`
  ${baseAvatarRectMediumSize}
`

export const ElAvatarRectCommercialSmallPlaceholder = styled(CommercialSmallPlaceholderIcon)`
  ${baseAvatarRectSmallSize}
`
