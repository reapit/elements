import {
  ElTopBarNavSearchButton,
  ElTopBarNavSearchButtonIcon,
  ElTopBarNavSearchButtonPlaceholder,
  ElTopBarNavSearchButtonShortcutText,
} from './styles'

import type { ComponentProps, MouseEventHandler, ReactNode } from 'react'

interface TopBarNavSearchButtonProps extends ComponentProps<typeof ElTopBarNavSearchButton> {
  /**
   * Indicates the keyboard shortcut that has been implemented to activate this button. Should typically
   * be Ctrl+K or Meta+K depending on the platform used by the currently logged in user.
   */
  'aria-keyshortcuts'?: string
  /**
   * A click handler that launches the product's search experience.
   */
  onClick: MouseEventHandler<HTMLButtonElement>
  /**
   * The keyboard shortcut, if any, that a product uses to launch the search experience. Should typically
   * be Ctrl+K or ⌘K depending on the platform used by the currently logged in user. This only defines
   * a visual indicator of the shortcut and therefore does not need to use the
   * [\<kbd\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd) element;
   * to communicate the shortcut to assistive technologies, the
   * [aria-keyshortcuts](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-keyshortcuts)
   * attribute should also be supplied.
   */
  shortcut?: ReactNode
}

/**
 * A button used to launch the search experience for a product. It is for use on tablet devices or larger.
 * For mobile devices, `TopBar.NavSearchIconItem` should be used instead. Products may also choose to allow
 * the search experience to be launched via a keyboard shortcut; usually `Ctrl+K` or `⌘K`. If so, the shortcut
 * should be displayed via the `shortcut` prop.
 */
export function TopBarNavSearchButton({ shortcut, onClick, ...props }: TopBarNavSearchButtonProps) {
  return (
    <ElTopBarNavSearchButton {...props} onClick={onClick} type="button">
      <ElTopBarNavSearchButtonIcon aria-hidden="true" />
      <ElTopBarNavSearchButtonPlaceholder>Search</ElTopBarNavSearchButtonPlaceholder>
      {shortcut && (
        <ElTopBarNavSearchButtonShortcutText aria-hidden="true">{shortcut}</ElTopBarNavSearchButtonShortcutText>
      )}
    </ElTopBarNavSearchButton>
  )
}
