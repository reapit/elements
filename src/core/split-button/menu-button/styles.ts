import { css } from '@linaria/core'

// NOTE: This class is designed to be used in conjunction with the ElButton class.
export const elSplitButtonMenuButton = css`
  /* NOTE: This is used to help colour the special dividing border rendered in the ::before pseudo-element. */
  --__divider-colour: transparent;

  /* NOTE: This is used to help size the ::before pseudo-element. */
  --__block-inset: calc(var(--size-half) + var(--size-1));

  position: relative;
  border-end-start-radius: 0;
  border-start-start-radius: 0;

  /* NOTE: This pseudo-element is used to render the dividing border between the action and menu buttons. */
  &::before {
    content: '';
    position: absolute;
    background-color: transparent;
    top: var(--__block-inset);
    bottom: var(--__block-inset);
    left: 0;
    border-inline-start: var(--comp-button-border-width-default) solid var(--__divider-colour);
    pointer-events: none;
  }

  &[data-variant='primary'] {
    --__divider-colour: var(--comp-button-colour-border-primary-default);
  }

  &[data-variant='secondary'] {
    --__divider-colour: var(--comp-button-colour-border-secondary-default);

    /* NOTE: We need to remove the border between the action and menu buttons, as we now facilitate it via the
     * ::before pseudo-element. */
    border-inline-start: none;

    &:hover {
      --__divider-colour: var(--comp-button-colour-border-secondary-hover);
    }

    &:hover::before {
      --__block-inset: 0;
    }
  }

  &:disabled,
  &[aria-disabled='true'] {
    --__divider-colour: var(--comp-button-colour-border-secondary-disabled);

    &:hover::before {
      --__block-inset: unset;
    }
  }

  /* NOTE: We only want to elevate the action button when it is not disabled. If the action is aria-disabled, we will
  * still elevate it, as it is focusable. */
  &:focus-visible:not(:disabled) {
    z-index: 1;
  }
`
