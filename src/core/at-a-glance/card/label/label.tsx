import { cx } from "@linaria/core";
import type { HTMLAttributes, ReactNode } from "react";

import { useAtAGlanceCardContext } from "../context";
import { elAtAGlanceCardLabel } from "./styles";

export namespace AtAGlanceCardLabel {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** Label content. */
    children: ReactNode;
  }
}

/**
 * Label subcomponent for AtAGlance.Card primitive.
 * Renders as h1 for article cards, span for interactive cards.
 */
export function AtAGlanceCardLabel({ children, className, ...rest }: AtAGlanceCardLabel.Props) {
  const { as } = useAtAGlanceCardContext();
  const Element = as === "article" ? "h1" : "span";

  return (
    <Element {...rest} className={cx(className, elAtAGlanceCardLabel)}>
      {children}
    </Element>
  );
}

AtAGlanceCardLabel.displayName = "AtAGlance.CardLabel";
