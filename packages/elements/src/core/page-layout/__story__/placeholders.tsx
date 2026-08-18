import { SideBar } from "#src/core/side-bar";
import { TopBar } from "#src/core/top-bar";

import { BottomBar } from "../../bottom-bar";
import { PageHeader } from "../../page-header";
import { usePageLayoutContext } from "../context";

export function TopBarPlaceholder() {
  return <TopBar logo={<TopBar.BrandLogo appName="Reapit" />}></TopBar>;
}

export function SideBarPlaceholder() {
  return <SideBar footer={<SideBar.CollapseButton />}>Side bar</SideBar>;
}

export function BottomBarPlaceholder() {
  const context = usePageLayoutContext();
  return <BottomBar scrollContainerId={context.rootId}>Bottom bar</BottomBar>;
}

export function BodyPlaceholder() {
  return (
    <div style={{ height: "120svh" }}>
      <PageHeader
        backgroundColour="--colour-fill-neutral-lightest"
        size="wide"
        title={<PageHeader.Title>Title</PageHeader.Title>}
      />
    </div>
  );
}
