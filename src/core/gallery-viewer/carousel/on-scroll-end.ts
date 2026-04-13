/**
 * Attaches a listener that fires each time scrolling stops.
 *
 * Uses the native `scrollend` event where supported (all modern browsers).
 * Falls back to a debounced `scroll` listener (50 ms) for older browsers
 * (Safari < 17.4 / Chrome < 114) where `scrollend` on `Element` is absent.
 *
 * Returns a cleanup function that removes the listener(s).
 */
export function onScrollEnd(el: HTMLElement, callback: () => void): () => void {
  // Cast to object before the `in` check so TypeScript does not narrow `el`
  // based on its knowledge of the HTMLElement DOM lib type. Without this,
  // the DOM lib's declaration of `onscrollend` on GlobalEventHandlers makes
  // the check always-true from TS's perspective, narrowing the fallback
  // branch to `never`.
  if ('onscrollend' in (el as object)) {
    el.addEventListener('scrollend', callback)
    return () => el.removeEventListener('scrollend', callback)
  }

  let timer: ReturnType<typeof setTimeout>

  function handleScroll() {
    clearTimeout(timer)
    timer = setTimeout(callback, 50)
  }

  el.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    clearTimeout(timer)
    el.removeEventListener('scroll', handleScroll)
  }
}
