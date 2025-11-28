import { ChevronDownIcon } from '#src/icons/chevron-down'
import { Combobox } from '#src/core/combobox'
import { ElCompactSelectButton, ElCompactSelectButtonLabelText, ElCompactSelectIconContainer } from './styles'
import { Tooltip } from '#src/core/tooltip'
import { useId } from 'react'

type AttributesToOmit = 'aria-controls' | 'aria-expanded' | 'children' | 'id' | 'size'

export namespace CompactSelectButton {
  export interface Props extends Omit<Combobox.ButtonProps, AttributesToOmit> {
    /** Default option to display when no selections have been made. */
    defaultOptions?: Combobox.SelectedContentProps['defaultOptions']
  }
}

/**
 * A button that opens a popup with preloaded options. Use this for compact single-select comboboxes.
 * Displays placeholder text when no selection is made.
 */
export function CompactSelectButton({
  defaultOptions,
  onClick,
  placeholder = 'Select an option',
  ...rest
}: CompactSelectButton.Props) {
  const buttonProps = Combobox.useButton({ onClick, placeholder })
  const context = Combobox.useContext()
  const hasSelection = Combobox.useHasSelection(context.listboxId)

  const labelTextId = useId()
  const tooltipId = useId()

  const content = !hasSelection ? (
    placeholder
  ) : (
    <Combobox.SelectedContent defaultOptions={defaultOptions} listboxId={context.listboxId} />
  )

  return (
    <ElCompactSelectButton
      {...rest}
      {...buttonProps}
      {...Tooltip.getTriggerProps({ id: buttonProps.id, tooltipId, tooltipPurpose: 'describe' })}
      data-size={context.size}
      role="combobox"
    >
      <ElCompactSelectButtonLabelText id={labelTextId}>{content}</ElCompactSelectButtonLabelText>
      <ElCompactSelectIconContainer>
        <ChevronDownIcon />
      </ElCompactSelectIconContainer>
      <Tooltip id={tooltipId} triggerId={buttonProps.id} truncationTargetId={labelTextId}>
        {content}
      </Tooltip>
    </ElCompactSelectButton>
  )
}
