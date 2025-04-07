import { FC } from 'react'
import { LabelText } from '../label-text'
import { ElLegend } from './styles'

type CheckboxGroupLabelProps = {
  isRequired?: boolean
  label: string
}

export const CheckboxGroupLabel: FC<CheckboxGroupLabelProps> = ({ isRequired, label }) => {
  return (
    <ElLegend>
      {/* {LabelText it temparory will be replaced by Form Label} */}
      <LabelText variant="soft" isRequired={isRequired}>
        {label}
      </LabelText>
    </ElLegend>
  )
}
