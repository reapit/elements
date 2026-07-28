import type { ComponentType, HTMLAttributes } from "react";

import { useListboxRenderContext } from "../render-context";

export namespace ListboxOptgroup {
  export interface BaseProps extends HTMLAttributes<HTMLElement> {
    /**
     * The label text for the option group. Provides a visual and semantic label
     * for the group of related options.
     */
    label?: string;
  }

  export interface Props extends BaseProps {
    /**
     * The element type to render for the option group. Must accept a `label` prop.
     * The component passed here should render the label text accessibly and forward
     * all props to the underlying element.
     */
    as: ComponentType<BaseProps>;
  }
}

/**
 * A polymorphic component for grouping related options within a Listbox.
 *
 * This component provides a dual-rendering capability:
 * - When in "display" context, renders as a custom element (specified by `as` prop)
 * - When in "native" context, renders as a native `<optgroup>` element for the hidden select
 *
 * The option group helps organize options into logical sections, improving usability
 * and accessibility when dealing with many options.
 */
export function ListboxOptgroup({ as: Element, children, label, ...rest }: ListboxOptgroup.Props) {
  const renderContext = useListboxRenderContext();

  // When rendering in native context (inside the hidden <select>), render as
  // a native <optgroup> element to maintain proper form semantics
  if (renderContext === "native") {
    return <optgroup label={label}>{children}</optgroup>;
  }

  // When rendering in display context, use the custom element provided by the consumer
  return (
    <Element {...rest} label={label} role="group">
      {children}
    </Element>
  );
}

ListboxOptgroup.displayName = "Listbox.Optgroup";
