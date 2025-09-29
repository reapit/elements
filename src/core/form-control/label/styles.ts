import { css } from '@linaria/core'

export const elFormControlLabel = css`
  display: inline-block;
  font: inherit;

  padding: 0;
  /* Block end margin set here because the parent form control can't reliably use a flex layout. */
  margin: 0 0 var(--spacing-2) 0;
`
