import { InputError } from './index'
import { InputGroup } from '../input-group'

export default {
  title: 'Deprecated/InputError',
  component: InputError,
}

export const ErrorMessage = {
  render: ({}) => (
    <InputGroup
      hasError
      name="email address"
      type="email"
      placeholder="Not an email"
      errorMessage="Email address provided is not a valid email address"
    />
  ),
}
