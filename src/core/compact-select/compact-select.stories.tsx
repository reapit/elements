import preview from "#.storybook/preview";

import { CompactSelect } from "./compact-select";

const meta = preview.meta({
  title: "Input and selection/CompactSelect",
  component: CompactSelect,
  argTypes: {
    children: {
      control: false,
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
});

/**
 * Demonstrates a single-select Select.
 */
export const Example = meta.story({
  args: {
    children: [
      <CompactSelect.Button key="button" />,
      <CompactSelect.Popup key="popup">
        <CompactSelect.Listbox>
          <CompactSelect.Option value="">Select an option</CompactSelect.Option>
          <CompactSelect.Option value="apple">Apple</CompactSelect.Option>
          <CompactSelect.Option value="apricot">Apricot</CompactSelect.Option>
          <CompactSelect.Option value="avocado">Avocado</CompactSelect.Option>
          <CompactSelect.Option value="banana">Banana</CompactSelect.Option>
          <CompactSelect.Option value="blueberry">Blueberry</CompactSelect.Option>
          <CompactSelect.Option value="cherry">Cherry</CompactSelect.Option>
          <CompactSelect.Option value="cantaloupe">Cantaloupe</CompactSelect.Option>
          <CompactSelect.Option value="grape">Grape</CompactSelect.Option>
          <CompactSelect.Option value="grapefruit">Grapefruit</CompactSelect.Option>
        </CompactSelect.Listbox>
      </CompactSelect.Popup>,
    ],
    disabled: false,
    size: "medium",
  },
});

/**
 * Options can be grouped using the `CompactSelect.Optgroup`. Groups should always be separated
 * by a `CompactSelect.Divider`.
 */
export const Groups = Example.extend({
  args: {
    children: [
      <CompactSelect.Button key="button" />,
      <CompactSelect.Popup key="popup">
        <CompactSelect.Listbox>
          <CompactSelect.Optgroup label="Favourites">
            <CompactSelect.Option value="apple">Apple</CompactSelect.Option>
            <CompactSelect.Option value="blueberry">Blueberry</CompactSelect.Option>
            <CompactSelect.Option value="grape">Grape</CompactSelect.Option>
          </CompactSelect.Optgroup>
          <CompactSelect.Divider />
          <CompactSelect.Optgroup>
            <CompactSelect.Option value="apricot">Apricot</CompactSelect.Option>
            <CompactSelect.Option value="avocado">Avocado</CompactSelect.Option>
            <CompactSelect.Option value="banana">Banana</CompactSelect.Option>
            <CompactSelect.Option value="cherry">Cherry</CompactSelect.Option>
            <CompactSelect.Option value="cantaloupe">Cantaloupe</CompactSelect.Option>
            <CompactSelect.Option value="grapefruit">Grapefruit</CompactSelect.Option>
          </CompactSelect.Optgroup>
        </CompactSelect.Listbox>
      </CompactSelect.Popup>,
    ],
  },
});

/**
 * The select's width can be constrained using `maxWidth`. When the label text is too long, it will
 * truncate, and a tooltip will be available on focus or hover.
 */
export const MaxWidth = Example.extend({
  name: "Max-width",
  args: {
    maxWidth: "80px",
  },
});
