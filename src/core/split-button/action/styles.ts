import { css } from '@linaria/core'

// NOTE: This class is designed to be used in conjunction with the ElButton class.
export const elSplitButtonAction = css`
  position: relative;

  border-end-end-radius: 0;
  border-start-end-radius: 0;

  /* NOTE: We only want to elevate the action button when it is not disabled. If the action is aria-disabled, we will
   * still elevate it, as it is focusable. */
  &:focus-visible:not(:disabled) {
    z-index: 1;
  }

  &[data-variant='secondary'] {
    border-inline-end-color: transparent;

    &:hover {
      border-inline-end-color: var(--comp-button-colour-border-secondary-hover);
    }
  }
`
