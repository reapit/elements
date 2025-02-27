import { Meta, StoryObj } from '@storybook/react'
import { DateTimeInput } from './index'

export default {
  title: 'Components/DateTimeInput',
  component: DateTimeInput,
} as Meta<typeof DateTimeInput>

export const DateTimeInputText: StoryObj<typeof DateTimeInput> = {
  name: 'DateTimeInput default',
  args: {
    placeholder: 'A Placeholder',
    prefix: 'location',
    label: 'Text Input',
    helperText: 'This is a long optional helper text that won’t fit in a single row',
  },
}
