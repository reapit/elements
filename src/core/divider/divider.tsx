import { ElDivider } from './styles'

import type { HTMLAttributes } from 'react'

interface DividerProps extends HTMLAttributes<HTMLHRElement> {}

/**
 * A simple `<hr />` element used to separate sections of content.
 */
export function Divider(props: DividerProps) {
  return <ElDivider {...props} />
}
