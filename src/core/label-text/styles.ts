import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElLabelText = styled.span`
  display: inline-flex;
  gap: var(--spacing-1);

  font: inherit;

  &[data-size='xs'] {
    ${font('xs', 'regular')}
  }
  &[data-size='sm'] {
    ${font('sm', 'regular')}
  }

  &[data-variant='soft'] {
    color: var(--neutral-500);
  }
  &[data-variant='strong'] {
    color: var(--text-primary);
  }
`
