import { ElPageLayoutBottomBarRegion } from './styles'

import type { HTMLAttributes } from 'react'

export namespace PageLayoutBottomBarRegion {
  export interface Props extends HTMLAttributes<HTMLDivElement> {}
}

export function PageLayoutBottomBarRegion(props: PageLayoutBottomBarRegion.Props) {
  return <ElPageLayoutBottomBarRegion {...props} />
}

PageLayoutBottomBarRegion.displayName = 'AppLayout.BottomBarRegion'
