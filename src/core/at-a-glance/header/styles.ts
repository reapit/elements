import { styled } from '@linaria/react'
import { font } from '#src/core/text'

export const ElAtAGlanceHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: start;
  gap: var(--spacing-2);
  width: 100%;
`

export const ElAtAGlanceHeaderTitle = styled.h1`
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  padding: 0;

  ${font('lg', 'medium')}
  color: var(--colour-text-primary);
`
