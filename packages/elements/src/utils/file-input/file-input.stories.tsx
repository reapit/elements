import { styled } from "@linaria/react";
import { useState } from "react";

import preview from "#.storybook/preview";
import { Button } from "#src/core/button";
import { CloudUploadIcon } from "#src/icons/cloud-upload";
import { FileUploadIcon } from "#src/icons/file-upload";

import { FileInput } from "./file-input";

// Demo-only dropzone chrome for the `Drag and drop` story below — `FileInput` renders none of
// this itself. `:has(input:invalid)` reaches the real (visually hidden) input rendered by
// `FileInput` inside `ElDropzone`, and forwards the error colour into `ElDropzoneContent` via a
// custom property, since `ElDropzoneContent` is a sibling of that input, not an ancestor of it.
const ElDropzone = styled.div`
  display: inline-flex;

  &:has(input:invalid) {
    --file-input-story-border-colour: var(--colour-border-error-default);
  }
`;

const ElDropzoneContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  width: 320px;
  padding: var(--spacing-6);
  border: var(--border-width-default) dashed
    var(--file-input-story-border-colour, var(--colour-border-neutral-light_darker));
  border-radius: var(--border-radius-l);
  color: var(--colour-text-tertiary);
  cursor: pointer;

  &:hover,
  &[data-dragging-over="true"] {
    background: var(--comp-uploader-colour-fill-drop_area-hover);
  }

  &[data-focused="true"] {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: -2px;
  }

  &[data-disabled="true"] {
    background: var(--colour-fill-neutral-lightest);
    color: var(--colour-text-placeholder);
    cursor: not-allowed;
  }
`;

const meta = preview.meta({
  title: "Utils/FileInput",
  component: FileInput,
  argTypes: {
    children: {
      control: false,
      table: {
        type: {
          summary: "(props: FileInput.RenderProps) => ReactNode",
        },
      },
    },
    value: {
      control: false,
      table: {
        type: {
          summary: "File[]",
        },
      },
    },
    defaultValue: {
      control: false,
      table: {
        type: {
          summary: "File[]",
        },
      },
    },
  },
});

export const Example = meta.story({
  args: {
    "aria-label": "Upload a file",
    accept: undefined,
    disabled: false,
    maxFileSize: undefined,
    maxFiles: undefined,
    maxTotalSize: undefined,
    multiple: undefined,
    required: false,
  },
});

/**
 * Set `multiple` to allow more than one file per browse round. Browsing again always replaces the
 * current selection, the same as a single-file `FileInput` and matching native
 * `<input type="file" multiple>` behaviour — `FileInput` doesn't accumulate a selection across
 * rounds, since it has no way to remove from it. A consumer that wants a running, removable
 * selection owns that itself; see the `Controlled` story.
 */
export const Multiple = Example.extend({
  args: {
    multiple: true,
  },
});

/**
 * `accept` restricts which files the OS picker offers, using the same syntax as the native
 * attribute: comma-separated extensions, MIME types, or MIME wildcards.
 */
export const Accept = Example.extend({
  args: {
    accept: "image/*",
  },
});

/**
 * `maxFileSize`, `maxFiles`, and `maxTotalSize` are custom constraints with no native attribute
 * equivalent. Violations are surfaced through the constraint validation API (`setCustomValidity`),
 * so they block submission the same way a native violation would. Select more than two files, or
 * one larger than 1 KB, then submit to see the browser's validation message.
 */
export const CustomConstraints = Example.extend({
  name: "Custom constraints",
  args: {
    multiple: true,
    maxFiles: 2,
    maxFileSize: 1024,
  },
  render: function CustomConstraints(args) {
    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          gap: "var(--spacing-3)",
          alignItems: "center",
        }}
      >
        <FileInput {...args} />
        <button type="submit">Submit</button>
      </form>
    );
  },
});

/**
 * `disabled` prevents interaction and excludes the input from form submission, matching the native
 * attribute's behaviour on any other input.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
});

/**
 * Pass a `children` render function to fully replace the default rendered content while keeping
 * `FileInput`'s native mechanics — validation, constraint reporting — for free. Here the trigger is
 * a real `Button`, wired to `openFilePicker` explicitly — only the button opens the picker, not the
 * whole rendered area, so other interactive content (e.g. a remove button on an already-selected
 * file, in a real composition) isn't caught up in it.
 */
export const CustomTrigger = Example.extend({
  name: "Custom trigger",
  args: {
    multiple: true,
    tabIndex: -1,
  },
  render: function CustomTrigger(args) {
    return (
      <FileInput {...args}>
        {({ files, disabled, openFilePicker }) => (
          <div
            style={{
              display: "flex",
              flexFlow: "column nowrap",
              gap: "var(--spacing-2)",
              alignItems: "flex-start",
            }}
          >
            <Button
              type="button"
              variant="secondary"
              size="medium"
              iconLeft={<FileUploadIcon />}
              disabled={disabled}
              onClick={openFilePicker}
            >
              Select files to upload
            </Button>
            {files.length > 0 && (
              <ul>
                {files.map((file, index) => (
                  <li key={`${file.name}-${index}`}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </FileInput>
    );
  },
});

/**
 * Drag a file over the dropzone below to select it, as an alternative to clicking through to the
 * native picker. `FileInput` itself renders no visual chrome; every state below (`isDraggingOver`,
 * `isFocused`, `disabled`, and the native invalid state) comes from its `children` render prop or
 * plain CSS, wired up here by the story rather than by the component.
 */
export const DragAndDrop = Example.extend({
  name: "Drag and drop",
  args: {
    accept: "image/*,.pdf",
    multiple: true,
    maxFiles: 2,
  },
  render: function DragAndDrop(args) {
    return (
      // `ElDropzone` wraps `FileInput` itself, rather than living inside `children`, so its
      // `:has(input:invalid)` selector can reach the real (visually hidden) input `FileInput`
      // renders as a sibling of whatever `children` returns — a selector inside `children`'s own
      // output could never see it, since that content is a sibling of the input, not an ancestor.
      <ElDropzone>
        <FileInput {...args}>
          {({ isDraggingOver, isFocused, disabled, openFilePicker }) => (
            <ElDropzoneContent
              onClick={openFilePicker}
              data-dragging-over={isDraggingOver}
              data-focused={isFocused}
              data-disabled={disabled}
            >
              <CloudUploadIcon size="lg" />
              <span>
                Drag and drop or <strong>browse files</strong>
              </span>
            </ElDropzoneContent>
          )}
        </FileInput>
      </ElDropzone>
    );
  },
});

/**
 * Passing `value` makes the component controlled: `FileInput` no longer tracks the selection
 * itself, and the consumer updates `value` from `onChange`. `FileInput` never accumulates a
 * selection across browse rounds on its own — it has no way to remove from it — so a consumer
 * wanting a running, removable selection appends explicitly in its own `onChange` handler, as this
 * story does, pairing accumulation with the removal button that makes it a good experience.
 */
export const Controlled = Example.extend({
  args: {
    multiple: true,
  },
  render: function Controlled(args) {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          gap: "var(--spacing-2)",
          alignItems: "flex-start",
        }}
      >
        <FileInput
          {...args}
          value={files}
          onChange={(e) => setFiles((prev) => [...prev, ...Array.from(e.target.files ?? [])])}
        />
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`}>
                {file.name}{" "}
                <button onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
});
