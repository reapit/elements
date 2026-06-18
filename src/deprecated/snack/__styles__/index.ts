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
export const elSnackIcon = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  width: var(--icon_size-md);
  height: var(--icon_size-md);
`

/** @deprecated */
export const ElSnack = styled.div`
  display: inline-flex;
  border-radius: 0.25rem /* was --default-border-radius */;
  padding: 0.75rem;
  align-items: center;
  background: var(--colour-fill-neutral-light);
  color: var(--colour-text-primary);
  font-size: 0.9375rem /* was --font-size-default */;

  &.${elIntentPrimary} {
    background: var(--colour-fill-action-lightest);
    .${elSnackIcon} {
      color: var(--colour-icon-action);
    }
  }

  &.${elIntentNeutral} {
    background: var(--colour-fill-info-lightest);
    .${elSnackIcon} {
      color: var(--colour-icon-info);
    }
  }

  &.${elIntentSuccess} {
    background: var(--colour-fill-success-lightest);
    .${elSnackIcon} {
      color: var(--colour-icon-success);
    }
  }

  &.${elIntentPending} {
    background: var(--colour-fill-pending-lightest);
    .${elSnackIcon} {
      color: var(--colour-icon-pending);
    }
  }

  &.${elIntentWarning} {
    background: var(--colour-fill-warning-lightest);
    .${elSnackIcon} {
      color: var(--colour-icon-warning);
    }
  }

  &.${elIntentDanger} {
    background: var(--colour-fill-error-lightest);
    .${elSnackIcon} {
      color: var(--colour-icon-error);
    }
  }

  &.${elIntentDefault} {
    background: var(--colour-fill-neutral-lightest);
  }
`

/** @deprecated */
export const elSnackCloseIcon = css`
  cursor: pointer;
  padding-left: 0.5rem;
  color: var(--colour-text-primary);
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
    /* box-shadow: 3px 3px 5px var(--colour-fill-neutral-medium); */
  }
`
