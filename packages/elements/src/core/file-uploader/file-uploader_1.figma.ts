// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Elements-DS?node-id=20865-24022&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/file-uploader/file-uploader.tsx
// component=FileUploader

import figma from "figma";

const action1 = figma.selectedInstance.getString("Action 1");
const action2 = figma.selectedInstance.getString("Action 2");
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const error = figma.selectedInstance.getEnum("State", {
  Default: { text: undefined },
  Error: (function () {
    const nestedLayer50 = figma.selectedInstance.findInstance("FormControl ErrorText");
    return {
      text: nestedLayer50.type !== "ERROR" ? nestedLayer50.getString("Error text") : undefined,
    };
  })(),
  Focused: { text: undefined },
  Hovered: { text: undefined },
  Disabled: { text: undefined },
});
const icon = figma.selectedInstance.getBoolean("Show icon", {
  true: figma.selectedInstance.getInstanceSwap("↳ Icon")?.executeTemplate().example,
  false: undefined,
});
const help = figma.selectedInstance.getBoolean("Show helper", {
  true: (function () {
    const nestedLayer51 = figma.selectedInstance.findInstance("FormControl HelpText");
    return {
      text: nestedLayer51.type !== "ERROR" ? nestedLayer51.getString("Helper text") : undefined,
    };
  })(),
  false: { text: undefined },
});
const label = figma.selectedInstance.getBoolean("Show label", {
  true: (function () {
    const nestedLayer52 = figma.selectedInstance.findInstance("FormControl Label");
    return {
      required: nestedLayer52.type !== "ERROR" ? nestedLayer52.getBoolean("Required") : undefined,
      size:
        nestedLayer52.type !== "ERROR"
          ? nestedLayer52.getEnum("Size", {
              Small: "small",
              Medium: "medium",
              Large: "large",
            })
          : undefined,
      text: nestedLayer52.type !== "ERROR" ? nestedLayer52.getString("Label") : undefined,
    };
  })(),
  false: { required: undefined, size: undefined, text: undefined },
});
const secondaryText = figma.selectedInstance.getBoolean("Show secondary info", {
  true: figma.selectedInstance.getString("↳ Secondary info"),
  false: undefined,
});

export default {
  id: "FileUploader",
  imports: ['import { FileUploader } from "@reapit/elements/core/file-uploader";'],
  example: figma.code`<FileUploader onUpload={() => Promise.resolve("TODO: replace me")}>
      <FileUploader.SingleSelectMediaControl${figma.helpers.react.renderProp(
        "disabled",
        disabled,
      )}${figma.helpers.react.renderProp("errorText", error?.text)}${figma.helpers.react.renderProp(
        "helpText",
        help.text,
      )}${figma.helpers.react.renderProp("icon", icon)}${figma.helpers.react.renderProp(
        "label",
        label.text,
      )}${figma.helpers.react.renderProp(
        "required",
        label.required,
      )}${figma.helpers.react.renderProp(
        "secondaryText",
        secondaryText,
      )}${figma.helpers.react.renderProp("size", label.size)}>
        ${figma.helpers.react.renderChildren(
          action1,
        )} <strong>${figma.helpers.react.renderChildren(action2)}</strong>
      </FileUploader.SingleSelectMediaControl>
    </FileUploader>`,
  metadata: { nestable: true },
};
