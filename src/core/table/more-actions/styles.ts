import { css } from '@linaria/core'
import { TABLE_ROW_INTERACTIVE_ELEMENT_Z_INDEX } from '../constants'

// NOTE: we use `css` instead of `styled` because the latter omits the popover-related
// attributes we need to pass to the button.
export const elTableRowMoreActionsButton = css`
  display: inline-flex;
  place-items: center;
  place-content: center;

  box-sizing: content-box;
  border: none;
  border-radius: var(--comp-button-border-radius-default);
  padding: var(--spacing-1);
  width: var(--icon_size-l);
  height: var(--icon_size-l);

  background: transparent;
  color: var(--colour-icon-primary);

  cursor: pointer;

  /* NOTE: This ensures the button is layered above the table row's primary action */
  z-index: ${TABLE_ROW_INTERACTIVE_ELEMENT_Z_INDEX};

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  &:hover {
    color: var(--colour-icon-secondary);
  }

  &[aria-disabled='true'],
  &:disabled {
    color: var(--colour-icon-disabled);
  }
`
