import preview from '#.storybook/preview'
import { FormLayout } from '../form-layout'

const meta = preview.meta({
  title: 'Containers and layout/FormLayout/Header',
  component: FormLayout.Header,
  decorators: [
    (Story) => (
      <FormLayout aria-label="Example form">
        <Story />
      </FormLayout>
    ),
  ],
  parameters: {
    docs: { source: { type: 'code' } },
  },
})

export const Example = meta.story({
  render: function Example() {
    return (
      <FormLayout.Header>
        <FormLayout.Title>Contact details</FormLayout.Title>
        <FormLayout.Description>Add the primary contact information for this record.</FormLayout.Description>
      </FormLayout.Header>
    )
  },
})
