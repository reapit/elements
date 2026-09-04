import { Meta, StoryObj } from '@storybook/react'
import { TextInput } from './index'

export default {
  title: 'Components/TextInput',
  component: TextInput,
} as Meta<typeof TextInput>

const prefix = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.0509 2.29843C20.4632 1.9354 19.7297 1.90138 19.1109 2.20843L12.7609 5.37843H7.00088C4.49862 5.37819 2.38147 7.22774 2.04563 9.70737C1.7098 12.187 3.2587 14.5331 5.67088 15.1984L4.27088 19.3784C4.12166 19.8362 4.19967 20.3376 4.48088 20.7284C4.75434 21.1292 5.20578 21.3717 5.69088 21.3786H8.69088C9.3306 21.3871 9.90344 20.9836 10.1109 20.3784L11.7709 15.3784H12.7709L19.1209 18.5484C19.3974 18.6862 19.702 18.7581 20.0109 18.7584C21.1155 18.7584 22.0109 17.863 22.0109 16.7584V3.99843C22.008 3.30346 21.6445 2.65981 21.0509 2.29843ZM4.00088 10.3784C4.00088 8.72158 5.34403 7.37843 7.00088 7.37843H12.0009V13.3784H7.00088C5.34403 13.3784 4.00088 12.0353 4.00088 10.3784ZM8.28088 19.3784H6.39088L7.72088 15.3784H9.61088L8.28088 19.3784ZM14.0009 13.7584V6.99843L20.0009 3.99843V16.7584L14.0009 13.7584Z"
      fill="currentColor"
    />
  </svg>
)

const suffix = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 11H13V4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11Z"
      fill="currentColor"
    />
  </svg>
)

export const TextInputText: StoryObj<typeof TextInput> = {
  name: 'TextInput default',
  args: {
    type: 'text',
    placeholder: 'A Placeholder',
  },
}

export const TextInputDisabled: StoryObj<typeof TextInput> = {
  name: 'TextInput disabled',
  args: {
    type: 'text',
    placeholder: 'A Placeholder',
    disabled: true,
  },
}

export const TextInputWithError: StoryObj<typeof TextInput> = {
  name: 'TextInput with error',
  args: {
    type: 'text',
    placeholder: 'A Placeholder',
    isError: true,
  },
}
export const TextInputWithSize: StoryObj<typeof TextInput> = {
  name: 'TextInput with size',
  args: {
    type: 'email',
    size: 'large',
    placeholder: 'A Placeholder',
  },
}

export const TextInputWithVariant: StoryObj<typeof TextInput> = {
  name: 'TextInput with Variant',
  args: {
    type: 'text',
    suffix: suffix,
    variant: 'with-suffix',
    placeholder: 'A Placeholder',
  },
}

export const TextInputWithRequiredNoTitle: StoryObj<typeof TextInput> = {
  name: 'TextInput with Required no Title',
  args: {
    isRequired: true,
    type: 'text',
    placeholder: 'A Placeholder',
  },
}

export const TextInputWithPrefixAndSuffix: StoryObj<typeof TextInput> = {
  name: 'TextInput with Required no Title',
  args: {
    isRequired: true,
    type: 'text',
    suffix: suffix,
    prefix: prefix,
    placeholder: 'A Placeholder',
  },
}
