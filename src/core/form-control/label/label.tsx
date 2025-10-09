import { cx } from '@linaria/core'
import { elFormControlLabel } from './styles'
import { LabelText } from '#src/core/label-text'
import { mapSizeToLabelTextSize } from './map-size-to-label-text-size'

import type { LabelHTMLAttributes, HTMLAttributes } from 'react'

export namespace FormControlLabel {
  interface CommonProps {
    /** Whether the label should indicate a value is required. */
    isRequired?: boolean
    /**
     * The size of the label text. Should match the size of the actual input or other form control
     * element being labelled. By default, the text size will inherit from the parent `FormControl`.
     */
    size?: 'small' | 'medium' | 'large'
  }

  export interface AsLabelProps extends CommonProps, LabelHTMLAttributes<HTMLLabelElement> {
    as?: 'label'
    /** The ID of the form control this label is associated with. */
    htmlFor: string
  }

  export interface AsLegendProps extends CommonProps, HTMLAttributes<HTMLLegendElement> {
    as: 'legend'
  }

  export type Props = AsLabelProps | AsLegendProps
}

/**
 * The label for a form control.
 */
export function FormControlLabel({
  as: Element = 'label',
  children,
  className,
  isRequired,
  size,
  ...rest
}: FormControlLabel.Props) {
  return (
    <Element {...(rest as any)} className={cx(elFormControlLabel, className)}>
      <LabelText isRequired={isRequired} size={mapSizeToLabelTextSize(size)} variant="soft">
        {children}
      </LabelText>
    </Element>
  )
}

FormControlLabel.displayName = 'FormControl.Label'
