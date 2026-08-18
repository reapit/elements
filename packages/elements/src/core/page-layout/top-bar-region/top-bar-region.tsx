import type { HTMLAttributes } from "react";

import { ElPageLayoutTopBarRegion } from "./styles";

export namespace PageLayoutTopBarRegion {
  export interface Props extends HTMLAttributes<HTMLDivElement> {}
}

export function PageLayoutTopBarRegion(props: PageLayoutTopBarRegion.Props) {
  return <ElPageLayoutTopBarRegion {...props} />;
}

PageLayoutTopBarRegion.displayName = "AppLayout.TopBarRegion";
