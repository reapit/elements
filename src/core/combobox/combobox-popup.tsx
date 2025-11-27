import { ComboboxPopupDialog } from './popup-dialog'
import { useComboboxContext } from './context'

type AttributesToOmit = 'aria-labelledby' | 'id'

export namespace ComboboxPopup {
  export interface Props extends Omit<ComboboxPopupDialog.Props, AttributesToOmit> {}
}

/**
 * Combobox popup that displays options as a drawer, popover, or auto.
 * Use via `Combobox.Popup`.
 *
 * - **popover**: Displays as a popover anchored to the combobox button
 * - **drawer**: Displays as a drawer (full-screen modal on mobile)
 * - **auto**: Displays as a drawer on XS breakpoint (< 768px), popover on SM and above
 */
export function ComboboxPopup(props: ComboboxPopup.Props) {
  const { comboboxId, popupId } = useComboboxContext()
  return (
    <ComboboxPopupDialog {...props} aria-labelledby={comboboxId} id={popupId}>
      {props.children}
    </ComboboxPopupDialog>
  )
}

ComboboxPopup.displayName = 'Combobox.Popup'

ComboboxPopup.show = ComboboxPopupDialog.open
ComboboxPopup.hide = ComboboxPopupDialog.close
