import { Avatar } from "../avatar";
import { useAvatarGroupContext } from "./context";
import { ElAvatarGroupListItem } from "./styles";

// We omit `size` because every avatar in the group is pinned to the same size, set on the group. We omit
// `children` because the avatar's content is always derived from `count`. We omit `borderColour` because,
// unlike other items, the overflow item's border colour cannot be overridden; it always matches the group.
type AttributesToOmit = "size" | "children" | "borderColour";

export namespace AvatarGroupOverflowItem {
  export interface Props extends Omit<Avatar.Props, AttributesToOmit> {
    /** The number of avatars represented by this overflow item. Renders nothing when `0` or less. */
    count: number;
  }
}

/**
 * A pre-styled avatar for representing avatars a consumer has chosen not to display, shown as a "+N" avatar.
 * Renders nothing when `count` is `0` or less, so it is safe to always render alongside a conditional count.
 */
export function AvatarGroupOverflowItem({
  colour = "primary",
  count,
  shape,
  ...rest
}: AvatarGroupOverflowItem.Props) {
  const context = useAvatarGroupContext();

  if (count <= 0) {
    return null;
  }

  return (
    <ElAvatarGroupListItem>
      <Avatar
        {...rest}
        borderColour={context.borderColour}
        colour={colour}
        shape={shape ?? context.shape}
        size={context.size}
      >
        +{count}
      </Avatar>
    </ElAvatarGroupListItem>
  );
}

AvatarGroupOverflowItem.displayName = "AvatarGroup.OverflowItem";
