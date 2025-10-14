import { CheckboxGroupControl } from './checkbox-group-control'
import figma from '@figma/code-connect'

figma.connect(CheckboxGroupControl, '<CHECKBOX_GROUP_URL>', {
  props: {
    children: figma.children('Checkbox *'),
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
    orientation: figma.enum('Orientation', {
      Horizontal: 'horizontal',
      Vertical: 'vertical',
    }),
  },
  example: ({ children, disabled, errorText, label, orientation }) => (
    <CheckboxGroupControl disabled={disabled} errorText={errorText} label={label.text} orientation={orientation}>
      {/* NOTE: use CheckboxGroupControl.Option instead of CheckboxGroupControl */}
      {children}
    </CheckboxGroupControl>
  ),
})
