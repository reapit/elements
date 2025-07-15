import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { cx } from '@linaria/core'
import { elIsActive, elIsUsed } from '../../styles/deprecated-states'
import {
  ElSteps,
  ElStep,
  ElStepsVertical,
  ElStepVertical,
  ElStepVerticalItem,
  ElStepVerticalContent,
} from './__styles__'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'

/** @deprecated */
export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  steps: string[]
  selectedStep?: string
  onStepClick?: (step: string) => void
  className?: string
}

/** @deprecated */
export interface StepsVerticalStep {
  item: string
  content?: ReactNode
}

/** @deprecated */
export interface StepsVerticalProps extends HTMLAttributes<HTMLDivElement> {
  steps: StepsVerticalStep[]
  selectedStep?: string
  onStepClick?: (step: string) => void
  className?: string
}

/** @deprecated */
export const handleStepClick = (step: string, onStepClick?: (step: string) => void) => () => {
  onStepClick && onStepClick(step)
}

/** @deprecated */
export const Steps: FC<StepsProps> = ({ steps = [], selectedStep, onStepClick, className = '', ...rest }) => {
  const selectedStepIndex = steps.findIndex((step) => step === selectedStep)

  return (
    <ElSteps className={className} {...rest}>
      {steps.map((step, index) => {
        const stepClassName = cx(index === selectedStepIndex && elIsActive, index < selectedStepIndex && elIsUsed)

        return (
          <ElStep
            key={step}
            role="button"
            tabIndex={0}
            data-testid={`step-${index}`}
            onClick={handleStepClick(step, onStepClick)}
            onKeyDown={handleKeyboardEvent('Enter', handleStepClick(step, onStepClick))}
            className={stepClassName}
          >
            {step}
          </ElStep>
        )
      })}
    </ElSteps>
  )
}

/** @deprecated */
export const StepsVertical: FC<StepsVerticalProps> = ({
  steps = [],
  selectedStep,
  onStepClick,
  className = '',
  ...rest
}) => {
  const selectedStepIndex = steps.findIndex((step) => step.item === selectedStep)

  return (
    <ElStepsVertical className={className} {...rest}>
      {steps.map(({ item, content }, index) => {
        const stepClassName = cx(index === selectedStepIndex && elIsActive)

        if (index > selectedStepIndex) return null
        return (
          <ElStepVertical key={item}>
            <ElStepVerticalItem>
              <ElStep
                data-testid={`step-${index}`}
                role="button"
                tabIndex={0}
                onClick={handleStepClick(item, onStepClick)}
                onKeyDown={handleKeyboardEvent('Enter', handleStepClick(item, onStepClick))}
                className={stepClassName}
              >
                {item}
              </ElStep>
            </ElStepVerticalItem>
            <ElStepVerticalContent>{content}</ElStepVerticalContent>
          </ElStepVertical>
        )
      })}
    </ElStepsVertical>
  )
}
