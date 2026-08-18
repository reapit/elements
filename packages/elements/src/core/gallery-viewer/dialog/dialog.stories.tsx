import { useState } from "react";
import { useArgs } from "storybook/preview-api";

import preview from "#.storybook/preview";

import { GalleryViewerDialog } from "./dialog";

const meta = preview.meta({
  title: "Content display/GalleryViewer/Dialog",
  component: GalleryViewerDialog,
  argTypes: {
    children: {
      control: false,
    },
  },
});

/**
 * At its simplest, you can open and close the gallery viewer dialog by controlling its `isOpen`
 * state. The dialog is responsive: on large screens (≥1440px) it appears inset from the viewport
 * edges with a semi-transparent backdrop, whilst on smaller screens it fills the entire viewport.
 */
export const Example = meta.story({
  args: {
    children: <ExampleContent />,
    closedBy: "any",
    isOpen: false,
  },
  render: function Example(args) {
    const [, setArgs] = useArgs();
    return (
      <>
        <button onClick={() => setArgs({ isOpen: true })}>Open Gallery</button>
        <GalleryViewerDialog onClose={() => setArgs({ isOpen: false })} {...args} />
      </>
    );
  },
});

/**
 * The `closedBy` prop specifies the types of user actions that can be used to close the dialog.
 *
 * Gallery viewers default to `closedBy="any"`, meaning the user can dismiss the dialog by clicking
 * the backdrop, pressing `Esc`, or a developer-specified mechanism. This example uses
 * `closedBy="closerequest"` to prevent light-dismiss via the backdrop.
 */
export const ClosedBy = Example.extend({
  args: {
    closedBy: "closerequest",
  },
  render: function ClosedBy(args) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Gallery</button>
        <GalleryViewerDialog onClose={() => setIsOpen(false)} {...args} isOpen={isOpen} />
      </>
    );
  },
});

function ExampleContent() {
  return (
    <>
      <GalleryViewerDialog.Header>
        10 High Street, Great Horwood, Buckinghamshire, MK17 0QL
      </GalleryViewerDialog.Header>
      <GalleryViewerDialog.Content>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "var(--colour-fill-default)",
            color: "var(--colour-text-default)",
            fontFamily: "var(--font-family-sans)",
          }}
        >
          Gallery content goes here
        </div>
      </GalleryViewerDialog.Content>
    </>
  );
}
