import { css } from '@linaria/core'
import { font } from '#src/core/text'

// NOTE: This is a plain class so that we have an exportable class name
// available for consumers that want table cell styling on an element not
// supported by the TableBodyCell component.
export const elTableBodyCell = css`
  display: grid;

  ${font('sm', 'regular')}

  border: none;
  padding: 0 var(--spacing-2);

  overflow: hidden;

  &,
  &[data-justify-content='start'] {
    justify-content: start;
  }
  &[data-justify-content='center'] {
    justify-content: center;
  }
  &[data-justify-content='end'] {
    justify-content: end;
  }
`
