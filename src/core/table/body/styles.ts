import { css } from '@linaria/core'

export const elTableBody = css`
  display: grid;
  grid-column: 1 / -1;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  grid-template-columns: subgrid;
`
