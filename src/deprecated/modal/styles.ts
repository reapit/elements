import { styled } from '@linaria/react'
import { elIsActive } from '../../styles/deprecated-states'
import { ElDeprecatedIcon } from '../icon/__styles__'

/**
 * @deprecated
 */
export const ElModalBg = styled.div`
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

/**
 * @deprecated
 */
export const ElModal = styled.div`
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 16px 0 rgb(34 43 51 / 0.16);
  border-radius: 0.25rem /* was --default-border-radius */;
  background: white;
  z-index: 99;
  width: 65%;
  min-width: 300px;
  max-width: 800px;
  max-height: 80vh;
  overflow: auto;
  padding: 1.25rem 1.5rem;

  &.${elIsActive} {
    display: block;
    position: fixed;
  }
`

/**
 * @deprecated
 */
export const ElModalHeader = styled.div`
  color: var(--colour-text-primary);
  font-family:
    'Inter',
    Helvetica,
    Arial,
    sans-serif /* was --font-sans-serif */;
  font-weight: 400 /* was --font-weight-default */;
  font-size: 1.25rem /* was --font-size-subheading */;
  margin-bottom: 1rem;
  text-align: left;

  ${ElDeprecatedIcon} {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.5rem;
    cursor: pointer;
  }
`

/**
 * @deprecated
 */
export const ElModalBody = styled.div`
  font-size: 0.9375rem /* was --font-size-default */;
`
