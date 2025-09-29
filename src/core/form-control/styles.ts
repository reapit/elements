import { css } from '@linaria/core'
import { font } from '#src/core/text'

export const elFormControl = css`
  /* NOTE: Fieldset elements do not reliably support flex layouts across browsers so we can't use it here
   * with gap to space the label and help text etc out. Thus, we rely on the label, help text and error
   * text to provide their own margins. */
  display: block;

  border: none;
  padding: 0;
  margin: 0;

  &,
  &[data-size='small'],
  &[data-size='medium'] {
    ${font('xs', 'regular')}
  }
  &[data-size='large'] {
    ${font('sm', 'regular')}
  }
`

export const elFormControlLabel = css``
