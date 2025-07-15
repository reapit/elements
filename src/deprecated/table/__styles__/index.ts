import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElDeprecatedIcon } from '../../icon/__styles__'
import { elIsActive } from '../../../styles/states'

/** @deprecated */
export const isNarrow = '@media only screen and (max-width: 1024px)'

const EXPANDABLE_TRIGGER_CELL_WIDTH = '40px'
const CALL_TO_ACTION_CELL_WIDTH = '100px'

const MAX_HEADER_HEIGHT = '3rem'
const MAX_TABLE_CONTENT_HEIGHT = '60px'
const MAX_LINE_LENGTH = 2

/** @deprecated */
export const ElTableCellNarrowOrder1 = css`
  ${isNarrow} {
    order: 0;
  }
`

/** @deprecated */
export const ElTableCellNarrowOrder2 = css`
  ${isNarrow} {
    order: 1;
  }
`

/** @deprecated */
export const ElTableCellNarrowOrder3 = css`
  ${isNarrow} {
    order: 2;
  }
`

/** @deprecated */
export const ElTableCellNarrowOrder4 = css`
  ${isNarrow} {
    order: 3;
  }
`

/** @deprecated */
export const ElTableCellNarrowOrder5 = css`
  ${isNarrow} {
    order: 4;
  }
`

/** @deprecated */
export const ElTableCellNarrowOrder6 = css`
  ${isNarrow} {
    order: 5;
  }
`

/** @deprecated */
export const ElTableCellNarrowOrder7 = css`
  ${isNarrow} {
    order: 6;
  }
`

/** @deprecated */
export const ElTableCellNarrowOrder8 = css`
  ${isNarrow} {
    order: 7;
  }
`

/** @deprecated */
export const ElTableCellNarrowOrder9 = css`
  ${isNarrow} {
    order: 8;
  }
`

/** @deprecated */
export const ElTableCellNarrowOrder10 = css`
  ${isNarrow} {
    order: 9;
  }
`

/** @deprecated */
export const ElTableCellNarrowOrder11 = css`
  ${isNarrow} {
    order: 10;
  }
`

/** @deprecated */
export const ElTableCellNarrowOrder12 = css`
  ${isNarrow} {
    order: 11;
  }
`

const cellOrders = `
  &:nth-child(1) {
    order: 0;
  }

  &:nth-child(2) {
    order: 1;
  }

  &:nth-child(3) {
    order: 2;
  }

  &:nth-child(4) {
    order: 3;
  }

  &:nth-child(5) {
    order: 4;
  }

  &:nth-child(6) {
    order: 5;
  }

  &:nth-child(7) {
    order: 6;
  }

  &:nth-child(8) {
    order: 7;
  }

  &:nth-child(9) {
    order: 8;
  }

  &:nth-child(10) {
    order: 9;
  }

  &:nth-child(11) {
    order: 10;
  }

  &:nth-child(12) {
    order: 11;
  }
`

// modifiers
/** @deprecated */
export const elTableNarrowCellIsFullWidth = css`
  ${isNarrow} {
    grid-column-end: span 2;
    text-align: center;
  }
`

/** @deprecated */
export const elTableCellHasDarkText = css``

/** @deprecated */
export const elTableRowFocused = css`
  background: var(--purple-050);
`

// molecules
/** @deprecated */
export const ElDeprecatedTableHeadersRow = styled.div`
  display: grid;

  /* the below "grid-template-columns" is a bit mad, so I'll explain the constituent parts... */

  /* - "repeat(" - takes 2 args. The first is the number of columns (or auto-fit
   * if not supplied). The second is the width of each column */

  /* - "var(--component-table-num-columns, auto-fit)" - this is saying that if the
   * number of columns is known through our variable (set by the data-columns attribute)
   * on the ElDeprecatedTable element, then use that. Otherwise use CSS auto-fit, which will
   * work out the number of columns based on what's in the DOM. This is required as
   * people using this table could put any number of columns in. Unless the CSS is
   * explicitly told the number of columns, it doesn't know. */

  /* - minmax(var(--component-table-min-column-width), 1fr)) - this sets the width
   * of each column. The columns will be a minimum of the variable and a maximum
   * of 1fr (i.e. equal column widths) */

  /* - var(--component-table-expandable-trigger-width, 0); - This bit at the end
   * will add one additional column. It's width will be set by the variable, otherwise
   * it will be 0 if the variable isn't defined. The idea here is that the button at the
   * end of each row to open/close the expandable row is quite small, and by defining a
   * set width for this column only the other columns can expand into the remaining space.
   * If there are no expandable rows in the table, this variable can be left undefined
   * and 0 will be used as the value. The column will still be there but won't be useful.
   * The variable component-table-num-columns should be the number of columns MINUS
   * the column that has the button to trigger the expandable row. */

  grid-template-columns:
    repeat(var(--component-table-num-columns, auto-fit), minmax(var(--component-table-min-column-width), 1fr))
    var(--component-table-expandable-trigger-width, 0);
  border-bottom: 1px solid var(--neutral-100);

  ${isNarrow} {
    display: none;
  }
`

