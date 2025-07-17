import { DRAWER_WIDTH_MD_2XL, DRAWER_WIDTH_XS_SM } from './constants'
import { isDesktop } from '#src/styles/deprecated-media'
import { styled } from '@linaria/react'

export const ElDrawer = styled.dialog`
  position: fixed;

  container-name: drawer;
  container-type: size;

  background: var(--fill-white);
  border: none;
  padding: 0;

  /* Size the drawer */
  max-width: ${DRAWER_WIDTH_XS_SM};
  min-width: ${DRAWER_WIDTH_XS_SM};

  ${isDesktop} {
    max-width: ${DRAWER_WIDTH_MD_2XL};
    min-width: ${DRAWER_WIDTH_MD_2XL};
  }

  /* Position the drawer on the right side of the screen and make it full height */
  inset-inline: auto 0;
  inset-block: 0;
  height: 100%;
  max-height: 100vh;
  min-height: 100vh;
  overflow: auto;

  /* Initially transform the drawer's position so it is off-screen */
  transform: translateX(100%);

  /* Fully transparent when the drawer is closed */
  &::backdrop {
    background-color: rgb(0 0 0 / 0%);
  }

  /* Open state of the dialog */
  &:open,
  &[open] {
    /* NOTE: We deliberately only apply a display property when the drawer is open because if we apply it to
     * the drawer when it is closed, it will override the browser's default "display: none" behaviour for closed
     * dialog elements. */
    display: grid;
    grid-template:
      'header' auto
      'body' 1fr
      'footer' auto / 100%;

    transform: translateX(0);

    &::backdrop {
      background-color: var(--overlay-50);
    }
  }

  /* We only apply transition styles if the user has no "reduced motion" preference. By matching against
   * "no-preference," we're taking a reduced-motion-first approach to our styling. See
   * https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion. */
  @media (prefers-reduced-motion: no-preference) {
    /* Starting styles for the drawer and backdrop. These are applied at the start of the drawer's
     * "open" transition. See https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style. */
    @starting-style {
      &:open,
      &[open] {
        transform: translateX(100%);
        &::backdrop {
          background-color: transparent;
        }
      }
    }

    /* See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#transitioning_dialog_elements
     * for details on why we transition the display and overlay properties, and what the allow-discrete
     * transition behaviour is all about */
    transition:
      transform 0.2s ease-out,
      display 0.2s ease-out allow-discrete,
      overlay 0.2s ease-in-out allow-discrete;

    &::backdrop {
      transition:
        background-color 0.2s ease-out,
        display 0.2s ease-out allow-discrete,
        overlay 0.2s ease-in-out allow-discrete;
    }
  }
`
