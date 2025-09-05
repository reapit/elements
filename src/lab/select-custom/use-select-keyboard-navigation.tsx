import { useEffect, useState, useRef } from 'react'

export const useSelectKeyboardNavigation = (popoverId: string) => {
  const listRef = useRef<HTMLUListElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Keyboard handling inside the listbox
  useEffect(() => {
    const listbox = listRef.current
    if (!listbox) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const options = listbox.querySelectorAll<HTMLElement>('[role="option"]')
      if (!options.length) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => (prev + 1) % options.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => (prev - 1 + options.length) % options.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        options[activeIndex]?.click()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        ;(document.getElementById(popoverId) as any)?.hidePopover?.()
      }
    }

    listbox.addEventListener('keydown', handleKeyDown)
    return () => listbox.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, popoverId])

  // Keep tabindex/focus in sync with activeIndex
  useEffect(() => {
    const listbox = listRef.current
    if (!listbox) return
    const options = listbox.querySelectorAll<HTMLElement>('[role="option"]')
    options.forEach((opt, idx) => {
      opt.setAttribute('tabindex', idx === activeIndex ? '0' : '-1')
    })
    options[activeIndex]?.focus()
  }, [activeIndex])

  // 👇 Move focus into the listbox when the popover opens
  useEffect(() => {
    const popover = document.getElementById(popoverId)
    if (!popover) return

    const observer = new MutationObserver(() => {
      if (popover.matches(':popover-open')) {
        const options = listRef.current?.querySelectorAll<HTMLElement>('[role="option"]')
        if (options && options.length > 0) {
          setActiveIndex(0) // reset
          options[0].focus() // focus first option immediately
        }
      }
    })

    observer.observe(popover, { attributes: true, attributeFilter: ['popover'] })
    return () => observer.disconnect()
  }, [popoverId])

  return listRef
}
