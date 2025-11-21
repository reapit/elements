import { AtAGlanceGrid } from '../grid'
import { Button } from '#src/core/button'
import { ChevronLeftIcon } from '#src/icons/chevron-left'
import { ChevronRightIcon } from '#src/icons/chevron-right'
import { cx } from '@linaria/core'
import { ElAtAGlanceCarousel, elAtAGlanceCarouselButton, elAtAGlanceCarouselGrid } from './styles'
import { scrollContainerLeft } from './scroll-container-left'
import { scrollContainerRight } from './scroll-container-right'
import { useId } from 'react'
import { useScrollObserver } from './use-scroll-observer'

import type { HTMLAttributes } from 'react'

export namespace AtAGlanceCarousel {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The size of the carousel's columns. Accepts any valid
     * [grid-auto-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-auto-columns)
     * value.
     */
    columns?: string
    /**
     * The gap between the grid's rows and columns. Defaults to `--spacing-4`.
     */
    gap?: `--spacing-${string}`
  }
}

/**
 * A carousel component for displaying at-a-glance cards with horizontal scrolling.
 * Navigation buttons show/hide based on scroll position.
 */
export function AtAGlanceCarousel({ children, className, columns = '1fr', id, ...rest }: AtAGlanceCarousel.Props) {
  const fallbackId = useId()
  const scrollContainerId = id ?? fallbackId
  const { canScrollLeft, canScrollRight } = useScrollObserver(scrollContainerId)

  return (
    <ElAtAGlanceCarousel data-can-scroll-left={canScrollLeft} data-can-scroll-right={canScrollRight}>
      <Button
        aria-label="Previous"
        className={elAtAGlanceCarouselButton}
        // ARIA-disable the button when scrolling left is impossible, keeping it focusable while
        // communicating its disabled state to assistive technologies.
        aria-disabled={!canScrollLeft}
        iconLeft={<ChevronLeftIcon />}
        onClick={() => scrollContainerLeft(scrollContainerId)}
        size="medium"
        // Remove from tab order when scrolling left is impossible. Keyboard users cannot tab to it,
        // but it remains focusable if already focused.
        tabIndex={canScrollLeft ? 0 : -1}
        variant="secondary"
      />

      <AtAGlanceGrid
        {...rest}
        autoColumns={columns}
        className={cx(className, elAtAGlanceCarouselGrid)}
        id={scrollContainerId}
        layout="auto"
      >
        {children}
      </AtAGlanceGrid>

      <Button
        aria-label="Next"
        className={elAtAGlanceCarouselButton}
        // ARIA-disable the button when scrolling right is impossible, keeping it focusable while
        // communicating its disabled state to assistive technologies.
        aria-disabled={!canScrollRight}
        iconRight={<ChevronRightIcon />}
        onClick={() => scrollContainerRight(scrollContainerId)}
        size="medium"
        // Remove from tab order when scrolling right is impossible. Keyboard users cannot tab to it,
        // but it remains focusable if already focused.
        tabIndex={canScrollRight ? 0 : -1}
        variant="secondary"
      />
    </ElAtAGlanceCarousel>
  )
}
