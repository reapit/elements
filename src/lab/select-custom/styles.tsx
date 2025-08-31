// import { font } from '#src/core/text/index'
import { styled } from '@linaria/react'
import React from 'react'

// forwardRef ensures Popover can attach events
const BaseInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input ref={ref} {...props} />
))
BaseInput.displayName = 'BaseInput'

export const ElSelectCustom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2);
  align-self: stretch;
`
export const ElInputField = styled.div`
  display: flex;
  height: var(--size-8);
  padding: var(--spacing-1) var(--spacing-1) var(--spacing-1) var(--spacing-2);
  align-items: center;
  gap: var(--spacing-2);
  align-self: stretch;
  border-radius: var(--comp-input-border-radius);
  border: var(--comp-input-border-width) solid var(--comp-input-colour-border-default);
  background: var(--comp-input-colour-fill-default-background);
`

export const ElInput = styled(BaseInput)``

export const ElOption = styled.li<{ focused: boolean; selected: boolean }>`
  padding: 6px 8px;
  cursor: pointer;
  background: 'transparent';
  color: inherit;
`
