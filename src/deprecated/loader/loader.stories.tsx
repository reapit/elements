import { Loader } from './index'

export default {
  title: 'Deprecated/Loader',
  component: Loader,
}

export const Inline = {
  render: ({}) => <Loader />,
}

export const WithALabel = {
  render: ({}) => <Loader label="Loading" />,
  name: 'With a label',
}

export const FullPageLoader = {
  render: ({}) => <p>This loader is fixed to the center of the screen</p>,
  name: 'Full page loader',
}
