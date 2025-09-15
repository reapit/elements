import { ElButtonGroup } from './styles'
import type { HTMLAttributes, ReactNode } from 'react'

export namespace ButtonGroup {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The buttons in the button group. */
    children: ReactNode
  }
}

/**
 * A button group gives users access to frequently performed, related actions. While the button group
 * is flexible enough to allow for any button size to be used, all buttons should use the same size.
 */
export function ButtonGroup({ children, ...rest }: ButtonGroup.Props) {
  return <ElButtonGroup {...rest}>{children}</ElButtonGroup>
}
