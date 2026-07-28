import { useId, useRef } from "react";
import type { DetailsHTMLAttributes, ReactNode } from "react";

import { useDetailsOpenState } from "#src/utils/details";

import { AccordionContext } from "./context";
import { ElAccordion, ElAccordionContent } from "./styles";
import { AccordionSummary } from "./summary";

export namespace Accordion {
  export interface Props extends DetailsHTMLAttributes<HTMLDetailsElement> {
    /**
     * The content to be shown/hidden when the accordion is toggled.
     */
    children: ReactNode;
    /**
     * Whether the accordion's children should remain mounted in the DOM when the accordion is closed.
     * When `true`, children stay mounted even when the accordion is collapsed.
     * When `false`, children are unmounted when closed and re-mounted when opened.
     *
     * Prefer using React Suspense to defer data loading while keeping content in the DOM; use this
     * prop only when mount-level side effects or render cost must be deferred.
     *
     * @default true
     */
    keepMounted?: boolean;
    /**
     * Whether the accordion is open or not. Even if this is provided, the accordion will be uncontrolled by default.
     * If you need to control this state, you will also need to handle click events on the accordion's summary element.
     */
    open?: boolean;
    /**
     * The summary/header for the accordion. Will typically be an `Accordion.Summary`. If a custom element is
     * rendered, it should be a `<summary>` element.
     */
    summary: ReactNode;
  }
}

/**
 * A disclosure widget that can show and hide content. The component leverages a `<details>` element to provide
 * native disclosure functionality, with the summary/header being styled to look like a traditional accordion.
 *
 * **Note:** The open state of the accordion is uncontrolled by default. If you need to control this state,
 * you can do so via the `open` prop, but please surface your use-case with the Elements team first.
 */
export function Accordion({
  "aria-labelledby": ariaLabelledBy,
  children,
  keepMounted = true,
  summary,
  ...rest
}: Accordion.Props) {
  const generatedId = useId();
  const labelId = ariaLabelledBy ?? generatedId;
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const isOpen = useDetailsOpenState(detailsRef, rest.open);

  return (
    <ElAccordion {...rest} ref={detailsRef} aria-labelledby={labelId}>
      <AccordionContext.Provider value={{ labelId }}>{summary}</AccordionContext.Provider>
      <ElAccordionContent>{(isOpen || keepMounted) && children}</ElAccordionContent>
    </ElAccordion>
  );
}

Accordion.Summary = AccordionSummary;

/** @deprecated Use Accordion.Props instead */
export type AccordionProps = Accordion.Props;
