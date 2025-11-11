import { ComboboxPopupDrawer } from './popup-drawer'
import { ComboboxPopupPopover } from './popup-popover'
import { hideComboboxPopup } from './hide-popup'
import { showComboboxPopup } from './show-popup'
import { toggleComboboxPopup } from './toggle-popup'
import { useCloseComboboxPopupOnClick } from './use-close-on-click'
import { useComboboxPopupFocusManagement } from './use-popup-focus-management'

export namespace ComboboxPopup {
  export interface AsPopoverProps extends ComboboxPopupPopover.Props {
    variant: 'popover'
  }
  export interface AsDrawerProps extends ComboboxPopupDrawer.Props {
    variant: 'drawer'
  }

  export type Props = AsDrawerProps | AsPopoverProps
}

/**
 * Combobox popup that displays options as either a drawer or popover.
 * Use via `Combobox.Listbox`.
 */
export function ComboboxPopup(props: ComboboxPopup.Props) {
  const handleClick = useCloseComboboxPopupOnClick(props.onClick)

  useComboboxPopupFocusManagement({
    popupId: props.id,
    comboboxId: props['aria-labelledby'],
  })

  if (props.variant === 'drawer') {
    return (
      <ComboboxPopupDrawer {...props} onClick={handleClick}>
        {props.children}
      </ComboboxPopupDrawer>
    )
  }

  return (
    <ComboboxPopupPopover {...props} onClick={handleClick}>
      {props.children}
    </ComboboxPopupPopover>
  )
}

ComboboxPopup.show = showComboboxPopup
ComboboxPopup.hide = hideComboboxPopup
ComboboxPopup.toggle = toggleComboboxPopup
