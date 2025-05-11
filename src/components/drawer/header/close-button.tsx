import { Button } from '../../button'
import { Icon } from '../../icon'

/**
 * ...
 */
export default function DrawerCloseButton() {
  return (
    <form>
      <Button
        autoFocus
        formMethod="dialog"
        iconLeft={<Icon icon="close" fontSize="1.25rem" />}
        size="small"
        type="submit"
        variant="tertiary"
      />
    </form>
  )
}
