export namespace resolveFileSelectionLimits {
  export interface Input {
    /** The maximum number of files the consumer allows, if explicitly set. */
    maxFiles?: number;
    /** Whether the consumer allows more than one file, if explicitly set. */
    multiple?: boolean;
  }

  export interface Output {
    /** Whether more than one file is allowed, resolved from `Input.multiple` or inferred from `Input.maxFiles`. */
    multiple: boolean;
    /** The maximum number of files allowed, resolved from `Input.maxFiles` or defaulted from `multiple`. */
    maxFiles: number;
  }
}

/**
 * A `maxFiles` above `1` is unsatisfiable under single-select, so infer `multiple` from it when
 * the consumer hasn't set `multiple` explicitly, then resolve `maxFiles` itself from whichever of
 * `multiple`/inferred-`multiple` applies. Shared by `FileInput` (native `multiple` attribute,
 * validation) and `useFileUploaderInput` (replace vs. accumulate selection) so the two can't
 * independently drift on the same rule.
 */
export function resolveFileSelectionLimits({
  maxFiles,
  multiple,
}: resolveFileSelectionLimits.Input): resolveFileSelectionLimits.Output {
  const effectiveMultiple = multiple ?? (maxFiles !== undefined && maxFiles > 1);
  return { multiple: effectiveMultiple, maxFiles: maxFiles ?? (effectiveMultiple ? Infinity : 1) };
}
