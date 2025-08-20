import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElEmptyDataDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
`

export const ElEmptyDataDescriptionTitle = styled.h3`
  color: var(--text-primary);
  ${font('base', 'regular')}

  margin: 0;
  padding: 0;
`

export const ElEmptyDataDescriptionSecondaryText = styled.p`
  color: var(--text-secondary);
  ${font('sm', 'regular')}

  margin: 0;
  padding: 0;
`
