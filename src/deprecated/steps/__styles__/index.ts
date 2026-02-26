import { styled } from '@linaria/react'
import { isDesktop } from '../../../styles/deprecated-media'
import { elIsActive, elIsUsed } from '../../../styles/deprecated-states'

/** @deprecated */
export const ElSteps = styled.div`
  display: flex;
`

/** @deprecated */
export const ElStep = styled.div`
  background-color: var(--neutral-100);
  color: var(--neutral-500);
  font-weight: 600 /* was --font-weight-bold */;
  font-size: 0.9375rem /* was --font-size-default */;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 12px /* was --component-steps-gutter-width */;
  margin-top: 0.25rem;
  transition: 0.3s;
  transform-origin: top;
  cursor: pointer;

  &.${elIsUsed} {
    &::before,
    &::after {
      background: var(--neutral-100);
    }
  }

  &.${elIsActive} {
    color: var(--colour-text-white);
    background-color: var(--colour-fill-action-dark);
  }

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    width: 12px /* was --component-steps-gutter-width */;
    height: 1.5px;
    background: var(--neutral-100);
  }

  &::before {
    left: calc(12px /* was --component-steps-gutter-width */ * -1);
  }

  &::after {
    right: calc(12px /* was --component-steps-gutter-width */ * -1);
  }

  &:first-child {
    margin-left: 0;

    &::before {
      display: none;
    }
  }

  &:last-child {
    margin-right: 0;

    &::after {
      display: none;
    }
  }
`

/** @deprecated */
export const ElStepsVertical = styled.div`
  display: flex;
  flex-wrap: wrap;
`

/** @deprecated */
export const ElStepVertical = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.25rem;

  ${isDesktop} {
    flex-direction: row;
  }
`

/** @deprecated */
export const ElStepVerticalItem = styled.div`
  display: flex;
  width: 100%;
  margin: 2.5rem 0 1.25rem;

  ${isDesktop} {
    width: 6.5rem;
    justify-content: center;
    margin: 0;
  }
`

/** @deprecated */
export const ElStepVerticalContent = styled.div`
  width: 100%;
`
