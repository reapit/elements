import { Button } from '#src/core/button'
import { CloseIcon } from '#src/icons/close'

/**
 * Close button for the combobox popup. Uses a form element with the
 * `formMethod="dialog"` attribute to close the dialog. See
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#formmethod)
 * for more information.
 */
export function ComboboxPopupDialogCloseButton() {
  return (
    <form role="none">
      <Button
        aria-label="Close"
        formMethod="dialog"
        iconLeft={<CloseIcon aria-hidden />}
        size="large"
        type="submit"
        variant="tertiary"
      />
    </form>
  )
}
