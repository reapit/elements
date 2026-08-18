import { cx } from "@linaria/core";
import type { HTMLAttributes, ReactNode } from "react";

import { useFormLayoutContext } from "../context";
import { elFormLayoutDescription } from "./styles";

export namespace FormLayoutDescription {
  export interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /** The form description text. */
    children: ReactNode;
  }
}

export function FormLayoutDescription({
  children,
  className,
  id,
  ...rest
}: FormLayoutDescription.Props) {
  const { descriptionId } = useFormLayoutContext();

  return (
    <p {...rest} id={id ?? descriptionId} className={cx(elFormLayoutDescription, className)}>
      {children}
    </p>
  );
}

FormLayoutDescription.displayName = "FormLayout.Description";
