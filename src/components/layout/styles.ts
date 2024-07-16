import { isMobile, isTablet } from '../../styles/media'
import { elHFull } from '../../styles/sizing'
import { css } from '@linaria/core'

export const elHasGreyBackground = css``
export const elHasMaxWidth = css``

export const elMainContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: visible;
  overflow-x: hidden;
  background: var(--white);

  &.${elHasGreyBackground} {
    background: var(--neutral-050);
  }

  &.${elHasMaxWidth} {
    max-width: 1200px;
    margin: 0 auto;
  }
`

export const elPageContainer = css`
  display: block;
  padding: 0.5rem 1.25rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: var(--white);

  ${isTablet} {
    padding: 2.5rem 1.5rem;
  }

  &.${elHFull} {
    height: 100%;
  }

  &.${elHasGreyBackground} {
    background: var(--neutral-050);
  }

  &.${elHasMaxWidth} {
    max-width: 1200px;
    margin: 0 auto;
  }
`

export const elSecondaryNavContainer = css`
  display: block;
  width: 14rem;
  flex: 0 0 14rem;
  padding: 1.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  background: var(--white);
  border-right: 1px solid var(--neutral-050);

  &::-webkit-scrollbar {
    display: none;
  }

  ${isMobile} {
    display: none;
  }
`

export const elFlexContainer = css`
  display: flex;
  min-height: 0;
  min-width: 0;

  &.${elHasGreyBackground} {
    background: var(--neutral-050);
  }

  &.${elHasMaxWidth} {
    max-width: 1200px;
    margin: 0 auto;
  }
`
