import { useId } from "react";

import preview from "#.storybook/preview";
import { ChipSelect } from "#src/core/chip-select";
import { StarIcon } from "#src/icons/star";

import { ChipSelectControl } from "./chip-select-control";

const meta = preview.meta({
  title: "Input and selection/ChipSelectControl",
  component: ChipSelectControl,
  argTypes: {
    children: {
      control: false,
    },
    errorText: {
      control: "text",
    },
    helpText: {
      control: "text",
    },
    label: {
      control: "text",
    },
    overflow: {
      control: "radio",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
  render: (args) => {
    const formId = args.form ? `${args.form}-${useId()}` : useId();
    return (
      <>
        <form id={formId} />
        <ChipSelectControl {...args} form={formId} />
      </>
    );
  },
});

export const Example = meta.story({
  args: {
    children: [
      <ChipSelect.Option key="1" icon={<StarIcon />} value="1">
        Apples
      </ChipSelect.Option>,
      <ChipSelect.Option key="2" defaultChecked icon={<StarIcon />} value="2">
        Bananas
      </ChipSelect.Option>,
      <ChipSelect.Option key="3" icon={<StarIcon />} value="3">
        Oranges
      </ChipSelect.Option>,
      <ChipSelect.Option key="4" icon={<StarIcon />} value="4">
        Peanuts
      </ChipSelect.Option>,
      <ChipSelect.Option key="5" icon={<StarIcon />} value="5">
        Strawberries
      </ChipSelect.Option>,
    ],
    errorText: "",
    flow: "wrap",
    form: "my-form",
    helpText: "",
    label: "Favorite Fruit",
    multiple: false,
    name: "fruit",
    overflow: "visible",
    required: false,
    size: "small",
  },
});

/**
 * Help text can be provided to give additional context about the chip select.
 */
export const HelpText = Example.extend({
  args: {
    helpText: "Choose your favorite fruit",
  },
});

/**
 * Chip selects can be marked as required. When they are, a required indicator is automatically shown
 * as part of the chip select's label.
 */
export const Required = Example.extend({
  args: {
    required: true,
  },
});

/**
 * An error message can also be provided to explain why the current value is invalid.
 */
export const Invalid = Required.extend({
  args: {
    errorText: "Error message",
  },
});
