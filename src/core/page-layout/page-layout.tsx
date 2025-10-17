import { PageLayoutBodyRegion } from './body-region'
import { PageLayoutBottomBarRegion } from './bottom-bar-region'
import { PageLayoutSideBarRegion } from './side-bar-region'
import { PageLayoutTopBarRegion } from './top-bar-region'
import { PageLayoutContext, usePageLayoutContext } from './context'
import { ElPageLayout } from './styles'

import type { HTMLAttributes } from 'react'

export namespace PageLayout {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The base background colour of the application's pages. */
    backgroundColour?: `--colour-fill-${string}`
    /** The ID of the element. */
    id: string
    /**
     * Which region should scroll.
     * - `self` means this element will scroll
     * - `body` means the `PageLayout.BodyRegion` will scroll
     */
    scroll: 'self' | 'body'
  }
}

/**
 * Provides structured layout for the four main regions of an application: top bar, side bar, body and
 * bottom bar. Each region is represented by a dedicated sub-component: `PageLayout.TopBarRegion`,
 * `PageLayout.SideBarRegion`, `PageLayout.BodyRegion`, and `PageLayout.BottomBarRegion`.
 */
export function PageLayout({ backgroundColour, children, id, scroll, style, ...rest }: PageLayout.Props) {
  return (
    <ElPageLayout
      {...rest}
      data-overflow={scroll === 'self' ? 'auto' : undefined}
      id={id}
      style={{ ...style, ...(backgroundColour && { backgroundColor: `var(${backgroundColour})` }) }}
    >
      <PageLayoutContext.Provider value={{ rootId: id, scroll }}>{children}</PageLayoutContext.Provider>
    </ElPageLayout>
  )
}

PageLayout.BodyRegion = PageLayoutBodyRegion
PageLayout.BottomBarRegion = PageLayoutBottomBarRegion
PageLayout.SideBarRegion = PageLayoutSideBarRegion
PageLayout.TopBarRegion = PageLayoutTopBarRegion

PageLayout.Context = PageLayoutContext
PageLayout.useContext = usePageLayoutContext
