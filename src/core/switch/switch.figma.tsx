import figma from '@figma/code-connect'
import { Switch } from './switch'

figma.connect(Switch, '<SWITCH_URL>', {
  props: {
    ariaLabel: figma.enum('Label', {
      'No label': '<CHANGE ME>',
      Start: undefined,
      End: undefined,
    }),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    label: figma.enum('Label', {
      'No label': undefined,
      Start: figma.string('Label text'),
      End: figma.string('Label text'),
    }),
    labelPlacement: figma.enum('Label', {
      'No label': undefined,
      Start: 'start',
      End: 'end',
    }),
  },
  example: ({ ariaLabel, disabled, label, labelPlacement }) => (
    <Switch aria-label={ariaLabel} disabled={disabled} label={label} labelPlacement={labelPlacement} />
  ),
})
