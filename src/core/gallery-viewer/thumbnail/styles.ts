import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const elGalleryViewerThumbnail = css`
  @layer elements.main {
    position: relative;

    display: block;
    overflow: hidden;

    aspect-ratio: 11 / 7;
    inline-size: 120px;
    block-size: auto;

    border-radius: var(--border-radius-m);
    background: var(--colour-fill-neutral-light);

    /* Anchor reset */
    text-decoration: none;

    /* Button reset */
    padding: 0;
    border: none;
    cursor: pointer;

    /* Hover ring */
    &:hover {
      outline: var(--border-width-double) solid var(--colour-border-neutral-light_darker);
      outline-offset: var(--border-width-default);
    }

    /* Selected ring */
    &[aria-current='location'],
    &[aria-pressed='true'] {
      outline: var(--border-width-double) solid var(--colour-border-action-default);
      outline-offset: var(--border-width-default);
    }

    /* Focus ring */
    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-neutral-light_darker);
      outline-offset: var(--border-width-default);
    }
  }
`

export const ElGalleryViewerThumbnailVideoOverlay = styled.div`
  @layer elements.main {
    position: absolute;
    inset: 0;
    color: var(--colour-fill-white);

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: var(--border-radius-m);
    background: var(--black-300, rgb(0 0 0 / 0.4));

    pointer-events: none;
  }
`

export const ElGalleryViewerThumbnailPlayIcon = styled.div`
  @layer elements.main {
    width: var(--size-8);
    height: var(--size-8);
  }
`
