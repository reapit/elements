import { Button } from '../button'
import { CloseIcon } from '#src/icons/close'
import {
  ElSectionMessage,
  ElSectionMessageIconContainer,
  ElSectionMessageTitle,
  ElSectionMessageDescription,
  ElSectionMessageActions,
  elSectionMessageDismissButton,
} from './styles'
import { LineClamp } from '#src/utils/line-clamp/line-clamp'
import { useId } from 'react'

import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'

// We omit `title` because we need to use it for our own purposes.
type AttributesToOmit = 'title'

export namespace SectionMessage {
  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, AttributesToOmit> {
    /** Actions to display at the bottom */
    actions?: ReactNode
    /** The description content of the section message */
    children: ReactNode
    /** Icon to display */
    icon?: ReactNode
    /** Maximum number of lines to description content to display before truncating */
    lineClamp?: number | 'none'
    /** Callback fired when the dismiss button is clicked */
    onDismiss?: MouseEventHandler<HTMLButtonElement>
    /** Title of the section message */
    title?: string
    /** The variant of the section message */
    variant: 'error' | 'warning' | 'info' | 'success' | 'neutral-light' | 'neutral-dark'
  }
}

/**
 * A section message is used to alert users or display contextual information in a particular
 * section of the screen. The component can be used on pages, drawers, dialogs or popovers.
 *
 * For **dynamic messages** (shown after user interaction), use the appropriate ARIA role:
 * - `role="alert"` for urgent messages needing immediate attention (errors, warnings); or,
 * - `role="status"` for non-urgent updates (info, success).
 *
 * For **static messages** (present on page load), no role is needed. Screen readers only announce
 * live region updates, not initial content.
 *
 * @example
 * // Static message on page load (no role)
 * <SectionMessage variant="info">
 *   You have 3 unread messages
 * </SectionMessage>
 *
 * @example
 * // Dynamic error message (use role="alert")
 * {errorMessage && (
 *   <SectionMessage role="alert" variant="error">
 *     {errorMessage}
 *   </SectionMessage>
 * )}
 *
 * @example
 * // Dynamic success message (use role="status")
 * {successMessage && (
 *   <SectionMessage role="status" variant="success">
 *     {successMessage}
 *   </SectionMessage>
 * )}
 */
export function SectionMessage({
  actions,
  children,
  icon,
  lineClamp = 'none',
  onDismiss,
  title,
  variant,
  ...rest
}: SectionMessage.Props) {
  const titleId = useId()

  return (
    <ElSectionMessage {...rest} data-variant={variant} aria-labelledby={title ? titleId : undefined}>
      {/* Dismiss button is first so it is earlier in the tab sequence than the rest of the content */}
      {onDismiss && (
        <Button
          aria-label="Dismiss message"
          className={elSectionMessageDismissButton}
          hasNoPadding
          iconLeft={<CloseIcon aria-hidden />}
          onClick={onDismiss}
          size="small"
          type="button"
          variant="tertiary"
        />
      )}
      {icon && <ElSectionMessageIconContainer>{icon}</ElSectionMessageIconContainer>}
      {title && <ElSectionMessageTitle id={titleId}>{title}</ElSectionMessageTitle>}
      <LineClamp as={ElSectionMessageDescription} clampTo={lineClamp}>
        {children}
      </LineClamp>
      {actions && <ElSectionMessageActions>{actions}</ElSectionMessageActions>}
    </ElSectionMessage>
  )
}
