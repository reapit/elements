import { css } from "@linaria/core";

import { font } from "#src/utils/font";

export const elAvatar = css`
  @layer elements.main {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    text-transform: uppercase;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /** Colour styles */
    &[data-colour="default"] {
      background: var(--colour-fill-neutral-medium);
      color: var(--colour-text-white);
    }

    &[data-colour="primary"] {
      background: var(--colour-fill-action-lightest);
      color: var(--colour-text-action);
    }

    /** Shape styles */
    &[data-shape="circle"] {
      border-radius: var(--border-radius-full);
    }

    &[data-shape="square"] {
      border-radius: var(--border-radius-l);

      &[data-size="small"],
      &[data-size="xs"],
      &[data-size="sm"] {
        border-radius: var(--border-radius-m);
      }

      &[data-size="2xl"] {
        border-radius: var(--border-radius-xl);
      }
    }

    /** Size styles */
    &[data-size="xs"] {
      width: var(--size-6);
      height: var(--size-6);

      ${font("3xs", "medium")}

      svg {
        width: var(--icon_size-xs);
        height: var(--icon_size-xs);
      }
    }

    &[data-size="small"],
    &[data-size="sm"] {
      width: var(--size-8);
      height: var(--size-8);

      ${font("2xs", "medium")}

      svg {
        width: var(--icon_size-sm);
        height: var(--icon_size-sm);
      }
    }

    &,
    &[data-size="medium"],
    &[data-size="md"] {
      width: var(--size-10);
      height: var(--size-10);
      ${font("xs", "medium")}

      svg {
        width: var(--icon_size-md);
        height: var(--icon_size-md);
      }
    }

    &[data-size="lg"] {
      width: var(--size-12);
      height: var(--size-12);

      ${font("base", "medium")}

      svg {
        width: var(--icon_size-lg);
        height: var(--icon_size-lg);
      }
    }

    &[data-size="xl"] {
      width: var(--size-16);
      height: var(--size-16);

      ${font("lg", "medium")}

      svg {
        width: var(--icon_size-lg);
        height: var(--icon_size-lg);
      }
    }

    &[data-size="2xl"] {
      width: var(--size-24);
      height: var(--size-24);

      ${font("lg", "medium")}

      svg {
        width: var(--icon_size-lg);
        height: var(--icon_size-lg);
      }
    }

    /**
     * Focus styles, applied whenever the avatar renders as an anchor or button element, including a plain
     * Avatar rendered as a button purely to support a focusable tooltip.
     */
    &:is(a, button) {
      appearance: none;
      border: none;
      padding: 0;
      font-family: inherit;
      text-decoration: none;
      background: none;

      &:focus-visible {
        outline: var(--border-width-double) solid var(--colour-border-focus);
        outline-offset: var(--border-width-default);
      }
    }

    /**
     * Hover, disabled and pointer-cursor styles, only applied to "real" interactive avatars, i.e. AvatarButton
     * and AvatarAnchor. A plain Avatar rendered as a button to support a focusable tooltip does not adopt these.
     */
    &[data-interactive="true"] {
      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: transparent;
      }

      &:hover::after {
        background: var(--comp-avatar-colour-overlay-fill-hover);
      }

      &:disabled,
      &[aria-disabled="true"] {
        cursor: not-allowed;
      }

      &:disabled::after,
      &[aria-disabled="true"]::after {
        background: var(--comp-avatar-colour-overlay-fill-disabled);
      }
    }
  }
`;
