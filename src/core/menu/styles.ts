import { styled } from '@linaria/react'
import { ElMenuGroup } from './group'
import { ElMenuDivider } from './divider'

export const ElMenuContent = styled.div`
  background: var(--colour-fill-white);

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