/** @deprecated */
export const ElDeprecatedTableHeader = styled.div`
  color: var(--neutral-400);
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  height: ${MAX_HEADER_HEIGHT};
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: var(--font-size-smallest);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;

  ${cellOrders}
`

/** @deprecated */
export const ElDeprecatedTableRow = styled.div`
  display: grid;
  /* see above for the explanation of this line */
  grid-template-columns:
    repeat(var(--component-table-num-columns, auto-fit), minmax(var(--component-table-min-column-width), 1fr))
    var(--component-table-expandable-trigger-width, 0);
  background: var(--white);
  border-bottom: 1px solid var(--neutral-100);

  ${isNarrow} {
    grid-template-columns: 1fr 1fr;
  }
`

/** @deprecated */
export const ElTableCtaCell = styled.div`
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.75rem 0.5rem;
  order: 12;

  ${isNarrow} {
    text-align: center;
    justify-content: right;
    justify-self: end;
    padding: 0;
    grid-column-end: 3;
  }
`

/** @deprecated */
export const ElDeprecatedTableCell = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: var(--neutral-500);
  /* margin-right: 2px; */
  overflow-wrap: anywhere;
  font-size: var(--font-size-small);

  &:last-child {
    margin-right: 0;
  }

  ${cellOrders}

  ${ElDeprecatedIcon} {
    margin-right: 0.75rem;
  }

  &.${elTableCellHasDarkText} {
    color: var(--black);
  }
`

/** @deprecated */
export const ElTableCellSplitWrap = styled.div`
  display: flex;
  flex-direction: column;
`

/** @deprecated */
export const ElTableCellSplitData = styled.div`
  font-size: var(--font-size-small);
  color: var(--black);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

/** @deprecated */
export const ElTableCellSplitSubData = styled.div`
  font-size: var(--font-size-smallest);
  color: var(--neutral-500);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

/** @deprecated */
export const ElTableExpandableRowTriggerCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.75rem;
  order: 12;

  ${isNarrow} {
    text-align: center;
    justify-self: end;
    grid-column-end: 3;
  }
`

/** @deprecated */
export const ElDeprecatedTableRowContainer = styled.div`
  &:focus,
  &.${elIsActive}, .${elTableRowFocused} {
    background: var(--purple-050);

    ${ElDeprecatedTableCell}, ${ElTableExpandableRowTriggerCell}, ${ElDeprecatedTableRow}, ${ElTableCtaCell} {
      background: var(--purple-050);
    }
  }

  &:not(.${elIsActive}) {
    background: var(--white);

    ${ElDeprecatedTableCell}, ${ElTableExpandableRowTriggerCell}, ${ElDeprecatedTableRow}, ${ElTableCtaCell} {
      background: var(--white);
    }
  }

  &:hover:not(.${elIsActive}) {
    background-color: var(--neutral-100);

    ${ElDeprecatedTableCell}, ${ElTableExpandableRowTriggerCell}, ${ElDeprecatedTableRow}, ${ElTableCtaCell} {
      background-color: var(--neutral-100);
    }
  }
`

