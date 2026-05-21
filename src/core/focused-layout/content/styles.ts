import { styled } from '@linaria/react'
import { FOCUSED_LAYOUT_CSS_CONTAINER_NAME } from '../constants'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'

export const ElFocusedLayoutContent = styled.main`
  @layer elements.main {
    position: relative;
    z-index: var(--z-index-base);
    flex: 1 1 auto;

    display: block;

    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    /* XS breakpoint: 20px padding */
    padding: var(--spacing-5);

    /* SM breakpoint: 24px vertical, 32px horizontal */
    @container ${FOCUSED_LAYOUT_CSS_CONTAINER_NAME} ${isWidthAtOrAbove('SM')} {
      padding: var(--spacing-6) var(--spacing-8);
    }

    /* MD+ breakpoint: 32px vertical, 40px horizontal */
    @container ${FOCUSED_LAYOUT_CSS_CONTAINER_NAME} ${isWidthAtOrAbove('MD')} {
      padding: var(--spacing-8) var(--spacing-10);
    }
  }
`
