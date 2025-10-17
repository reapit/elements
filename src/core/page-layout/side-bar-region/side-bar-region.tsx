import { ElPageLayoutSideBarRegion } from './styles'

import type { HTMLAttributes } from 'react'

export namespace PageLayoutSideBarRegion {
  export interface Props extends HTMLAttributes<HTMLDivElement> {}
}

export function PageLayoutSideBarRegion(props: PageLayoutSideBarRegion.Props) {
  return <ElPageLayoutSideBarRegion {...props} />
}

PageLayoutSideBarRegion.displayName = 'AppLayout.SideBarRegion'
