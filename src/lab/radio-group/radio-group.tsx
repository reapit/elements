import { FC, ReactNode, HTMLAttributes } from 'react'
import { LabelText } from '#src/core/label-text'
import { ElRadioGroup, ElRadioContent } from './styles'

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
  isRequired?: boolean
  label?: string
  errorMessage?: string
  children?: ReactNode
}

export const RadioGroup: FC<RadioGroupProps> = ({
  orientation = 'vertical',
  isRequired,
  label,
  errorMessage,
  children,
}) => {
  return (
    <ElRadioGroup data-error={errorMessage ? true : false}>
      <LabelText size="medium" isRequired={isRequired}>
        {label}
      </LabelText>
      <ElRadioContent role="radiogroup" aria-orientation={orientation}>
        {children}
      </ElRadioContent>
      <LabelText size="medium" data-style="error">
        {errorMessage}
      </LabelText>
    </ElRadioGroup>
  )
}
