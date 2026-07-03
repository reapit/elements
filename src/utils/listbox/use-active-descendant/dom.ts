import { OPTION_SELECTOR, SELECTED_OPTION_SELECTOR } from '../dom-helpers'

function findListboxElement(option: Element): HTMLElement | null {
  const listboxId = (option as HTMLElement).dataset?.listboxId
  if (listboxId) {
    return document.getElementById(listboxId)
  }
  const ancestor = option.closest('[role="listbox"]')
  return ancestor instanceof HTMLElement ? ancestor : null
}

export function getVisibleOptions(listboxElement: HTMLElement): Element[] {
  return Array.from(listboxElement.querySelectorAll(OPTION_SELECTOR)).filter((option) => {
    // summary elements (group headers) are always visible regardless of <details> state.
    if (option.tagName === 'SUMMARY') return true
    // Items inside a closed <details> are not reachable via keyboard.
    return option.closest('details:not([open])') === null
  })
}

export function getInitialActiveOption(listboxElement: HTMLElement): Element | null {
  const options = getVisibleOptions(listboxElement)
  const selected = listboxElement.querySelector(SELECTED_OPTION_SELECTOR)
  return (selected && options.includes(selected) ? selected : null) ?? getFirstOption(options)
}

/** Mirrors {@link getInitialActiveOption}, but falls back to the last option instead of the first — used when navigation starts from the end (e.g. ArrowUp/ArrowLeft with no active descendant yet). */
export function getInitialActiveOptionFromEnd(listboxElement: HTMLElement, options: Element[]): Element | null {
  const selected = listboxElement.querySelector(SELECTED_OPTION_SELECTOR)
  return (selected && options.includes(selected) ? selected : null) ?? getLastOption(options)
}

// Intentionally does not wrap around at the last option. Combobox popups are modal dialogs,
// so returning focus to the trigger isn't an option here — the ARIA combobox pattern's
// "do nothing at the boundary" behaviour is the only one available to us.
export function getNextOption(options: Element[], current: Element | null): Element | null {
  if (!current) return options[0] ?? null
  const index = options.indexOf(current)
  if (index === -1 || index === options.length - 1) return null
  return options[index + 1] ?? null
}

// See getNextOption — same "no wraparound at the boundary" rationale applies in reverse.
export function getPrevOption(options: Element[], current: Element | null): Element | null {
  if (!current) return null
  const index = options.indexOf(current)
  if (index <= 0) return null
  return options[index - 1] ?? null
}

export function getFirstOption(options: Element[]): Element | null {
  return options[0] ?? null
}

export function getLastOption(options: Element[]): Element | null {
  return options[options.length - 1] ?? null
}

export function getActiveOption(listboxElement: HTMLElement): HTMLElement | null {
  return listboxElement.querySelector<HTMLElement>('[data-is-active="true"]') ?? null
}

export function activateOption(ariaOwner: HTMLElement, option: Element): void {
  const optionId = (option as HTMLElement).id
  if (!optionId) {
    if (import.meta.env.DEV) {
      console.error(
        '[Listbox] activateOption: option element has no id — aria-activedescendant cannot be set. Ensure all options have an id attribute.',
      )
    }
    return
  }
  const listboxElement = findListboxElement(option)
  if (listboxElement) {
    for (const el of listboxElement.querySelectorAll<HTMLElement>('[data-is-active="true"]')) {
      delete el.dataset.isActive
    }
  }
  ;(option as HTMLElement).dataset.isActive = 'true'
  option.scrollIntoView({ block: 'nearest' })
  ariaOwner.setAttribute('aria-activedescendant', optionId)
}

export function clearActiveOption(ariaOwner: HTMLElement, listboxElement: HTMLElement): void {
  for (const el of listboxElement.querySelectorAll<HTMLElement>('[data-is-active="true"]')) {
    delete el.dataset.isActive
  }
  ariaOwner.removeAttribute('aria-activedescendant')
}

export function clickOption(option: Element): void {
  ;(option as HTMLElement).click()
}

export interface NavigateActiveDescendantOptions {
  /** The element that should receive aria-activedescendant */
  ariaOwner: HTMLElement
  /** The listbox container whose options are being navigated */
  listboxElement: HTMLElement
  /** Whether arrow-key navigation should also select the newly active option */
  selectionFollowsFocus?: boolean
}

/**
 * Handles arrow key, Home/End, and Enter/Space navigation of a listbox's active descendant.
 * Shared by the listbox container's own keydown handling and any other focused element
 * (e.g. a search input) that owns the aria-activedescendant relationship.
 */
export function navigateActiveDescendant(
  event: { key: string; preventDefault: () => void },
  { ariaOwner, listboxElement, selectionFollowsFocus = false }: NavigateActiveDescendantOptions,
): void {
  const ariaOrientation = listboxElement.getAttribute('aria-orientation') ?? 'vertical'
  const options = getVisibleOptions(listboxElement)
  const activeOption = listboxElement.querySelector<HTMLElement>('[data-is-active="true"]') ?? null

  const activateAndMaybeSelect = (option: Element | null) => {
    if (!option) return
    activateOption(ariaOwner, option)
    if (selectionFollowsFocus) {
      clickOption(option)
    }
  }

  switch (event.key) {
    case 'ArrowDown':
      if (ariaOrientation !== 'horizontal') {
        event.preventDefault()
        activateAndMaybeSelect(
          activeOption ? getNextOption(options, activeOption) : getInitialActiveOption(listboxElement),
        )
      }
      break
    case 'ArrowUp':
      if (ariaOrientation !== 'horizontal') {
        event.preventDefault()
        activateAndMaybeSelect(
          activeOption ? getPrevOption(options, activeOption) : getInitialActiveOptionFromEnd(listboxElement, options),
        )
      }
      break
    case 'ArrowRight':
      if (ariaOrientation === 'horizontal') {
        event.preventDefault()
        activateAndMaybeSelect(
          activeOption ? getNextOption(options, activeOption) : getInitialActiveOption(listboxElement),
        )
      }
      break
    case 'ArrowLeft':
      if (ariaOrientation === 'horizontal') {
        event.preventDefault()
        activateAndMaybeSelect(
          activeOption ? getPrevOption(options, activeOption) : getInitialActiveOptionFromEnd(listboxElement, options),
        )
      }
      break
    case 'Home':
      event.preventDefault()
      activateAndMaybeSelect(getFirstOption(options))
      break
    case 'End':
      event.preventDefault()
      activateAndMaybeSelect(getLastOption(options))
      break
    case 'Enter':
    case ' ':
      if (activeOption) {
        event.preventDefault()
        clickOption(activeOption)
      }
      break
  }
}
