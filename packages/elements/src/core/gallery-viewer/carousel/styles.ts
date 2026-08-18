import { css } from "@linaria/core";

export const elGalleryViewerCarousel = css`
  @layer elements.main {
    position: relative;
    isolation: isolate;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-xl);
    overflow: hidden;
  }
`;

export const elGalleryViewerCarouselTrack = css`
  @layer elements.main {
    display: flex;
    overflow: auto hidden; /* supported in all major browsers since Safari 15.4 (March 2022) */
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    overscroll-behavior-x: contain;
    width: 100%;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }

    /* Read-only controlled mode: prevent the user from swiping away from the controlled value.
     * overflow: clip (not hidden) is intentional — it does not create a scroll container, so
     * programmatic scrolling via scrollIntoView is also blocked. */
    &[data-read-only] {
      overflow: clip;
    }
  }
`;

export const elGalleryViewerCarouselButton = css`
  @layer elements.main {
    position: absolute;
    z-index: var(--z-index-elevated);
    top: 50%;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--size-10);
    height: var(--size-16);
    border: none;
    border-radius: var(--border-radius-l);
    background: var(--comp-gallery_viewer-colour-fill-gallery_button-default);
    color: var(--comp-gallery_viewer-colour-icon-gallery_button-default);
    cursor: pointer;
    padding: 0;
    text-decoration: none;

    &[data-direction="previous"] {
      left: var(--spacing-2);
    }

    &[data-direction="next"] {
      right: var(--spacing-2);
    }

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-action-default);
      outline-offset: var(--border-width-default);
    }

    &:hover {
      background: var(--comp-gallery_viewer-colour-fill-gallery_button-hover);
      color: var(--comp-gallery_viewer-colour-icon-gallery_button-hover);
    }

    &[aria-disabled="true"] {
      opacity: 0;
      pointer-events: none;

      &:focus-visible {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
`;

// NOTE: Because the carousel allows overscroll, we add border radius to the first and last
// items so the items remain rounded as they overscroll.
export const elGalleryViewerCarouselItem = css`
  @layer elements.main {
    overflow: clip;

    &:first-child {
      border-start-start-radius: var(--border-radius-xl);
      border-end-start-radius: var(--border-radius-xl);
    }

    &:last-child {
      border-start-end-radius: var(--border-radius-xl);
      border-end-end-radius: var(--border-radius-xl);
    }
  }
`;
