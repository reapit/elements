import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElEmptyStateDescription = styled.div`
  @layer elements.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-2);

    text-align: center;
  }
`

export const ElEmptyStateDescriptionTitle = styled.h3`
  @layer elements.main {
    color: var(--colour-text-primary);
    ${font('lg', 'bold')}

    margin: 0;
    padding: 0;
  }
`

export const ElEmptyStateDescriptionSecondaryText = styled.p`
  @layer elements.main {
    color: var(--colour-text-secondary);
    ${font('base', 'regular')}

    margin: 0;
    padding: 0;
  }
`
