import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElRadioButton = styled.label`
  display: grid;
  grid-template:
    'input label' var(--icon_size-l)
    'input supplementary-info' auto / var(--icon_size-l) auto;
  align-items: center;
  gap: 0 var(--spacing-2);

  --radio-button-label-colour: var(--comp-select-colour-text-label-active);
  --radio-button-supp_info-colour: var(--comp-select-colour-text-supp_info-active);

  &:has(input:disabled) {
    --radio-button-label-colour: var(--comp-select-colour-text-label-disabled);
    --radio-button-supp_info-colour: var(--comp-select-colour-text-supp_info-disabled);
  }
`

export const ElRadioButtonLabelText = styled.span`
  grid-area: label;

  ${font('sm', 'regular')}
  color: var(--radio-button-label-colour);
`

export const ElRadioButtonSupplementaryInfo = styled.span`
  grid-area: supplementary-info;
  padding-block-start: var(--spacing-half);

  ${font('xs', 'regular')}
  color: var(--radio-button-supp_info-colour);
`
