import React, { useState } from 'react'
import { FileInput, FilePreviewImage } from './index'
import { useModal } from '../use-modal'
import { FlexContainer } from '../../deprecated/layout'
import { DeprecatedButton, DeprecatedButtonGroup } from '../../deprecated/button'

export default {
  title: 'Deprecated/FileInput',
  component: FileInput,
}

export const DefaultUsage = {
  render: ({}) => <FileInput label="Some Label" onFileUpload={Promise.resolve} fileName="some-file-name" />,
}

export const AdvancedUsage = {
  render: ({}) => {
    const [fileUrl, setFileUrl] = useState('https://via.placeholder.com/150')

    const { Modal, openModal, closeModal } = useModal('storybook-docs')

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
          <DeprecatedButtonGroup alignment="right">
            <DeprecatedButton onClick={closeModal}>Close</DeprecatedButton>
          </DeprecatedButtonGroup>
        </Modal>
      </div>
    )
  },
}
