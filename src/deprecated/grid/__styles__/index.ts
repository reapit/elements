import { styled } from '@linaria/react'
import { is4KScreen, isDesktop, isSuperWideScreen, isTablet, isWideScreen } from '../../../styles/media'

/** @deprecated */
export const ElGrid = styled.div`
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

  ${is4KScreen} {
    grid-template-columns: repeat(20, 1fr);
  }
`

/** @deprecated */
export const ElCol = styled.div`
  grid-column-end: span 4;
`

/** @deprecated */
export const ElColHalf = styled.div`
  grid-column-end: span 2;
`

/** @deprecated */
export const ElColQuarter = styled.div`
  grid-column-end: span 1;
`

/** @deprecated */
export const ElColSplit = styled.div`
  grid-column-end: span 4;

  ${isWideScreen} {
    grid-column-end: span 6;
  }

  ${isSuperWideScreen} {
    grid-column-end: span 8;
  }

  ${is4KScreen} {
    grid-column-end: span 10;
  }
`

/** @deprecated */
export const ElGridThirds = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

  ${isTablet} {
    grid-gap: 1.25rem;
  }
`

/** @deprecated */
export const ElColSplitThird = styled.div`
  grid-column-end: span 3;

  ${isDesktop} {
    grid-column-end: span 1;
  }
`

/** @deprecated */
export const ElColSplitTwoThirds = styled.div`
  grid-column-end: span 3;

  ${isDesktop} {
    grid-column-end: span 2;
  }
`
