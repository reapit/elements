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
      color: var(--white);
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
  background: var(--white);
  text-decoration: none;
  border-radius: var(--default-border-radius);
  border: 1px solid var(--neutral-100);
  font-size: var(--font-size-small);
  font-family: var(--font-sans-serif);
  font-weight: var(--font-weight-medium);
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
