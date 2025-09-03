import { useEffect, useState, useRef } from 'react'

export const useSelectKeyboardNavigation = (popoverId: string) => {
  const listRef = useRef<HTMLUListElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const listbox = listRef.current
    if (!listbox) return

    const options = listbox.querySelectorAll<HTMLElement>('[role="option"]')

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) return
      e.preventDefault()

      if (e.key === 'ArrowDown') {
        setActiveIndex((prev) => (prev + 1) % options.length)
      } else if (e.key === 'ArrowUp') {
        setActiveIndex((prev) => (prev - 1 + options.length) % options.length)
      } else if (e.key === 'Enter') {
        options[activeIndex]?.click()
      } else if (e.key === 'Escape') {
        ;(document.getElementById(popoverId) as any)?.hidePopover?.()
      }
    }

    listbox.addEventListener('keydown', handleKeyDown)
    return () => listbox.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, popoverId])

  useEffect(() => {
    const listbox = listRef.current
    const options = listbox?.querySelectorAll<HTMLElement>('[role="option"]')
    options?.forEach((opt, idx) => {
      opt.setAttribute('tabindex', idx === activeIndex ? '0' : '-1')
    })
    options?.[activeIndex]?.focus()
  }, [activeIndex])

  return listRef
}
