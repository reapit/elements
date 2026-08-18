import React, { forwardRef, LegacyRef } from "react";

import { ElDeprecatedSelect } from "./__styles__";

/** @deprecated */
export interface DeprecatedSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/** @deprecated */
export type DeprecatedSelectWrapped = React.ForwardRefExoticComponent<
  DeprecatedSelectProps & React.RefAttributes<React.SelectHTMLAttributes<HTMLSelectElement>>
>;

/** @deprecated */
export const DeprecatedSelect: DeprecatedSelectWrapped = forwardRef(
  (
    { children, ...rest },
    ref: React.ForwardedRef<React.SelectHTMLAttributes<HTMLSelectElement>>,
  ) => {
    return (
      <ElDeprecatedSelect
        aria-label="Select an item from the dropdown list"
        {...rest}
        ref={ref as unknown as LegacyRef<HTMLSelectElement>}
      >
        {children}
      </ElDeprecatedSelect>
    );
  },
);
