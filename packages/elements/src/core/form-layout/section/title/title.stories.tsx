import preview from "#.storybook/preview";

import { FormLayout } from "../../form-layout";

const meta = preview.meta({
  title: "Containers and layout/FormLayout/SectionTitle",
  component: FormLayout.SectionTitle,
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      table: { defaultValue: { summary: "'h2'" } },
    },
    children: {
      control: "text",
    },
  },
  decorators: [
    (Story) => (
      <FormLayout.Section>
        <Story />
      </FormLayout.Section>
    ),
  ],
});

export const Example = meta.story({
  args: {
    as: "h2",
    children: "Personal details",
  },
});
