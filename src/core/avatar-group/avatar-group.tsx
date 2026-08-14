import { useMemo, type HTMLAttributes, type ReactNode } from "react";

import type { Avatar } from "../avatar";
import { AvatarGroupItem } from "./avatar-group-item";
import { AvatarGroupOverflowItem } from "./avatar-group-overflow-item";
import { AvatarGroupContext } from "./context";
import { ElAvatarGroupList } from "./styles";

export namespace AvatarGroup {
  export interface ItemProps extends AvatarGroupItem.Props {}

  export interface OverflowItemProps extends AvatarGroupOverflowItem.Props {}

  export interface Props extends HTMLAttributes<HTMLUListElement> {
    /** The avatar group items. Use `AvatarGroup.OverflowItem` to represent any avatars not shown. */
    children: ReactNode;
    /** The colour applied to avatars in the group by default. Individual avatars can override this. */
    colour?: Avatar.Props["colour"];
    /** The shape applied to avatars in the group by default. Individual avatars can override this. */
    shape?: Avatar.Props["shape"];
    /** The size every avatar in the group is pinned to. Individual avatars cannot override this. */
    size?: Avatar.Props["size"];
  }
}

/**
 * Groups multiple avatars together, overlapping them and pinning them all to the same size. Does not limit
 * how many avatars are rendered; use `AvatarGroup.OverflowItem` to represent any avatars a consumer chooses
 * not to display.
 */
export function AvatarGroup({ children, colour, shape, size = "md", ...rest }: AvatarGroup.Props) {
  const contextValue: AvatarGroupContext.Value = useMemo(
    () => ({ borderColour: "--colour-border-white", colour, shape, size }),
    [colour, shape, size],
  );

  return (
    <ElAvatarGroupList {...rest} data-size={size}>
      <AvatarGroupContext.Provider value={contextValue}>{children}</AvatarGroupContext.Provider>
    </ElAvatarGroupList>
  );
}

AvatarGroup.Item = AvatarGroupItem;
AvatarGroup.OverflowItem = AvatarGroupOverflowItem;
