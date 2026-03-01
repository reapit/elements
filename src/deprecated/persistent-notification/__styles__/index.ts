import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElDeprecatedIcon } from '../../icon/__styles__'
import { elIsActive } from '../../../styles/deprecated-states'
import {
  elIntentPrimary,
  elIntentNeutral,
  elIntentSuccess,
  elIntentPending,
  elIntentWarning,
  elIntentDanger,
  elIntentDefault,
} from '../../../styles/deprecated-intent'

/** @deprecated */
export const elPnIsFullWidth = css``

/** @deprecated */
export const elPnIsFixed = css``

/** @deprecated */
export const elPnIsInline = css``

/** @deprecated */
export const elPnIcon = css`
  padding-left: 0.75rem;
  display: flex;
  align-items: center;
  border-radius: 0.25rem /* was --default-border-radius */ 0 0 0.25rem /* was --default-border-radius */;
  cursor: pointer;

  ${ElDeprecatedIcon} {
    color: var(--colour-text-white);
  }
`

/** @deprecated */
export const elPnContent = css`
  padding: 0.75rem;
  transition: 0.5s;
  width: 100%;
  color: var(--colour-text-primary);
  font-size: 0.9375rem /* was --font-size-default */;
`

/** @deprecated */
export const ElPersistentNotification = styled.div`
  display: flex;
  position: absolute;
  max-width: 50%;
  right: 0;
  transform: translateX(calc(100% - 2.5rem));
  transition: 0.5s;
  z-index: 10;
  font-size: 0.9375rem /* was --font-size-default */;

  &.${elIsActive} {
    right: 0;
    transform: translateX(calc(0%));
  }

  &.${elPnIsFullWidth} {
    width: 100%;
    max-width: 100%;
    flex: 1 0 auto;
  }

  &.${elPnIsFixed} {
    position: fixed;
    top: 1rem;
  }

  &.${elPnIsInline} {
    z-index: auto;
    position: relative;
    background: var(--colour-fill-white);
    .${elPnContent} {
      border-radius: 0 0.25rem /* was --default-border-radius */ 0.25rem /* was --default-border-radius */ 0;
    }
  }

  &.${elIntentPrimary} {
    .${elPnContent} {
      background: var(--colour-fill-action-lightest);
    }

    .${elPnIcon} {
      background: var(--colour-fill-action-lightest);

      svg {
        color: var(--colour-text-action);
      }
    }
  }

  &.${elIntentNeutral} {
    .${elPnContent} {
      background: var(--colour-fill-info-lightest);
    }

    .${elPnIcon} {
      background: var(--colour-fill-info-lightest);

      svg {
        color: var(--colour-text-info);
      }
    }
  }

  &.${elIntentSuccess} {
    .${elPnContent} {
      background: var(--colour-fill-success-lightest);
    }

    .${elPnIcon} {
      background: var(--colour-fill-success-lightest);

      svg {
        color: var(--colour-text-success);
      }
    }
  }

  &.${elIntentPending} {
    .${elPnContent} {
      background: var(--colour-fill-pending-lightest);
    }

    .${elPnIcon} {
      background: var(--colour-fill-pending-lightest);

      svg {
        color: var(--colour-text-pending);
      }
    }
  }

  &.${elIntentWarning} {
    .${elPnContent} {
      background: var(--colour-fill-warning-lightest);
    }

    .${elPnIcon} {
      background: var(--colour-fill-warning-lightest);

      svg {
        color: var(--colour-text-warning);
      }
    }
  }

  &.${elIntentDanger} {
    .${elPnContent} {
      background: var(--colour-fill-error-lightest);
    }

    .${elPnIcon} {
      background: var(--colour-fill-error-lightest);

      svg {
        color: var(--colour-text-error);
      }
    }
  }

  &.${elIntentDefault} {
    .${elPnContent} {
      background: var(--colour-fill-neutral-lightest);
    }

    .${elPnIcon} {
      background: var(--colour-fill-neutral-lightest);

      svg {
        color: var(--colour-text-primary);
      }
    }
  }
`
