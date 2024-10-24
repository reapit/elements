import React, { useState } from 'react'
import { FileInput, FilePreviewImage } from './index'
import { useModal } from '../../hooks/use-modal'
import { FlexContainer } from '../layout'
import { Button, DeprecatedButtonGroup } from '../button'

export default {
  title: 'FileInput',
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
            <Button onClick={closeModal}>Close</Button>
          </DeprecatedButtonGroup>
        </Modal>
      </div>
    )
  },
}
