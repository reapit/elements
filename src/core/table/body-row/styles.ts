import { css } from '@linaria/core'
import { elTableRowPrimaryAction } from '../primary-action/styles'

// NOTE: This is a plain class so that we have an exportable class name
// available for consumers that want table row styling on an element not
// supported by the TableBodyRow component.
export const elTableBodyRow = css`
  @layer elements.main {
    /* Relative positioning is critical for the row's primary action to work correctly.
     * The TableRowPrimaryAction component relies on this relative positioning to position
     * its ::after pseudo-element over the entire row so that clicks on the row are captured
     * by the action rather than the row. */
    position: relative;

    /* Isolation contains z-index values used by child elements (primary action, more actions,
     * checkbox) within this row's stacking context, preventing them from overlapping
     * elements outside the row during scrolling. */
    isolation: isolate;

    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    grid-template-rows: auto;
    align-items: center;
    width: 100%;

    background: var(--colour-fill-white);
    border-block-end: var(--border-width-default) solid var(--colour-border-neutral-light_default);
    padding: 0;

    min-height: var(--size-10);
    max-height: var(--size-18);

    /* For now, we don't differentiate between individual checked inputs (which may include checkboxes
     * or radio buttons) in the row. Rather, we assume the only checked input in the row is the one for
     * selecting the row. This may change in future, but it's the simplest approach for now. */
    &:has(input:checked) {
      background: var(--colour-fill-action-lightest);
    }

    &:has(.${elTableRowPrimaryAction}):hover {
      background: var(--colour-fill-neutral-lightest);
    }

    /* Raise the row's stacking context above sibling rows when the primary action is focused,
     * ensuring the focus outline is not obscured by adjacent row hover backgrounds. */
    &:focus-within {
      z-index: var(--z-index-elevated);
    }
  }
`
