import { cx } from "@linaria/core";
import type { HTMLAttributes } from "react";

import { elDivider } from "./styles";

export namespace Divider {
  export interface Props extends HTMLAttributes<HTMLHRElement> {
    "aria-orientation"?: "horizontal" | "vertical";
    variant?: "solid" | "dashed";
  }
}

/**
 * A simple `<hr />` element used to separate sections of content.
 */
export function Divider({
  "aria-orientation": ariaOrientation = "horizontal",
  className,
  variant = "solid",
  ...rest
}: Divider.Props) {
  return (
    <hr
      aria-orientation={ariaOrientation}
      className={cx(elDivider, className)}
      data-variant={variant}
      {...rest}
    />
  );
}
