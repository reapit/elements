import { isWidthBelow } from '#src/utils/breakpoints'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElAtAGlanceCarousel = styled.div`
  --aag-carousel-left-button-opacity: 0;
  --aag-carousel-left-button-z-index: -1;
  --aag-carousel-right-button-opacity: 0;
  --aag-carousel-right-button-z-index: -1;

  --aag-carousel-mask: linear-gradient(
    to right,
    transparent 0%,
    black var(--size-5),
    black calc(100% - var(--size-5)),
    transparent 100%
  );

  position: relative;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;

  &:hover {
    /* Show navigation buttons on hover when scrolling is possible */
    &[data-can-scroll-left='true'] {
      --aag-carousel-left-button-opacity: 1;
      --aag-carousel-left-button-z-index: 1;
    }
    &[data-can-scroll-right='true'] {
      --aag-carousel-right-button-opacity: 1;
      --aag-carousel-right-button-z-index: 1;
    }
  }

  /* Remove left gradient when scrolling left is impossible */
  &[data-can-scroll-left='false'] {
    --aag-carousel-mask: linear-gradient(to right, black 0%, black calc(100% - var(--size-5)), transparent 100%);
  }
  /* Remove right gradient when scrolling right is impossible */
  &[data-can-scroll-right='false'] {
    --aag-carousel-mask: linear-gradient(to right, transparent 0%, black var(--size-5), black 100%);
  }
  /* Remove both gradients when content fits without scrolling */
  &[data-can-scroll-left='false'][data-can-scroll-right='false'] {
    --aag-carousel-mask: none;
  }
`

export const elAtAGlanceCarouselGrid = css`
  position: relative;
  mask-image: var(--aag-carousel-mask);
  border-radius: var(--border-radius-l);
`

export const elAtAGlanceCarouselButton = css`
  position: absolute;
  align-self: center;
  box-shadow: 0 var(--size-1) var(--size-2) 0 rgb(0 0 0 / 0.1);

  /* Left button */
  &:first-of-type {
    z-index: var(--aag-carousel-left-button-z-index);
    opacity: var(--aag-carousel-left-button-opacity);
    left: var(--spacing-2);

    /* Show button when focused for keyboard navigation */
    &:focus-visible {
      --aag-carousel-left-button-opacity: 1;
      --aag-carousel-left-button-z-index: 1;
    }
  }

  /* Right button */
  &:last-of-type {
    z-index: var(--aag-carousel-right-button-z-index);
    opacity: var(--aag-carousel-right-button-opacity);
    right: var(--spacing-2);

    /* Show button when focused for keyboard navigation */
    &:focus-visible {
      --aag-carousel-right-button-opacity: 1;
      --aag-carousel-right-button-z-index: 1;
    }
  }

  /* Carousel buttons are NOT displayed on the XS breakpoint */
  @media screen and (${isWidthBelow('SM')}) {
    display: none;
  }
`
