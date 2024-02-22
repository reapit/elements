import { Input } from './index'

export default {
  title: 'Input',
  component: Input,
}

export const InputText = {
  render: ({}) => <Input type="text" placeholder="A placeholder" />,
  name: 'Input text',
}

export const InputWithError = {
  render: ({}) => <Input type="text" placeholder="A placeholder" hasError />,
}

export const InputEmail = {
  render: ({}) => <Input type="email" placeholder="Enter your email" />,
  name: 'Input email',
}

export const InputPassword = {
  render: ({}) => <Input type="password" placeholder="Enter password" />,
  name: 'Input password',
}

export const InputNumber = {
  render: ({}) => <Input type="number" />,
  name: 'Input number',
}

export const InputTel = {
  render: ({}) => <Input type="tel" />,
  name: 'Input tel',
}

export const InputUrl = {
  render: ({}) => <Input type="url" />,
  name: 'Input url',
}

export const InputSearch = {
  render: ({}) => <Input type="search" />,
  name: 'Input search',
}

export const InputDate = {
  render: ({}) => <Input type="date" />,
  name: 'Input date',
}

export const InputTime = {
  render: ({}) => <Input type="time" />,
  name: 'Input time',
}

export const InputDatetimeLocal = {
  render: ({}) => <Input type="datetime-local" />,
  name: 'Input datetime-local',
}

export const InputWeek = {
  render: ({}) => <Input type="week" />,
  name: 'Input week',
}

export const InputMonth = {
  render: ({}) => <Input type="month" />,
  name: 'Input month',
}

export const InputFile = {
  render: ({}) => <Input type="file" />,
  name: 'Input file',
}

export const InputCheckbox = {
  render: ({}) => <Input type="checkbox" name="property" value="xyz" />,
  name: 'Input checkbox',
}

export const InputRadio = {
  render: ({}) => <Input type="radio" name="property" value="abc" />,
  name: 'Input radio',
}
