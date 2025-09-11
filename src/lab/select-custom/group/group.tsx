import { ReactNode, FC } from 'react'
import { LabelText } from '#src/core/label-text'
import { ElExperimentalSelectCustomOptionGroup } from '../styles'

export interface OptionGroupProps {
  label?: string
  children: ReactNode
}

export const Group: FC<OptionGroupProps> = ({ label, children }) => {
  return (
    <ElExperimentalSelectCustomOptionGroup role="group">
      {label && <LabelText size="small">{label}</LabelText>}
      {children}
    </ElExperimentalSelectCustomOptionGroup>
  )
}
