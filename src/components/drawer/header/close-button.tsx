import { DeprecatedButton } from '../../deprecated-button'
import { CloseIcon } from '#src/icons/close'

/**
 * A close button for drawer headers. Combines a form with a button in order to close the drawer via the
 * `formMethod="dialog"` attribute. See
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#formmethod) for more information.
 */
export function DrawerHeaderCloseButton() {
  return (
    <form>
      <DeprecatedButton
        autoFocus
        aria-label="Close"
        formMethod="dialog"
        iconLeft={<CloseIcon size="lg" aria-hidden />}
        size="large"
        type="submit"
        variant="tertiary"
      />
    </form>
  )
}
