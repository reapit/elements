import { styled } from '@linaria/react'

const BACKDROP_DURATION = '100ms'
const DIALOG_DURATION = '200ms'
const TOTAL_DURATION = '300ms'

const BACKDROP_OUT_DELAY = DIALOG_DURATION
const DIALOG_IN_DELAY = BACKDROP_DURATION

interface ElDialogContainerProps {
  /** The size of the dialog. */
  'data-size': 'small' | 'medium' | 'large' | 'full-screen'
}

export const ElDialog = styled.dialog<ElDialogContainerProps>`
  overflow: auto;
  border: none;
  border-radius: var(--corner-radius-corner-lg, 8px);

  container-name: dialog;
  container-type: inline-size;

  height: min-content;
  padding: 0;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  &[data-size='small'] {
    width: 320px;
  }

  &[data-size='medium'] {
    width: 480px;
  }

  &[data-size='large'] {
    width: 640px;
  }

  &[data-size='small'],
  &[data-size='medium'],
  &[data-size='large'] {
    max-height: 85svh;
    max-width: 85svw;
  }

  &[data-size='full-screen'] {
    border-radius: 0;
    max-height: 100svh;
    max-width: 100svw;
    height: 100svh;
    width: 100svw;
  }

  &:is(:open, [open]) {
    /* We only apply a display property when the drawer is open because if we apply it to the drawer when it is
     * closed, it will override the browser's default "display: none" behaviour for closed dialog elements. */
    display: grid;
    grid-template:
      'header' min-content
      'body' min-content
      'footer' min-content / 100%;

    &::backdrop {
      background-color: var(--overlay-50);
    }
  }

  /* We only apply transition styles if the user has no "reduced motion" preference. By matching against
   * "no-preference," we're taking a reduced-motion-first approach to our styling. See
   * https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion. */
  @media (prefers-reduced-motion: no-preference) {
    opacity: 0;
    transform: translateY(40px);

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
      opacity: 1;
      transform: translateY(0);

      transition:
        all ${TOTAL_DURATION} allow-discrete,
        opacity ${DIALOG_DURATION} ease-out ${DIALOG_IN_DELAY},
        transform ${DIALOG_DURATION} ease-out ${DIALOG_IN_DELAY};

      &::backdrop {
        transition: all ${BACKDROP_DURATION} ease-out allow-discrete;
      }
    }

    /* Starting styles for the dialog and backdrop. These are applied at the start of the dialogs's
     * "open" transition. See https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style. */
    @starting-style {
      &:is(:open, [open]) {
        opacity: 0;
        transform: translateY(40px);

        &::backdrop {
          background-color: transparent;
        }
      }
    }
  }
`
