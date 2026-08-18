/** Matches `src/core/number-input/get-input-element.ts` — `FileInput` forwards only the external
 * `ref`, so it has no local handle of its own on the underlying `<input>`; this look-up is how its
 * internal effects/handlers reach the DOM node regardless of whether a consumer passed a ref. */
export function getInputElement(id: string): HTMLInputElement | null {
  const el = document.getElementById(id);
  return el instanceof HTMLInputElement ? el : null;
}
