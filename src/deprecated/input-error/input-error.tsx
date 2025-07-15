import { ElInputError } from './__styles__'

/** @deprecated */
export interface InputErrorInterface {
  message: string
}

/** @deprecated */
export const InputError = ({ message }: InputErrorInterface) => {
  return <ElInputError>{message}</ElInputError>
}
