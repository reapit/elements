import { ElAtAGlanceCardRadio, ElAtAGlanceCardRadioInput } from './styles'
import { forwardRef } from 'react'

import type { InputHTMLAttributes, ReactNode } from 'react'

export namespace AtAGlanceCardRadio {
  export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** Content to display inside the card. Typically an `AtAGlanceCardContent` component. */
    children: ReactNode
    /** Groups radio buttons together. Used in form submission. */
    name: string
    /** Value of this radio option. */
    value: string
  }
}

/**
 * A selectable card that wraps content in a radio button pattern.
 * Use with `AtAGlance.CardContent` to display structured data.
 * Components with the same `name` form a radio group.
 *
 * @example
 * <AtAGlance.CardRadio
 *   name="fruit"
 *   value="apple"
 * >
 *   <AtAGlance.CardContent
 *     description="Crunchy and juicy"
 *     icon={<SproutIcon />}
 *     label="Apples"
 *     value="42"
 *   />
 * </AtAGlance.CardRadio>
 */
export const AtAGlanceCardRadio = forwardRef<HTMLInputElement, AtAGlanceCardRadio.Props>(
  ({ children, name, value, className, style, ...rest }, ref) => {
    return (
      <ElAtAGlanceCardRadio className={className} style={style}>
        <ElAtAGlanceCardRadioInput {...rest} ref={ref} type="radio" name={name} value={value} />
        {children}
      </ElAtAGlanceCardRadio>
    )
  },
)

AtAGlanceCardRadio.displayName = 'AtAGlanceCardRadio'
