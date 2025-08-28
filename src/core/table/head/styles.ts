import { css } from '@linaria/core'

export const elTableHead = css`
  position: sticky;
  top: 0;

  display: grid;
  grid-column: 1 / -1;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  grid-template-columns: subgrid;
  justify-content: inherit;
`
