import { isDesktop, isTablet } from '#src/styles/deprecated-media'
import { styled } from '@linaria/react'

import type { CSSProperties } from 'react'

interface PageHeaderProps {
  style?: CSSProperties & {
    '--page-header-background_colour'?: 'var(--colour-fill-white)' | 'var(--colour-fill-neutral-lightest)'
  }
}

export const ElPageHeader = styled.header<PageHeaderProps>`
  /* NOTE: This is the default background colour. Consumers can override this by providing an explicit value for this
   * CSS variable via the style prop. */
  --page-header-background_colour: transparent;

  display: grid;
  grid-template: 'breadcrumbs breadcrumbs' 'leading-element title' 'leading-element subtitle' 'leading-element supplementary-info' / auto 1fr;

  background-color: var(--page-header-background_colour);

  padding-block: var(--spacing-3);
  padding-inline: var(--spacing-5) var(--spacing-3);

  /* NOTE: Media queries are use by default, but if the browser supports container queries, they will override the
   * media query styles defined here. */
  ${isTablet} {
    padding-block: var(--spacing-8);
    padding-inline: var(--spacing-8);
  }

  ${isDesktop} {
    padding-block: var(--spacing-10);
    padding-inline: var(--spacing-10);
  }

  /* NOTE: These container query styles come _after_ the media query styles, so they will override them (if the browser
   * supports container queries). These container query styles are also dependent on a parent element being a size or
   * inline-size container. */
  @supports (container-type: inline-size) {
    @container (width < 768px) {
      padding-block: var(--spacing-3);
      padding-inline: var(--spacing-5) var(--spacing-3);
    }

    @container (width >= 768px) {
      padding-block: var(--spacing-8);
      padding-inline: var(--spacing-8);
    }

    @container (width >= 1024px) {
      padding-block: var(--spacing-8);
      padding-inline: var(--spacing-10);
    }
  }
`

export const ElPageHeaderBreadcrumbsContainer = styled.div`
  grid-area: breadcrumbs;
  padding-block-end: var(--spacing-2);

  /* NOTE: Media queries are use by default, but if the browser supports container queries, they will override the
   * media query styles defined here. */
  ${isTablet} {
    padding-block-end: var(--spacing-4);
  }

  /* NOTE: These container query styles come _after_ the media query styles, so they will override them (if the browser
  * supports container queries). These container query styles are also dependent on a parent element being a size or
  * inline-size container. */
  @supports (container-type: inline-size) {
    @container (width < 768px) {
      padding-block-end: var(--spacing-2);
    }

    @container (width >= 768px) {
      padding-block-end: var(--spacing-4);
    }
  }
`

export const ElPageHeaderLeadingElementContainer = styled.div`
  grid-area: leading-element;
  padding-inline-end: var(--spacing-3);

  /* NOTE: Media queries are use by default, but if the browser supports container queries, they will override the
   * media query styles defined here. */
  ${isTablet} {
    padding-inline-end: var(--spacing-4);
  }

  /* NOTE: These container query styles come _after_ the media query styles, so they will override them (if the browser
  * supports container queries). These container query styles are also dependent on a parent element being a size or
  * inline-size container. */
  @supports (container-type: inline-size) {
    @container (width < 768px) {
      padding-inline-end: var(--spacing-3);
    }

    @container (width >= 768px) {
      padding-inline-end: var(--spacing-4);
    }
  }
`

export const ElPageHeaderTitleContainer = styled.div`
  grid-area: title;
`

export const ElPageHeaderSubtitleContainer = styled.div`
  grid-area: subtitle;
`

export const ElPageHeaderSupplementaryInfoContainer = styled.div`
  grid-area: supplementary-info;
`
