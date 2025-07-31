import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isDesktop, isWideScreen, isTablet, isSuperWideScreen } from '../../../styles/deprecated-media'

/** @deprecated */
export const elFormLayoutHasMargin = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`

/** @deprecated */
export const ElFormLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;

  ${isTablet} {
    grid-gap: 1.25rem;
  }

  ${isDesktop} {
    grid-template-columns: repeat(8, 1fr);
  }

  ${isWideScreen} {
    grid-template-columns: repeat(12, 1fr);
  }

  ${isSuperWideScreen} {
    grid-template-columns: repeat(16, 1fr);
  }

  &.${elFormLayoutHasMargin} {
    margin-bottom: 1.5rem;
  }
`

/** @deprecated */
export const ElFormSectionDivider = styled.div`
  margin: 1.5rem 0;
  border-bottom: 1px solid var(--neutral-100);
`

/** @deprecated */
export const ElInputWrapSmall = styled.div`
  grid-column-end: span 2;
`

/** @deprecated */
export const ElInputWrap = styled.div`
  grid-column-end: span 4;
`

/** @deprecated */
export const ElInputWrapMed = styled.div`
  grid-column-end: span 4;

  ${isDesktop} {
    grid-column-end: span 8;
  }

  ${isWideScreen} {
    grid-column-end: span 8;
  }

  ${isSuperWideScreen} {
    grid-column-end: span 8;
  }
`

/** @deprecated */
export const ElInputWrapFull = styled.div`
  grid-column-end: span 4;

  ${isDesktop} {
    grid-column-end: span 8;
  }

  ${isWideScreen} {
    grid-column-end: span 12;
  }

  ${isSuperWideScreen} {
    grid-column-end: span 16;
  }
`

/** @deprecated */
export const ElInputWrapHalf = styled.div`
  grid-column-end: span 2;

  ${isDesktop} {
    grid-column-end: span 4;
  }

  ${isWideScreen} {
    grid-column-end: span 6;
  }

  ${isSuperWideScreen} {
    grid-column-end: span 8;
  }
`
