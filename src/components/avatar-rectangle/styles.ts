import { styled } from '@linaria/react'
import { ReactComponent as ResidentialPlaceholderIcon } from './icons/residential-placeholder.svg'
import { ReactComponent as ResidentialSmallPlaceholderIcon } from './icons/residential-placeholder-small.svg'
import { ReactComponent as CommercialPlaceholderIcon } from './icons/commercial-placeholder.svg'
import { ReactComponent as CommercialSmallPlaceholderIcon } from './icons/commercial-placeholder-small.svg'
import { ReactComponent as CommercialBottomPlaceholderIcon } from './icons/bottom-commercial-placeholder.svg'
import { ReactComponent as CommercialSmallBottomPlaceholderIcon } from './icons/bottom-commercial-placeholder-small.svg'

const baseAvatarRectMediumSize = `
  width: var(--size-size-12, 72px);
  height: 54px;
`

const baseAvatarRectSmallSize = `
  width: var(--size-size-11, 64px);
  height: var(--size-size-9, 48px);
`

// The commercial consists of two sections: the commercial image and the bottom placeholder.
const baseCommercialMediumImagesSize = `
  width: 54px;
  height: var(--size-size-8, 40px);
`

const baseCommercialBottomSmallPlaceholderSize = `
  width: var(--size-size-9, 48px);
  height: 36px;
`

const baseCommercialBottomPlaceholderPosition = `
  position: absolute;
  bottom: 0;
  right: 0;
`

export const ElAvatarRectBottomPlaceholder = styled(CommercialBottomPlaceholderIcon)`
  ${baseCommercialMediumImagesSize}
  ${baseCommercialBottomPlaceholderPosition}
`
export const ElAvatarRectBottomSmallPlaceholder = styled(CommercialSmallBottomPlaceholderIcon)`
  ${baseCommercialMediumImagesSize}
  ${baseCommercialBottomPlaceholderPosition}
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
      ${ElAvatarRectBottomPlaceholder}, ${ElAvatarRectBottomSmallPlaceholder} {
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
