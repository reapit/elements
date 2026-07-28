import { cx } from "@linaria/core";
import type { HTMLAttributes, ReactNode } from "react";

import { elFormLayoutFooter } from "./styles";

export namespace FormLayoutFooter {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** The form footer content, typically a button group. */
    children: ReactNode;
  }
}

export function FormLayoutFooter({ children, className, ...rest }: FormLayoutFooter.Props) {
  return (
    <footer {...rest} className={cx(elFormLayoutFooter, className)}>
      {children}
    </footer>
  );
}

FormLayoutFooter.displayName = "FormLayout.Footer";
