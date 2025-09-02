import { css } from '@linaria/core'
import { TABLE_ROW_INTERACTIVE_ELEMENT_Z_INDEX } from '../constants'

export const elTableCellCheckbox = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
  min-width: var(--size-10);
  padding: var(--spacing-2);

  /* NOTE: This ensures the checkbox is layered above the table row's primary action */
  z-index: ${TABLE_ROW_INTERACTIVE_ELEMENT_Z_INDEX};
`
