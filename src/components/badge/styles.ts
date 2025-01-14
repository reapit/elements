import { styled } from '@linaria/react'
import { ElIcon } from '../icon'

export const ElBadge = styled.div`
  display: inline-flex;
  height: var(--size-5);
  padding: var(--spacing-half) var(--spacing-1);
  align-item: center;
  gap: var(--spacing-half);
  border-radius: var(--corner-default);
  color: var(--text-info);
  background: var(--fill-info-lightest);

  ${ElIcon} {
    width: var(--icon-xs);
    height: var(--icon-xs);
    color: inherit;
  }

  &[data-variant='neutral'] {
    color: var(--text-info);
    background: var(--fill-info-lightest);
  }

  &[data-is-reversed='true'] {
    color: var(--text-white);
    background: var(--fill-info-dark);
  }

  &[data-variant='success'] {
    color: var(--text-success);
    background: var(--fill-success-lightest);

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-success-dark);
    }
  }

  &[data-variant='pending'] {
    color: var(--text-pending);
    background: var(--fill-pending-lightest);

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-pending-dark);
    }
  }

  &[data-variant='warning'] {
    color: var(--text-warning);
    background: var(--fill-warning-lightest);

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-warning-dark);
    }
  }

  &[data-variant='danger'] {
    color: var(--text-error);
    background: var(--fill-error-lightest);

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-error-dark);
    }
  }

  &[data-variant='inactive'] {
    color: var(--text-secondary);
    background: var(--fill-default-lightest);

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-default-medium);
    }
  }

  &[data-variant='accent_1'] {
    color: var(--text-accent_1);
    background: var(--fill-accent_1-lightest);

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-accent_1-dark);
    }
  }

  &[data-variant='accent_2'] {
    color: var(--text-accent_2);
    background: var(--fill-accent_2-lightest);

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-accent_2-dark);
    }
  }
`

// Badge Label style
export const ElBadgeLabel = styled.span`
  text-align: center;
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-style: normal;
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);
`
