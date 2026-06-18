import preview from '#.storybook/preview'
import { FormLayout } from '../form-layout'

const meta = preview.meta({
  title: 'Core/FormLayout/Description',
  component: FormLayout.Description,
  argTypes: {
    children: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <FormLayout aria-label="Example form">
        <Story />
      </FormLayout>
    ),
  ],
})

export const Example = meta.story({
  args: {
    children: 'Add the primary contact information for this record.',
  },
})
