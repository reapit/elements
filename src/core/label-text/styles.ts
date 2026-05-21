import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElLabelText = styled.span`
  @layer elements.main {
    display: inline-flex;
    gap: var(--spacing-1);

    font: inherit;
    color: inherit;

    &[data-size='xs'] {
      ${font('xs', 'regular')}
    }
    &[data-size='sm'] {
      ${font('sm', 'regular')}
    }

    &[data-variant='soft'] {
      color: var(--colour-text-secondary);
    }
    &[data-variant='strong'] {
      color: var(--colour-text-primary);
    }
  }
`
