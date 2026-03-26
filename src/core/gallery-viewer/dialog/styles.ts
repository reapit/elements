import { css } from '@linaria/core'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'

const BACKDROP_DURATION = '200ms'
const DIALOG_DURATION = '200ms'
const TOTAL_DURATION = '300ms'

const BACKDROP_OUT_DELAY = '100ms'
const DIALOG_IN_DELAY = '100ms'

export const elGalleryViewerDialog = css`
  border: none;
  padding: 0;
  margin: 0;
  container-type: inline-size;

  background: var(--colour-fill-white);
  overflow: clip auto;
  overscroll-behavior: none;

  /* Full-screen below LG: no rounding, fills the entire viewport */
  border-radius: 0;
  position: fixed;
  inset: 0;
  width: 100svw;
  max-width: 100svw;
  height: 100svh;
  max-height: 100svh;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  /* Transparent backdrop below LG */
  &::backdrop {
    background: transparent;
  }

  /* At LG and above: inset dialog with semi-transparent backdrop */
  @media screen and ${isWidthAtOrAbove('LG')} {
    inset: var(--spacing-10);
    width: auto;
    height: auto;

    border-radius: var(--border-radius-3xl);

    &::backdrop {
      background: var(--overlay-50);
    }
  }

  &:is(:open, [open]) {
    /* We only apply a display property when the dialog is open because if we apply it when it is
     * closed, it will override the browser's default "display: none" behaviour for closed dialog elements. */
    display: flex;
    flex-direction: column;
  }

  /* We only apply transition styles if the user has no "reduced motion" preference. By matching against
   * "no-preference," we're taking a reduced-motion-first approach to our styling. See
   * https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion. */
  @media (prefers-reduced-motion: no-preference) {
    opacity: 0;
    transform: translateY(40px) scale(0.98);

    /* See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#transitioning_dialog_elements
     * for details on what the allow-discrete transition behaviour is all about */
    transition:
      all ${TOTAL_DURATION} allow-discrete,
      opacity ${DIALOG_DURATION} ease-out,
      transform ${DIALOG_DURATION} ease-out;

    &::backdrop {
      transition: all ${BACKDROP_DURATION} ease-out allow-discrete ${BACKDROP_OUT_DELAY};
    }

    &:is(:open, [open]) {
      opacity: 1;
      transform: translateY(0) scale(1);

      transition:
        all ${TOTAL_DURATION} allow-discrete,
        opacity ${DIALOG_DURATION} ease-out ${DIALOG_IN_DELAY},
        transform ${DIALOG_DURATION} ease-out ${DIALOG_IN_DELAY};

      &::backdrop {
        transition: all ${BACKDROP_DURATION} ease-out allow-discrete;
      }
    }

    /* Starting styles for the dialog and backdrop. These are applied at the start of the dialog's
     * "open" transition. See https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style. */
    @starting-style {
      &:is(:open, [open]) {
        opacity: 0;
        transform: translateY(40px) scale(0.98);

        &::backdrop {
          background: transparent;
        }
      }
    }
  }
`
