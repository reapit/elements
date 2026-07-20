export interface SplitFileName {
  /** The filename with its extension (if any) removed. */
  base: string
  /** The filename's extension, including the leading dot (e.g. `.pdf`), or `''` if it has none. */
  extension: string
}

/**
 * Splits a filename into its base and extension, so callers can truncate just the base while always keeping
 * the extension visible (e.g. `"Very-long-invoice-name.pdf"` truncates to `"Very-long-inv….pdf"`, not
 * `"Very-long-invoice-nam…"`). A leading dot (e.g. `".gitignore"`) is not treated as an extension marker.
 */
export function splitFileName(fileName: string): SplitFileName {
  const dotIndex = fileName.lastIndexOf('.')

  if (dotIndex <= 0 || dotIndex === fileName.length - 1) {
    return { base: fileName, extension: '' }
  }

  return { base: fileName.slice(0, dotIndex), extension: fileName.slice(dotIndex) }
}
