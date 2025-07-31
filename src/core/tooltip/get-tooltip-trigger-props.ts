interface GetTooltipTriggerPropsInput {
  /** The ID of the trigger element. This must match what is provided to the Tooltip component. */
  id: string
  /** The ID of the tooltip element. This must match what is provided to the Tooltip component. */
  tooltipId: string
  /**
   * The purpose of the tooltip. Does it label the trigger, or does it describe it?
   * Typically, tooltips will describe their trigger via `aria-describedby`. However, there are cases
   * (like icon-only buttons) where they should label their trigger.
   */
  tooltipPurpose: 'label' | 'describe'
}

interface GetTooltipTriggerPropsOutput {
  'aria-describedby'?: string
  'aria-labelledby'?: string
  id: string
}

/**
 * Generates appropriate ARIA attributes for tooltip trigger elements.
 *
 * This function returns the correct ARIA attributes to associate a trigger element
 * (like a button) with its corresponding tooltip. It supports two modes:
 * - 'describe': Uses `aria-describedby` for tooltips that provide additional description
 * - 'label': Uses `aria-labelledby` for tooltips that serve as the primary label (e.g., icon-only buttons)
 */
export function getTooltipTriggerProps({
  id,
  tooltipId,
  tooltipPurpose,
}: GetTooltipTriggerPropsInput): GetTooltipTriggerPropsOutput {
  if (tooltipPurpose === 'describe') {
    return {
      'aria-describedby': tooltipId,
      id,
    }
  } else {
    return {
      'aria-labelledby': tooltipId,
      id,
    }
  }
}
