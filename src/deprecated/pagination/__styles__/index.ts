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
  font-size: var(--font-size-small);
`
/** @deprecated */
export const ElDeprecatedPaginationInput = styled.input`
  font-size: var(--font-size-small);
  text-align: center;
  font-weight: var(--font-weight-bold);
  margin: 0;
  font-family: var(--font-sans-serif);
  border-radius: 0.2rem;
  width: 2rem;
  height: 2rem;
  border: var(--component-input-border);

  &:focus {
    border: var(--component-input-border-focus);
  }
`
/** @deprecated */
export const ElDeprecatedPaginationButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background: var(--pagination-bg);
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.25rem;

  svg {
    color: var(--neutral-500);
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
    color: var(--intent-primary);
  }
`
