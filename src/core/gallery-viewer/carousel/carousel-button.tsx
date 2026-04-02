import { cx } from '@linaria/core'
import { useEffect, useState } from 'react'
import { ChevronLeftIcon } from '#src/icons/chevron-left'
import { ChevronRightIcon } from '#src/icons/chevron-right'
import { useGalleryViewerCarouselContext } from './context'
import { scrollToSibling } from './scroll-to-sibling'
import { elGalleryViewerCarouselButton } from './styles'

import type { ButtonHTMLAttributes, MouseEvent } from 'react'

export namespace GalleryViewerCarouselButton {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Whether the button is disabled. */
    'aria-disabled'?: boolean | 'true' | 'false'
    /** Which direction this button navigates. Controls icon and positioning. */
    direction: 'previous' | 'next'
    /**
     * Whether the button is disabled. Effectively an alias for aria-disabled.
     * Prefer aria-disabled as it communicates the correct semantics here.
     */
    disabled?: boolean
  }
}

const directionIcon = {
  previous: <ChevronLeftIcon aria-hidden size="md" />,
  next: <ChevronRightIcon aria-hidden size="md" />,
}

/**
 * A navigation button for the gallery viewer carousel.
 *
 * Scrolls the carousel track to the next or previous item when clicked.
 * The button is automatically disabled (via `aria-disabled`) and visually hidden
 * when there is no sibling to scroll to (i.e. when the carousel is at the first
 * or last item), but it remains in the DOM and focusable.
 *
 * A consumer-provided `onClick` is called first. The built-in scroll can be
 * prevented by calling `event.preventDefault()` inside that handler.
 */
export function GalleryViewerCarouselButton({
  'aria-disabled': ariaDisabled,
  className,
  direction,
  disabled,
  onClick,
  type = 'button',
  ...rest
}: GalleryViewerCarouselButton.Props) {
  const { activeItemRef, isReadOnly, trackRef } = useGalleryViewerCarouselContext()
  const [atEdge, setAtEdge] = useState(false)

  // Merge auto-disable (edge detection, read-only mode) with the consumer-provided disabled prop.
  // disabled is destructured rather than forwarded via ...rest so the native HTML
  // disabled attribute is never applied — this preserves focus-while-disabled.
  const isDisabled = isReadOnly || atEdge || Boolean(disabled) || Boolean(ariaDisabled)

  // Auto-disable: listen to scroll events on the track and check whether this
  // button's direction is at the edge of the scrollable content.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function checkEdge() {
      if (!track) return
      if (direction === 'previous') {
        setAtEdge(track.scrollLeft <= 0)
      } else {
        // A 1px tolerance accounts for sub-pixel rounding in the browser.
        setAtEdge(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1)
      }
    }

    checkEdge()

    track.addEventListener('scroll', checkEdge, { passive: true })
    return () => track.removeEventListener('scroll', checkEdge)
  }, [direction, trackRef])

  // Click handler: no-op when disabled. Otherwise call consumer onClick first,
  // then scroll to the sibling unless the consumer called event.preventDefault().
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (isDisabled) return
    onClick?.(event)
    if (event.defaultPrevented) return

    const track = trackRef.current
    const activeId = activeItemRef.current
    if (!track || !activeId) return

    scrollToSibling(track, activeId, direction)
  }

  return (
    <button
      {...rest}
      // We deliberately do not use the native disabled attribute as we need to keep the
      // button focusable even when disabled, for accessibility.
      aria-disabled={isDisabled || undefined}
      className={cx(elGalleryViewerCarouselButton, className)}
      data-direction={direction}
      onClick={handleClick}
      type={type}
    >
      {directionIcon[direction]}
    </button>
  )
}

GalleryViewerCarouselButton.displayName = 'GalleryViewer.CarouselButton'
