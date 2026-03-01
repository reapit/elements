import { css } from '@linaria/core'
import { styled } from '@linaria/react'

/** @deprecated */
export const ElDeprecatedPaginationWrap = styled.div`
  width: fit-content;
  margin: 0 auto;
  display: flex;
  align-items: center;
`
/** @deprecated */
export const ElDeprecatedPaginationText = styled.div`
  margin: 0 0.5rem;
  font-size: 0.875rem /* was --font-size-small */;
`
/** @deprecated */
export const ElDeprecatedPaginationInput = styled.input`
  font-size: 0.875rem /* was --font-size-small */;
  text-align: center;
  font-weight: 600 /* was --font-weight-bold */;
  margin: 0;
  font-family:
    'Inter',
    Helvetica,
    Arial,
    sans-serif /* was --font-sans-serif */;
  border-radius: 0.2rem;
  width: 2rem;
  height: 2rem;
  border: 1px solid #d8dee4 /* was --component-input-border */;

  &:focus {
    border: 1px solid #4e56ea /* was --component-input-border-focus */;
  }
`
/** @deprecated */
export const ElDeprecatedPaginationButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background: #ffffff /* was --pagination-bg */;
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.25rem;

  svg {
    color: var(--colour-text-secondary);
    font-size: 1rem;
  }

  &:last-of-type {
    margin-right: 0;
  }
`
/** @deprecated */
export const elDeprecatedPaginationPrimary = css`
  cursor: pointer;
  svg {
    color: var(--colour-text-action);
  }
`
