import figma from "@figma/code-connect";

import { FileUploader } from "./file-uploader";

figma.connect(FileUploader, "<FILE_UPLOADER_MULTI_SELECT_URL>", {
  variant: { Variant: "Button" },
  props: {
    button: figma.nestedProps("Button", {
      children: figma.enum("Type", {
        "Text + Icon": figma.string("Label"),
        "Icon only": undefined,
      }),
      hasNoPadding: figma.boolean("Remove padding"),
      iconLeft: figma.boolean("Icon left", {
        true: figma.instance("Icon L"),
        false: undefined,
      }),
      iconRight: figma.boolean("Icon right", {
        true: figma.instance("Icon R"),
        false: undefined,
      }),
      isDestructive: figma.boolean("Destructive"),
      size: figma.enum("Size", {
        Small: "small",
        Medium: "medium",
        Large: "large",
      }),
      useAIStyle: figma.boolean("Ai style"),
      useLinkStyle: figma.boolean("Link style"),
      variant: figma.enum("Variant", {
        Primary: "primary",
        Secondary: "secondary",
        Tertiary: "tertiary",
      }),
    }),
    disabled: figma.enum("State", {
      Disabled: true,
    }),
    error: figma.enum("State", {
      Default: { text: undefined },
      Error: figma.nestedProps("FormControl ErrorText", {
        text: figma.string("Error text"),
      }),
      Focused: { text: undefined },
      Hovered: { text: undefined },
      Disabled: { text: undefined },
    }),
    fileListVariant: figma.boolean("Media only", {
      true: "media",
      false: "file",
    }),
    files: figma.slot("Content slot (files)"),
    help: figma.boolean("Show helper", {
      true: figma.nestedProps("FormControl HelpText", {
        text: figma.string("Helper text"),
      }),
      false: {
        text: undefined,
      },
    }),
    label: figma.boolean("Show label", {
      true: figma.nestedProps("FormControl Label", {
        required: figma.boolean("Required"),
        text: figma.string("Label"),
      }),
      false: {
        required: undefined,
        text: undefined,
      },
    }),
  },
  example: (props) => (
    <FileUploader onUpload={() => Promise.resolve("TODO: replace me")}>
      <FileUploader.ButtonControl
        disabled={props.disabled}
        errorText={props.error.text}
        hasNoPadding={props.button.hasNoPadding}
        helpText={props.help.text}
        iconLeft={props.button.iconLeft}
        iconRight={props.button.iconRight}
        isDestructive={props.button.isDestructive}
        label={props.label.text}
        required={props.label.required}
        size={props.button.size}
      >
        {props.button.children}
      </FileUploader.ButtonControl>
      <FileUploader.FileList variant={props.fileListVariant}>
        {/* Use FileUploader.FileList's render function to display selected files with FileUploader.File */}
        {props.files}
      </FileUploader.FileList>
    </FileUploader>
  ),
});

figma.connect(FileUploader, "<FILE_UPLOADER_MULTI_SELECT_URL>", {
  variant: { Variant: "Compact" },
  props: {
    action1: figma.string("Action 1"),
    action2: figma.string("Action 2"),
    disabled: figma.enum("State", {
      Disabled: true,
    }),
    error: figma.enum("State", {
      Default: { text: undefined },
      Error: figma.nestedProps("FormControl ErrorText", {
        text: figma.string("Error text"),
      }),
      Focused: { text: undefined },
      Hovered: { text: undefined },
      Disabled: { text: undefined },
    }),
    icon: figma.boolean("Show icon", {
      true: figma.instance("↳ Icon"),
      false: undefined,
    }),
    fileListVariant: figma.boolean("Media only", {
      true: "media",
      false: "file",
    }),
    files: figma.slot("Content slot (files)"),
    help: figma.boolean("Show helper", {
      true: figma.nestedProps("FormControl HelpText", {
        text: figma.string("Helper text"),
      }),
      false: {
        text: undefined,
      },
    }),
    label: figma.boolean("Show label", {
      true: figma.nestedProps("FormControl Label", {
        required: figma.boolean("Required"),
        size: figma.enum("Size", {
          Small: "small",
          Medium: "medium",
          Large: "large",
        }),
        text: figma.string("Label"),
      }),
      false: {
        required: undefined,
        size: undefined,
        text: undefined,
      },
    }),
  },
  example: (props) => (
    <FileUploader onUpload={() => Promise.resolve("TODO: replace me")}>
      <FileUploader.DropzoneControl
        disabled={props.disabled}
        errorText={props.error.text}
        helpText={props.help.text}
        icon={props.icon}
        label={props.label.text}
        required={props.label.required}
        size={props.label.size}
        variant="compact"
      >
        {props.action1} <strong>{props.action2}</strong>
      </FileUploader.DropzoneControl>
      <FileUploader.FileList variant={props.fileListVariant}>
        {/* Use FileUploader.FileList's render function to display selected files with FileUploader.File */}
        {props.files}
      </FileUploader.FileList>
    </FileUploader>
  ),
});

