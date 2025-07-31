import { css } from '@linaria/core'
import { ElMenuGroup } from './group'
import { ElMenuDivider } from './divider'

export const elMenu = css`
  background: var(--colour-fill-white);
  border-radius: var(--comp-menu-border-radius);

  padding: var(--spacing-2);

  & > ${ElMenuDivider} {
    margin-inline: calc(0px - var(--spacing-2));
  }

  & > ${ElMenuGroup} {
    margin-inline: calc(0px - var(--spacing-2));

    &:first-child {
      padding-block-start: var(--spacing-2);
      margin-block-start: calc(0px - var(--spacing-2));
    }
  }
`
