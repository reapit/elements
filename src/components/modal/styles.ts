import { styled } from '@linaria/react'
import { elIsActive } from '../../styles/states'
import { ElDeprecatedIcon } from '../deprecated-icon/__styles__'

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
  background: var(--neutral-500);
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
  box-shadow: 0px 4px 16px 0px rgba(34, 43, 51, 0.16);
  border-radius: var(--default-border-radius);
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
  color: var(--black);
  font-family: var(--font-sans-serif);
  font-weight: var(--font-weight-default);
  font-size: var(--font-size-subheading);
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
  font-size: var(--font-size-default);
`
