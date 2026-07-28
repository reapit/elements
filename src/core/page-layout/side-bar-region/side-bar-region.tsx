import type { HTMLAttributes } from "react";

import { ElPageLayoutSideBarRegion } from "./styles";

export namespace PageLayoutSideBarRegion {
  export interface Props extends HTMLAttributes<HTMLDivElement> {}
}

export function PageLayoutSideBarRegion(props: PageLayoutSideBarRegion.Props) {
  return <ElPageLayoutSideBarRegion {...props} />;
}

PageLayoutSideBarRegion.displayName = "AppLayout.SideBarRegion";
