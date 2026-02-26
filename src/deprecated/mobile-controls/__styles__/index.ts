import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import { isTablet } from '../../../styles/deprecated-media'
import { elIsActive } from '../../../styles/deprecated-states'
import { ElDeprecatedIcon } from '../../icon/__styles__'
import { elIntentDefault } from '../../../styles/deprecated-intent'

/** @deprecated */
export const elMobileControlsVisible = css`
  display: flex;
`

/** @deprecated */
export const ElMobileControlsBg = styled.div`
  display: none;
  z-index: 98;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: var(--neutral-500);
  opacity: 0.2;

  &.${elIsActive} {
    display: block;
    position: fixed;
  }
`

/** @deprecated */
export const ElMobileControls = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  bottom: 0.75rem;
  right: 0.75rem;
  z-index: 99;

  ${ElDeprecatedIcon} {
    &.${elIntentDefault} {
      color: var(--colour-text-white);
    }
  }

  ${isTablet} {
    display: none;

    &.${elMobileControlsVisible} {
      display: flex;
    }
  }
`

/** @deprecated */
export const ElMobileControlItem = styled.a`
  padding: 0.5rem 1rem;
  background: var(--colour-fill-white);
  text-decoration: none;
  border-radius: 0.25rem /* was --default-border-radius */;
  border: 1px solid var(--neutral-100);
  font-size: 0.875rem /* was --font-size-small */;
  font-family:
    'Inter',
    Helvetica,
    Arial,
    sans-serif /* was --font-sans-serif */;
  font-weight: 500 /* was --font-weight-medium */;
  color: var(--neutral-400);
  margin: 0 0.5rem 0.25rem 0;
  display: none;
  opacity: 1;

  &:last-of-type {
    margin: 0 0.5rem 0 0;
  }

  &.${elIsActive} {
    display: block;
  }

  &:hover {
    border: 1px solid var(--neutral-400);
    color: var(--neutral-700);
  }
`
