import preview from '#.storybook/preview'
import { FormLayout } from '../../form-layout'

const meta = preview.meta({
  title: 'Containers and layout/FormLayout/SectionDescription',
  component: FormLayout.SectionDescription,
  argTypes: {
    children: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <FormLayout.Section aria-label="Example section">
        <Story />
      </FormLayout.Section>
    ),
  ],
})

export const Example = meta.story({
  args: {
    children: 'Enter the primary contact information for this section.',
  },
})
