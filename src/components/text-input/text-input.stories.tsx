import { Meta, StoryObj } from '@storybook/react'
import { TextInput } from './index'

export default {
  title: 'Components/TextInput',
  component: TextInput,
} as Meta<typeof TextInput>

export const TextInputText: StoryObj<typeof TextInput> = {
  name: 'TextInput default',
  args: {
    type: 'text',
    placeholder: 'A Placeholder',
    suffix: 'check',
    prefix: 'location',
    label: 'Text Input',
    helperText: 'This is a long optional helper text that won’t fit in a single row',
  },
}

export const TextInputDisabled: StoryObj<typeof TextInput> = {
  name: 'TextInput disabled',
  args: {
    type: 'text',
    suffix: 'check',
    prefix: 'location',
    placeholder: 'A Placeholder',
    disabled: true,
    helperText: 'Its Disabled',
    label: 'Text Input',
  },
}

export const TextInputWithError: StoryObj<typeof TextInput> = {
  name: 'TextInput with error',
  args: {
    type: 'text',
    label: 'Text Input',
    errorMessage: 'Error',
    suffix: 'check',
    prefix: 'location',
    placeholder: 'A Placeholder',
    isError: true,
  },
}
export const TextInputWithSize: StoryObj<typeof TextInput> = {
  name: 'TextInput with size',
  args: {
    label: 'Text Input',
    helperText: 'This is a long optional helper text that won’t fit in a single row',
    type: 'email',
    prefix: 'email',
    suffix: 'check',
    size: 'large',
    placeholder: 'A Placeholder',
  },
}

export const TextInputWithVariant: StoryObj<typeof TextInput> = {
  name: 'TextInput with Variant',
  args: {
    label: 'Text Input',
    helperText: 'This is a long optional helper text that won’t fit in a single row',
    type: 'text',
    suffix: 'bed',
    variant: 'with-suffix',
    placeholder: 'A Placeholder',
  },
}

export const TextInputWithRequiredNoTitle: StoryObj<typeof TextInput> = {
  name: 'TextInput with Required no Title',
  args: {
    isRequired: true,
    helperText: 'This is a long optional helper text that won’t fit in a single row',
    type: 'text',
    suffix: 'check',
    prefix: 'bed',
    placeholder: 'A Placeholder',
  },
}
