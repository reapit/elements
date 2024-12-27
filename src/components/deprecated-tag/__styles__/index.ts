import { styled } from '@linaria/react'
import {
  elIntentPrimary,
  elIntentSuccess,
  elIntentDanger,
  elIntentWarning,
  elIntentPending,
  elIntentDefault,
  elIntentNeutral,
} from '../../../styles/intent'

/** @deprecated */
export const ElDeprecatedTag = styled.span`
  border-radius: 3rem;
  display: inline-block;
  font-size: var(--font-size-smallest);
  padding: 0.25rem 1rem;
  background: var(--neutral-400);
  color: var(--white);

  &.${elIntentPrimary} {
    background-image: linear-gradient(to right, var(--intent-primary), var(--intent-primary));
    outline-color: var(--intent-primary-dark);
  }

  &.${elIntentNeutral} {
    background-image: linear-gradient(to right, var(--intent-neutral), var(--intent-neutral));
    outline-color: var(--intent-neutral-dark);
  }

  &.${elIntentSuccess} {
    background-image: linear-gradient(to right, var(--intent-success), var(--intent-success));
    outline-color: var(--intent-success-dark);
  }

  &.${elIntentPending} {
    background-image: linear-gradient(to right, var(--intent-pending), var(--intent-pending));
    outline-color: var(--intent-pending-dark);
  }

  &.${elIntentWarning} {
    background-image: linear-gradient(to right, var(--intent-warning), var(--intent-warning));
    outline-color: var(--intent-warning-dark);
  }

  &.${elIntentDanger} {
    background-image: linear-gradient(to right, var(--intent-danger), var(--intent-danger));
    outline-color: var(--intent-danger-dark);
  }

  &.${elIntentDefault} {
    background-image: linear-gradient(to right, var(--intent-default), var(--intent-default));
    outline-color: var(--intent-default-dark);
  }
`

/** @deprecated */
export const ElDeprecatedTagGroup = styled.div`
  display: grid;
`

/** @deprecated */
export const ElDeprecatedTagGroupInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-auto-flow: column;
  column-gap: 0.25rem;
  row-gap: 0.25rem;
  width: fit-content;
  height: fit-content;
`
