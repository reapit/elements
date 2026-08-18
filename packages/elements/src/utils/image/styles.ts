import { css } from "@linaria/core";

export const elImageContainer = css`
  @layer elements.main {
    position: relative;

    /* Container is constrained to the image's size. These CSS variables come
     * from the width and height provided to the Image component. */
    max-block-size: var(--image-height, 100%);
    max-inline-size: var(--image-width, 100%);

    /* The container is allowed to shrink in size */
    min-block-size: 0;
    min-inline-size: 0;

    block-size: 100%;
    inline-size: 100%;
  }
`;

export const elImage = css`
  @layer elements.main {
    &[aria-hidden="true"] {
      opacity: 0;
    }
  }
`;

export const elResponsiveImage = css`
  @layer elements.main {
    display: block;

    block-size: var(--image-height, auto);
    inline-size: var(--image-width, 100%);

    /* We constrain the image to never go beyond its container's width and height.
     * This allows the responsive image to be used by itself in a container with
     * its own sizing. */
    max-block-size: 100%;
    max-inline-size: 100%;

    &[data-object-fit="contain"] {
      object-fit: contain;
    }

    &[data-object-fit="cover"] {
      object-fit: cover;
    }

    &[data-object-fit="fill"] {
      object-fit: fill;
    }

    &[data-object-fit="none"] {
      object-fit: none;
    }

    &[data-object-fit="scale-down"] {
      object-fit: scale-down;
    }
  }
`;
