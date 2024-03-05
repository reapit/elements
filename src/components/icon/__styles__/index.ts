import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import {
  elIntentPrimary,
  elIntentSuccess,
  elIntentDanger,
  elIntentNeutral,
  elIntentPending,
  elIntentWarning,
  elIntentDefault,
} from '../../../styles/intent'

export const elIconMenu = css`
  svg {
    background: var(--nav-menu-background-dark);
  }
`

export const ElIcon = styled.span`
  display: flex;
  color: var(--color-black);
  font-size: 1.5rem !important;

  svg {
    width: 1em;
    height: 1em;
  }

  &.${elIntentPrimary} {
    color: var(--intent-primary);
  }

  &.${elIntentNeutral} {
    color: var(--intent-neutral);
  }

  &.${elIntentSuccess} {
    color: var(--intent-success);
  }

  &.${elIntentPending} {
    color: var(--intent-pending);
  }

  &.${elIntentWarning} {
    color: var(--intent-warning);
  }

  &.${elIntentDanger} {
    color: var(--intent-danger);
  }

  &.${elIntentDefault} {
    color: var(--intent-default);
  }
`
