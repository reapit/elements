import { Dispatch, FC, HTMLAttributes, SetStateAction, useEffect, useState } from 'react'
import {
  ElProgressBarContainer,
  ElProgressBarLabel,
  ElProgressBarInner,
  ElProgressBarItem,
  elProgressBarLabelRight,
} from './__styles__'

/** @deprecated */
export interface ProgressBarPercentageProps extends HTMLAttributes<HTMLDivElement> {
  duration: number
  showLabel?: boolean
}

/** @deprecated */
export interface ProgressBarStepProps extends HTMLAttributes<HTMLDivElement> {
  numberSteps: number
  currentStep: number
  showLabel?: boolean
}

/** @deprecated */
export interface ProgressBarBaseProps extends HTMLAttributes<HTMLDivElement> {}

/** @deprecated */
export const ProgressBarContainer: FC<ProgressBarBaseProps> = ({ children, ...rest }) => (
  <ElProgressBarContainer {...rest}>{children}</ElProgressBarContainer>
)

/** @deprecated */
export const ProgressBarInner: FC<ProgressBarBaseProps> = ({ children, ...rest }) => (
  <ElProgressBarInner {...rest}>{children}</ElProgressBarInner>
)

/** @deprecated */
export const ProgressBarItem: FC<ProgressBarBaseProps> = ({ children, ...rest }) => (
  <ElProgressBarItem {...rest}>{children}</ElProgressBarItem>
)

/** @deprecated */
export const ProgressBarLabel: FC<ProgressBarBaseProps> = ({ children, ...rest }) => (
  <ElProgressBarLabel {...rest}>{children}</ElProgressBarLabel>
)

/** @deprecated */
export const handleSetPercentageComplete =
  (setPercentageComplete: Dispatch<SetStateAction<number>>, intervalTime: number) => () => {
    const interval = window.setInterval(() => {
      setPercentageComplete((prev) => {
        if (prev < 100) {
          return ++prev
        }

        return prev
      })
    }, intervalTime)

    return () => window.clearInterval(interval)
  }

/** @deprecated */
export const ProgressBarPercentage: FC<ProgressBarPercentageProps> = ({ duration, showLabel = true, ...rest }) => {
  const [percentageComplete, setPercentageComplete] = useState<number>(0)
  const intervalTime = duration * 10
  const transitionDuration = duration / 60

  useEffect(handleSetPercentageComplete(setPercentageComplete, intervalTime), [percentageComplete])

  return (
    <ProgressBarContainer {...rest}>
      <ProgressBarInner
        aria-valuenow={percentageComplete}
        aria-valuemax={100}
        aria-valuemin={0}
        role="meter"
        aria-label="Progress bar indicator for this task"
        style={{ width: `${percentageComplete}%`, transitionDuration: `${transitionDuration}s` }}
      >
        <ProgressBarItem />
      </ProgressBarInner>
      {showLabel && <ProgressBarLabel className={elProgressBarLabelRight}>{percentageComplete}%</ProgressBarLabel>}
    </ProgressBarContainer>
  )
}

/** @deprecated */
export const handleSetPercentageCompleteSteps =
  (setPercentageComplete: Dispatch<SetStateAction<number>>, currentStep: number, numberSteps: number) => () => {
    setPercentageComplete((currentStep / numberSteps) * 100)
  }

/** @deprecated */
export const ProgressBarSteps: FC<ProgressBarStepProps> = ({ numberSteps, currentStep, showLabel = true, ...rest }) => {
  const [percentageComplete, setPercentageComplete] = useState<number>((currentStep / numberSteps) * 100)

  useEffect(handleSetPercentageCompleteSteps(setPercentageComplete, currentStep, numberSteps), [currentStep])

  return (
    <ProgressBarContainer {...rest}>
      <ProgressBarInner
        aria-valuenow={currentStep}
        aria-valuemax={numberSteps}
        aria-valuemin={0}
        role="meter"
        aria-label="Progress bar indicator for this task"
        style={{ width: `${percentageComplete}%` }}
      >
        <ProgressBarItem />
      </ProgressBarInner>
      {showLabel && (
        <ProgressBarLabel className={elProgressBarLabelRight}>
          {currentStep}/{numberSteps} Completed
        </ProgressBarLabel>
      )}
    </ProgressBarContainer>
  )
}
