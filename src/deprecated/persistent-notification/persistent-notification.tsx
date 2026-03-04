import { cx } from '@linaria/core'
import React, { FC, HTMLAttributes, ReactNode } from 'react'
import {
  ElPersistentNotification,
  elPnIcon,
  elPnContent,
  elPnIsFullWidth,
  elPnIsFixed,
  elPnIsInline,
} from './__styles__'
import { elIsActive } from '../../styles/deprecated-states'
import { Intent, getIntentClassName } from '../../helpers/intent'
import { InfoIcon } from '#src/icons/info'

/** @deprecated */
export interface PersistentNotificationProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  intent?: Intent
  className?: string
  isExpanded?: boolean
  isFullWidth?: boolean
  isFixed?: boolean
  isInline?: boolean
  onExpansionToggle?: (newState: boolean) => void
}

/** @deprecated */
export const PersistentNotification: FC<PersistentNotificationProps> = ({
  icon = <InfoIcon />,
  intent = 'primary',
  className,
  isExpanded = false,
  isFullWidth = false,
  isFixed = false,
  isInline = false,
  onExpansionToggle,
  children,
  ...rest
}) => {
  const intentClassName = getIntentClassName(intent)
  const combinedClassName = cx(
    className,
    intentClassName,
    isExpanded && elIsActive,
    isFullWidth && elPnIsFullWidth,
    isFixed && elPnIsFixed,
    isInline && elPnIsInline,
  )

  return (
    <ElPersistentNotification role="status" className={combinedClassName} {...rest}>
      <div
        className={elPnIcon}
        data-testid="close-icon"
        onClick={() => onExpansionToggle && onExpansionToggle(!isExpanded)}
      >
        {icon}
      </div>
      <div aria-live="polite" className={elPnContent}>
        {children}
      </div>
    </ElPersistentNotification>
  )
}
