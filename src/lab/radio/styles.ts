import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import { LabelText } from '#src/core/label-text'

export const ElExperimentalRadioInput = styled.input`
  appearance: none;
  box-sizing: border-box;
  grid-area: input;
  width: 100%;
  padding: var(--spacing-none);
  outline: none;
  border-radius: var(--border-radius-s);

  &:focus-visible {
    border-radius: var(--border-radius-3xl);
    outline: 2px solid var(--colour-border-focus);
    box-shadow:
      0 0 0 var(--size-px) var(--colour-border-white),
      0 0 0 var(--size-1) var(--colour-border-focus);
    width: auto;
    padding: calc(var(--spacing-3) - 1px);
    margin-left: var(--size-px);
    margin-top: var(--size-none);
  }
`

export const elExperimentalRadioSvgIcon = css`
  display: none;
  grid-area: input;
  width: 100%;
  color: var(--comp-select-colour-icon-default-unchecked);

  &:hover {
    color: var(--comp-select-colour-icon-hover-unchecked);
  }

  [data-error='true'] &,
  ${ElExperimentalRadioInput}:invalid ~ & {
    color: var(--comp-select-colour-icon-error-unchecked);
  }

  ${ElExperimentalRadioInput}:disabled ~ & {
    color: var(--comp-select-colour-icon-disabled-unchecked);
  }

  ${ElExperimentalRadioInput}:not(:checked) ~ & {
    display: block;
  }

  [data-error='true'] &:hover,
  ${ElExperimentalRadioInput}:invalid ~ &:hover {
    color: var(--comp-select-colour-icon-error-unchecked);
  }
`

export const elExperimentalRadioSelectedSvgIcon = css`
  display: none;
  grid-area: input;
  width: 100%;
  color: var(--comp-select-colour-icon-default-checked);

  &:hover {
    color: var(--comp-select-colour-icon-hover-checked);
  }

  [data-error='true'] &,
  ${ElExperimentalRadioInput}:invalid ~ & {
    color: var(--comp-select-colour-icon-error-unchecked);
  }

  ${ElExperimentalRadioInput}:checked ~ & {
    display: block;
  }

  ${ElExperimentalRadioInput}:disabled ~ & {
    color: var(--comp-select-colour-icon-disabled-checked);
  }

  [data-error='true'] &:hover,
  ${ElExperimentalRadioInput}:invalid ~ &:hover {
    color: var(--comp-select-colour-icon-error-unchecked);
  }
`

export const ElExperimentalRadio = styled.label`
  display: grid;
  gap: var(--spacing-1) var(--spacing-2);
  grid-template:
    'input label' var(--icon_size-l)
    '. supplementary-info' auto / var(--icon_size-l) auto;
  align-items: center;
`

export const ElExperimentalRadioLabelText = styled(LabelText)`
  grid-area: label;

  ${ElExperimentalRadioInput}:disabled ~ & {
    color: var(--comp-select-colour-text-label-disabled);
  }
`

export const ElExperimentalRadioSupplementaryInfo = styled(LabelText)`
  grid-area: supplementary-info;

  ${ElExperimentalRadioInput}:disabled ~ & {
    color: var(--comp-select-colour-text-supp_info-disabled);
  }
`
