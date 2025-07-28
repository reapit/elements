import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElMenuGroup = styled.div`
  display: flex;
  flex-direction: column;

  padding-inline: var(--spacing-2);
`

export const ElMenuGroupLabelContainer = styled.div`
  ${font('2xs', 'bold')}
  text-transform: uppercase;

  color: var(--comp-menu-colour-text-group_title, #9faebc);
  padding-block: var(--spacing-2);
  padding-inline: var(--spacing-3);
`
