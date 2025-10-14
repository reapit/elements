import figma from '@figma/code-connect'
import { RadioGroupControl } from './radio-group-control'

figma.connect(RadioGroupControl.Option, '<RADIO_URL>', {
  props: {
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    label: figma.string('Label'),
    supplementaryInfo: figma.boolean('Show supplementary info', {
      true: figma.string('Supplementary info'),
      false: undefined,
    }),
  },
  example: ({ disabled, label, supplementaryInfo }) => (
    <RadioGroupControl.Option disabled={disabled} label={label} supplementaryInfo={supplementaryInfo} />
  ),
})
