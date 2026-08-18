import { useId } from "react";

import { Tooltip } from "#src/core/tooltip";
import { ChevronDownIcon } from "#src/icons/chevron-down";
import { Combobox } from "#src/utils/combobox";

import {
  ElCompactSelectButton,
  ElCompactSelectButtonLabelText,
  ElCompactSelectIconContainer,
} from "./styles";

type AttributesToOmit = "aria-controls" | "aria-expanded" | "children" | "id" | "size";

export namespace CompactSelectButton {
  export interface Props extends Omit<Combobox.ButtonProps, AttributesToOmit> {
    /** Render-prop function to customise selected content rendering. */
    children?: Combobox.SelectedContentProps["children"];
    /** Default option to display when no selections have been made. */
    defaultOptions?: Combobox.SelectedContentProps["defaultOptions"];
  }
}

/**
 * A button that opens a popup with preloaded options. Use this for compact single-select comboboxes.
 * Displays placeholder text when no selection is made.
 */
export function CompactSelectButton({
  children,
  defaultOptions,
  onClick,
  placeholder = "Select an option",
  ...rest
}: CompactSelectButton.Props) {
  const buttonProps = Combobox.useButton({ onClick });
  const context = Combobox.useContext();
  const hasSelection = Combobox.useHasSelection(context.listboxId);

  const labelTextId = useId();
  const tooltipId = useId();

  const content = hasSelection && (
    <Combobox.SelectedContent defaultOptions={defaultOptions} listboxId={context.listboxId}>
      {children}
    </Combobox.SelectedContent>
  );

  return (
    <ElCompactSelectButton
      {...rest}
      {...buttonProps}
      {...Tooltip.getTriggerProps({ id: buttonProps.id, tooltipId, tooltipPurpose: "describe" })}
      data-size={context.size}
      role="combobox"
    >
      <ElCompactSelectButtonLabelText
        data-has-selection={hasSelection}
        data-placeholder={placeholder}
        id={labelTextId}
      >
        {hasSelection ? content : placeholder}
      </ElCompactSelectButtonLabelText>
      <ElCompactSelectIconContainer>
        <ChevronDownIcon />
      </ElCompactSelectIconContainer>
      <Tooltip id={tooltipId} triggerId={buttonProps.id} truncationTargetId={labelTextId}>
        {content || placeholder}
      </Tooltip>
    </ElCompactSelectButton>
  );
}
