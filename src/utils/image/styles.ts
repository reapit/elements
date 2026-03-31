import { css } from '@linaria/core'

export const elImageContainer = css`
  position: relative;

  /* Container is constrained to the image's size. These CSS variables come
   * from the width and height provided to the Image component. */
  max-block-size: var(--image-height, 100%);
  max-inline-size: var(--image-width, 100%);

  height: 100%;
  width: 100%;
`

export const elImage = css`
  &[aria-hidden='true'] {
    opacity: 0;
  }
`

export const elResponsiveImage = css`
  display: block;

  height: var(--image-height, auto);
  width: var(--image-width, 100%);

  /* We constrain the image to never go beyond its container's width and height.
   * This allows the responsive image to be used by itself in a container with
   * its own sizing. */
  max-block-size: 100%;
  max-inline-size: 100%;

  &[data-object-fit='contain'] {
    object-fit: contain;
  }

  &[data-object-fit='cover'] {
    object-fit: cover;
  }

  &[data-object-fit='fill'] {
    object-fit: fill;
  }

  &[data-object-fit='none'] {
    object-fit: none;
  }

  &[data-object-fit='scale-down'] {
    object-fit: scale-down;
  }
`
