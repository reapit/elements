import { ComboboxPopupDrawer } from './popup-drawer'
import { ComboboxPopupPopover } from './popup-popover'
import { hideComboboxPopup } from './hide-popup'
import { showComboboxPopup } from './show-popup'
import { toggleComboboxPopup } from './toggle-popup'
import { useCloseComboboxPopupOnClick } from './use-close-on-click'
import { useComboboxPopupFocusManagement } from './use-popup-focus-management'
import { useComboboxContext } from '../context'

type AttributesToOmit = 'aria-labelledby' | 'id'

export namespace ComboboxPopup {
  export interface AsPopoverProps extends Omit<ComboboxPopupPopover.Props, AttributesToOmit> {
    variant: 'popover'
  }
  export interface AsDrawerProps extends Omit<ComboboxPopupDrawer.Props, AttributesToOmit> {
    variant: 'drawer'
  }

  export type Props = AsDrawerProps | AsPopoverProps
}

/**
 * Combobox popup that displays options as either a drawer or popover.
 * Use via `Combobox.Listbox`.
 */
export function ComboboxPopup(props: ComboboxPopup.Props) {
  const context = useComboboxContext()
  const handleClick = useCloseComboboxPopupOnClick(props.onClick)

  useComboboxPopupFocusManagement(context)

  if (props.variant === 'drawer') {
    return (
      <ComboboxPopupDrawer {...props} aria-labelledby={context.buttonId} id={context.popupId} onClick={handleClick}>
        {props.children}
      </ComboboxPopupDrawer>
    )
  }

  return (
    <ComboboxPopupPopover {...props} aria-labelledby={context.buttonId} id={context.popupId} onClick={handleClick}>
      {props.children}
    </ComboboxPopupPopover>
  )
}

ComboboxPopup.show = showComboboxPopup
ComboboxPopup.hide = hideComboboxPopup
ComboboxPopup.toggle = toggleComboboxPopup
