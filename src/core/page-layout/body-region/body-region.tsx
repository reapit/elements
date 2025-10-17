import { ElPageLayoutBodyRegion } from './styles'
import { usePageLayoutContext } from '../context'

import type { HTMLAttributes } from 'react'

export namespace PageLayoutBodyRegion {
  export interface Props extends HTMLAttributes<HTMLDivElement> {}
}

export function PageLayoutBodyRegion(props: PageLayoutBodyRegion.Props) {
  const context = usePageLayoutContext()
  return <ElPageLayoutBodyRegion {...props} data-overflow={context.scroll === 'body' ? 'auto' : undefined} />
}

PageLayoutBodyRegion.displayName = 'AppLayout.BodyRegion'
