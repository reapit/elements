import { css } from '@linaria/core'
import { font } from '#src/core/text'

export const elTableRowPrimaryAction = css`
  display: inline-grid;
  align-items: center;
  border: none;
  margin: 0;
  padding: 0;

  ${font('sm', 'medium')}

  background: transparent;
  color: var(--colour-text-primary);
  text-decoration: none;

  outline: none;

  &::after {
    content: '';
    display: block;
    position: absolute;
    inset: 0 0 0 0;
  }

  &:focus-visible {
    /* We increase the z-index to ensure the focus outline is above subsequent sibling table
     * row hover styles */
    z-index: 1;

    &::after {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }
  }
`
