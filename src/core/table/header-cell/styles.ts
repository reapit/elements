import { css } from '@linaria/core'
import { elTableCellSortButton } from '../sort-button'
import { font } from '#src/core/text'

// NOTE: This is a plain class so that we have an exportable class name
// available for consumers that want table cell styling on an element not
// supported by the TableHeaderCell component.
export const elTableHeaderCell = css`
  display: inline-grid;
  grid-template-rows: subgrid;
  align-items: center;
  width: 100%;

  border: none;
  padding: var(--spacing-2);

  ${font('2xs', 'bold')}
  color: var(--colour-text-secondary);
  text-align: var(--__table-column-justification);
  text-transform: uppercase;

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

  /* When the header cell contains a sort button, we need to remove the cell's inline padding
   * because the sort button has its own. */
  &:has(.${elTableCellSortButton}) {
    padding-inline: 0;
  }
`
