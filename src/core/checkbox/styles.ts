import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElCheckbox = styled.label`
  display: grid;
  grid-template:
    'input label' var(--icon_size-l)
    'input supplementary-info' auto / var(--icon_size-l) auto;
  align-items: center;
  gap: 0 var(--spacing-2);
  width: fit-content;

  --checkbox-label-colour: var(--comp-select-colour-text-label-active);
  --checkbox-supp_info-colour: var(--comp-select-colour-text-supp_info-active);

  &:has(input:disabled) {
    --checkbox-label-colour: var(--comp-select-colour-text-label-disabled);
    --checkbox-supp_info-colour: var(--comp-select-colour-text-supp_info-disabled);
  }
`

export const ElCheckboxLabelText = styled.span`
  grid-area: label;

  ${font('sm', 'regular')}
  color: var(--checkbox-label-colour);
`

export const ElCheckboxSupplementaryInfo = styled.span`
  grid-area: supplementary-info;
  padding-block-start: var(--spacing-half);

  ${font('xs', 'regular')}
  color: var(--checkbox-supp_info-colour);
`
