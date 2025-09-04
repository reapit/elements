import { ReactNode, FC } from 'react'
import { LabelText } from '#src/core/label-text'
import { ElOptionGroup } from '../styles'

export interface OptionGroupProps {
  label?: string
  children: ReactNode
}

export const Group: FC<OptionGroupProps> = ({ label, children }) => {
  return (
    <ElOptionGroup role="group">
      {label && <LabelText size="small">{label}</LabelText>}
      {children}
    </ElOptionGroup>
  )
}
