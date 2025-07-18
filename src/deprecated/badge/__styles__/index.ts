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
  font-size: var(--font-size-small);
  padding: 0.1rem 0.375rem;
  line-height: 20px;
  background: var(--intent-default-lightest);
  color: var(--intent-default);

  &.${elIntentPrimary} {
    color: var(--intent-primary);
    background: var(--intent-primary-lightest);
  }

  &.${elIntentNeutral} {
    color: var(--intent-neutral);
    background: var(--intent-neutral-lightest);
  }

  &.${elIntentSuccess} {
    color: var(--green-600);
    background: var(--intent-success-lightest);
  }

  &.${elIntentPending} {
    color: var(--yellow-600);
    background: var(--intent-pending-lightest);
  }

  &.${elIntentWarning} {
    color: var(--orange-600);
    background: var(--intent-warning-lightest);
  }

  &.${elIntentDanger} {
    color: var(--intent-danger);
    background: var(--intent-danger-lightest);
  }

  &.${elIntentDefault} {
    color: var(--intent-default);
    background: var(--intent-default-lightest);
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
