import { CloseIcon } from '#src/icons/close'
import {
  ElSectionMessage,
  ElSectionMessageIconContainer,
  ElSectionMessageTitle,
  ElSectionMessageDescription,
  ElSectionMessageActions,
  ElSectionMessageDismissButton,
} from './styles'

import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export namespace SectionMessage {
  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The description content of the section message */
    description: ReactNode
    /** Optional title text */
    title?: string
    /** The variant of the section message */
    variant: 'error' | 'warning' | 'info' | 'success' | 'neutral-light' | 'neutral-dark'
    /** Callback fired when the dismiss button is clicked */
    onDismiss?: MouseEventHandler<HTMLButtonElement>
    /** Optional actions to display at the bottom */
    actions?: ReactNode
    /** Optional icon to display */
    icon?: ReactNode
  }
}

/**
 * A section message component that displays contextual information or alerts users within a specific screen section.
 *
 * Can be used in pages, drawers, dialogs, or popovers.
 * Supports multiple variants (error, warning, info, success, neutral-light, neutral-dark)
 * with optional title, icon, actions, and dismiss functionality.
 */
export function SectionMessage({
  description,
  title,
  variant,
  onDismiss,
  actions,
  icon,
  ...rest
}: SectionMessage.Props) {
  const defaultRole = variant === 'error' || variant === 'warning' ? 'alert' : 'status'
  const role = rest.role ?? defaultRole

  return (
    <ElSectionMessage {...rest} role={role} data-variant={variant}>
      {icon && <ElSectionMessageIconContainer aria-hidden>{icon}</ElSectionMessageIconContainer>}
      {title && <ElSectionMessageTitle>{title}</ElSectionMessageTitle>}
      <ElSectionMessageDescription>{description}</ElSectionMessageDescription>
      {actions && <ElSectionMessageActions>{actions}</ElSectionMessageActions>}
      {onDismiss && (
        <ElSectionMessageDismissButton type="button" aria-label="dismiss" onClick={onDismiss}>
          <CloseIcon aria-hidden />
        </ElSectionMessageDismissButton>
      )}
    </ElSectionMessage>
  )
}
