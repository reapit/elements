import { ReactNode, FC } from 'react'
import { LabelText } from '#src/core/label-text'
import { ElExperimentalSelectCustomOptionGroup } from '../styles'

export interface OptionGroupProps {
  label?: string
  children: ReactNode
}

export const ExperimentalSelectCustomOptionGroup: FC<OptionGroupProps> = ({ label, children }) => {
  return (
    <ElExperimentalSelectCustomOptionGroup role="group">
      {label && <LabelText size="xs">{label}</LabelText>}
      {children}
    </ElExperimentalSelectCustomOptionGroup>
  )
}
