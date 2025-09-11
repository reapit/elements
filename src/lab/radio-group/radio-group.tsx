import { FC, ReactNode, HTMLAttributes } from 'react'
import { LabelText } from '#src/core/label-text'
import { ElExperimentalRadioGroup, ElExperimentalRadioGroupContent } from './styles'

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
    <ElExperimentalRadioGroup data-error={errorMessage ? true : false}>
      <LabelText size="medium" isRequired={isRequired}>
        {label}
      </LabelText>
      <ElExperimentalRadioGroupContent role="radiogroup" aria-orientation={orientation}>
        {children}
      </ElExperimentalRadioGroupContent>
      <LabelText size="medium" data-style="error">
        {errorMessage}
      </LabelText>
    </ElExperimentalRadioGroup>
  )
}
