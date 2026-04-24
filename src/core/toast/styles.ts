import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { font } from '#src/utils/font'
import type { Toast } from './toast'

interface ElToastProps {
  'data-variant': Toast.Variant
}

export const ElToast = styled.div<ElToastProps>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  width: fit-content;
  min-width: var(--size-56);
  max-width: var(--size-112);
  padding: var(--spacing-4);
  overflow: clip;

  background-color: var(--toast-background);
  border-radius: var(--comp-toast-border-radius);

  /* Neutral is the implicit default variant. The custom properties below set
   * neutral colours so the component renders correctly even without a
   * data-variant attribute. */
  &,
  &[data-variant='neutral'] {
    --toast-background: var(--comp-toast-colour-fill-background-neutral);
    --toast-text-colour: var(--comp-toast-colour-text-neutral);
    --toast-icon-colour: var(--comp-toast-colour-icon-neutral);
    --toast-bar-colour: var(--comp-toast-colour-fill-bar-neutral);
  }

  &[data-variant='error'] {
    --toast-background: var(--comp-toast-colour-fill-background-error);
    --toast-text-colour: var(--comp-toast-colour-text-error);
    --toast-icon-colour: var(--comp-toast-colour-icon-error);
    --toast-bar-colour: var(--comp-toast-colour-fill-bar-error);
  }

  &[data-variant='info'] {
    --toast-background: var(--comp-toast-colour-fill-background-info);
    --toast-text-colour: var(--comp-toast-colour-text-info);
    --toast-icon-colour: var(--comp-toast-colour-icon-info);
    --toast-bar-colour: var(--comp-toast-colour-fill-bar-info);
  }

  &[data-variant='success'] {
    --toast-background: var(--comp-toast-colour-fill-background-success);
    --toast-text-colour: var(--comp-toast-colour-text-success);
    --toast-icon-colour: var(--comp-toast-colour-icon-success);
    --toast-bar-colour: var(--comp-toast-colour-fill-bar-success);
  }

  &[data-variant='warning'] {
    --toast-background: var(--comp-toast-colour-fill-background-warning);
    --toast-text-colour: var(--comp-toast-colour-text-warning);
    --toast-icon-colour: var(--comp-toast-colour-icon-warning);
    --toast-bar-colour: var(--comp-toast-colour-fill-bar-warning);
  }
`

export const ElToastIconContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: var(--icon_size-m);
  height: var(--icon_size-m);
  color: var(--toast-icon-colour);
`

export const ElToastMessage = styled.p`
  ${font('sm', 'regular')}
  flex: 1 0 0;
  min-width: 1px;
  margin: 0;
  color: var(--toast-text-colour);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const elToastTimeoutBar = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--size-1);
`

export const ElToastTimeoutBarProgress = styled.div`
  position: absolute;
  inset: 0;
  background-color: var(--toast-bar-colour);

  @keyframes toast-fill {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  animation-name: toast-fill;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`
