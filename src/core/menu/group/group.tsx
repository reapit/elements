import { ElMenuGroup, ElMenuGroupLabelContainer } from './styles'
import { useId } from 'react'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace MenuGroup {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Optional label for the menu group. Considered mandatory when there is no visual label defined
     * by `label`.
     */
    'aria-label'?: string
    /** A collection of menu items, typically `MenuGroup.Item` or `MenuGroup.AnchorItem` components */
    children: ReactNode
    /** Optional label for the menu group */
    label?: ReactNode
  }
}

/**
 * A menu group component that provides semantic grouping of menu items with an optional title.
 * Does not render items within a list structure, as not all menu items have to exist within a group.
 */
export function MenuGroup({ 'aria-label': ariaLabel, children, label, role = 'group', ...rest }: MenuGroup.Props) {
  const labelId = useId()
  return (
    <ElMenuGroup {...rest} aria-label={ariaLabel} aria-labelledby={ariaLabel ? undefined : labelId} role={role}>
      {label && <ElMenuGroupLabelContainer id={labelId}>{label}</ElMenuGroupLabelContainer>}
      {children}
    </ElMenuGroup>
  )
}

MenuGroup.displayName = 'Menu.Group'
