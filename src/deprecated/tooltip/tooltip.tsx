import { FC, HTMLAttributes } from 'react'
import { ElDeprecatedTooltip, ElDeprecatedTooltipLabel } from './styles'
import { createPortal } from 'react-dom'
import { PopoverPosition } from '../../helpers/calculatePopoverPosition'

/** @deprecated */
export interface DeprecatedTooltipProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  description: string
  isVisible?: boolean
  maxWidth?: string
  position?: PopoverPosition
}

/** @deprecated */
export const DeprecatedTooltip: FC<DeprecatedTooltipProps> = ({
  isVisible,
  label,
  description,
  maxWidth = '400px',
  position = 'top',
  ...rest
}) => {
  const tooltip = (
    <ElDeprecatedTooltip role="tooltip" data-position={position} style={{ maxWidth: maxWidth }} {...rest}>
      {label && <ElDeprecatedTooltipLabel>{label}: </ElDeprecatedTooltipLabel>}
      {description}
    </ElDeprecatedTooltip>
  )
  if (!isVisible) {
    return null
  }
  return createPortal(tooltip, document.body)
}
