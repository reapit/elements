import type { HTMLAttributes, ReactNode } from "react";

import { useListboxRenderContext } from "#src/utils/listbox/render-context";

import { useComboboxContext } from "../context";
import { ElComboboxListboxPlaceholder } from "./styles";

export namespace ComboboxListboxPlaceholder {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The text to display when the listbox is empty. */
    children: ReactNode;
    /** The size of the placeholder. */
    size?: "medium" | "large";
  }
}

/**
 * A placeholder component for the Combobox listbox. Use to display placeholder text when no options
 * are available.
 */
export function ComboboxListboxPlaceholder({
  children,
  ...rest
}: ComboboxListboxPlaceholder.Props) {
  const { size } = useComboboxContext();
  const renderContext = useListboxRenderContext();

  // Render nothing in the native select; only render in the custom UI.
  return renderContext === "native" ? null : (
    <ElComboboxListboxPlaceholder {...rest} aria-live="polite" data-size={size} role="status">
      {children}
    </ElComboboxListboxPlaceholder>
  );
}

ComboboxListboxPlaceholder.displayName = "Combobox.ListboxPlaceholder";
