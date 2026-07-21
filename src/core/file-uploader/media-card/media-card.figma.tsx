import figma from '@figma/code-connect'
import { FileUploaderMediaCard } from './media-card'

figma.connect(FileUploaderMediaCard, '<FILE_UPLOADER_MULTI_SELECT_MEDIA_CARD_URL>', {
  props: {
    fileName: figma.string('File name'),
    status: figma.enum('State', {
      Queued: 'queued',
      Uploading: 'uploading',
      Processing: 'processing',
      Uploaded: 'uploaded',
      Error: 'error',
    }),
    errorMessage: figma.string('Error message'),
  },
  example: ({ fileName, status, errorMessage }) => (
    <FileUploaderMediaCard
      fileName={fileName}
      status={status}
      errorMessage={errorMessage}
      onRemove={() => {}}
      src="TODO: add image source"
    />
  ),
})
