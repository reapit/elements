import { css } from "@linaria/core";

export const elVideoContainer = css`
  @layer elements.main {
    position: relative;
    max-block-size: var(--video-height, 100%);
    max-inline-size: var(--video-width, 100%);
    height: 100%;
    width: 100%;
  }
`;

export const elVideo = css`
  @layer elements.main {
    display: block;
    height: var(--video-height, auto);
    width: var(--video-width, 100%);
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

    &[aria-hidden="true"] {
      opacity: 0;
    }
  }
`;
