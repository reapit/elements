import preview from '#.storybook/preview'
import { FormLayout } from '../../form-layout'

const meta = preview.meta({
  title: 'Containers and layout/FormLayout/SectionHeader',
  component: FormLayout.SectionHeader,
  decorators: [
    (Story) => (
      <FormLayout.Section>
        <Story />
      </FormLayout.Section>
    ),
  ],
  parameters: {
    docs: { source: { type: 'code' } },
  },
})

export const Example = meta.story({
  render: function Example() {
    return (
      <FormLayout.SectionHeader>
        <FormLayout.SectionTitle>Personal details</FormLayout.SectionTitle>
        <FormLayout.SectionDescription>Enter the primary contact's personal information.</FormLayout.SectionDescription>
      </FormLayout.SectionHeader>
    )
  },
})
