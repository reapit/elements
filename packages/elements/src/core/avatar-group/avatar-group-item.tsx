import { Avatar } from "../avatar";
import { useAvatarGroupContext } from "./context";
import { ElAvatarGroupListItem } from "./styles";

// We omit `size` because every avatar in the group is pinned to the same size, set on the group.
type AttributesToOmit = "size";

export namespace AvatarGroupItem {
  export interface Props extends Omit<Avatar.Props, AttributesToOmit> {}
}

/**
 * A thin wrapper around an avatar to ensure it is rendered as a list item inside the avatar group.
 */
export function AvatarGroupItem({ borderColour, colour, shape, ...rest }: AvatarGroupItem.Props) {
  const context = useAvatarGroupContext();
  return (
    <ElAvatarGroupListItem>
      <Avatar
        {...rest}
        borderColour={borderColour ?? context.borderColour}
        colour={colour ?? context.colour}
        shape={shape ?? context.shape}
        size={context.size}
      />
    </ElAvatarGroupListItem>
  );
}

AvatarGroupItem.displayName = "AvatarGroup.Item";
