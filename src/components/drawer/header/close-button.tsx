import { Button } from '../../button'
import { Icon } from '../../icon'

/**
 * A close button for drawer headers. Combines a form with a button in order to close the drawer via the
 * `formMethod="dialog"` attribute. See
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#formmethod) for more information.
 */
export function DrawerHeaderCloseButton() {
  return (
    <form>
      <Button
        autoFocus
        aria-label="Close"
        formMethod="dialog"
        iconLeft={<Icon aria-hidden icon="close" fontSize="1.25rem" />}
        size="small"
        type="submit"
        variant="tertiary"
      />
    </form>
  )
}
