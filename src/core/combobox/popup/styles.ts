import { css } from '@linaria/core'
import { ElDivider } from '#src/core/divider'
import { ElComboboxOptgroup } from '../optgroup'

export const elComboboxPopupPopover = css`
  /* NOTE: This CSS variable is also referenced in popup-popover.tsx for width calculations */
  --combobox-popup-popover-padding: var(--spacing-2);

  background: var(--colour-fill-white);
  border-radius: var(--comp-menu-border-radius);

  padding: var(--combobox-popup-popover-padding);

  /* Support nested dividers and optgroups for CSSContainerQuery wrapper compatibility */
  & ${ElDivider} {
    margin-inline: calc(0px - var(--combobox-popup-popover-padding));
  }

  & ${ElComboboxOptgroup} {
    margin-inline: calc(0px - var(--combobox-popup-popover-padding));

    &:first-child {
      padding-block-start: var(--combobox-popup-popover-padding);
      margin-block-start: calc(0px - var(--combobox-popup-popover-padding));
    }
  }
`
