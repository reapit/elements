import { styled } from '@linaria/react'
import {
  elIntentPrimary,
  elIntentSuccess,
  elIntentDanger,
  elIntentWarning,
  elIntentPending,
  elIntentDefault,
  elIntentNeutral,
} from '../../../styles/deprecated-intent'

/** @deprecated */
export const ElDeprecatedTag = styled.span`
  border-radius: 3rem;
  display: inline-block;
  font-size: 0.8125rem /* was --font-size-smallest */;
  padding: 0.25rem 1rem;
  background: var(--neutral-400);
  color: var(--colour-text-white);

  &.${elIntentPrimary} {
    background-image: linear-gradient(to right, var(--colour-fill-action-dark), var(--colour-fill-action-dark));
    outline-color: var(--colour-text-action);
  }

  &.${elIntentNeutral} {
    background-image: linear-gradient(to right, var(--colour-fill-info-dark), var(--colour-fill-info-dark));
    outline-color: var(--colour-fill-info-dark);
  }

  &.${elIntentSuccess} {
    background-image: linear-gradient(to right, var(--colour-fill-success-dark), var(--colour-fill-success-dark));
    outline-color: var(--colour-fill-success-dark);
  }

  &.${elIntentPending} {
    background-image: linear-gradient(to right, var(--colour-fill-pending-dark), var(--colour-fill-pending-dark));
    outline-color: var(--colour-fill-pending-dark);
  }

  &.${elIntentWarning} {
    background-image: linear-gradient(to right, var(--colour-fill-warning-dark), var(--colour-fill-warning-dark));
    outline-color: var(--colour-fill-warning-dark);
  }

  &.${elIntentDanger} {
    background-image: linear-gradient(to right, var(--colour-fill-error-dark), var(--colour-fill-error-dark));
    outline-color: var(--colour-fill-error-dark);
  }

  &.${elIntentDefault} {
    background-image: linear-gradient(to right, var(--colour-fill-neutral-dark), var(--colour-fill-neutral-dark));
    outline-color: var(--colour-fill-neutral-dark);
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
  gap: 0.25rem;
  width: fit-content;
  height: fit-content;
`
