import { styled } from '@linaria/react'

export const ElStatusIndicatorShape = styled.span`
  width: var(--size-2);
  height: var(--size-2);
  border-radius: 100%;

  &[data-variant='neutral'] {
    background: var(--icon-info);
  }

  &[data-variant='success'] {
    background: var(--icon-success);
  }

  &[data-variant='pending'] {
    background: var(--icon-pending);
  }

  &[data-variant='warning'] {
    background: var(--icon-warning);
  }

  &[data-variant='danger'] {
    background: var(--icon-error);
  }

  &[data-variant='inactive'] {
    background: var(--icon-secondary);
  }

  &[data-variant='accent1'] {
    background: var(--icon-accent_1);
  }

  &[data-variant='accent2'] {
    background: var(--icon-accent_2);
  }
`

export const ElStatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);

  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-style: normal;
  font-weight: 400;
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
`
