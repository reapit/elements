import { css } from '@linaria/core'

/**
 * Layered after `elButton` (see the import order in `button.tsx`) so it can override `Button`'s
 * own hover styling for the dragging-over state.
 */
export const elFileUploaderButtonInput = css`
  @layer elements.main {
    &[data-is-dragging-over='true'] {
      border-color: var(--comp-button-colour-border-secondary-hover);
      background: var(--comp-button-colour-fill-secondary-hover);
      color: var(--comp-button-colour-text-secondary-hover);
    }

    /* NOTE: this button is rendered as FileInput's children, so it's always a direct sibling of
     * the native, visually-hidden file input — see FileUploaderButtonInput. :where(...) keeps
     * data-show-validity from adding specificity that would fight the dragging-over styles above. */
    input:where([data-show-validity='true']):invalid + &,
    input:where([data-show-validity='true']):user-invalid + & {
      border-color: var(--comp-input-colour-border-error);
      background: var(--comp-input-colour-fill-error-background);
    }
  }
`
