import { TextArea } from './index'

export default {
  title: 'TextArea',
  component: TextArea,
}

export const BasicUsage = {
  render: ({}) => (<TextArea type="text" placeholder="A placeholder" />),
}

export const TextAreaPlaceholder = {
  render: ({}) => (<TextArea type="text" placeholder="Hello" />),
  name: 'Text Area placeholder',
}

export const TextAreaError = {
  render: ({}) => (<TextArea type="text" hasError />),
}
