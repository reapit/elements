import preview from '#.storybook/preview'
import { TextControl } from '#src/core/text-control'
import { FormLayout } from '../form-layout'

const meta = preview.meta({
  title: 'Core/FormLayout/Section',
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
export const Grid = Example.extend({
  render: function Grid() {
    return (
      <FormLayout.Section>
        <FormLayout.SectionHeader>
          <FormLayout.SectionTitle>Personal details</FormLayout.SectionTitle>
          <FormLayout.SectionDescription>
            Enter the primary contact's personal information.
          </FormLayout.SectionDescription>
        </FormLayout.SectionHeader>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-4)' }}>
          <TextControl label="First name" />
          <TextControl label="Last name" />
          <TextControl label="Email address" type="email" />
          <TextControl label="Phone number" type="tel" />
        </div>
      </FormLayout.Section>
    )
  },
})
