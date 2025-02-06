import { ElLabelText, LabelText } from './index'

export default {
  title: 'Components/LabelText',
  component: ElLabelText,
}

export const BasicUsage = {
  render: (args) => (
    <>
      <LabelText {...args}>I&apos;m a label for a form input or something else</LabelText>
    </>
  ),
  argTypes: {
    size: {
      control: 'select',
      description: 'Defines label text render size',
      options: ['small', 'medium'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'small' },
      },
    },
    variant: {
      control: 'select',
      description: 'Rendering label text with the variant',
      options: ['soft', 'strong'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'soft' },
      },
    },
    isRequired: {
      control: 'boolean',
      description: 'Rendering Required mark in the end children',
    },
  },
}
