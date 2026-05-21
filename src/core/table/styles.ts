import { css } from '@linaria/core'

export const elTable = css`
  @layer elements.main {
    --__table-column-justification: start;

    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: auto;
    justify-items: var(--__table-column-justification);
    justify-content: var(--__table-column-justification);
    width: 100%;
    isolation: isolate;

    &[data-justify-items='start'] {
      --__table-column-justification: start;
    }

    &[data-justify-items='center'] {
      --__table-column-justification: center;
    }

    &[data-justify-items='end'] {
      --__table-column-justification: end;
    }
  }
`
