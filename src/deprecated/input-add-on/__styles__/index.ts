import { styled } from '@linaria/react'
import {
  elIntentPrimary,
  elIntentSuccess,
  elIntentDanger,
  elIntentNeutral,
  elIntentPending,
  elIntentWarning,
  elIntentDefault,
} from '../../../styles/deprecated-intent'

/** @deprecated */
export const ElInputAddOn = styled.span`
  font-size: 0.9375rem /* was --font-size-default */;
  color: var(--neutral-400);

  &.${elIntentPrimary} {
    color: var(--colour-text-action);
  }

  &.${elIntentNeutral} {
    color: var(--colour-text-info);
  }

  &.${elIntentSuccess} {
    color: var(--colour-text-success);
  }

  &.${elIntentPending} {
    color: var(--colour-text-pending);
  }

  &.${elIntentWarning} {
    color: var(--colour-text-warning);
  }

  &.${elIntentDanger} {
    color: var(--colour-text-error);
  }

  &.${elIntentDefault} {
    color: var(--colour-text-neutral);
  }
`
