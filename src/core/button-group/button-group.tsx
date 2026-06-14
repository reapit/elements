import { ButtonGroupItem } from './button-group-item'
import { ButtonGroupContext, useButtonGroupContext } from './context'
import { ElButtonGroup } from './styles'

import { useMemo, type HTMLAttributes, type ReactNode } from 'react'

export namespace ButtonGroup {
  export interface ItemProps extends ButtonGroupItem.Props {}

  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Controls how buttons fill the available space. For horizontal groups, `stretch` makes all
     * buttons equal width and height. For vertical groups, `stretch` makes all buttons full width.
     */
    align?: 'start' | 'end' | 'center' | 'stretch'
    /**
     * Controls the direction in which buttons are laid out.
     * @deprecated Use `orientation` instead.
     */
    autoFlow?: 'row' | 'column'
    /** The buttons in the button group. */
    children: ReactNode
    /**
     * Controls alignment of buttons. Behaviour is orientation-dependent: maps to CSS `justify-content`
     * in horizontal groups and CSS `align-items` in vertical groups.
     * @deprecated Use `align` instead.
     */
    justifyContent?: 'start' | 'end' | 'center' | 'stretch'
    /** Controls the direction in which buttons are laid out. */
    orientation?: 'horizontal' | 'vertical'
    /** The size of the buttons in the button group. */
    size?: 'small' | 'medium' | 'large'
  }
}

/**
 * A button group gives users access to frequently performed, related actions. All buttons within
 * the group should use the same size, which can be set using the `size` prop.
 */
export function ButtonGroup({
  align,
  autoFlow,
  children,
  justifyContent,
  orientation,
  size = 'medium',
  ...rest
}: ButtonGroup.Props) {
  const contextValue: ButtonGroupContext.Value = useMemo(() => ({ size }), [size])

  return (
    <ElButtonGroup
      {...rest}
      data-auto-flow={autoFlow}
      data-align={align}
      data-orientation={orientation}
      data-justify-content={justifyContent}
    >
      <ButtonGroupContext.Provider value={contextValue}>{children}</ButtonGroupContext.Provider>
    </ElButtonGroup>
  )
}

ButtonGroup.Context = ButtonGroupContext
ButtonGroup.Item = ButtonGroupItem
ButtonGroup.useContext = useButtonGroupContext
