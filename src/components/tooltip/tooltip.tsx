import React, { FC, HTMLAttributes, useState, ReactNode } from 'react'
import { ElToolTipChild, ElToolTipContainer, ElToolTipLabel } from './styles'
import { useId } from '#src/storybook/random-id'

export interface ToolTipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  label?: string
  tip: string
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

export interface ToolTipChildProps extends HTMLAttributes<HTMLDivElement> {
  position: ToolTipProps['position']
  maxWidth?: string
}

export const ToolTip: FC<ToolTipProps> = ({ children, label, tip, maxWidth = '400px', position = 'top' }) => {
  const [visible, setVisible] = useState(false)
  const tooltipId = useId()

  return (
    <ElToolTipContainer
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      aria-describedby={tooltipId}
    >
      {children}
      {visible && (
        <ToolTipChild id={tooltipId} position={position} maxWidth={maxWidth}>
          {label && <ElToolTipLabel>{label}: </ElToolTipLabel>}
          {tip}
        </ToolTipChild>
      )}
    </ElToolTipContainer>
  )
}

export const ToolTipChild: FC<ToolTipChildProps> = ({ children, position, maxWidth, id }) => {
  return (
    <ElToolTipChild
      id={id} // To support a11y for screen reader to pass to aria-describedby
      role="tooltip"
      data-position={position}
      style={{ maxWidth: maxWidth }}
      aria-hidden={!id} // hidden if no id is present
      aria-live="assertive" // Announce content dynamically
    >
      {children}
    </ElToolTipChild>
  )
}
