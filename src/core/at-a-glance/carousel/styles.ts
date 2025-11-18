import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElAtAGlanceCarousel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
`

export const elAtAGlanceCarouselGrid = css`
  position: relative;

  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black var(--size-5),
    black calc(100% - var(--size-5)),
    transparent 100%
  );

  /* Remove left gradient when cannot scroll left */
  &[data-can-scroll-left='false'] {
    mask-image: linear-gradient(to right, black 0%, black calc(100% - var(--size-5)), transparent 100%);
  }

  /* Remove right gradient when cannot scroll right */
  &[data-can-scroll-right='false'] {
    mask-image: linear-gradient(to right, transparent 0%, black var(--size-5), black 100%);
  }

  /* Remove both gradients when cannot scroll in either direction */
  &[data-can-scroll-left='false'][data-can-scroll-right='false'] {
    mask-image: none;
  }
`

export const elAtAGlanceCarouselButton = css`
  position: absolute;
  align-self: center;
  z-index: 1;
  box-shadow: 0 var(--size-1) var(--size-2) 0 rgb(0 0 0 / 0.1);

  /* Left button */
  &:first-of-type {
    left: var(--spacing-2);
  }

  /* Right button */
  &:last-of-type {
    right: var(--spacing-2);
  }

  /* Required because the default hidden styles are overriden by our button's styles */
  &[hidden] {
    display: none;
  }
`
