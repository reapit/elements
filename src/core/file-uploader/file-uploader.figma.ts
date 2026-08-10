// url=<FILE_UPLOADER_MULTI_SELECT_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/file-uploader/file-uploader.tsx
// component=FileUploader

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Button") {
  const button = (function () {
    const nestedLayer40 = figma.selectedInstance.findInstance("Button");
    return {
      children:
        nestedLayer40.type !== "ERROR"
          ? nestedLayer40.getEnum("Type", {
              "Text + Icon": nestedLayer40.getString("Label"),
              "Icon only": undefined,
            })
          : undefined,
      hasNoPadding:
        nestedLayer40.type !== "ERROR" ? nestedLayer40.getBoolean("Remove padding") : undefined,
      iconLeft:
        nestedLayer40.type !== "ERROR"
          ? nestedLayer40.getBoolean("Icon left", {
              true: nestedLayer40.getInstanceSwap("Icon L")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      iconRight:
        nestedLayer40.type !== "ERROR"
          ? nestedLayer40.getBoolean("Icon right", {
              true: nestedLayer40.getInstanceSwap("Icon R")?.executeTemplate().example,
              false: undefined,
            })
          : undefined,
      isDestructive:
        nestedLayer40.type !== "ERROR" ? nestedLayer40.getBoolean("Destructive") : undefined,
      size:
        nestedLayer40.type !== "ERROR"
          ? nestedLayer40.getEnum("Size", {
              Small: "small",
              Medium: "medium",
              Large: "large",
            })
          : undefined,
      useAIStyle: nestedLayer40.type !== "ERROR" ? nestedLayer40.getBoolean("Ai style") : undefined,
      useLinkStyle:
        nestedLayer40.type !== "ERROR" ? nestedLayer40.getBoolean("Link style") : undefined,
      variant:
        nestedLayer40.type !== "ERROR"
          ? nestedLayer40.getEnum("Variant", {
              Primary: "primary",
              Secondary: "secondary",
              Tertiary: "tertiary",
            })
          : undefined,
    };
  })();
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  });
  const error = figma.selectedInstance.getEnum("State", {
    Default: { text: undefined },
    Error: (function () {
      const nestedLayer41 = figma.selectedInstance.findInstance("FormControl ErrorText");
      return {
        text: nestedLayer41.type !== "ERROR" ? nestedLayer41.getString("Error text") : undefined,
      };
    })(),
    Focused: { text: undefined },
    Hovered: { text: undefined },
    Disabled: { text: undefined },
  });
  const fileListVariant = figma.selectedInstance.getBoolean("Media only", {
    true: "media",
    false: "file",
  });
  const files = figma.properties.slot("Content slot (files)");
  const help = figma.selectedInstance.getBoolean("Show helper", {
    true: (function () {
      const nestedLayer42 = figma.selectedInstance.findInstance("FormControl HelpText");
      return {
        text: nestedLayer42.type !== "ERROR" ? nestedLayer42.getString("Helper text") : undefined,
      };
    })(),
    false: { text: undefined },
  });
  const label = figma.selectedInstance.getBoolean("Show label", {
    true: (function () {
      const nestedLayer43 = figma.selectedInstance.findInstance("FormControl Label");
      return {
        required: nestedLayer43.type !== "ERROR" ? nestedLayer43.getBoolean("Required") : undefined,
        text: nestedLayer43.type !== "ERROR" ? nestedLayer43.getString("Label") : undefined,
      };
    })(),
    false: { required: undefined, text: undefined },
  });

  template = {
    id: "FileUploader",
    imports: ['import { FileUploader } from "@reapit/elements/core/file-uploader";'],
    example: figma.code`<FileUploader onUpload={() => Promise.resolve("TODO: replace me")}>
      <FileUploader.ButtonControl${figma.helpers.react.renderProp(
        "disabled",
        disabled,
      )}${figma.helpers.react.renderProp("errorText", error?.text)}${figma.helpers.react.renderProp(
        "hasNoPadding",
        button.hasNoPadding,
      )}${figma.helpers.react.renderProp("helpText", help.text)}${figma.helpers.react.renderProp(
        "iconLeft",
        button.iconLeft,
      )}${figma.helpers.react.renderProp(
        "iconRight",
        button.iconRight,
      )}${figma.helpers.react.renderProp(
        "isDestructive",
        button.isDestructive,
      )}${figma.helpers.react.renderProp("label", label.text)}${figma.helpers.react.renderProp(
        "required",
        label.required,
      )}${figma.helpers.react.renderProp("size", button.size)}>
        ${figma.helpers.react.renderChildren(button.children)}
      </FileUploader.ButtonControl>
      <FileUploader.FileList${figma.helpers.react.renderProp("variant", fileListVariant)}>
        {/* Use FileUploader.FileList's render function to display selected files with FileUploader.File */}
        ${figma.helpers.react.renderChildren(files)}
      </FileUploader.FileList>
    </FileUploader>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Compact") {
  const action1 = figma.selectedInstance.getString("Action 1");
  const action2 = figma.selectedInstance.getString("Action 2");
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  });
  const error = figma.selectedInstance.getEnum("State", {
    Default: { text: undefined },
    Error: (function () {
      const nestedLayer44 = figma.selectedInstance.findInstance("FormControl ErrorText");
      return {
        text: nestedLayer44.type !== "ERROR" ? nestedLayer44.getString("Error text") : undefined,
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
  const fileListVariant = figma.selectedInstance.getBoolean("Media only", {
    true: "media",
    false: "file",
  });
  const files = figma.properties.slot("Content slot (files)");
  const help = figma.selectedInstance.getBoolean("Show helper", {
    true: (function () {
      const nestedLayer45 = figma.selectedInstance.findInstance("FormControl HelpText");
      return {
        text: nestedLayer45.type !== "ERROR" ? nestedLayer45.getString("Helper text") : undefined,
      };
    })(),
    false: { text: undefined },
  });
  const label = figma.selectedInstance.getBoolean("Show label", {
    true: (function () {
      const nestedLayer46 = figma.selectedInstance.findInstance("FormControl Label");
      return {
        required: nestedLayer46.type !== "ERROR" ? nestedLayer46.getBoolean("Required") : undefined,
        size:
          nestedLayer46.type !== "ERROR"
            ? nestedLayer46.getEnum("Size", {
                Small: "small",
                Medium: "medium",
                Large: "large",
              })
            : undefined,
        text: nestedLayer46.type !== "ERROR" ? nestedLayer46.getString("Label") : undefined,
      };
    })(),
    false: { required: undefined, size: undefined, text: undefined },
  });

  template = {
    id: "FileUploader",
    imports: ['import { FileUploader } from "@reapit/elements/core/file-uploader";'],
    example: figma.code`<FileUploader onUpload={() => Promise.resolve("TODO: replace me")}>
      <FileUploader.DropzoneControl${figma.helpers.react.renderProp(
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
      )}${figma.helpers.react.renderProp("size", label.size)} variant="compact">
        ${figma.helpers.react.renderChildren(
          action1,
        )} <strong>${figma.helpers.react.renderChildren(action2)}</strong>
      </FileUploader.DropzoneControl>
      <FileUploader.FileList${figma.helpers.react.renderProp("variant", fileListVariant)}>
        {/* Use FileUploader.FileList's render function to display selected files with FileUploader.File */}
        ${figma.helpers.react.renderChildren(files)}
      </FileUploader.FileList>
    </FileUploader>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Large") {
  const action1 = figma.selectedInstance.getString("Action 1");
  const action2 = figma.selectedInstance.getString("Action 2");
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  });
  const error = figma.selectedInstance.getEnum("State", {
    Default: { text: undefined },
    Error: (function () {
      const nestedLayer47 = figma.selectedInstance.findInstance("FormControl ErrorText");
      return {
        text: nestedLayer47.type !== "ERROR" ? nestedLayer47.getString("Error text") : undefined,
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
  const fileListVariant = figma.selectedInstance.getBoolean("Media only", {
    true: "media",
    false: "file",
  });
  const files = figma.properties.slot("Content slot (files)");
  const help = figma.selectedInstance.getBoolean("Show helper", {
    true: (function () {
      const nestedLayer48 = figma.selectedInstance.findInstance("FormControl HelpText");
      return {
        text: nestedLayer48.type !== "ERROR" ? nestedLayer48.getString("Helper text") : undefined,
      };
    })(),
    false: { text: undefined },
  });
  const label = figma.selectedInstance.getBoolean("Show label", {
    true: (function () {
      const nestedLayer49 = figma.selectedInstance.findInstance("FormControl Label");
      return {
        required: nestedLayer49.type !== "ERROR" ? nestedLayer49.getBoolean("Required") : undefined,
        size:
          nestedLayer49.type !== "ERROR"
            ? nestedLayer49.getEnum("Size", {
                Small: "small",
                Medium: "medium",
                Large: "large",
              })
            : undefined,
        text: nestedLayer49.type !== "ERROR" ? nestedLayer49.getString("Label") : undefined,
      };
    })(),
    false: { required: undefined, size: undefined, text: undefined },
  });
  const secondaryText = figma.selectedInstance.getBoolean("Show secondary info", {
    true: figma.selectedInstance.getString("↳ Secondary info"),
    false: undefined,
  });

  template = {
    id: "FileUploader",
    imports: ['import { FileUploader } from "@reapit/elements/core/file-uploader";'],
    example: figma.code`<FileUploader onUpload={() => Promise.resolve("TODO: replace me")}>
      <FileUploader.DropzoneControl${figma.helpers.react.renderProp(
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
      )}${figma.helpers.react.renderProp("size", label.size)} variant="large">
        ${figma.helpers.react.renderChildren(
          action1,
        )} <strong>${figma.helpers.react.renderChildren(action2)}</strong>
      </FileUploader.DropzoneControl>
      <FileUploader.FileList${figma.helpers.react.renderProp("variant", fileListVariant)}>
        {/* Use FileUploader.FileList's render function to display selected files with FileUploader.File */}
        ${figma.helpers.react.renderChildren(files)}
      </FileUploader.FileList>
    </FileUploader>`,
    metadata: { nestable: true },
  };
} else {
  const action1 = figma.selectedInstance.getString("Action 1");
  const action2 = figma.selectedInstance.getString("Action 2");
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  });
  const error = figma.selectedInstance.getEnum("State", {
    Default: { text: undefined },
    Error: (function () {
      const nestedLayer47 = figma.selectedInstance.findInstance("FormControl ErrorText");
      return {
        text: nestedLayer47.type !== "ERROR" ? nestedLayer47.getString("Error text") : undefined,
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
  const fileListVariant = figma.selectedInstance.getBoolean("Media only", {
    true: "media",
    false: "file",
  });
  const files = figma.properties.slot("Content slot (files)");
  const help = figma.selectedInstance.getBoolean("Show helper", {
    true: (function () {
      const nestedLayer48 = figma.selectedInstance.findInstance("FormControl HelpText");
      return {
        text: nestedLayer48.type !== "ERROR" ? nestedLayer48.getString("Helper text") : undefined,
      };
    })(),
    false: { text: undefined },
  });
  const label = figma.selectedInstance.getBoolean("Show label", {
    true: (function () {
      const nestedLayer49 = figma.selectedInstance.findInstance("FormControl Label");
      return {
        required: nestedLayer49.type !== "ERROR" ? nestedLayer49.getBoolean("Required") : undefined,
        size:
          nestedLayer49.type !== "ERROR"
            ? nestedLayer49.getEnum("Size", {
                Small: "small",
                Medium: "medium",
                Large: "large",
              })
            : undefined,
        text: nestedLayer49.type !== "ERROR" ? nestedLayer49.getString("Label") : undefined,
      };
    })(),
    false: { required: undefined, size: undefined, text: undefined },
  });
  const secondaryText = figma.selectedInstance.getBoolean("Show secondary info", {
    true: figma.selectedInstance.getString("↳ Secondary info"),
    false: undefined,
  });

  template = {
    id: "FileUploader",
    imports: ['import { FileUploader } from "@reapit/elements/core/file-uploader";'],
    example: figma.code`<FileUploader onUpload={() => Promise.resolve("TODO: replace me")}>
      <FileUploader.DropzoneControl${figma.helpers.react.renderProp(
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
      )}${figma.helpers.react.renderProp("size", label.size)} variant="large">
        ${figma.helpers.react.renderChildren(
          action1,
        )} <strong>${figma.helpers.react.renderChildren(action2)}</strong>
      </FileUploader.DropzoneControl>
      <FileUploader.FileList${figma.helpers.react.renderProp("variant", fileListVariant)}>
        {/* Use FileUploader.FileList's render function to display selected files with FileUploader.File */}
        ${figma.helpers.react.renderChildren(files)}
      </FileUploader.FileList>
    </FileUploader>`,
    metadata: { nestable: true },
  };
}

export default template;
