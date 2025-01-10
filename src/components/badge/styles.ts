import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const elBadgeLabel = css``
export const elIcon = css``

export const ElBadge = styled.div`
  display: inline-flex;
  height: var(--size-5);
  padding: var(--spacing-half) var(--spacing-1);
  align-item: center;
  gap: var(--spacing-half);
  border-radius: var(--corner-default);
  color: var(--text-info);
  background: var(--fill-info-lightest);

  .${elIcon} {
    width: var(--icon-xs);
    height: var(--icon-xs);
    color: var(--icon-info);
  }

  &[data-variant='neutral'] {
    color: var(--text-info);
    background: var(--fill-info-lightest);
  }

  &[data-isReversed='true'] {
    color: var(--text-white);
    background: var(--fill-info-dark);

    .${elIcon} {
      color: var(--icon-white);
    }
  }

  &[data-variant='success'] {
    color: var(--text-success);
    background: var(--fill-success-lightest);

    .${elIcon} {
      color: var(--icon-success);
    }

    &[data-isReversed='true'] {
      color: var(--text-white);
      background: var(--fill-success-dark);

      .${elIcon} {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='pending'] {
    color: var(--text-pending);
    background: var(--fill-pending-lightest);

    .${elIcon} {
      color: var(--icon-pending);
    }

    &[data-isReversed='true'] {
      color: var(--text-white);
      background: var(--fill-pending-dark);

      .${elIcon} {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='warning'] {
    color: var(--text-warning);
    background: var(--fill-warning-lightest);

    .${elIcon} {
      color: var(--icon-warning);
    }

    &[data-isReversed='true'] {
      color: var(--text-white);
      background: var(--fill-warning-dark);

      .${elIcon} {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='danger'] {
    color: var(--text-error);
    background: var(--fill-error-lightest);

    .${elIcon} {
      color: var(--icon-error);
    }

    &[data-isReversed='true'] {
      color: var(--text-white);
      background: var(--fill-error-dark);

      .${elIcon} {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='inactive'] {
    color: var(--text-secondary);
    background: var(--fill-default-lightest);

    .${elIcon} {
      color: var(--icon-secondary);
    }

    &[data-isReversed='true'] {
      color: var(--text-white);
      background: var(--fill-default-medium);

      .${elIcon} {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='accent_1'] {
    color: var(--text-accent_1);
    background: var(--fill-accent_1-lightest);

    .${elIcon} {
      color: var(--icon-accent_1);
    }

    &[data-isReversed='true'] {
      color: var(--text-white);
      background: var(--fill-accent_1-dark);

      .${elIcon} {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='accent_2'] {
    color: var(--text-accent_2);
    background: var(--fill-accent_2-lightest);

    .${elIcon} {
      color: var(--icon-accent_2);
    }

    &[data-isReversed='true'] {
      color: var(--text-white);
      background: var(--fill-accent_2-dark);

      .${elIcon} {
        color: var(--icon-white);
      }
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
