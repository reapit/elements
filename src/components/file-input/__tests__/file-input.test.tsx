import React, { ChangeEvent, MouseEvent } from 'react'
import { render } from '@testing-library/react'
import { FileInput, handleFileChange, handleFileClear, handleFileView, FilePreviewImage } from '..'

describe('FileInput component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<FileInput />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot with full props', () => {
    const wrapper = render(
      <FileInput
        label="Some Label"
        defaultValue="https://mock.com"
        onChange={vi.fn()}
        onFileView={vi.fn()}
        onFileUpload={vi.fn()}
        placeholderText="Some Text"
        fileName="some-file-name"
      />,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for the FilePreviewImage component', () => {
    const wrapper = render(<FilePreviewImage src="https://mock-image.com" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('handleFileView', () => {
  it('should handle viewing a file', () => {
    const onFileView = vi.fn()
    const fileUrl = 'https://mock.com'
    const event = {
      stopPropagation: vi.fn(),
      preventDefault: vi.fn(),
    }

    const curried = handleFileView(onFileView, fileUrl)

    curried(event as unknown as MouseEvent<HTMLSpanElement>)

    expect(onFileView).toHaveBeenCalledWith(fileUrl)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })
})

describe('handleFileClear', () => {
  it('should handle clearing a file', () => {
    const setFileName = vi.fn()
    const event = {
      stopPropagation: vi.fn(),
      preventDefault: vi.fn(),
    }

    const curried = handleFileClear(setFileName)

    curried(event as unknown as MouseEvent<HTMLSpanElement>)

    expect(setFileName).toHaveBeenCalledWith('')
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })
})

describe('handleFileChange', () => {
  it('should handle uploading a file', async () => {
    const setFileName = vi.fn()
    const fileName = 'MOCK_FILE_NAME'
    const onFileUpload = vi.fn()
    const event = {
      target: {
        files: [new Blob(['1', '1', '1'])],
      },
    }

    const curried = handleFileChange(setFileName, fileName, onFileUpload)

    const reader = curried(event as unknown as ChangeEvent<HTMLInputElement>)

    expect(reader instanceof FileReader).toBe(true)
  })
})
