import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElPaginationInfo = styled.span`
  @layer elements.main {
    min-width: var(--size-12);

    color: var(--colour-text-primary);
    ${font('base', 'regular')}
    text-align: center;
  }
`
