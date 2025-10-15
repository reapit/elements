import figma from '@figma/code-connect'
import { DateTimeControl } from './date-time-control'

figma.connect(DateTimeControl, '<DATE_TIME_INPUT_URL>', {
  props: {
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    errorText: figma.enum('State', {
      Error: figma.string('Error text'),
    }),
    helpText: figma.boolean('Show helper', {
      true: figma.string('Helper text'),
      false: undefined,
    }),
    label: figma.boolean('Show label', {
      true: figma.nestedProps('LabelText', {
        text: figma.string('Label text'),
        required: figma.boolean('Required'),
      }),
      false: {
        text: undefined,
        required: undefined,
      },
    }),
    showValidity: figma.enum('State', {
      Error: true,
    }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: ({ disabled, errorText, helpText, label, showValidity, size }) => (
    <DateTimeControl
      disabled={disabled}
      errorText={errorText}
      helpText={helpText}
      label={label.text}
      required={label.required}
      showValidity={showValidity}
      size={size}
    />
  ),
})
