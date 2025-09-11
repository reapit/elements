import { ElDivider } from './styles'

import type { HTMLAttributes } from 'react'

export namespace Divider {
  export interface Props extends HTMLAttributes<HTMLHRElement> {}
}

/**
 * A simple `<hr />` element used to separate sections of content.
 */
export function Divider(props: Divider.Props) {
  return <ElDivider {...props} />
}
