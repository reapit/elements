import { css } from '@linaria/core'

export const elFormControlLabel = css`
  display: block;
  font: inherit;

  padding: 0;
  /* Set bottom margin when label is a legend. Legend elements do not participate
   * in flex layouts of a fieldset. */
  &:is(legend) {
    margin: 0 0 var(--spacing-2) 0;
  }
`
