import { ElMainContainer, ElMainContainerContent } from './styles'
import type { HTMLAttributes } from 'react'

export namespace MainContainer {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * The HTML element use for the main container. Defaults to `div` because multi-column
     * layouts will likely want to use different sectioning elements per column (e.g. article
     * vs aside).
     */
    as?: 'article' | 'aside' | 'div' | 'section'
    /** The main container's background colour. */
    backgroundColour?: `--colour-fill-${string}`
    /** The size of the main container. */
    size: 'fluid' | 'wide' | 'narrow'
    /** The layout template to apply to the main container's content. */
    template?:
      | 'single-column'
      | 'two-columns-symmetrical'
      | 'two-columns-asymmetrical-start'
      | 'two-columns-asymmetrical-end'
      | 'three-columns'
  }
}

/**
 * The main container sits in the body region (i.e. within the `PageLayout.BodyRegion`), right below the
 * page header (if available). It holds the page content and is available in three size options
 * (some not available at lower breakpoints): fluid (full width), wide, and narrow.
 *
 * Two or more main containers can be stacked when multiple layouts are required on the same page. For
 * example, wide with a fluid section, or two columns and three columns.
 */
export function MainContainer({
  as = 'div',
  backgroundColour,
  children,
  size = 'fluid',
  style,
  template = 'single-column',
  ...rest
}: MainContainer.Props) {
  return (
    <ElMainContainer
      {...rest}
      as={as}
      data-size={size}
      style={{ ...style, ...(backgroundColour && { backgroundColor: `var(${backgroundColour})` }) }}
    >
      <ElMainContainerContent data-template={template}>{children}</ElMainContainerContent>
    </ElMainContainer>
  )
}
