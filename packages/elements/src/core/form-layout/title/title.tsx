import { cx } from "@linaria/core";
import type { HTMLAttributes, ReactNode } from "react";

import { useFormLayoutContext } from "../context";
import { elFormLayoutTitle } from "./styles";

export namespace FormLayoutTitle {
  export interface Props extends HTMLAttributes<HTMLHeadingElement> {
    /** The heading level to render as. Defaults to `'h2'`. */
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    /** The form title text. */
    children: ReactNode;
  }
}

export function FormLayoutTitle({
  as: Element = "h2",
  children,
  className,
  id,
  ...rest
}: FormLayoutTitle.Props) {
  const { titleId } = useFormLayoutContext();

  return (
    <Element {...rest} id={id ?? titleId} className={cx(elFormLayoutTitle, className)}>
      {children}
    </Element>
  );
}

FormLayoutTitle.displayName = "FormLayout.Title";
