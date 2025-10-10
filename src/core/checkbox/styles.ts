import { font } from '#src/core/text'
import { LabelText } from '#src/core/label-text'
import { styled } from '@linaria/react'

export const ElCheckbox = styled.label`
  display: grid;
  grid-template:
    'input label' var(--icon_size-l)
    '. supplementary-info' auto / var(--icon_size-l) auto;
  align-items: center;
  gap: var(--spacing-half) var(--spacing-2);

  --checkbox-label-colour: var(--comp-select-colour-text-label-active);
  --checkbox-supp_info-colour: var(--comp-select-colour-text-supp_info-active);

  &:has(input:disabled) {
    --checkbox-label-colour: var(--comp-select-colour-text-label-disabled);
    --checkbox-supp_info-colour: var(--comp-select-colour-text-supp_info-disabled);
  }
`

export const ElCheckboxLabelText = styled(LabelText)`
  grid-area: label;
  color: var(--checkbox-label-colour);
  ${font('sm', 'regular')}
`

export const ElCheckboxSupplementaryInfo = styled.span`
  grid-area: supplementary-info;
  color: var(--checkbox-supp_info-colour);
  ${font('xs', 'regular')}
`
