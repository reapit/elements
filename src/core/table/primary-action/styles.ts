import { css } from '@linaria/core'
import { font } from '#src/utils/font'

export const elTableRowPrimaryAction = css`
  @layer elements.main {
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

    /* Explicitly places the primary action (and its ::after overlay) at the base stacking
     * level within the isolated row context. Interactive elements (checkbox, more-actions)
     * use --z-index-elevated to sit above this overlay. */
    z-index: var(--z-index-base);

    &::after {
      content: '';
      display: block;
      position: absolute;
      inset: 0;
    }

    &:focus-visible {
      &::after {
        outline: var(--border-width-double) solid var(--colour-border-focus);
        outline-offset: var(--border-width-default);
      }
    }
  }
`
