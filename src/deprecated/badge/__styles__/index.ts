import { styled } from '@linaria/react'
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
export const ElDeprecatedBadge = styled.span`
  border-radius: 0.75rem;
  display: inline-block;
  font-size: 0.875rem /* was --font-size-small */;
  padding: 0.1rem 0.375rem;
  line-height: 20px;
  background: var(--colour-fill-neutral-lightest);
  color: var(--colour-text-primary);

  &.${elIntentPrimary} {
    color: var(--colour-text-action);
    background: var(--colour-fill-action-lightest);
  }

  &.${elIntentNeutral} {
    color: var(--colour-text-info);
    background: var(--colour-fill-info-lightest);
  }

  &.${elIntentSuccess} {
    color: var(--colour-text-success);
    background: var(--colour-fill-success-lightest);
  }

  &.${elIntentPending} {
    color: var(--colour-text-pending);
    background: var(--colour-fill-pending-lightest);
  }

  &.${elIntentWarning} {
    color: var(--colour-text-warning);
    background: var(--colour-fill-warning-lightest);
  }

  &.${elIntentDanger} {
    color: var(--colour-text-error);
    background: var(--colour-fill-error-lightest);
  }

  &.${elIntentDefault} {
    color: var(--colour-text-primary);
    background: var(--colour-fill-neutral-lightest);
  }
`

/** @deprecated */
export const ElDeprecatedBadgeGroup = styled.div`
  display: grid;
`

/** @deprecated */
export const ElDeprecatedBadgeGroupInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-auto-flow: column;
  gap: 0.25rem;
  width: fit-content;
  height: fit-content;
`
