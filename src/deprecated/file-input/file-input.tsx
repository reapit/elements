import React, {
  ChangeEvent,
  Dispatch,
  forwardRef,
  LegacyRef,
  SetStateAction,
  useState,
  MouseEvent,
  useEffect,
  FC,
} from 'react'
import { useId } from '../../storybook/random-id'
import { elMl3, elMr4 } from '../../styles/deprecated-spacing'
import { DeprecatedButton } from '../../deprecated/button'
import { DeprecatedIcon } from '../../deprecated/icon'
import { DeprecatedLabel } from '../../deprecated/label'
import { FlexContainer } from '../../deprecated/layout'
import { handleSetNativeInput } from '../../deprecated/multi-select'
import {
  ElFileInput,
  ElFileInputHidden,
  ElFileInputIconContainer,
  ElFileInputWrap,
  ElFilePreviewImage,
} from './__styles__'
import { PlaceholderImage } from '../../deprecated/placeholder-image'
import { TextSM } from '../../deprecated/typography'

/** @deprecated */
export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileUpload?: (uploadImageModel: CreateImageUploadModel) => Promise<any | ImageUploadModel>
  onFileView?: (base64: string) => void
  placeholderText?: string
  defaultValue?: string
  label?: string
  fileName?: string
}

/** @deprecated */
export interface FilePreviewImageProps {
  src?: string | null
}

/** @deprecated */
export type FileInputWrapped = React.ForwardRefExoticComponent<
  FileInputProps & React.RefAttributes<React.InputHTMLAttributes<HTMLInputElement>>
>

/** @deprecated */
export interface CreateImageUploadModel {
  name?: string
  imageData?: string
}

/** @deprecated */
export interface ImageUploadModel {
  Url: string
}

/** @deprecated */
export const handleFileChange =
  (
    setFileName: Dispatch<SetStateAction<string>>,
    fileName: string,
    onFileUpload?: (uploadImageModel: CreateImageUploadModel) => Promise<string | ImageUploadModel>,
  ) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      const fileUrl = URL.createObjectURL(file)

      if (typeof fileUrl === 'string') {
        setFileName(fileUrl)
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const base64 = reader.result

        if (onFileUpload && typeof base64 === 'string') {
          const uploaded = await onFileUpload({
            imageData: base64,
            name: `${fileName ? fileName : file.name}`,
          })

          if (uploaded && (uploaded as ImageUploadModel).Url) {
            setFileName((uploaded as ImageUploadModel).Url)
          }
        }
      }
      reader.onerror = (error) => {
        console.error(`file upload error: ${error}`)
      }

      return reader
    }
  }

/** @deprecated */
export const handleFileClear =
  (setFileName: Dispatch<SetStateAction<string>>) => (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    event.preventDefault()

    setFileName('')
  }

/** @deprecated */
export const handleFileView =
  (onFileView: (fileUrl: string) => void, fileUrl: string) => (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    event.preventDefault()
    onFileView(fileUrl)
  }

/** @deprecated */
export const FilePreviewImage: FC<FilePreviewImageProps> = ({ src }) => {
  if (!src) return <PlaceholderImage placeholder="placeholderSmall" size={120} fillAvailable />

  return <ElFilePreviewImage src={src} />
}

/** @deprecated */
export const FileInput: FileInputWrapped = forwardRef(
  (
    { onFileView, onFileUpload, defaultValue, label, placeholderText, fileName = '', accept, id, ...rest },
    ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    const [fileUrl, setFileName] = useState<string>(defaultValue ?? '')

    const inputId = useId(id)

    useEffect(handleSetNativeInput(inputId, [fileUrl]), [fileUrl])

    useEffect(() => {
      if (defaultValue) {
        setFileName(defaultValue)
      }
    }, [defaultValue])

    return (
      <ElFileInputWrap>
        {label && <DeprecatedLabel>{label}</DeprecatedLabel>}
        <FlexContainer isFlexAlignCenter>
          <DeprecatedButton className={elMr4} type="button">
            {fileUrl ? 'Change' : 'Upload'}
          </DeprecatedButton>
          <ElFileInput
            data-testid="el-file-input"
            aria-label={`File upload input ${placeholderText}`}
            accept={accept}
            type="file"
            onChange={handleFileChange(setFileName, fileName, onFileUpload)}
          />
          <ElFileInputHidden
            aria-hidden="true"
            id={inputId}
            {...rest}
            defaultValue={defaultValue}
            ref={ref as unknown as LegacyRef<HTMLInputElement>}
          />
          {fileUrl ? (
            <ElFileInputIconContainer>
              {onFileView && (
                <DeprecatedIcon
                  role="button"
                  onClick={handleFileView(onFileView, fileUrl)}
                  className={elMr4}
                  intent="primary"
                  icon="view"
                  fontSize="1rem"
                />
              )}
              <DeprecatedIcon
                role="button"
                onClick={handleFileClear(setFileName)}
                className={elMr4}
                intent="primary"
                icon="close"
                fontSize="1rem"
              />
            </ElFileInputIconContainer>
          ) : (
            <TextSM className={elMl3} hasGreyText hasNoMargin>
              {placeholderText || 'Upload File'}
            </TextSM>
          )}
        </FlexContainer>
      </ElFileInputWrap>
    )
  },
)
