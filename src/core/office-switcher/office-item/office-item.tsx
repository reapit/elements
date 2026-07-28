import { useId } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { CheckIcon } from "#src/icons/check";

import {
  ElOfficeItem,
  ElOfficeItemBadgeContainer,
  ElOfficeItemCheckIconContainer,
  ElOfficeItemLeftContent,
  ElOfficeItemTextContainer,
} from "./styles";

export namespace OfficeItem {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Badge displayed after the label */
    badge?: ReactNode;
    /** Office label text */
    children?: ReactNode;
    /** Office value */
    value: string;
  }
}

/**
 * An office switcher item. Use via `OfficeSwitcher.Option`.
 */
export function OfficeItem({ badge, children, role = "option", ...rest }: OfficeItem.Props) {
  const badgeId = useId();
  const labelId = useId();

  // We only use the detail if the associated badge is present.
  const ariaDetails = badge ? badgeId : undefined;

  return (
    // NOTE: aria-labelledby is important as it doesn't just provide good a11y, it also provides
    // compatibility with the Combobox primitives, which this component is used with (via Select)
    <ElOfficeItem
      {...rest}
      aria-labelledby={labelId}
      aria-details={ariaDetails}
      role={role}
      type="button"
    >
      <ElOfficeItemLeftContent>
        <ElOfficeItemTextContainer id={labelId}>{children}</ElOfficeItemTextContainer>
        {badge && <ElOfficeItemBadgeContainer id={badgeId}>{badge}</ElOfficeItemBadgeContainer>}
      </ElOfficeItemLeftContent>
      <ElOfficeItemCheckIconContainer aria-hidden>
        <CheckIcon />
      </ElOfficeItemCheckIconContainer>
    </ElOfficeItem>
  );
}
