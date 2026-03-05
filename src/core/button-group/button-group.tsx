import { ButtonGroupItem } from './button-group-item'
import { ButtonGroupContext, useButtonGroupContext } from './context'
import { ElButtonGroup } from './styles'

import { useMemo, type HTMLAttributes, type ReactNode } from 'react'

export namespace ButtonGroup {
  export interface ItemProps extends ButtonGroupItem.Props {}

  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Controls the direction in which buttons are laid out. Maps to the CSS `grid-auto-flow` property. */
    autoFlow?: 'row' | 'column'
    /** The buttons in the button group. */
    children: ReactNode
    /** Controls alignment of buttons along the inline axis. Maps to the CSS `justify-content` property. */
    justifyContent?: 'start' | 'end' | 'center' | 'stretch'
    /** The size of the buttons in the button group. */
    size?: 'small' | 'medium' | 'large'
  }
}

/**
 * A button group gives users access to frequently performed, related actions. All buttons within
 * the group should use the same size, which can be set using the `size` prop.
 */
export function ButtonGroup({ autoFlow, children, justifyContent, size = 'medium', ...rest }: ButtonGroup.Props) {
  const contextValue: ButtonGroupContext.Value = useMemo(() => ({ size }), [size])

  return (
    <ElButtonGroup {...rest} data-auto-flow={autoFlow} data-justify-content={justifyContent}>
      <ButtonGroupContext.Provider value={contextValue}>{children}</ButtonGroupContext.Provider>
    </ElButtonGroup>
  )
}

ButtonGroup.Context = ButtonGroupContext
ButtonGroup.Item = ButtonGroupItem
ButtonGroup.useContext = useButtonGroupContext
