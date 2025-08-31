import { useState, useCallback, useRef } from 'react'

/**
 * Props for the `useSelectKeyboardNavigation` hook.
 */
export interface UseSelectKeyboardNavigationProps {
  /**
   * The list of available options to navigate through.
   * Each option must have a unique `value` and a display `label`.
   */
  selectOptions: { value: string; label: string }[]

  /**
   * Callback fired when the user selects an option
   * using the keyboard (Enter or Space key).
   */
  onOptionSelect: (value: string) => void

  /**
   * Callback fired when the user presses Escape
   * to close the select popover.
   */
  onClose: () => void
}

/**
 * A custom React hook that manages keyboard navigation for a custom Select component.
 *
 * Supported keys:
 * - **ArrowDown / ArrowUp**: Move focus between options (wraps around).
 * - **Enter / Space**: Select the currently focused option.
 * - **Escape**: Close the select dropdown via `onClose`.
 * - **Typeahead search**: Typing characters quickly focuses the first option whose label starts with the typed text.
 *
 * @param props - Configuration props including options, select and close handlers.
 * @returns An object containing:
 * - `focusedOptionIndex`: The index of the currently focused option.
 * - `setFocusedOptionIndex`: A setter for manually changing the focus.
 * - `onSelectKeyDown`: The keyboard event handler to attach to the select container or list.
 */
export const useSelectKeyboardNavigation = ({
  selectOptions,
  onOptionSelect,
  onClose,
}: UseSelectKeyboardNavigationProps) => {
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1)
  const typeaheadRef = useRef('')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /**
   * Handles keyboard interactions for the Select.
   *
   * @param event - The keyboard event triggered by user interaction.
   */
  const onSelectKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setFocusedOptionIndex((prev) => {
            return prev < selectOptions.length - 1 ? prev + 1 : 0
          })
          break

        case 'ArrowUp':
          event.preventDefault()
          setFocusedOptionIndex((prev) => {
            return prev > 0 ? prev - 1 : selectOptions.length - 1
          })
          break

        case 'Enter':
        case ' ':
          event.preventDefault()
          if (focusedOptionIndex >= 0) {
            onOptionSelect(selectOptions[focusedOptionIndex].value)
          }
          break

        case 'Escape':
          event.preventDefault()
          onClose()
          break

        default:
          // Handle typeahead search: typing letters jumps focus to matching option
          if (event.key.length === 1 && /\w/.test(event.key)) {
            typeaheadRef.current += event.key.toLowerCase()

            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
              typeaheadRef.current = ''
            }, 500)

            const matchIndex = selectOptions.findIndex((option) =>
              option.label.toLowerCase().startsWith(typeaheadRef.current),
            )

            if (matchIndex !== -1) {
              setFocusedOptionIndex(matchIndex)
            }
          }
      }
    },
    [focusedOptionIndex, selectOptions, onOptionSelect, onClose],
  )

  return {
    focusedOptionIndex,
    setFocusedOptionIndex,
    onSelectKeyDown,
  }
}
