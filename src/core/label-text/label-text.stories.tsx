import preview from '#.storybook/preview'
import { LabelText } from './label-text'

const meta = preview.meta({
  title: 'Core/LabelText',
  component: LabelText,
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm'],
    },
    variant: {
      control: 'radio',
      options: ['soft', 'strong'],
    },
  },
})

export const Example = meta.story({
  args: {
    children: "I'm a label for a form input or something else",
    isRequired: false,
    size: 'xs',
    variant: 'soft',
  },
})
