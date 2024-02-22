import { Toggle, ToggleRadio } from './index'
import { ElToggleItem } from './__styles__'

export default {
  title: 'Toggle',
  component: Toggle,
}

export const BasicUsage = {
  render: ({}) => (
    <Toggle id="my-cool-toggle">
      <ElToggleItem>On</ElToggleItem>
      <ElToggleItem>Off</ElToggleItem>
    </Toggle>
  ),
}

export const ToggleSwitch = {
  render: ({}) => (
    <Toggle id="my-cool-toggle-variants-switch">
      <ElToggleItem />
      <ElToggleItem />
    </Toggle>
  ),

  name: 'Toggle - Switch',
}

export const ToggleGreyBg = {
  render: ({}) => (
    <Toggle id="my-cool-toggle-variants-grey" hasGreyBg>
      <ElToggleItem>On</ElToggleItem>
      <ElToggleItem>Off</ElToggleItem>
    </Toggle>
  ),

  name: 'Toggle - Grey Bg',
}

export const ToggleRadioDefault = {
  render: ({}) => (
    <ToggleRadio
      name="my-cool-toggle-radio"
      options={[
        {
          id: 'option-1',
          value: 'option-1',
          text: 'Option 1',
          isChecked: true,
        },
        {
          id: 'option-2',
          value: 'option-2',
          text: 'Option 2',
          isChecked: false,
        },
        {
          id: 'option-3',
          value: 'option-3',
          text: 'Option 3',
          isChecked: false,
        },
      ]}
    />
  ),

  name: 'Toggle Radio - Default',
}

export const ToggleRadioSelectPropsGreyBg = {
  render: ({}) => (
    <ToggleRadio
      name="my-cool-toggle-radio-grey"
      hasGreyBg
      options={[
        {
          id: 'option-1-fw-grey',
          value: 'option-1-fw-grey',
          text: 'Option 1',
          isChecked: true,
        },
        {
          id: 'option-2-fw-grey',
          value: 'option-2-fw-grey',
          text: 'Option 2',
          isChecked: false,
        },
        {
          id: 'option-3-fw-grey',
          value: 'option-3-fw-grey',
          text: 'Option 3',
          isChecked: false,
        },
      ]}
    />
  ),

  name: 'Toggle RadioSelectProps - Grey Bg',
}

export const ToggleRadioDisabled = {
  render: ({}) => (
    <ToggleRadio
      name="my-cool-toggle-radio"
      disabled={true}
      options={[
        {
          id: 'option-1',
          value: 'option-1',
          text: 'Opt 1',
          isChecked: true,
        },
        {
          id: 'option-2',
          value: 'option-2',
          text: 'Opt 2',
          isChecked: false,
        },
        {
          id: 'option-3',
          value: 'option-3',
          text: 'Opt 3',
          isChecked: false,
        },
      ]}
    />
  ),

  name: 'Toggle Radio - Disabled',
}
