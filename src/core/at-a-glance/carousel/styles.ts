import { isWidthBelow } from '#src/utils/breakpoints'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElAtAGlanceCarousel = styled.div`
  @layer elements.main {
    --aag-carousel-left-button-opacity: 0;
    --aag-carousel-left-button-pointer-events: none;
    --aag-carousel-right-button-opacity: 0;
    --aag-carousel-right-button-pointer-events: none;

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
    isolation: isolate;

    &:hover {
      /* Show navigation buttons on hover when scrolling is possible */
      &[data-can-scroll-left='true'] {
        --aag-carousel-left-button-opacity: 1;
        --aag-carousel-left-button-pointer-events: auto;
      }
      &[data-can-scroll-right='true'] {
        --aag-carousel-right-button-opacity: 1;
        --aag-carousel-right-button-pointer-events: auto;
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
  }
`

export const elAtAGlanceCarouselGrid = css`
  @layer elements.main {
    position: relative;
    mask-image: var(--aag-carousel-mask);
    border-radius: var(--border-radius-l);
  }
`

export const elAtAGlanceCarouselButton = css`
  @layer elements.main {
    position: absolute;
    align-self: center;
    box-shadow: var(--shadow-down-md);
    z-index: var(--z-index-elevated);

    /* Left button */
    &:first-of-type {
      pointer-events: var(--aag-carousel-left-button-pointer-events);
      opacity: var(--aag-carousel-left-button-opacity);
      left: var(--spacing-2);

      /* Show button when focused for keyboard navigation */
      &:focus-visible {
        --aag-carousel-left-button-opacity: 1;
        --aag-carousel-left-button-pointer-events: auto;
      }
    }

    /* Right button */
    &:last-of-type {
      pointer-events: var(--aag-carousel-right-button-pointer-events);
      opacity: var(--aag-carousel-right-button-opacity);
      right: var(--spacing-2);

      /* Show button when focused for keyboard navigation */
      &:focus-visible {
        --aag-carousel-right-button-opacity: 1;
        --aag-carousel-right-button-pointer-events: auto;
      }
    }

    /* Carousel buttons are NOT displayed on the XS breakpoint */
    @media screen and (${isWidthBelow('SM')}) {
      display: none;
    }
  }
`
