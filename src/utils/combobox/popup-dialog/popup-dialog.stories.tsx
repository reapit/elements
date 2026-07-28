import { useId } from "react";

import preview from "#.storybook/preview";
import { Badge } from "#src/core/badge";

import { ComboboxContext } from "../context";
import { ComboboxListbox } from "../listbox";
import { ComboboxSearchInput } from "../search-input";
import { ComboboxPopupDialog } from "./popup-dialog";

const meta = preview.meta({
  title: "Utils/Combobox/Popup",
  component: ComboboxPopupDialog,
  argTypes: {
    "aria-labelledby": {
      control: false,
    },
    children: {
      control: "select",
      options: ["Simple", "Detailed", "Filterable", "Multi-select"],
      mapping: {
        Simple: (
          <ComboboxListbox defaultValue={["1"]}>
            <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
            <ComboboxListbox.Option value="2">Option 2</ComboboxListbox.Option>
            <ComboboxListbox.Option value="3">Option 3</ComboboxListbox.Option>
          </ComboboxListbox>
        ),
        Detailed: (
          <ComboboxListbox defaultValue={["1"]}>
            <ComboboxListbox.Optgroup label="Recommended">
              <ComboboxListbox.Option
                badge={<Badge colour="neutral">Commercial</Badge>}
                additionalInfo={
                  <>
                    <ComboboxListbox.OptionAdditionalInfo
                      badge={<Badge colour="inactive">Sales</Badge>}
                    >
                      John Smith
                    </ComboboxListbox.OptionAdditionalInfo>
                    <ComboboxListbox.OptionAdditionalInfo
                      badge={<Badge colour="inactive">Owner</Badge>}
                    >
                      Sarah Johnson
                    </ComboboxListbox.OptionAdditionalInfo>
                  </>
                }
                value="1"
              >
                456B Heritage Boulevard, Upper Brookfield Heights, Brisbane QLD 4069
              </ComboboxListbox.Option>
            </ComboboxListbox.Optgroup>
            <ComboboxListbox.Divider />
            <ComboboxListbox.Optgroup label="All">
              <ComboboxListbox.Option
                badge={<Badge colour="neutral">Residential</Badge>}
                additionalInfo={
                  <>
                    <ComboboxListbox.OptionAdditionalInfo
                      badge={<Badge colour="inactive">Sales</Badge>}
                    >
                      Bob Brown
                    </ComboboxListbox.OptionAdditionalInfo>
                    <ComboboxListbox.OptionAdditionalInfo
                      badge={<Badge colour="inactive">Owner</Badge>}
                    >
                      Betty White
                    </ComboboxListbox.OptionAdditionalInfo>
                  </>
                }
                value="2"
              >
                12 Given Terrace, Paddington, Brisbane QLD 4064
              </ComboboxListbox.Option>
              <ComboboxListbox.Option
                badge={<Badge colour="neutral">Residential</Badge>}
                additionalInfo={
                  <ComboboxListbox.OptionAdditionalInfo
                    badge={<Badge colour="inactive">Owner</Badge>}
                  >
                    Bernard Black
                  </ComboboxListbox.OptionAdditionalInfo>
                }
                value="3"
              >
                16/40 Annerley Rd, South Brisbane QLD 4101
              </ComboboxListbox.Option>
            </ComboboxListbox.Optgroup>
          </ComboboxListbox>
        ),
        Filterable: [
          <ComboboxListbox key="listbox" defaultValue={["1"]}>
            <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
            <ComboboxListbox.Option value="2">Option 2</ComboboxListbox.Option>
            <ComboboxListbox.Option value="3">Option 3</ComboboxListbox.Option>
          </ComboboxListbox>,
        ],
        "Multi-select": [
          <ComboboxListbox key="listbox" defaultValue={["1"]}>
            <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
            <ComboboxListbox.Option value="2">Option 2</ComboboxListbox.Option>
            <ComboboxListbox.Option value="3">Option 3</ComboboxListbox.Option>
          </ComboboxListbox>,
        ],
      },
    },
    id: {
      control: false,
    },
    maxWidth: {
      control: "text",
    },
    search: {
      control: "boolean",
      mapping: {
        true: <ComboboxSearchInput aria-label="Search" />,
        false: null,
      },
    },
    variant: {
      control: "radio",
      options: ["drawer", "popover", "auto"],
    },
  },
  render: (args, { parameters }) => {
    const comboboxId = useId();
    const listboxId = useId();
    const popupId = useId();

    return (
      <ComboboxContext.Provider
        value={{
          comboboxId,
          disabled: false,
          listboxId,
          multiple: parameters.multiple ?? false,
          popupId,
          required: false,
          searchInputId: useId(),
          size: "medium",
        }}
      >
        <button
          aria-controls={popupId}
          aria-haspopup="dialog"
          id={comboboxId}
          onClick={() => ComboboxPopupDialog.open(popupId)}
        >
          Click me and I will open the popup for you!
        </button>
        <ComboboxPopupDialog {...args} aria-labelledby={comboboxId} id={popupId} />
      </ComboboxContext.Provider>
    );
  },
});

/**
 * Many popups will function as simple popovers that present the available options to the user.
 * The popup automatically anchors to the element specified by `aria-labelledby`. By default,
 * popovers are slightly wider than their anchor element to accommodate padding.
 */
export const Example = meta.story({
  args: {
    "aria-labelledby": "button-id",
    children: "Simple",
    closeOnSelection: "auto",
    id: "popup-id",
    maxWidth: undefined,
    variant: "popover",
  },
});

/**
 * By default, popover-style popups are slightly wider than their anchor element to accommodate
 * padding. This width can be overridden by setting `maxWidth` to a valid CSS length. Any `--size-*`
 * CSS variable or intrinsic size keywords (e.g., `fit-content`, `min-content`, `max-content`) will
 * typically be preferred.
 */
export const MaxWidth = Example.extend({
  name: "Max-width",
  args: {
    children: "Detailed",
    maxWidth: "fit-content",
    variant: "popover",
  },
});

/**
 * In some cases, such as on devices with small viewports, it can be preferrable to have the popup
 * function as a drawer. This can be achieved using the `drawer` variant.
 */
export const Drawer = Example.extend({
  args: {
    variant: "drawer",
  },
});

/**
 * The `auto` variant displays as a drawer on XS breakpoint (< 768px) and as a popover on SM
 * and above. This provides a responsive experience that adapts to the viewport size.
 */
export const Auto = Example.extend({
  args: {
    variant: "auto",
  },
});

/**
 * A search input can be included in the popup to allow the options to be filtered/searched.
 */
export const Filterable = Example.extend({
  args: {
    children: "Filterable",
    search: true,
  },
  parameters: {
    multiple: true,
  },
});

/**
 * For single-select comboboxes, the popup will close when a selection is made. For multi-select
 * comboboxes, it won't. This behaviour can be customised using `closeOnSelection`.
 *
 * - `auto` (default): Closes on selection for single-select comboboxes; remains open for multi-select.
 * - `always`: Always closes when the user selects an option.
 * - `never`: Never closes on selection; the user must explicitly close the popup.
 */
export const Closing = Example.extend({
  args: {
    children: "Multi-select",
    closeOnSelection: "never",
    search: true,
    variant: "popover",
  },
});

/**
 * By default, the search input, if present, will be cleared when the popup is closed. This can be
 * prevented using `preserveSearchOnClose`.
 */
export const PreserveSearch = Filterable.extend({
  args: {
    preserveSearchOnClose: true,
  },
  parameters: {
    multiple: true,
  },
});
