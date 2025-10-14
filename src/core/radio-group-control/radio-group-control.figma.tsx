import { RadioGroupControl } from './radio-group-control'
import figma from '@figma/code-connect'

figma.connect(RadioGroupControl, '<RADIO_GROUP_URL>', {
  props: {
    children: figma.children('Radio *'),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    errorText: figma.enum('State', {
      Error: figma.string('Error message'),
    }),
    label: figma.boolean('Show group label', {
      true: figma.nestedProps('LabelText', {
        text: figma.string('Label text'),
      }),
      false: {
        text: undefined,
      },
    }),
    orientation: figma.enum('Variant', {
      Horizontal: 'horizontal',
      Vertical: 'vertical',
    }),
  },
  example: ({ children, disabled, errorText, label, orientation }) => (
    <RadioGroupControl disabled={disabled} errorText={errorText} label={label.text} orientation={orientation}>
      {children}
    </RadioGroupControl>
  ),
})
