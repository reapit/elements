import { ReactNode, FC, useContext } from 'react'
import { SelectContext, SelectedItem } from '../select-custom'
import { LabelText } from '#src/core/label-text'
import { CheckIcon } from '#src/icons/check'
import { Badge } from '#src/core/badge'
import { ElOption, ElLabelContainer, ElLabelItem, ElAdditionalInfo1, ElAdditionalInfo2 } from '../styles'

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
    <ElOption role="option" aria-selected={isSelected} tabIndex={-1} onClick={handleClick}>
      <ElLabelContainer>
        <ElLabelItem>
          <LabelText size="small">{label}</LabelText>
          {badge && <Badge colour="neutral">{badge}</Badge>}
        </ElLabelItem>
        {isSelected && <CheckIcon size="md" color="secondary" />}
      </ElLabelContainer>
      {additionalInfo1 && <ElAdditionalInfo1>{additionalInfo1}</ElAdditionalInfo1>}
      {additionalInfo2 && <ElAdditionalInfo2>{additionalInfo2}</ElAdditionalInfo2>}
    </ElOption>
  )
}