figma.connect(FileUploader, "<FILE_UPLOADER_MULTI_SELECT_URL>", {
  variant: { Variant: "Large" },
  props: {
    action1: figma.string("Action 1"),
    action2: figma.string("Action 2"),
    disabled: figma.enum("State", {
      Disabled: true,
    }),
    error: figma.enum("State", {
      Default: { text: undefined },
      Error: figma.nestedProps("FormControl ErrorText", {
        text: figma.string("Error text"),
      }),
      Focused: { text: undefined },
      Hovered: { text: undefined },
      Disabled: { text: undefined },
    }),
    icon: figma.boolean("Show icon", {
      true: figma.instance("↳ Icon"),
      false: undefined,
    }),
    fileListVariant: figma.boolean("Media only", {
      true: "media",
      false: "file",
    }),
    files: figma.slot("Content slot (files)"),
    help: figma.boolean("Show helper", {
      true: figma.nestedProps("FormControl HelpText", {
        text: figma.string("Helper text"),
      }),
      false: {
        text: undefined,
      },
    }),
    label: figma.boolean("Show label", {
      true: figma.nestedProps("FormControl Label", {
        required: figma.boolean("Required"),
        size: figma.enum("Size", {
          Small: "small",
          Medium: "medium",
          Large: "large",
        }),
        text: figma.string("Label"),
      }),
      false: {
        required: undefined,
        size: undefined,
        text: undefined,
      },
    }),
    secondaryText: figma.boolean("Show secondary info", {
      true: figma.string("↳ Secondary info"),
      false: undefined,
    }),
  },
  example: (props) => (
    <FileUploader onUpload={() => Promise.resolve("TODO: replace me")}>
      <FileUploader.DropzoneControl
        disabled={props.disabled}
        errorText={props.error.text}
        helpText={props.help.text}
        icon={props.icon}
        label={props.label.text}
        required={props.label.required}
        secondaryText={props.secondaryText}
        size={props.label.size}
        variant="large"
      >
        {props.action1} <strong>{props.action2}</strong>
      </FileUploader.DropzoneControl>
      <FileUploader.FileList variant={props.fileListVariant}>
        {/* Use FileUploader.FileList's render function to display selected files with FileUploader.File */}
        {props.files}
      </FileUploader.FileList>
    </FileUploader>
  ),
});

figma.connect(FileUploader, "<FILE_UPLOADER_SINGLE_SELECT_URL>", {
  props: {
    action1: figma.string("Action 1"),
    action2: figma.string("Action 2"),
    disabled: figma.enum("State", {
      Disabled: true,
    }),
    error: figma.enum("State", {
      Default: { text: undefined },
      Error: figma.nestedProps("FormControl ErrorText", {
        text: figma.string("Error text"),
      }),
      Focused: { text: undefined },
      Hovered: { text: undefined },
      Disabled: { text: undefined },
    }),
    icon: figma.boolean("Show icon", {
      true: figma.instance("↳ Icon"),
      false: undefined,
    }),
    files: figma.slot("Content slot (files)"),
    help: figma.boolean("Show helper", {
      true: figma.nestedProps("FormControl HelpText", {
        text: figma.string("Helper text"),
      }),
      false: {
        text: undefined,
      },
    }),
    label: figma.boolean("Show label", {
      true: figma.nestedProps("FormControl Label", {
        required: figma.boolean("Required"),
        size: figma.enum("Size", {
          Small: "small",
          Medium: "medium",
          Large: "large",
        }),
        text: figma.string("Label"),
      }),
      false: {
        required: undefined,
        size: undefined,
        text: undefined,
      },
    }),
    secondaryText: figma.boolean("Show secondary info", {
      true: figma.string("↳ Secondary info"),
      false: undefined,
    }),
  },
  example: (props) => (
    <FileUploader onUpload={() => Promise.resolve("TODO: replace me")}>
      <FileUploader.SingleSelectMediaControl
        disabled={props.disabled}
        errorText={props.error.text}
        helpText={props.help.text}
        icon={props.icon}
        label={props.label.text}
        required={props.label.required}
        secondaryText={props.secondaryText}
        size={props.label.size}
      >
        {props.action1} <strong>{props.action2}</strong>
      </FileUploader.SingleSelectMediaControl>
    </FileUploader>
  ),
});
