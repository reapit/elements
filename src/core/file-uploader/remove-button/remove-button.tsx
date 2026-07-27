import { CloseIcon } from '#src/icons/close'
import { ElFileUploaderRemoveButton, ElFileUploaderRemoveButtonBackground } from './styles'

import type { ButtonHTMLAttributes } from 'react'

export namespace FileUploaderRemoveButton {
  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {}
}

/**
 * A remove button for a file item row, shared by `FileUploader.FileCard` and `FileUploader.MediaCard`.
 */
export function FileUploaderRemoveButton({ onClick, ...rest }: FileUploaderRemoveButton.Props) {
  return (
    <ElFileUploaderRemoveButton {...rest} data-remove-button type="button" onClick={onClick}>
      <ElFileUploaderRemoveButtonBackground>
        <CloseIcon aria-hidden color="tertiary" size="sm" />
      </ElFileUploaderRemoveButtonBackground>
    </ElFileUploaderRemoveButton>
  )
}
