import { ChipSelect } from './chip-select'
import figma from '@figma/code-connect'

figma.connect(ChipSelect.Option, '<CHIP_SELECT_OPTION_URL>', {
  variant: { 'Show label': true },
  props: {
    defaultChecked: figma.boolean('Selected'),
    children: figma.string('Label'),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    icon: figma.instance('Icon'),
  },
  example: (props) => (
    <ChipSelect.Option
      defaultChecked={props.defaultChecked}
      disabled={props.disabled}
      icon={props.icon}
      value="change-me"
    >
      {props.children}
    </ChipSelect.Option>
  ),
})

figma.connect(ChipSelect.Option, '<CHIP_SELECT_OPTION_URL>', {
  variant: { 'Show label': false },
  props: {
    defaultChecked: figma.boolean('Selected'),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    icon: figma.instance('Icon'),
  },
  example: (props) => (
    <ChipSelect.Option
      defaultChecked={props.defaultChecked}
      disabled={props.disabled}
      icon={props.icon}
      value="change-me"
    />
  ),
})
