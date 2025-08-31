import { css } from '@linaria/core'
import { font } from '#src/core/text'

// NOTE: This is a plain class so that we have an exportable class name
// available for consumers that want table cell styling on an element not
// supported by the TableBodyCell component.
export const elTableBodyCell = css`
  display: grid;
  align-items: center;

  ${font('sm', 'regular')}
  text-align: var(--__table-column-justification);

  border: none;
  padding: var(--spacing-2);

  overflow: hidden;

  &[data-justify-self='start'] {
    --__table-column-justification: start;
    justify-self: start;
  }
  &[data-justify-self='center'] {
    --__table-column-justification: center;
    justify-self: center;
  }
  &[data-justify-self='end'] {
    --__table-column-justification: end;
    justify-self: end;
  }
`
