import { InputGroup } from './index'
import { Input } from '../input'
import { Icon } from '../icon'
import { Label } from '../label'
import { InputAddOn } from '../input-add-on'

export default {
  title: 'InputGroup',
  component: InputGroup,
}

export const CompleteExample = {
  render: () => (
    <InputGroup>
      <Input id="myId" type="text" />
      <Icon fontSize="1rem" icon="user" />
      <Label htmlFor="myId">Enter your username</Label>
      <InputAddOn>Required</InputAddOn>
    </InputGroup>
  ),

  name: 'Complete example',
}

export const WithIconOnly = {
  render: () => (
    <InputGroup>
      <Input id="myId2" type="tel" placeholder="Enter your mobile number" />
      <Icon fontSize="1rem" icon="phone" />
    </InputGroup>
  ),

  name: 'With Icon only',
}

export const WithLabelOnly = {
  render: () => (
    <InputGroup>
      <Input id="myId3" type="email" />
      <Label htmlFor="myId3">Email address</Label>
    </InputGroup>
  ),

  name: 'With Label only',
}

export const WithInputAddOnOnly = {
  render: () => (
    <InputGroup>
      <Input id="myId3" type="email" />
      <InputAddOn>Required</InputAddOn>
    </InputGroup>
  ),

  name: 'With InputAddOn only',
}

export const ReactShorthand = {
  render: () => <InputGroup icon="property" label="Please enter an address" type="text" />,
  name: 'React shorthand',
}

export const ReactShorthandCustomId = {
  render: () => <InputGroup id="my-id" icon="property" label="Please enter an address" type="text" />,
  name: 'React shorthand - custom ID',
}

export const ReactShorthandAllProps = {
  render: () => (
    <InputGroup icon="asteriskSystem" label="Email address" inputAddOnText="Required" intent="danger" type="text" />
  ),

  name: 'React shorthand - all props',
}

export const InputCheckbox = {
  render: () => <InputGroup type="checkbox" icon="phone" label="Status" inputAddOnText="Listed" />,
  name: 'Input checkbox',
}

export const InputCheckboxWithIntent = {
  render: () => <InputGroup type="checkbox" icon="info" intent="danger" label="Status" inputAddOnText="Listed" />,

  name: 'Input checkbox - with intent',
}

export const InputCheckboxNoIcon = {
  render: () => <InputGroup type="checkbox" label="Status" inputAddOnText="Listed" />,
  name: 'Input checkbox - no icon',
}

export const InputCheckboxNoLabel = {
  render: () => <InputGroup type="checkbox" inputAddOnText="Listed" />,
  name: 'Input checkbox - no label',
}

export const InputRadio = {
  render: () => <Label className="el-mb2 el-flex">Preferred contact</Label>,
  name: 'Input radio',
}

export const InputRadioWithIntent = {
  render: () => <Label className="el-mb2 el-flex">Preferred contact</Label>,
  name: 'Input radio - with intent',
}

export const InputRadioWithInputAddOn = {
  render: () => <Label className="el-mb2 el-flex">Preferred contact</Label>,
  name: 'Input radio - with InputAddOn',
}

export const ErrorMessage = {
  render: () => (
    <InputGroup
      className="el-mb2"
      type="email"
      name="phone"
      label="Email Address"
      errorMessage="Email address is not valid"
    />
  ),

  name: 'Error message',
}
