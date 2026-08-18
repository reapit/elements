import { cx } from "@linaria/core";
import type { HTMLAttributes, ReactNode } from "react";

import { useAtAGlanceCardContext } from "../context";
import { elAtAGlanceCardValue } from "./styles";

export namespace AtAGlanceCardValue {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** Value content. */
    children: ReactNode;
  }
}

/**
 * Value subcomponent for AtAGlance.Card primitive.
 * Renders as p for article cards, span for interactive cards.
 */
export function AtAGlanceCardValue({ children, className, ...rest }: AtAGlanceCardValue.Props) {
  const { as } = useAtAGlanceCardContext();
  const Element = as === "article" ? "p" : "span";

  return (
    <Element {...rest} className={cx(className, elAtAGlanceCardValue)}>
      {children}
    </Element>
  );
}

AtAGlanceCardValue.displayName = "AtAGlance.CardValue";
