import { DRAWER_CSS_CONTAINER_NAME, DRAWER_WIDTH_MD_2XL, DRAWER_WIDTH_XS_SM } from './constants'
import { isWidthAtOrAbove } from '#src/utils/breakpoints/conditions'
import { styled } from '@linaria/react'

const BACKDROP_DURATION = '100ms'
const DIALOG_DURATION = '200ms'
const TOTAL_DURATION = '200ms'

const BACKDROP_OUT_DELAY = '0ms'
const DIALOG_IN_DELAY = '0ms'

export const ElDrawer = styled.dialog`
  position: fixed;

  container-name: ${DRAWER_CSS_CONTAINER_NAME};
  container-type: size;

  background: var(--fill-white);
  border: none;
  padding: 0;

  max-width: ${DRAWER_WIDTH_XS_SM};
  min-width: ${DRAWER_WIDTH_XS_SM};

  @media ${isWidthAtOrAbove('MD')} {
    max-width: ${DRAWER_WIDTH_MD_2XL};
    min-width: ${DRAWER_WIDTH_MD_2XL};
  }

  /* Position the drawer on the right side of the screen and make it full height */
  inset-inline: auto 0;
  inset-block: 0;
  height: 100%;
  max-height: 100svh;
  min-height: 100svh;
  overflow: auto;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  /* Fully transparent when the drawer is closed */
  &::backdrop {
    background-color: rgb(0 0 0 / 0%);
  }

  /* Open state of the dialog. We use :is because it accepts a forgiving selector list, and not all browsers
   * support the :open selector for dialog elements. */
  &:is(:open, [open]) {
    /* We only apply a display property when the drawer is open because if we apply it to the drawer when it is
     * closed, it will override the browser's default "display: none" behaviour for closed dialog elements. */
    display: grid;
    grid-template:
      'header' auto
      'body' 1fr
      'footer' auto / 100%;

    &::backdrop {
      background-color: var(--overlay-50);
    }
  }

  /* We only apply transition styles if the user has no "reduced motion" preference. By matching against
   * "no-preference," we're taking a reduced-motion-first approach to our styling. See
   * https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion. */
  @media (prefers-reduced-motion: no-preference) {
    transform: translateX(100%);

    /* See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#transitioning_dialog_elements
     * for details on what the allow-discrete transition behaviour is all about */
    transition:
      all ${TOTAL_DURATION} allow-discrete,
      opacity ${DIALOG_DURATION} ease-out,
      transform ${DIALOG_DURATION} ease-out;

    &::backdrop {
      background-color: transparent;
      transition: all ${BACKDROP_DURATION} ease-out allow-discrete ${BACKDROP_OUT_DELAY};
    }

    &:is(:open, [open]) {
      transform: translateX(0);

      transition:
        all ${TOTAL_DURATION} allow-discrete,
        opacity ${DIALOG_DURATION} ease-out ${DIALOG_IN_DELAY},
        transform ${DIALOG_DURATION} ease-out ${DIALOG_IN_DELAY};

      &::backdrop {
        transition: all ${BACKDROP_DURATION} ease-out allow-discrete;
      }
    }

    /* Starting styles for the drawer and backdrop. These are applied at the start of the drawer's
     * "open" transition. See https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style. */
    @starting-style {
      &:is(:open, [open]) {
        transform: translateX(100%);
        &::backdrop {
          background-color: transparent;
        }
      }
    }
  }
`
