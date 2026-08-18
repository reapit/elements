import type { HTMLAttributes, ReactNode } from "react";

import {
  ElComboboxOptionBadgeContainer,
  ElComboboxOptionAdditionalInfo,
  ElComboboxOptionAdditionalInfoIconContainer,
  ElComboboxOptionTextContainer,
} from "./styles";

export namespace ComboboxOptionAdditionalInfo {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {
    /** Badge displayed after the text. */
    badge?: ReactNode;
    /** Supplementary information. */
    children: ReactNode;
    /** Icon displayed before the text. */
    icon?: ReactNode;
  }
}

/**
 * Additional information for a Combobox option. Use via `Combobox.OptionAdditionalInfo`.
 */
export function ComboboxOptionAdditionalInfo({
  badge,
  children,
  icon,
  ...rest
}: ComboboxOptionAdditionalInfo.Props) {
  return (
    <ElComboboxOptionAdditionalInfo {...rest}>
      {icon && (
        <ElComboboxOptionAdditionalInfoIconContainer>
          {icon}
        </ElComboboxOptionAdditionalInfoIconContainer>
      )}
      <ElComboboxOptionTextContainer>{children}</ElComboboxOptionTextContainer>
      {badge && <ElComboboxOptionBadgeContainer>{badge}</ElComboboxOptionBadgeContainer>}
    </ElComboboxOptionAdditionalInfo>
  );
}

ComboboxOptionAdditionalInfo.displayName = "Combobox.OptionAdditionalInfo";
