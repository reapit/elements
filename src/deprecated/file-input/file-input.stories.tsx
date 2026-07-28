import React, { useState } from "react";

import preview from "#.storybook/preview";

import { Button } from "../../core/button";
import { ButtonGroup } from "../../core/button-group";
import { FlexContainer } from "../../deprecated/layout";
import { useModal } from "../use-modal";
import { FileInput, FilePreviewImage } from "./index";

const meta = preview.meta({
  title: "Deprecated/FileInput",
  component: FileInput,
});

export default meta;

export const DefaultUsage = meta.story({
  render: () => (
    <FileInput label="Some Label" onFileUpload={Promise.resolve} fileName="some-file-name" />
  ),
});

export const AdvancedUsage = meta.story({
  render: () => {
    const [fileUrl, setFileUrl] = useState("https://via.placeholder.com/150");

    const { Modal, openModal, closeModal } = useModal("storybook-docs");

    return (
      <div>
        <FileInput
          label="Some Label"
          defaultValue={fileUrl}
          onChange={(event) => setFileUrl(event.target.value)}
          onFileView={openModal}
          fileName="some-file-name"
        />
        <Modal title="Image Preview">
          <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
            <FilePreviewImage src={fileUrl} />
          </FlexContainer>
          <ButtonGroup>
            <Button onClick={closeModal}>Close</Button>
          </ButtonGroup>
        </Modal>
      </div>
    );
  },
});
