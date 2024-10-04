import { styled } from '@linaria/react'
import { elIsActive } from '../../styles/states'
import { css } from '@linaria/core'

// NOTE: The `elModalSmallVariant` class is used to indicate that the modal
// is a small variant. This class is used to apply the appropriate styles to
// the modal when it is a small variant, and is applied to the `className`
// prop of the `ElModal` component
export const elModalSmallVariant = css``

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

export const ElModal = styled.div`
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 99;
  overflow: auto;
  box-shadow: var(--elevation-xl, 0px 4px 16px 0px rgba(96, 120, 144, 0.16));
  border-radius: var(--corner-lg, 8px);
  padding: var(--spacing-5, 20px) var(--spacing-6, 24px);

  &.${elIsActive} {
    display: block;
    position: fixed;
  }

  /* default modal size settings */
  min-width: 300px;
  max-height: 100%;
  width: calc(100% - var(--unit-8, 32px));
  max-width: 30rem;

  /* small modal size settings */
  &.${elModalSmallVariant} {
    width: calc(100% - var(--unit-16, 64px));
    max-width: 20rem;
  }
`

export const ElModalHeader = styled.div`
  color: var(--text-primary, #222b33);
  font-family: var(--font-family, Inter);
  font-size: var(--font-size-lg, 18px);
  font-style: normal;
  font-weight: 600;
  line-height: var(--line-height-lg, 24px);
  letter-spacing: var(--letter-spacing-lg, -0.18px);
  padding-bottom: var(--spacing-4, 12px);
  word-wrap: break-word;
`

export const ElModalBody = styled.div`
  font-size: var(--font-size-default);
`

export const ElModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: var(--spacing-5, 20px);
`
