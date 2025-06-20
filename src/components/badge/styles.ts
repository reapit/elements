import { styled } from '@linaria/react'
import { ElDeprecatedIcon } from '../deprecated-icon'

export const ElBadgeIcon = styled.span``

export const ElBadge = styled.div`
  display: inline-flex;
  height: var(--size-5);
  padding: var(--spacing-half) var(--spacing-1);
  align-items: center;
  gap: var(--spacing-half);
  border-radius: var(--comp-badge-border-radius);
  color: var(--comp-badge-colour-text-default-neutral);
  background: var(--comp-badge-colour-fill-default-neutral);

  ${ElBadgeIcon} {
    color: var(--comp-badge-colour-icon-default-neutral);

    ${ElDeprecatedIcon} {
      width: var(--icon_size-xs);
      height: var(--icon_size-xs);
    }
  }

  &[data-variant='neutral'] {
    color: var(--comp-badge-colour-text-default-neutral);
    background: var(--comp-badge-colour-fill-default-neutral);

    ${ElBadgeIcon} {
      color: var(--comp-badge-colour-icon-default-neutral);
    }
  }

  &[data-is-reversed='true'] {
    color: var(--comp-badge-colour-text-reversed-neutral);
    background: var(--comp-badge-colour-fill-reversed-neutral);

    ${ElBadgeIcon} {
      color: var(--comp-badge-colour-icon-reversed-neutral);
    }
  }

  &[data-variant='success'] {
    color: var(--comp-badge-colour-text-default-success);
    background: var(--comp-badge-colour-fill-default-success);

    ${ElBadgeIcon} {
      color: var(--comp-badge-colour-icon-default-success);
    }

    &[data-is-reversed='true'] {
      color: var(--comp-badge-colour-text-reversed-success);
      background: var(--comp-badge-colour-fill-reversed-success);

      ${ElBadgeIcon} {
        color: var(--comp-badge-colour-icon-reversed-success);
      }
    }
  }

  &[data-variant='pending'] {
    color: var(--comp-badge-colour-text-default-pending);
    background: var(--comp-badge-colour-fill-default-pending);

    ${ElBadgeIcon} {
      color: var(--comp-badge-colour-icon-default-pending);
    }

    &[data-is-reversed='true'] {
      color: var(--comp-badge-colour-text-reversed-pending);
      background: var(--comp-badge-colour-fill-reversed-pending);

      ${ElBadgeIcon} {
        color: var(--comp-badge-colour-icon-reversed-pending);
      }
    }
  }

  &[data-variant='warning'] {
    color: var(--comp-badge-colour-text-default-warning);
    background: var(--comp-badge-colour-fill-default-warning);

    ${ElBadgeIcon} {
      color: var(--comp-badge-colour-icon-default-warning);
    }

    &[data-is-reversed='true'] {
      color: var(--comp-badge-colour-text-reversed-warning);
      background: var(--comp-badge-colour-fill-reversed-warning);

      ${ElBadgeIcon} {
        color: var(--comp-badge-colour-icon-reversed-warning);
      }
    }
  }

  &[data-variant='danger'] {
    color: var(--comp-badge-colour-text-default-danger);
    background: var(--comp-badge-colour-fill-default-danger);

    ${ElBadgeIcon} {
      color: var(--comp-badge-colour-icon-default-danger);
    }

    &[data-is-reversed='true'] {
      color: var(--comp-badge-colour-text-reversed-danger);
      background: var(--comp-badge-colour-fill-reversed-danger);

      ${ElBadgeIcon} {
        color: var(--comp-badge-colour-icon-reversed-danger);
      }
    }
  }

  &[data-variant='inactive'] {
    color: var(--comp-badge-colour-text-default-inactive);
    background: var(--comp-badge-colour-fill-default-inactive);

    ${ElBadgeIcon} {
      color: var(--comp-badge-colour-icon-default-inactive);
    }

    &[data-is-reversed='true'] {
      color: var(--comp-badge-colour-text-reversed-inactive);
      background: var(--comp-badge-colour-fill-reversed-inactive);

      ${ElBadgeIcon} {
        color: var(--comp-badge-colour-icon-reversed-inactive);
      }
    }
  }

  &[data-variant='accent_1'] {
    color: var(--comp-badge-colour-text-default-accent_1);
    background: var(--comp-badge-colour-fill-default-accent_1);

    ${ElBadgeIcon} {
      color: var(--comp-badge-colour-icon-default-accent_1);
    }

    &[data-is-reversed='true'] {
      color: var(--comp-badge-colour-text-reversed-accent_1);
      background: var(--comp-badge-colour-fill-reversed-accent_1);

      ${ElBadgeIcon} {
        color: var(--comp-badge-colour-icon-reversed-accent_1);
      }
    }
  }

  &[data-variant='accent_2'] {
    color: var(--comp-badge-colour-text-default-accent_2);
    background: var(--comp-badge-colour-fill-default-accent_2);

    ${ElBadgeIcon} {
      color: var(--comp-badge-colour-icon-default-accent_2);
    }

    &[data-is-reversed='true'] {
      color: var(--comp-badge-colour-text-reversed-accent_2);
      background: var(--comp-badge-colour-fill-reversed-accent_2);

      ${ElBadgeIcon} {
        color: var(--comp-badge-colour-icon-reversed-accent_2);
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
  font-family: var(--font-xs-medium-family);
  font-size: var(--font-xs-medium-size);
  font-style: normal;
  font-weight: var(--font-xs-medium-weight);
  line-height: var(--font-xs-medium-line_height);
  letter-spacing: var(--font-xs-medium-letter_spacing);
`
