import { font } from '#src/components/text'
import { styled } from '@linaria/react'

export const ElTag = styled.span`
  padding: var(--spacing-half) var(--spacing-3);

  border-radius: var(--comp-tag-border-radius);
  background: var(--comp-tag-colour-fill);

  ${font('xs', 'medium')}
`
