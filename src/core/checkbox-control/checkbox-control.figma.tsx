import { CheckboxControl } from './checkbox-control'
import figma from '@figma/code-connect'

figma.connect(CheckboxControl, '<CHECKBOX_URL>', {
  props: {
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    errorText: figma.enum('State', {
      Error: figma.string('Error message'),
    }),
    isIndeterminate: figma.enum('Indeterminate', {
      True: true,
      False: false,
    }),
    label: figma.string('Label'),
    supplementaryInfo: figma.boolean('Show supplementary info', {
      true: figma.string('Supplementary info'),
      false: undefined,
    }),
  },
  example: ({ disabled, errorText, isIndeterminate, label, supplementaryInfo }) => (
    <CheckboxControl
      disabled={disabled}
      errorText={errorText}
      isIndeterminate={isIndeterminate}
      label={label}
      supplementaryInfo={supplementaryInfo}
    />
  ),
})
