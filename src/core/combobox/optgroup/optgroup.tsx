import { ElComboboxOptgroup, ElComboboxOptgroupLabelContainer } from './styles'
import { useId } from 'react'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace ComboboxOptgroup {
  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
    /**
     * Accessible label for the group. Required when `label` is not provided.
     */
    'aria-label'?: string
    /** Options to group, typically `Combobox.Option` components */
    children?: ReactNode
    /** Visual label for the group */
    label?: string
  }
}

/**
 * A Combobox option group with a label. Use via `Combobox.Optgroup`.
 */
export function ComboboxOptgroup({ 'aria-label': ariaLabel, children, label, ...rest }: ComboboxOptgroup.Props) {
  const labelId = useId()
  return (
    // NOTE: Omit aria-labelledby when aria-label is provided. The aria-labelledby attribute takes
    // precedence over aria-label. See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label#:~:text=aria%2Dlabelledby%20will%20take%20precedence%20over%20aria%2Dlabel%20if%20both%20are%20applied
    <ElComboboxOptgroup {...rest} aria-label={ariaLabel} aria-labelledby={ariaLabel ? undefined : labelId} role="group">
      {label && <ElComboboxOptgroupLabelContainer id={labelId}>{label}</ElComboboxOptgroupLabelContainer>}
      {children}
    </ElComboboxOptgroup>
  )
}
