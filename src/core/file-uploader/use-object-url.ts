import { useEffect, useMemo } from 'react'

/** Creates an object URL for `file` while `enabled`, revoking it on cleanup or when it's no longer needed. */
export function useObjectUrl(file: File | undefined, enabled: boolean): string | undefined {
  const url = useMemo(() => (file && enabled ? URL.createObjectURL(file) : undefined), [file, enabled])

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [url])

  return url
}
