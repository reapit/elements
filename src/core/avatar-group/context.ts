import { createContext, useContext } from "react";

import type { AvatarBase } from "../avatar/avatar-base";

export namespace AvatarGroupContext {
  export interface Value {
    /** The colour of the ring border rendered around avatars in the group, to visually separate them when overlapping. */
    borderColour: AvatarBase.CommonProps["borderColour"];
    /** The colour applied to avatars in the group by default. */
    colour?: AvatarBase.CommonProps["colour"];
    /** The shape applied to avatars in the group by default. */
    shape?: AvatarBase.CommonProps["shape"];
    /** The size every avatar in the group is pinned to. */
    size: AvatarBase.CommonProps["size"];
  }
}

/**
 * Context that AvatarGroup provides to descendants. Exposes the shared size every avatar in the group is
 * pinned to, along with default colour, shape, and border colour that individual avatars can override.
 */
export const AvatarGroupContext = createContext<AvatarGroupContext.Value | null>(null);

/**
 * Returns AvatarGroupContext.Value from the nearest AvatarGroup ancestor.
 * @throws Error when called outside an AvatarGroup component.
 */
export function useAvatarGroupContext(): AvatarGroupContext.Value {
  const context = useContext(AvatarGroupContext);
  if (!context) {
    throw new Error("useAvatarGroupContext requires an AvatarGroup ancestor");
  }
  return context;
}
