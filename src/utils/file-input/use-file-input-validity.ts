import { getInputElement } from './get-input-element'
import { syncInputFiles } from './sync-input-files'
import { validateFiles } from './validate-files'
import { useEffect } from 'react'

/**
 * Keeps the native input's raw `.files`, and its custom validity, in sync with `files` —
 * whichever changed it (a browse round, a drop, a controlled consumer updating `value`, or the
 * initial mount for a `defaultValue`). `files` holds exactly what was picked, valid or not —
 * matching native `<input type="file">`, which never drops a file the OS picker returned — so
 * validity is deliberately a pure function of the resulting `files`, the same way
 * `useRangeValidation` validates `NumberInput`'s current value (`src/core/number-input/use-range-validation.ts`).
 * An invalid selection stays invalid until it's superseded: browsing or dropping again replaces
 * it entirely (uncontrolled), or a controlled consumer removes the offending file from `value`
 * itself (e.g. via a queue item's own remove button — see `src/core/file-uploader/ARCHITECTURE.md`).
 */
export function useFileInputValidity({
  inputId,
  files,
  accept,
  multiple,
  maxFileSize,
  maxFiles,
  maxTotalSize,
}: {
  inputId: string
  files: File[]
  accept: string | undefined
  multiple: boolean
  maxFileSize: number | undefined
  maxFiles: number | undefined
  maxTotalSize: number | undefined
}): void {
  useEffect(() => {
    const input = getInputElement(inputId)
    if (!input) return

    syncInputFiles(input, files)

    const { rejected } = validateFiles(files, [], {
      accept,
      multiple,
      maxFileSize,
      maxFiles,
      maxTotalSize,
    })
    input.setCustomValidity(rejected[0]?.reason ?? '')
  }, [inputId, files, accept, multiple, maxFileSize, maxFiles, maxTotalSize])
}
