import { font } from '#src/core/text/index'
import { styled } from '@linaria/react'

export const ElTag = styled.span`
  padding: var(--spacing-half) var(--spacing-3);

  border-radius: var(--comp-tag-border-radius);
  background: var(--comp-tag-colour-fill);
  color: var(--comp-tag-colour-text);

  ${font('xs', 'medium')}
  white-space: nowrap;
`
