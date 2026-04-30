import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElEmptyStateDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
`

export const ElEmptyStateDescriptionTitle = styled.h3`
  color: var(--colour-text-primary);
  ${font('base', 'regular')}

  margin: 0;
  padding: 0;
`

export const ElEmptyStateDescriptionSecondaryText = styled.p`
  color: var(--colour-text-secondary);
  ${font('sm', 'regular')}

  margin: 0;
  padding: 0;
`
