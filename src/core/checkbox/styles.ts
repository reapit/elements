import { styled } from '@linaria/react'
import { LabelText } from '../label-text'

export const ElCheckboxSvgIcon = styled.svg`
  display: none;
  grid-area: input;
  width: 100%;
  color: var(--comp-select-colour-icon-default-unchecked);

  &:hover {
    color: var(--comp-select-colour-icon-hover-unchecked);
  }

  .el-checkbox-input:not(:checked, :indeterminate) ~ & {
    display: block;
  }

  .el-checkbox-input:disabled ~ & {
    color: var(--comp-select-colour-icon-disabled-unchecked);
  }
`

export const ElCheckboxSelectedSvgIcon = styled.svg`
  display: none;
  grid-area: input;
  width: 100%;
  color: var(--comp-select-colour-icon-default-checked);

  &:hover {
    color: var(--comp-select-colour-icon-hover-checked);
  }

  .el-checkbox-input:disabled ~ & {
    color: var(--comp-select-colour-icon-disabled-checked);
  }

  .el-checkbox-input:checked:not(:indeterminate) ~ & {
    display: block;
  }
`

export const ElCheckboxIndeterminateSvgIcon = styled.svg`
  display: none;
  grid-area: input;
  width: 100%;
  color: var(--comp-select-colour-icon-default-checked);

  &:hover {
    color: var(--comp-select-colour-icon-hover-checked);
  }

  .el-checkbox-input:indeterminate ~ & {
    display: block;
  }

  .el-checkbox-input:disabled ~ & {
    color: var(--comp-select-colour-icon-disabled-checked);
  }
`

export const ElCheckbox = styled.label`
  display: grid;
  gap: var(--spacing-half) var(--spacing-2);
  grid-template:
    'input label' var(--icon_size-l)
    '. supplementary-info' auto / var(--icon_size-l) auto;
  align-items: center;
`

export const ElCheckboxInput = styled.input`
  appearance: none;
  box-sizing: border-box;
  grid-area: input;
  width: 100%;
  padding: var(--spacing-none);
  outline: none;
  border-radius: var(--border-radius-s);

  &:focus-visible {
    box-shadow:
      0 0 0 var(--size-px) var(--colour-border-white),
      0 0 0 var(--size-1) var(--colour-border-focus);
    width: auto;
    padding: calc(var(--spacing-3) - 1px);
    margin-left: var(--size-px);
  }
`

export const ElCheckboxLabelText = styled(LabelText)`
  grid-area: label;

  ${ElCheckboxInput}:disabled ~ & {
    color: var(--comp-select-colour-text-label-disabled);
  }
`

export const ElCheckboxSupplementaryInfo = styled(LabelText)`
  grid-area: supplementary-info;

  ${ElCheckboxInput}:disabled ~ & {
    color: var(--comp-select-colour-text-supp_info-disabled);
  }
`
