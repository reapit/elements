import { cx } from "@linaria/core";
import React, { FC, HTMLAttributes } from "react";

import { Intent, getIntentClassName } from "../../helpers/intent";
import { elDeprecatedShapeTag, ElDeprecatedStatusIndicator } from "./__styles__";

/**
 * replaced with StatusIndicatorProps
 * @deprecated
 */
export interface DeprecatedStatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: Intent;
  shape?: "circle" | "tag";
}

/**
 * replaced with StatusIndicator
 * @deprecated
 */
export const DeprecatedStatusIndicator: FC<DeprecatedStatusIndicatorProps> = ({
  intent = "primary",
  shape,
  className,
  ...rest
}) => (
  <ElDeprecatedStatusIndicator
    className={cx(
      intent && getIntentClassName(intent),
      shape && shape === "tag" && elDeprecatedShapeTag,
      className,
    )}
    {...rest}
  />
);
