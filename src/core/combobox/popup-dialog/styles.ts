import { css } from '@linaria/core'
import { DRAWER_WIDTH_SM_2XL, DRAWER_WIDTH_XS } from '#src/core/drawer'
import { styled } from '@linaria/react'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'

const BACKDROP_DURATION = '100ms'
const DIALOG_DURATION = '200ms'
const TOTAL_DURATION = '200ms'

const BACKDROP_OUT_DELAY = '0ms'
const DIALOG_IN_DELAY = '0ms'

export const elComboboxPopupDialog = css`
  --combobox-popup-border-radius: var(--comp-menu-border-radius);
  --combobox-popup-backdrop-colour: transparent;

  --combobox-popup-drawer-shadow: none;
  --combobox-popup-popover-shadow: 0 var(--size-1) var(--size-4) 0 rgb(0 0 0 / 0.2);
  --combobox-popup-shadow: var(--combobox-popup-popover-shadow);

  /* NOTE: This CSS variable is referenced in popup-dialog.tsx for width calculations */
  --combobox-popup-padding: var(--spacing-2);

  /* Basic dialog reset and anchor positioning foundation */
  inset: auto;
  border: none;
  margin: 0;
  /* The dialog itself has no padding, but its descendants use --combobox-popup-padding
   * which is controlled by the dialog. */
  padding: 0;

  background: var(--colour-fill-white);
  box-shadow: var(--combobox-popup-shadow);

  border-radius: var(--combobox-popup-border-radius);

  /* Backdrop styles */
  &::backdrop {
    background: var(--combobox-popup-backdrop-colour);
  }

  &:is(:open, [open]) {
    display: flex;
    flex-flow: column nowrap;
  }

  /* Drawer variant styles */
  &[data-variant='drawer'],
  /* Auto variant (drawer on XS) */
  &[data-variant='auto'] {
    --combobox-popup-border-radius: 0;
    --combobox-popup-shadow: var(--combobox-popup-drawer-shadow);

    position: fixed;

    /* Position the drawer to cover the whole viewport */
    inset-inline: 0;
    inset-block: 0;
    height: 100%;
    max-height: 100svh;
    min-height: 100svh;

    width: 100%;
    max-width: 100%;
    min-width: ${DRAWER_WIDTH_XS};

    @media screen and (${isWidthAtOrAbove('SM')}) {
      /* Position the drawer on the right side of the screen */
      inset-inline: auto 0;

      max-width: ${DRAWER_WIDTH_SM_2XL};
      min-width: ${DRAWER_WIDTH_SM_2XL};
    }

    /* Open state of the dialog. We use :is because it accepts a forgiving selector list, and not all browsers
     * support the :open selector for dialog elements. */
    &:is(:open, [open]) {
      --combobox-popup-backdrop-colour: var(--overlay-50);
    }

    /* We only apply transition styles if the user has no "reduced motion" preference. By matching against
     * "no-preference," we're taking a reduced-motion-first approach to our styling. See
     * https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion. */
    @media (prefers-reduced-motion: no-preference) {
      transform: translateY(100%);

      @media screen and (${isWidthAtOrAbove('SM')}) {
        transform: translateX(100%);
      }

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
        transform: translateY(0);

        @media screen and (${isWidthAtOrAbove('SM')}) {
          transform: translateX(0);
        }

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
          transform: translateY(100%);

          @media screen and (${isWidthAtOrAbove('SM')}) {
            transform: translateX(100%);
          }

          &::backdrop {
            background-color: transparent;
          }
        }
      }
    }
  }

  /* Auto variant - popover on SM and above */
  &[data-variant='auto'] {
    /* On XS breakpoint, switch to popover styles */
    @media screen and ${isWidthAtOrAbove('SM')} {
      --combobox-popup-shadow: var(--combobox-popup-popover-shadow);

      border-radius: var(--comp-menu-border-radius);

      /* Override drawer styles */
      inset: auto;
      height: auto;
      max-height: unset;
      min-height: unset;
      transform: none;
      transition: none;

      &::backdrop {
        transition: none;
      }

      &:is(:open, [open]) {
        --combobox-popup-backdrop-colour: transparent;
        transform: none;
        transition: none;
      }

      /* Starting styles for the drawer and backdrop. These are applied at the start of the drawer's
             * "open" transition. See https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style. */
      @starting-style {
        &:is(:open, [open]) {
          transform: none;
        }
      }
    }
  }
`

export const ElComboboxPopupDialogHeader = styled.div`
  grid-area: header;
  position: sticky;
  top: 0;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: end;
  gap: var(--spacing-2);
  padding: var(--combobox-popup-padding);

  background: inherit;
`

export const ElComboboxPopupDialogListboxContainer = styled.div`
  grid-area: listbox;
  padding-block: 0 var(--combobox-popup-padding);
  padding-inline: var(--combobox-popup-padding);

  height: 100%;
  overflow: auto;

  &:first-of-type {
    /* Add block start padding when the header is not present */
    padding-block: var(--combobox-popup-padding);
  }
`
