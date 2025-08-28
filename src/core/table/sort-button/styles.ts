import { css } from '@linaria/core'
import { font } from '#src/core/text'

export const elTableCellSortButton = css`
  display: inline-grid;
  grid-template-columns: minmax(auto, min-content) min-content;
  grid-template-rows: auto;
  align-items: center;
  justify-content: inherit;
  gap: var(--spacing-1);
  width: 100%;

  border: none;
  border-radius: var(--border-radius-m);
  padding: var(--spacing-2);

  background: transparent;
  color: var(--colour-text-secondary);

  cursor: pointer;

  ${font('2xs', 'bold')}
  text-align: center;
  text-transform: uppercase;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  &:hover {
    background: var(--colour-fill-neutral-lightest);
  }
`

export const elTableCellSortButtonIcon = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: var(--icon_size-s);
  height: var(--icon_size-s);

  color: var(--colour-icon-disabled);

  [value='ascending'] & {
    color: var(--colour-icon-secondary);
    transform: rotate(180deg);
  }

  [value='descending'] & {
    color: var(--colour-icon-secondary);
  }
`
