import preview from '#.storybook/preview'
import { TextControl } from '#src/core/text-control'
import { Grid } from '#src/utils/grid'
import { FormLayout } from '../form-layout'

const meta = preview.meta({
  title: 'Containers and layout/FormLayout/Section',
  component: FormLayout.Section,
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
      <FormLayout.Section>
        <FormLayout.SectionHeader>
          <FormLayout.SectionTitle>Personal details</FormLayout.SectionTitle>
          <FormLayout.SectionDescription>
            Enter the primary contact's personal information.
          </FormLayout.SectionDescription>
        </FormLayout.SectionHeader>
        <TextControl label="First name" />
        <TextControl label="Last name" />
        <TextControl label="Email address" type="email" />
      </FormLayout.Section>
    )
  },
})

/**
 * When fields are logically paired, a CSS grid wrapper creates a two-column layout within the
 * section. Use this when horizontal space is available.
 */
export const TwoColumn = Example.extend({
  render: function TwoColumn() {
    return (
      <FormLayout.Section>
        <FormLayout.SectionHeader>
          <FormLayout.SectionTitle>Personal details</FormLayout.SectionTitle>
          <FormLayout.SectionDescription>
            Enter the primary contact's personal information.
          </FormLayout.SectionDescription>
        </FormLayout.SectionHeader>
        <Grid templateColumns="repeat(2, 1fr)" gap="--spacing-4">
          <TextControl label="First name" />
          <TextControl label="Last name" />
          <TextControl label="Email address" type="email" />
          <TextControl label="Phone number" type="tel" />
        </Grid>
      </FormLayout.Section>
    )
  },
})
