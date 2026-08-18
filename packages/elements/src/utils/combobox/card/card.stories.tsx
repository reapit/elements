import type { CSSProperties } from "react";

import preview from "#.storybook/preview";
import { SupplementaryInfo } from "#src/core/supplementary-info";

import { ComboboxButtonClearButton } from "../button";
import { ComboboxCardDefaultContent } from "../card-default-content";
import { ElCombobox } from "../styles";
import { ComboboxCard } from "./card";

const meta = preview.meta({
  title: "Utils/Combobox/Card",
  component: ComboboxCard,
  argTypes: {
    action: {
      control: false,
    },
    "aria-controls": {
      control: "text",
    },
    children: {
      control: false,
    },
  },
});

export const Example = meta.story({
  args: {
    action: <ComboboxButtonClearButton aria-controls="example-listbox-id" />,
    "aria-controls": "listbox-id",
    "aria-expanded": false,
    children: (
      <ComboboxCardDefaultContent
        additionalInfo={
          <>
            <SupplementaryInfo colour="secondary" size="sm">
              Crunchy and juicy
            </SupplementaryInfo>
            <SupplementaryInfo colour="secondary" size="sm">
              52 available
            </SupplementaryInfo>
          </>
        }
      >
        Apple
      </ComboboxCardDefaultContent>
    ),
  },
  decorators: [
    (Story) => (
      <ElCombobox>
        <div id="example-listbox-id">
          <select disabled hidden />
        </div>
        <Story />
      </ElCombobox>
    ),
  ],
});

/**
 * The parent combobox provides styles to the combobox card via CSS variables. When
 * the parent combobox is disabled, it sets these CSS variables to values that visually communicate this
 * state via the combobox card. This behaviour is manually shown here.
 *
 * Care should be taken to ensure the provided `action` is also disabled.
 */
export const Disabled = Example.extend({
  args: {
    action: <ComboboxButtonClearButton aria-controls="disabled-example-listbox-id" disabled />,
    "aria-controls": "disabled-example",
    disabled: true,
  },
  decorators: [
    (Story) => (
      <ElCombobox>
        <div id="disabled-example-listbox-id">
          <select disabled hidden />
        </div>
        <Story />
      </ElCombobox>
    ),
  ],
});

/**
 * Likewise, when the parent combobox has an invalid state, it sets CSS variables to values that help
 * visually communicate its validity via the combobox card. This behaviour is manually shown here.
 */
export const Invalid = Example.extend({
  args: {
    action: <ComboboxButtonClearButton aria-controls="invalid-example-listbox-id" />,
    "aria-controls": "invalid-example",
  },
  decorators: [
    (Story) => (
      <ElCombobox data-show-validity="true">
        <div id="invalid-example-listbox-id">
          <select required hidden />
        </div>
        <Story />
      </ElCombobox>
    ),
  ],
});

/**
 * By default, combobox cards will fill their parent's width. This can be constrained by providing
 * a `maxWidth` to the combobox.
 */
export const MaxWidth = Example.extend({
  name: "Max-width",

  decorators: [
    (Story) => (
      // This CSS variable is set by ElCombobox when Combobox is constrained by its maxWidth prop.
      <div style={{ "--combobox-max-width": "var(--size-40)" } as CSSProperties}>
        <Story />
      </div>
    ),
  ],
});
