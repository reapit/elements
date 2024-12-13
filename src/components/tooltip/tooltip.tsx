import React, { FC, HTMLAttributes, useState, ReactNode } from 'react'
import { ElTooltipChild, ElTooltipContainer, ElTooltipLabel } from './styles'
import { useId } from '#src/storybook/random-id'

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  label?: string
  description: string
  maxWidth?: string
  position?:
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'topStart'
    | 'topEnd'
    | 'bottomStart'
    | 'bottomEnd'
    | 'rightStart'
    | 'rightEnd'
    | 'leftStart'
    | 'leftEnd'
}

export interface TooltipChildProps extends HTMLAttributes<HTMLDivElement> {
  position: TooltipProps['position']
  maxWidth?: string
}

export const Tooltip: FC<TooltipProps> = ({ children, label, description, maxWidth = '400px', position = 'top' }) => {
  const [visible, setVisible] = useState(false)
  const tooltipId = useId()

  return (
    <ElTooltipContainer
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      aria-describedby={tooltipId}
    >
      {children}
      {visible && (
        <TooltipChild id={tooltipId} position={position} maxWidth={maxWidth}>
          {label && <ElTooltipLabel>{label}: </ElTooltipLabel>}
          {description}
        </TooltipChild>
      )}
    </ElTooltipContainer>
  )
}

export const TooltipChild: FC<TooltipChildProps> = ({ children, position, maxWidth, id }) => {
  return (
    <ElTooltipChild
      id={id} // To support a11y for screen reader to pass to aria-describedby
      role="tooltip"
      data-position={position}
      style={{ maxWidth: maxWidth }}
      aria-hidden={!id} // hidden if no id is present
      aria-live="assertive" // Announce content dynamically
    >
      {children}
    </ElTooltipChild>
  )
}