/** @deprecated */
export const ElDeprecatedTableCellContent = styled.div`
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: ${MAX_LINE_LENGTH};
  -webkit-box-orient: vertical;
  max-height: calc(${MAX_TABLE_CONTENT_HEIGHT} - 0.75rem);
  overflow: hidden;
  line-height: 1rem;
  text-overflow: ellipsis;

  ${isNarrow} {
    &::before {
      display: block;
      content: attr(data-narrow-label);
      width: 100%;
      color: var(--black);
    }
  }
`

/** @deprecated */
export const ElTableCtaIconContainer = styled.div`
  ${isNarrow} {
    padding: 0.75rem;
  }
`

/** @deprecated */
export const ElTableExpandableRow = styled.div`
  height: 0;
  background: var(--white);
  opacity: 0;
  border: none;
  overflow-y: scroll;
  padding: 0;

  &.${elIsActive} {
    height: auto;
    opacity: 1;
  }
`

/** @deprecated */
export const ElTableExpandableContainer = styled.div`
  padding: 1rem 0.5rem;
  border-bottom: 1px solid var(--neutral-100);
`

/** @deprecated */
export const ElDeprecatedTable = styled.div`
  &[data-force-narrow-table='true'] {
    ${ElTableExpandableRowTriggerCell} {
      text-align: center;
      justify-self: end;
      grid-column-end: 3;
    }

    ${ElTableCtaCell} {
      text-align: center;
      justify-content: right;
      justify-self: end;
      padding: 0;
      grid-column-end: 3;
    }

    ${ElTableCtaIconContainer} {
      padding: 0.75rem;
    }

    ${ElDeprecatedTableCellContent} {
      &::before {
        display: block;
        content: attr(data-narrow-label);
        width: 100%;
        color: var(--black);
      }
    }

    ${ElDeprecatedTableRow} {
      grid-template-columns: 1fr 1fr;
    }

    ${ElDeprecatedTableHeadersRow} {
      display: none;
    }

    .${elTableNarrowCellIsFullWidth} {
      grid-column-end: span 2;
      text-align: center;
    }

    ${ElTableCellNarrowOrder1} {
      order: 0;
    }

    ${ElTableCellNarrowOrder2} {
      order: 1;
    }

    ${ElTableCellNarrowOrder3} {
      order: 2;
    }

    ${ElTableCellNarrowOrder4} {
      order: 3;
    }

    ${ElTableCellNarrowOrder5} {
      order: 4;
    }

    ${ElTableCellNarrowOrder6} {
      order: 5;
    }

    ${ElTableCellNarrowOrder7} {
      order: 6;
    }

    ${ElTableCellNarrowOrder8} {
      order: 7;
    }

    ${ElTableCellNarrowOrder9} {
      order: 8;
    }

    ${ElTableCellNarrowOrder10} {
      order: 9;
    }

    ${ElTableCellNarrowOrder11} {
      order: 10;
    }

    ${ElTableCellNarrowOrder12} {
      order: 11;
    }
  }

  &[data-num-columns-excl-action-col='2'] {
    --component-table-num-columns: 2;
  }
  &[data-num-columns-excl-action-col='3'] {
    --component-table-num-columns: 3;
  }
  &[data-num-columns-excl-action-col='4'] {
    --component-table-num-columns: 4;
  }
  &[data-num-columns-excl-action-col='5'] {
    --component-table-num-columns: 5;
  }
  &[data-num-columns-excl-action-col='6'] {
    --component-table-num-columns: 6;
  }
  &[data-num-columns-excl-action-col='7'] {
    --component-table-num-columns: 7;
  }
  &[data-num-columns-excl-action-col='8'] {
    --component-table-num-columns: 8;
  }
  &[data-num-columns-excl-action-col='9'] {
    --component-table-num-columns: 9;
  }
  &[data-num-columns-excl-action-col='10'] {
    --component-table-num-columns: 10;
  }
  &[data-num-columns-excl-action-col='11'] {
    --component-table-num-columns: 11;
  }
  &[data-num-columns-excl-action-col='12'] {
    --component-table-num-columns: 12;
  }

  &[data-has-expandable-action='true'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
  }

  &[data-has-call-to-action='true'] {
    --component-table-expandable-trigger-width: ${CALL_TO_ACTION_CELL_WIDTH};
  }
`

/** @deprecated */
export const ElDeprecatedTableSortHeader = styled.div`
  width: 100%;
  cursor: pointer;
`
