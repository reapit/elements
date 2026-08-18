import preview from "#.storybook/preview";

import { MultiSelect, MultiSelectChip, MultiSelectInput, elHasGreyChips } from "./index";

const meta = preview.meta({
  title: "Deprecated/MultiSelect",
  component: MultiSelect,
});

export default meta;

export const BasicExample = meta.story({
  render: () => (
    <MultiSelect>
      <MultiSelectChip id="item-1">Item One</MultiSelectChip>
      <MultiSelectChip id="item-2">Item Two</MultiSelectChip>
      <MultiSelectChip id="item-3">Item Three</MultiSelectChip>
      <MultiSelectChip id="item-4">Item Four</MultiSelectChip>
      <MultiSelectChip id="item-5">Item Five</MultiSelectChip>
      <MultiSelectChip id="item-6">Item Six</MultiSelectChip>
    </MultiSelect>
  ),
});

export const GreyChips = meta.story({
  render: () => (
    <MultiSelect>
      <MultiSelectChip className={elHasGreyChips} id="item-grey-1">
        Item One
      </MultiSelectChip>
      <MultiSelectChip className={elHasGreyChips} id="item-grey-2">
        Item Two
      </MultiSelectChip>
      <MultiSelectChip className={elHasGreyChips} id="item-grey-3">
        Item Three
      </MultiSelectChip>
      <MultiSelectChip className={elHasGreyChips} id="item-grey-4">
        Item Four
      </MultiSelectChip>
      <MultiSelectChip className={elHasGreyChips} id="item-grey-5">
        Item Five
      </MultiSelectChip>
      <MultiSelectChip className={elHasGreyChips} id="item-grey-6">
        Item Six
      </MultiSelectChip>
    </MultiSelect>
  ),
});

export const ReactExample = meta.story({
  render: () => (
    <MultiSelectInput
      id="react-example"
      options={[
        {
          name: "Item one",
          value: "item-one",
        },
        {
          name: "Item two",
          value: "item-two",
        },
        {
          name: "Item three",
          value: "item-three",
        },
      ]}
      defaultValues={["item-one"]}
    />
  ),
});
