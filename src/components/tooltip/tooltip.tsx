import React, { FC, HTMLAttributes } from 'react'
import { ElTooltip, ElTooltipLabel } from './styles'
import { createPortal } from 'react-dom'

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  description: string
  isVisible?: boolean
  maxWidth?: string
  position?:
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end'
}

export const Tooltip: FC<TooltipProps> = ({
  isVisible,
  label,
  description,
  maxWidth = '400px',
  position = 'top',
  ...rest
}) => {
  const tooltip = (
    <ElTooltip role="tooltip" data-position={position} style={{ maxWidth: maxWidth }} {...rest}>
      {label && <ElTooltipLabel>{label}: </ElTooltipLabel>}
      {description}
    </ElTooltip>
  )
  if (!isVisible) {
    return null
  }
  return createPortal(tooltip, document.body)
}
