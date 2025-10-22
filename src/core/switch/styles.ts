import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElSwitch = styled.label`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: var(--spacing-4);

  --switch-label-colour: var(--comp-switch-colour-text-default-unchecked);

  &:has(input:checked) {
    --switch-label-colour: var(--comp-switch-colour-text-default-checked);
  }

  &:has(input:disabled) {
    --switch-label-colour: var(--comp-switch-colour-text-disabled-unchecked);
  }

  &:has(input:disabled:checked) {
    --switch-label-colour: var(--comp-switch-colour-text-disabled-checked);
  }

  &:has(input:hover:not(:disabled)) {
    --switch-label-colour: var(--comp-switch-colour-text-hover-unchecked);
  }

  &:has(input:checked:hover:not(:disabled)) {
    --switch-label-colour: var(--comp-switch-colour-text-hover-checked);
  }
`

export const ElSwitchLabelText = styled.span`
  ${font('base', 'regular')}
  color: var(--switch-label-colour);
  white-space: nowrap;
`
