/**
 * Makes the CSS height of the `to` text area equal to the scroll height of the `from` text area.
 *
 * @param from The text area element whose height we want to copy
 * @param to The text area element whose height we want to set
 */
export default function syncTextAreaHeight(from: HTMLTextAreaElement, to: HTMLTextAreaElement) {
  const currentHeight = from.scrollHeight
  // NOTE: We use block-size instead of height because the latter is not writing-mode aware.
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
  to.style.blockSize = `${currentHeight}px`
}
