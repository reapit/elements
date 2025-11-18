import { useId } from 'react'
import { AtAGlanceGrid } from '../grid'
import { Button } from '#src/core/button'
import { ChevronLeftIcon } from '#src/icons/chevron-left'
import { ChevronRightIcon } from '#src/icons/chevron-right'
import { ElAtAGlanceCarousel, elAtAGlanceCarouselButton, elAtAGlanceCarouselGrid } from './styles'
import { useScrollObserver } from './use-scroll-observer'
import { scrollContainerLeft } from './scroll-container-left'
import { scrollContainerRight } from './scroll-container-right'

import type { HTMLAttributes } from 'react'

export namespace AtAGlanceCarousel {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The size of the carousel's columns. Accepts any valid
     * [grid-auto-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-auto-columns)
     * value.
     */
    columns?: string
  }
}

/**
 * A carousel component for displaying at-a-glance cards with horizontal scrolling.
 * Navigation buttons show/hide based on scroll position.
 */
export function AtAGlanceCarousel({ children, columns = '1fr', ...rest }: AtAGlanceCarousel.Props) {
  const scrollContainerId = useId()
  const { canScrollLeft, canScrollRight } = useScrollObserver(scrollContainerId)

  return (
    <ElAtAGlanceCarousel {...rest}>
      <Button
        aria-label="Previous"
        className={elAtAGlanceCarouselButton}
        hidden={!canScrollLeft}
        iconLeft={<ChevronLeftIcon />}
        onClick={() => scrollContainerLeft(scrollContainerId)}
        size="medium"
        variant="secondary"
      />

      <AtAGlanceGrid
        autoColumns={columns}
        className={elAtAGlanceCarouselGrid}
        data-can-scroll-left={canScrollLeft}
        data-can-scroll-right={canScrollRight}
        id={scrollContainerId}
        layout="auto"
      >
        {children}
      </AtAGlanceGrid>

      <Button
        aria-label="Next"
        className={elAtAGlanceCarouselButton}
        hidden={!canScrollRight}
        iconRight={<ChevronRightIcon />}
        onClick={() => scrollContainerRight(scrollContainerId)}
        size="medium"
        variant="secondary"
      />
    </ElAtAGlanceCarousel>
  )
}

AtAGlanceCarousel.Item = AtAGlanceGrid.Item
