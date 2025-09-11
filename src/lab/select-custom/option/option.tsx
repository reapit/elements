import { ReactNode, FC, useContext } from 'react'
import { SelectContext, SelectedItem } from '../select-custom'
import { LabelText } from '#src/core/label-text'
import { CheckIcon } from '#src/icons/check'
import { Badge } from '#src/core/badge'
import {
  ElExperimentalSelectCustomOption,
  ElExperimentalSelectCustomLabelContainer,
  ElExperimentalSelectCustomLabelItem,
  ElExperimentalSelectCustomAdditionalInfo1,
  ElExperimentalSelectCustomAdditionalInfo2,
} from '../styles'

export interface OptionProps {
  value: string
  label: string
  badge?: string
  additionalInfo1?: ReactNode
  additionalInfo2?: ReactNode
  selected?: boolean
}

export const Option: FC<OptionProps> = ({ value, label, badge, additionalInfo1, additionalInfo2 }) => {
  const { selectedValues, onSelect } = useContext(SelectContext)
  const isSelected = selectedValues.some((s) => s.value === value)

  const handleClick = () => onSelect({ value, label } as SelectedItem)

  return (
    <ElExperimentalSelectCustomOption role="option" aria-selected={isSelected} tabIndex={-1} onClick={handleClick}>
      <ElExperimentalSelectCustomLabelContainer>
        <ElExperimentalSelectCustomLabelItem>
          <LabelText size="small">{label}</LabelText>
          {badge && <Badge colour="neutral">{badge}</Badge>}
        </ElExperimentalSelectCustomLabelItem>
        {isSelected && <CheckIcon size="md" color="secondary" />}
      </ElExperimentalSelectCustomLabelContainer>
      {additionalInfo1 && (
        <ElExperimentalSelectCustomAdditionalInfo1>{additionalInfo1}</ElExperimentalSelectCustomAdditionalInfo1>
      )}
      {additionalInfo2 && (
        <ElExperimentalSelectCustomAdditionalInfo2>{additionalInfo2}</ElExperimentalSelectCustomAdditionalInfo2>
      )}
    </ElExperimentalSelectCustomOption>
  )
}
