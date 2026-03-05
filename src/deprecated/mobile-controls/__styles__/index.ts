import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import { isMobile, isTablet } from '../../../styles/deprecated-media'
import { elIsActive } from '../../../styles/deprecated-states'
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
  background: var(--colour-fill-neutral-dark);
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

  ${isTablet} {
    display: none;

    &.${elMobileControlsVisible} {
      display: flex;
    }
  }
`

/** @deprecated */
export const elMobileControlsFloatingButton = css`
  border-radius: 100%;
  height: 3.75rem;
  width: 3.75rem;
  margin: 0.5rem;
  max-height: unset;
  padding: 0.4rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  ${isMobile} {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0.5rem;
  }
`

/** @deprecated */
export const ElMobileControlItem = styled.a`
  padding: 0.5rem 1rem;
  background: var(--colour-fill-white);
  text-decoration: none;
  border-radius: 0.25rem /* was --default-border-radius */;
  border: 1px solid var(--colour-border-neutral-light_default);
  font-size: 0.875rem /* was --font-size-small */;
  font-family:
    'Inter',
    Helvetica,
    Arial,
    sans-serif /* was --font-sans-serif */;
  font-weight: 500 /* was --font-weight-medium */;
  color: var(--colour-text-secondary);
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
    border: 1px solid var(--colour-border-neutral-light_darker);
    color: var(--colour-text-tertiary);
  }
`
