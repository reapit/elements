import { FC, ReactNode, HTMLAttributes } from 'react'
import { CheckboxGroupLabel } from './checkbox-group.atoms'
import { ElCheckboxGroup } from './styles'

export interface CheckboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
  children?: ReactNode
}

export interface CheckboxGroupFC extends FC<CheckboxGroupProps> {
  Label: typeof CheckboxGroupLabel
}

export const CheckboxGroup: CheckboxGroupFC = ({ orientation = 'vertical', children }) => {
  return <ElCheckboxGroup aria-orientation={orientation}>{children}</ElCheckboxGroup>
}

CheckboxGroup.Label = CheckboxGroupLabel
