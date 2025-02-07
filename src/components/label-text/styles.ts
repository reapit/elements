import { styled } from '@linaria/react'

export const ElLabelText = styled.span`
  font-family: var(--font-family);
  font-style: normal;
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
  display: inline-flex;
  gap: var(--spacing-1);
  &[data-size='small'] {
    font-size: var(--font-size-xs);
  }
  &[data-size='medium'] {
    font-size: var(--font-size-sm);
  }
  &[data-variant='soft'] {
    color: var(--neutral-500);
  }
  &[data-variant='strong'] {
    color: var(--text-primary);
  }
`
export const ElLabelRequiredMark = styled.span``
