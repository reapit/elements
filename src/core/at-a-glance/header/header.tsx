import type { HTMLAttributes, ReactNode } from "react";

import { ElAtAGlanceHeader, ElAtAGlanceHeaderTitle } from "./styles";

export namespace AtAGlanceHeader {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** The heading text or content. Typically displays the section title like "At a glance". */
    children?: ReactNode;
    /** Element to display after the title (e.g., a settings button or switch). */
    accessory?: ReactNode;
  }
}

/**
 * Displays a section header with a title and an optional accessory element. Use this component to
 * introduce at-a-glance content sections.
 *
 * @example
 * ```tsx
 * <AtAGlance.Header
 *   accessory={
 *     <Button
 *       aria-label="Configure"
 *       variant="tertiary"
 *       size="large"
 *       hasNoPadding
 *       iconRight={<SettingsAltIcon />}
 *     />
 *   }
 * >
 *   At a glance
 * </AtAGlance.Header>
 * ```
 */
export function AtAGlanceHeader({ accessory, children, ...rest }: AtAGlanceHeader.Props) {
  return (
    <ElAtAGlanceHeader {...rest}>
      <ElAtAGlanceHeaderTitle>{children}</ElAtAGlanceHeaderTitle>
      {accessory}
    </ElAtAGlanceHeader>
  );
}

AtAGlanceHeader.displayName = "AtAGlance.Header";
