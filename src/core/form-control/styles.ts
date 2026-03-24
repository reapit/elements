import { css } from '@linaria/core'
import { font } from '#src/utils/font'

export const elFormControl = css`
  /* <legend> elements will not participate in this flex layout. FormControl.Label will apply its own
   * bottom margin when it is a <legend>. */
  display: flex;
  flex-flow: column nowrap;
  gap: var(--spacing-2);

  border: none;
  padding: 0;
  margin: 0;
  min-width: 0;
  width: 100%;

  &,
  &[data-size='small'],
  &[data-size='medium'] {
    ${font('xs', 'regular')}
  }
  &[data-size='large'] {
    ${font('sm', 'regular')}
  }
`
