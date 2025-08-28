import { css } from '@linaria/core'
import { elTableRowPrimaryAction } from '../primary-action/styles'

// NOTE: This is a plain class so that we have an exportable class name
// available for consumers that want table row styling on an element not
// supported by the TableBodyRow component.
export const elTableBodyRow = css`
  /* Relative positioning is critical for the row's primary action to work correctly.
   * The TableRowPrimaryAction component relies on this relative positioning to position
   * its ::after pseudo-element over the entire row so that clicks on the row are captured
   * by the action rather than the row. */
  position: relative;

  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  grid-template-rows: auto;
  align-items: center;
  justify-content: inherit;
  width: 100%;

  background: var(--colour-fill-white);
  border-block-end: var(--border-width-default) solid var(--colour-border-light_default);
  padding: 0;

  min-height: var(--size-10);
  max-height: var(--size-18);

  &:has(.${elTableRowPrimaryAction}):hover {
    background: var(--colour-fill-neutral-lightest);
  }
`
