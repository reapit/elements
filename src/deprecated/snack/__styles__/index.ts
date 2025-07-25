import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import {
  elIntentPrimary,
  elIntentSuccess,
  elIntentWarning,
  elIntentDanger,
  elIntentNeutral,
  elIntentDefault,
  elIntentPending,
} from '../../../styles/deprecated-intent'

/** @deprecated */
export const ElSnack = styled.div`
  display: inline-flex;
  border-radius: var(--default-border-radius);
  padding: 0.75rem;
  align-items: center;
  background: var(--neutral-100);
  color: var(--black);
  font-size: var(--font-size-default);

  &.${elIntentPrimary} {
    background: var(--intent-primary-lightest);
  }

  &.${elIntentNeutral} {
    background: var(--intent-neutral-lightest);
  }

  &.${elIntentSuccess} {
    background: var(--intent-success-lightest);
  }

  &.${elIntentPending} {
    background: var(--intent-pending-lightest);
  }

  &.${elIntentWarning} {
    background: var(--intent-warning-lightest);
  }

  &.${elIntentDanger} {
    background: var(--intent-danger-lightest);
  }

  &.${elIntentDefault} {
    background: var(--intent-default-lightest);
  }
`

/** @deprecated */
export const elSnackIcon = css`
  margin-right: 1rem;
`

/** @deprecated */
export const elSnackCloseIcon = css`
  cursor: pointer;
  padding-left: 0.5rem;
  color: var(--black);
`

/** @deprecated */
export const ElSnackHolder = styled.div`
  position: fixed;
  z-index: 100;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${ElSnack} {
    display: flex;
    margin-bottom: 1rem;
    /* box-shadow: 3px 3px 5px var(--neutral-400); */
  }
`
