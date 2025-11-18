import { styled } from '@linaria/react'

export const ElAtAGlanceCardRadio = styled.label`
  /* --aag-card-content-value-colour is consumed by AtAGlanceCardContent */
  --aag-card-content-value-colour: var(--colour-text-action);
  --aag-card-radio-background-colour: var(--colour-fill-white);
  --aag-card-radio-outline: none;

  /* Align to AtAGlanceCard's grid layout */
  display: grid;
  grid: subgrid / subgrid;
  background-color: var(--aag-card-radio-background-colour);
  text-decoration: none;

  outline: var(--aag-card-radio-outline);
  border-radius: var(--border-radius-l);

  &:has(:checked) {
    --aag-card-radio-background-colour: var(--colour-fill-action-lightest);
    --aag-card-radio-outline: var(--border-width-double) solid var(--colour-border-action-default);
  }

  &:has(:hover, :focus-visible) {
    --aag-card-radio-background-colour: var(--colour-fill-neutral-lightest);
  }
`

export const ElAtAGlanceCardRadioInput = styled.input`
  /* Visually hide the radio input but keep it accessible to screen readers and keyboard navigation */
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;

  /* Ensure the input is still focusable */
  &:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
  }
`
