import { styled } from '@linaria/react'
import { ElIcon } from '../icon'

export const ElBadgeIcon = styled.span``

export const ElBadge = styled.div`
  display: inline-flex;
  height: var(--size-5);
  padding: var(--spacing-half) var(--spacing-1);
  align-items: center;
  gap: var(--spacing-half);
  border-radius: var(--corner-default);
  color: var(--text-info);
  background: var(--fill-info-lightest);

  ${ElBadgeIcon} {
    color: var(--icon-info);

    ${ElIcon} {
      width: var(--icon-xs);
      height: var(--icon-xs);
    }
  }

  &[data-variant='neutral'] {
    color: var(--text-info);
    background: var(--fill-info-lightest);

    ${ElBadgeIcon} {
      color: var(--icon-info);
    }
  }

  &[data-is-reversed='true'] {
    color: var(--text-white);
    background: var(--fill-info-dark);

    ${ElBadgeIcon} {
      color: var(--icon-white);
    }
  }

  &[data-variant='success'] {
    color: var(--text-success);
    background: var(--fill-success-lightest);

    ${ElBadgeIcon} {
      color: var(--icon-success);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-success-dark);

      ${ElBadgeIcon} {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='pending'] {
    color: var(--text-pending);
    background: var(--fill-pending-lightest);

    ${ElBadgeIcon} {
      color: var(--icon-pending);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-pending-dark);

      ${ElBadgeIcon} {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='warning'] {
    color: var(--text-warning);
    background: var(--fill-warning-lightest);

    ${ElBadgeIcon} {
      color: var(--icon-warning);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-warning-dark);

      ${ElBadgeIcon} {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='danger'] {
    color: var(--text-error);
    background: var(--fill-error-lightest);

    ${ElBadgeIcon} {
      color: var(--icon-error);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-error-dark);

      ${ElBadgeIcon} {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='inactive'] {
    color: var(--text-secondary);
    background: var(--fill-default-lightest);

    ${ElBadgeIcon} {
      color: var(--icon-secondary);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-default-medium);

      ${ElBadgeIcon} {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='accent_1'] {
    color: var(--text-accent_1);
    background: var(--fill-accent_1-lightest);

    ${ElBadgeIcon} {
      color: var(--icon-accent_1);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-accent_1-dark);

      ${ElBadgeIcon} {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='accent_2'] {
    color: var(--text-accent_2);
    background: var(--fill-accent_2-lightest);

    ${ElBadgeIcon} {
      color: var(--icon-accent_2);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-accent_2-dark);

      ${ElBadgeIcon} {
        color: var(--icon-white);
      }
    }
  }
`

// Badge Label style
export const ElBadgeLabel = styled.span`
  display: flex;
  padding: 0px var(--spacing-half);
  align-items: center;
  text-align: center;
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-style: normal;
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);
`
