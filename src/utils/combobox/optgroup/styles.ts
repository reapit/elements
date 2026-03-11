import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElComboboxOptgroup = styled.div`
  display: flex;
  flex-direction: column;

  padding-inline: var(--spacing-2);
`

export const ElComboboxOptgroupLabelContainer = styled.div`
  position: sticky;
  top: 0;

  background: var(--colour-fill-white);

  ${font('2xs', 'bold')}
  text-transform: uppercase;

  color: var(--comp-menu-colour-text-group_title);
  padding-block: var(--spacing-2);
  padding-inline: var(--spacing-3);
`
