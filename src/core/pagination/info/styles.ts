import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElPaginationInfo = styled.span`
  min-width: var(--size-12);

  color: var(--colour-text-primary);
  ${font('base', 'regular')}
  text-align: center;
`
