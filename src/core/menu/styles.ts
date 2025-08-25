import { css } from '@linaria/core'
import { ElDivider } from '#src/core/divider'
import { ElMenuGroup } from './group'

export const elMenu = css`
  background: var(--colour-fill-white);
  border-radius: var(--comp-menu-border-radius);

  padding: var(--spacing-2);

  /* NOTE: We do NOT use the immediate child selector here because we want to allow
     for dividers and menu groups to be nested within other elements. This is primarily
     to support the use of CSSContainerQuery and it's reliance on a wrapping <div> */
  & ${ElDivider} {
    margin-inline: calc(0px - var(--spacing-2));
  }

  & ${ElMenuGroup} {
    margin-inline: calc(0px - var(--spacing-2));

    &:first-child {
      padding-block-start: var(--spacing-2);
      margin-block-start: calc(0px - var(--spacing-2));
    }
  }
`
